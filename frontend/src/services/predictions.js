import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from './firebase'
import {
  getLocalPredictions,
  saveLocalPrediction,
  deleteLocalPrediction as removeLocalPrediction,
} from './storage'

function predictionsCollection(userId) {
  if (!db) return null
  return collection(db, 'users', userId, 'predictions')
}

function normalizeTimestamp(value, fallback) {
  if (value?.toDate) return value.toDate().toISOString()
  return fallback || new Date().toISOString()
}

export function subscribePredictions(userId, onRows, onError) {
  if (!userId) {
    onRows([])
    return () => {}
  }

  // 1. Instantly emit cached local predictions
  const localList = getLocalPredictions(userId)
  onRows(localList)

  // 2. If Firestore is unavailable, return empty unsub
  if (!db) {
    return () => {}
  }

  // 3. Subscribe to Firestore
  try {
    const col = predictionsCollection(userId)
    if (!col) return () => {}
    const q = query(col, orderBy('createdAt', 'desc'))

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const rows = snapshot.docs.map((item) => {
          const data = item.data()
          return {
            id: item.id,
            ...data,
            timestamp: normalizeTimestamp(data.createdAt, data.clientTimestamp),
          }
        })
        if (rows.length > 0) {
          onRows(rows)
          // Sync each row to local storage
          rows.forEach((r) => saveLocalPrediction(userId, r))
        } else {
          // Keep local if Firestore returns empty but we have local items
          const freshLocal = getLocalPredictions(userId)
          onRows(freshLocal)
        }
      },
      (err) => {
        console.warn('Firestore subscription warning (using local ledger):', err?.message)
        const freshLocal = getLocalPredictions(userId)
        onRows(freshLocal)
        if (onError && freshLocal.length === 0) {
          // Only trigger error if no local data
        }
      },
    )

    return unsubscribe
  } catch (err) {
    console.warn('Firestore subscribe caught error:', err)
    onRows(getLocalPredictions(userId))
    return () => {}
  }
}

export async function savePrediction(userId, entry) {
  if (!userId) return

  // 1. Save to local storage first (guaranteed persistence)
  saveLocalPrediction(userId, entry)

  // 2. Attempt Firestore sync if connected
  if (db) {
    try {
      const col = predictionsCollection(userId)
      if (col) {
        await addDoc(col, {
          ...entry,
          clientTimestamp: entry.timestamp || new Date().toISOString(),
          createdAt: serverTimestamp(),
        })
      }
    } catch (err) {
      console.warn('Firestore write warning (persisted locally):', err?.message)
    }
  }
}

export async function deletePrediction(userId, predictionId) {
  if (!userId) return

  // 1. Remove from local storage
  removeLocalPrediction(userId, predictionId)

  // 2. Remove from Firestore if connected
  if (db) {
    try {
      await deleteDoc(doc(db, 'users', userId, 'predictions', predictionId))
    } catch (err) {
      console.warn('Firestore delete warning (removed locally):', err?.message)
    }
  }
}
