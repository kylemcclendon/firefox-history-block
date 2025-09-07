import browser from 'webextension-polyfill'

const { storage } = browser

const isSyncEnabled = async () => {
  const result = await storage.local.get('syncEnabled')
  return result.syncEnabled || false
}

export const saveStorage = async (key, value) => {
  const syncEnabled = await isSyncEnabled()

  if (syncEnabled) {
    await storage.sync.set({ [key]: value })
  }
  await storage.local.set({ [key]: value })
}

export const removeStorage = async (key) => {
  const syncEnabled = await isSyncEnabled()

  if (syncEnabled) {
    await storage.sync.remove(key)
  }
  await storage.local.remove(key)
}

export const getStorage = async (key) => {
  const syncEnabled = await isSyncEnabled()

  if (syncEnabled) {
    const result = await storage.sync.get(key)
    return result[key]
  }
  const result = await storage.local.get(key)
  return result[key]
}

export const updateSyncStorage = async () => {
  const currentStore = await storage.local.get('exceptions')
  await storage.sync.set({ exceptions: currentStore.exceptions })
}
