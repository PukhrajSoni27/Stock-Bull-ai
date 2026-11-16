const THEME_KEY = 'stockbull_theme'
const USERS_KEY = 'stockbull_users'
const SESSION_KEY = 'stockbull_session'
const PREDICTIONS_KEY = 'stockbull_predictions'

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

function writeJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (err) {
    console.warn('localStorage write failed:', err)
  }
}

export function getTheme() {
  return readJson(THEME_KEY, 'dark')
}

export function setTheme(mode) {
  writeJson(THEME_KEY, mode)
}

// User Accounts Management
export function getLocalUsers() {
  return readJson(USERS_KEY, [])
}

export function saveLocalUser(user) {
  const users = getLocalUsers()
  const emailNorm = user.email.toLowerCase().trim()
  const existingIdx = users.findIndex((u) => u.email.toLowerCase() === emailNorm)
  if (existingIdx >= 0) {
    users[existingIdx] = { ...users[existingIdx], ...user, email: emailNorm }
  } else {
    users.push({
      id: user.id || 'usr-' + Date.now(),
      name: user.name || emailNorm.split('@')[0],
      email: emailNorm,
      password: user.password,
    })
  }
  writeJson(USERS_KEY, users)
  return { ok: true }
}

export function findLocalUser(email, password) {
  const emailNorm = email.toLowerCase().trim()
  const users = getLocalUsers()
  return users.find((u) => u.email.toLowerCase() === emailNorm && u.password === password) || null
}

// Session Management
export function getLocalSession() {
  return readJson(SESSION_KEY, null)
}

export function setLocalSession(session) {
  if (!session) {
    localStorage.removeItem(SESSION_KEY)
    return
  }
  writeJson(SESSION_KEY, session)
}

// Local Predictions Backup & Sync
export function getLocalPredictions(userId) {
  const all = readJson(PREDICTIONS_KEY, {})
  const list = all[userId] || []
  return Array.isArray(list) ? list : []
}

export function saveLocalPrediction(userId, entry) {
  const all = readJson(PREDICTIONS_KEY, {})
  const userList = all[userId] || []
  const updated = [entry, ...userList.filter((p) => p.id !== entry.id)]
  all[userId] = updated
  writeJson(PREDICTIONS_KEY, all)
  return updated
}

export function deleteLocalPrediction(userId, predictionId) {
  const all = readJson(PREDICTIONS_KEY, {})
  const userList = all[userId] || []
  const updated = userList.filter((p) => p.id !== predictionId)
  all[userId] = updated
  writeJson(PREDICTIONS_KEY, all)
  return updated
}
