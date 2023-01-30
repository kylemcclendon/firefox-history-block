/* eslint-disable no-useless-escape */
import browser from 'webextension-polyfill'
import React, { useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Paper from '@mui/material/Paper'

import TopBar from './TopBar'
import AddExceptionInput from './AddExceptionInput'
import ExceptionsList from './ExceptionsList'
import Notifications from './Notifications'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

const { storage } = browser
const e = React.createElement

function ExceptionsPopup() {
  const [currentExceptions, setCurrentExceptions] = useState([])
  const [visibleExceptions, setVisibleExceptions] = useState(currentExceptions)
  const [filterText, setFilterText] = useState('')
  const [oldExceptions, setOldExceptions] = useState(currentExceptions)
  const [addExceptionButtonDisabled, setAddExceptionButtonDisabled] = useState(true)
  const [exceptionInput, setExceptionInput] = useState('')
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarOpen, setSnackbarOpen] = useState(false)

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

  useEffect(() => {
    const fetchData = async () => {
      const result = await storage.local.get('exceptions')
      const storedExceptions = result.exceptions || []
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
    } else if (addExceptionButtonDisabled === false) {
      setAddExceptionButtonDisabled(true)
    }
  }, [exceptionInput])

  useEffect(() => {
    if (snackbarMessage !== '') {
      setSnackbarOpen(true)
    }
  }, [snackbarMessage])

  const updateExceptions = (newExceptions) => {
    setOldExceptions(currentExceptions)
    setCurrentExceptions(newExceptions)
  }

  const clearExceptions = async () => {
    await storage.local.remove('exceptions')
    setSnackbarMessage('Cleared All Stored Exceptions')
    setFilterText('')
    updateExceptions([])
  }

  const removeException = async (exceptionToRemove) => {
    const newExceptions = [...currentExceptions].filter((exception) => exception !== exceptionToRemove)
    await storage.local.set({ exceptions: newExceptions })
    setSnackbarMessage(`${exceptionToRemove} Removed From Exceptions`)
    updateExceptions(newExceptions)
  }

  const addException = async () => {
    const newExceptions = [...currentExceptions, exceptionInput].sort()
    await storage.local.set({ exceptions: newExceptions })
    setSnackbarMessage(`${exceptionInput} Added To Exceptions`)
    updateExceptions(newExceptions)
  }

  const closeSnackBar = () => {
    setSnackbarOpen(false)
    setSnackbarMessage('')
  }

  const undo = async () => {
    closeSnackBar()
    await storage.local.set({ exceptions: oldExceptions })
    updateExceptions(oldExceptions)
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Paper sx={{ width: '400px', maxHeight: '1000px' }}>
        <TopBar />
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
      </Paper>
    </ThemeProvider>
  )
}

// eslint-disable-next-line no-undef
const domContainer = document.querySelector('#exceptions-popup')
const root = createRoot(domContainer)
root.render(e(ExceptionsPopup))
