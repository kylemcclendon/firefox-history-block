const browser = require("webextension-polyfill")
const {history, storage} = browser

const regex = /(http(s)?:\/\/)?([a-zA-Z0-9]+\.)?[a-zA-Z0-9]+\.[a-zA-Z0-9]{1,5}\/.+/

const onVisited = async (historyItem) => {
  const {url} = historyItem
  const storedExceptions = await storage.local.get('exceptions')

  if (regex.test(url) && !storedExceptions.some((exception) => exception.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').test(url))) {
    history.deleteUrl({url})
  }
}

history.onVisited.addListener(onVisited)
