const browser = require("webextension-polyfill")
const {history, storage} = browser

const regex = /^(http(s)?:\/\/)?([a-zA-Z0-9]+\.)?[a-zA-Z0-9]+\.[a-zA-Z0-9]{1,5}\/.+$/

const matchesException = (url, exception) => {
  const regexifiedException = exception.replace(/[|\\{}()[\]^$+*?.[/]]/g, '\\$&')
  const optionalHttpsPrefix = '(http(s)?:\/\/)?'
  const optionalSubDomainPrefix = '([a-zA-Z0-9]+\.)?'
  const fullRegex = `^${optionalHttpsPrefix}${optionalSubDomainPrefix}${exception}(\/)?$`

  const exceptionWithOptionalPrefix = new RegExp(fullRegex)
  return exceptionWithOptionalPrefix.test(url)
}

const onVisited = async (historyItem) => {
  const result = await storage.local.get('exceptions')

  const {url} = historyItem
  const storedExceptions = result.exceptions || []
  const isException = storedExceptions.some((exception) => matchesException(url, exception))

  if (regex.test(url) && !isException) {
    history.deleteUrl({url})
  }
}

history.onVisited.addListener(onVisited)
