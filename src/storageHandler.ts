// @ts-expect-error weird type/namespace error
let storage: Storage.Static = null

export const initializeStorageIfNeeded = async () => {
  if (!storage) {
    // @ts-expect-error browser global is set when run as addon, but not vite
      if (typeof browser !== 'undefined') {
      const browser = await import('webextension-polyfill')
      storage = browser.storage
    } else {
      storage = {
        local: {
          data: {},
        }
      }
      storage.local.get = (item: string) => {
        if (item === 'syncEnabled') {
          return {syncEnabled: false}
        }
        return {[item]: storage.local.data[item]}
      }
      storage.local.set = (obj: {[key: string]: any}) => {
        const key = Object.keys(obj)[0]
        storage.local.data[key] = Object.values(obj)[0]
      }
      storage.local.remove = (key: string) => {
        delete storage.local.data[key]
      }
    }
  }
}

const isSyncEnabled = async () => {
  await initializeStorageIfNeeded()
  const result = await storage.local.get('syncEnabled')
  return result.syncEnabled || false
}

export const saveStorage = async (key: string, value: any) => {
  await initializeStorageIfNeeded()
  const syncEnabled = await isSyncEnabled()

  if (syncEnabled) {
    await storage.sync.set({ [key]: value })
  }
  await storage.local.set({ [key]: value })
}

export const removeStorage = async (key: string) => {
  await initializeStorageIfNeeded()
  const syncEnabled = await isSyncEnabled()

  if (syncEnabled) {
    await storage.sync.remove(key)
  }
  await storage.local.remove(key)
}

export const getStorage = async (key: string) => {
  await initializeStorageIfNeeded()
  const syncEnabled = await isSyncEnabled()

  if (syncEnabled) {
    const result = await storage.sync.get(key)
    return result[key]
  }
  const result = await storage.local.get(key)
  return result[key]
}

export const updateSyncStorage = async () => {
  await initializeStorageIfNeeded()
  const currentStore = await storage.local.get('exceptions')
  await storage.sync.set({ exceptions: currentStore.exceptions })
}
