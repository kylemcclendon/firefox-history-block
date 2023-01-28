import browser from 'webextension-polyfill'

const { history, storage } = browser

const nonTopLevelDomainUrlRegex = /^(http(s)?:\/\/)?([a-zA-Z0-9]+\.)?[a-zA-Z0-9]+\.[a-zA-Z0-9]{1,5}\/.+$/

const matchesException = (url, exception) => {
  const regexifiedException = exception.replace(/[|\\{}()[\]^$+?.[/]]/g, '\\$&').replaceAll('*', '[a-zA-Z0-9]+')
  // eslint-disable-next-line no-useless-escape
  const optionalHttpsPrefix = '(http(s)?:\/\/)?'
  // eslint-disable-next-line no-useless-escape
  const optionalSubDomainPrefix = '([a-zA-Z0-9]+\.)?'
  // eslint-disable-next-line no-useless-escape
  const fullRegex = `^${optionalHttpsPrefix}${optionalSubDomainPrefix}${regexifiedException}(\/)?$`

  const exceptionWithOptionalPrefix = new RegExp(fullRegex)
  return exceptionWithOptionalPrefix.test(url)
}

const onVisited = async (historyItem) => {
  const { url } = historyItem

  const isNonTopLevelDomain = nonTopLevelDomainUrlRegex.test(url)

  if (isNonTopLevelDomain) {
    const result = await storage.local.get('exceptions')

    const storedExceptions = result.exceptions || []
    const isException = storedExceptions.some((exception) => matchesException(url, exception))

    if (!isException) {
      await history.deleteUrl({ url })
    }
  }
}

history.onVisited.addListener(onVisited)
