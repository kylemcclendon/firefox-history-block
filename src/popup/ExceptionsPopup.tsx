import React, { useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import TopBar from './TopBar.js'
import AddExceptionInput from './AddExceptionInput.js'
import ExceptionsList from './ExceptionsList.js'
import Notifications from './Notifications.js'
import Settings from './Settings.js'
import { getStorage, saveStorage, removeStorage } from '../storageHandler.js'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

const deps = {
  getStorage,
  removeStorage,
  saveStorage
}

function ExceptionsPopup({ dependencies = deps }) {
  const [currentExceptions, setCurrentExceptions] = useState<string[]>([])
  const [visibleExceptions, setVisibleExceptions] = useState<string[]>(currentExceptions)
  const [filterText, setFilterText] = useState<string>('')
  const [oldExceptions, setOldExceptions] = useState<string[]>(currentExceptions)
  const [addExceptionButtonDisabled, setAddExceptionButtonDisabled] = useState<boolean>(true)
  const [exceptionInput, setExceptionInput] = useState<string>('')
  const [snackbarMessage, setSnackbarMessage] = useState<string>('')
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false)
  const [showSettings, setShowSettings] = useState<boolean>(false)

  const httpPrefix = '(http(s)?:\/\/)?'
  const subdomainPrefix = '([a-zA-Z0-9]{1,10}\.)?'
  const domain = '[a-zA-Z0-9]+'
  const tld = '[a-zA-Z0-9]{1,5}'
  const completeRegex = `${httpPrefix}${subdomainPrefix}${domain}\.${tld}\/.+`
  const regex = new RegExp(completeRegex)

  const updateExceptionVisibility = () => {
    if (filterText === '') {
      setVisibleExceptions(currentExceptions)
    } else {
      const filterMatch = currentExceptions.filter((exception) => exception.includes(filterText))
      setVisibleExceptions(filterMatch)
    }
  }

  const toggleSettings = () => {
    setShowSettings(!showSettings)
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await dependencies.getStorage('exceptions')
      const storedExceptions = result || []
      setCurrentExceptions(storedExceptions)
    }

    fetchData()
  }, [])

  useEffect(() => {
    updateExceptionVisibility()
  }, [filterText])

  useEffect(() => {
    setExceptionInput('')
    updateExceptionVisibility()
  }, [currentExceptions])

  useEffect(() => {
    if (regex.test(exceptionInput) && !currentExceptions.includes(exceptionInput)) {
      setAddExceptionButtonDisabled(false)
    } else if (!addExceptionButtonDisabled) {
      setAddExceptionButtonDisabled(true)
    }
  }, [exceptionInput])

  useEffect(() => {
    if (snackbarMessage !== '') {
      setSnackbarOpen(true)
    }
  }, [snackbarMessage])

  const updateExceptions = (newExceptions: string[]) => {
    setOldExceptions(currentExceptions)
    setCurrentExceptions(newExceptions)
  }

  const clearExceptions = async () => {
    await dependencies.removeStorage('exceptions')
    setSnackbarMessage('Cleared All Stored Exceptions')
    setFilterText('')
    updateExceptions([])
  }

  const removeException = async (exceptionToRemove: string) => {
    const newExceptions = [...currentExceptions].filter((exception) => exception !== exceptionToRemove)
    await dependencies.saveStorage('exceptions', newExceptions)
    setSnackbarMessage(`${exceptionToRemove} Removed From Exceptions`)
    updateExceptions(newExceptions)
  }

  const addException = async () => {
    const newExceptions = [...currentExceptions, exceptionInput].sort()
    await dependencies.saveStorage('exceptions', newExceptions)
    setSnackbarMessage(`${exceptionInput} Added To Exceptions`)
    updateExceptions(newExceptions)
  }

  const closeSnackBar = () => {
    setSnackbarOpen(false)
    setSnackbarMessage('')
  }

  const undo = async () => {
    closeSnackBar()
    await dependencies.saveStorage('exceptions', oldExceptions)
    updateExceptions(oldExceptions)
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box>
        <Paper sx={{ width: '400px', maxHeight: '1000px' }} elevation={0}>
          <TopBar toggleSettings={toggleSettings} />
          <Box>
            <Drawer
              sx={{ position: 'absolute' }}
              anchor="right"
              open={showSettings}
              onClose={toggleSettings}
            >
              <Paper elevation={10}>
                <Settings setShowSettings={setShowSettings}/>
              </Paper>
            </Drawer>
            <div style={{ marginLeft: '5px' }}>
              <AddExceptionInput
                exceptionInput={exceptionInput}
                setExceptionInput={setExceptionInput}
                addException={addException}
                addExceptionButtonDisabled={addExceptionButtonDisabled}
              />
              <ExceptionsList
                numExceptions={currentExceptions.length}
                filterText={filterText}
                setFilterText={setFilterText}
                visibleExceptions={visibleExceptions}
                removeException={removeException}
                clearExceptions={clearExceptions}
              />
            </div>
            <Notifications
              snackbarOpen={snackbarOpen}
              closeSnackBar={closeSnackBar}
              snackbarMessage={snackbarMessage}
              undo={undo}
            />
          </Box>
        </Paper>
      </Box>
    </ThemeProvider>
  )
}

function renderPopup() {
  const domContainer = document.querySelector('#exceptions-popup')
  if (!domContainer) throw new Error("Can't find Popup element");
  const root = createRoot(domContainer)
  root.render(<ExceptionsPopup />)
}

renderPopup()
// export {ExceptionsPopup}