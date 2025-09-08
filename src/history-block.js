import browser from 'webextension-polyfill'
import { getStorage, initializeStorageIfNeeded, saveStorage } from './storageHandler'

const { history } = browser

const httpsRegex = '(http(s)?:\\/\\/)?'
const wwwRegex = '([wW]{3}\\.)?'
const domainSubDomainRegex = '[a-zA-Z0-9]+(\\.([a-zA-Z0-9])+)*'
const extensionRegex = '\\.[a-zA-Z0-9]{1,5}'
const nonTopLevelDomainUrlRegex = new RegExp(`^${httpsRegex}${wwwRegex}${domainSubDomainRegex}${extensionRegex}\/.+$`)

const setupExtension = async () => {
  await initializeStorageIfNeeded()
  const enabledResult = await getStorage('extensionEnabled')

  if (!enabledResult) {
    await saveStorage('extensionEnabled', true)
  }
}

const matchesException = (url, exception) => {
  const regexifiedException = exception.replace(/[|\\{}()[\]^$+?.\/]/g, '\\$&').replaceAll('*', '[a-zA-Z0-9]+')
  const optionalHttpsRegex = exception.includes('http://') || exception.includes('https://') ? '' : httpsRegex
  const optionalWWWRegex = exception.includes('www.') ? '' : wwwRegex
  const optionalEndingSlash = exception.endsWith('/') ? '' : '\/?'
  const fullRegex = `^${optionalHttpsRegex}${optionalWWWRegex}${regexifiedException}${optionalEndingSlash}$`

  const exceptionWithOptionalPrefix = new RegExp(fullRegex)
  return exceptionWithOptionalPrefix.test(url)
}

const onVisited = async (historyItem) => {
  const { url } = historyItem

  const isNonTopLevelDomain = nonTopLevelDomainUrlRegex.test(url)

  if (isNonTopLevelDomain) {
    const enabledResult = await getStorage('extensionEnabled')

    if (!enabledResult) {
      return
    }

    const exceptionsResult = await getStorage('exceptions')
    const storedExceptions = exceptionsResult || []
    const isException = storedExceptions.some((exception) => matchesException(url, exception))

    if (!isException) {
      await history.deleteUrl({ url })
    }
  }
}

setupExtension().then(() => {
  history.onVisited.addListener(onVisited)
})
