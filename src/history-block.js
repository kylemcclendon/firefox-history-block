import browser from 'webextension-polyfill'
import { getStorage } from './storageHandler'

const { history } = browser

const httpsRegex = '(http(s)?:\/\/)?'
const wwwRegex = '([wW]{3}\.)?'
const domainSubDomainRegex = '[a-zA-Z0-9](\.[a-zA-Z0-9])*'
const extensionRegex = '[a-zA-Z0-9]{1,5}'
const nonTopLevelDomainUrlRegex = new RegExp(`${httpsRegex}${wwwRegex}${domainSubDomainRegex}${extensionRegex}`)
// const nonTopLevelDomainUrlRegex = /^httpsRegex([wW]{3})?([a-zA-Z0-9]+\.)?[a-zA-Z0-9]+\.[a-zA-Z0-9]{1,5}\/.+$/

const matchesException = (url, exception) => {
  const regexifiedException = exception.replace(/[|\\{}()[\]^$+?.\/]/g, '\\$&').replaceAll('*', '[a-zA-Z0-9]+')
  // const optionalHttpsPrefix = '(http(s)?:\/\/)?'
  // const optionalSubDomainPrefix = '([a-zA-Z0-9]+\.)?'
  // const hasHTTPPrefix = exception.startsWith('https://') || exception.startsWith('http://')
  // const fullRegex = `^${!hasHTTPPrefix ? optionalHttpsPrefix : ''}${!hasHTTPPrefix ? optionalSubDomainPrefix : ''}${regexifiedException}(\/)?$`
  const fullRegex = `${httpsRegex}${wwwRegex}${regexifiedException}`

  const exceptionWithOptionalPrefix = new RegExp(fullRegex)
  return exceptionWithOptionalPrefix.test(url)
}

const onVisited = async (historyItem) => {
  const { url } = historyItem

  const isNonTopLevelDomain = nonTopLevelDomainUrlRegex.test(url)

  if (isNonTopLevelDomain) {
    const enabledResult = await getStorage('enabled')

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

history.onVisited.addListener(onVisited)
