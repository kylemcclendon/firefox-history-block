import React, { useState, useEffect } from 'react'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Toolbar from '@mui/material/Toolbar'
import { getStorage, saveStorage, updateSyncStorage } from '../storageHandler'

function Settings({setShowSettings}) {
  const [extensionEnabled, setExtensionEnabled] = useState(true)
  const [syncStorageEnabled, setSyncStorageEnabled] = useState(false)

  const toggleExtensionEnabled = async () => {
    const currentSetting = extensionEnabled
    setExtensionEnabled(!currentSetting)
    await saveStorage('extensionEnabled', !currentSetting)
  }

  const toggleSyncStorageEnabled = async () => {
    const currentSetting = syncStorageEnabled
    setSyncStorageEnabled(!currentSetting)
    await saveStorage('syncStorageEnabled', !currentSetting)
  }

  useEffect(() => {
    const getData = async () => {
      const isExtensionEnabled = await getStorage('extensionEnabled')
      const isSyncStorageEnabled = await getStorage('syncStorageEnabled')

      setExtensionEnabled(isExtensionEnabled || false)
      setSyncStorageEnabled(isSyncStorageEnabled || false)
    }

    getData()
  }, [])

  return (
    <div style={{ padding: '10px' }}>
      <Toolbar>
        <Typography
          use="h6"
          component="div"
          sx={{
            flexGrow: 1, display: 'block',
          }}>
          Settings
        </Typography>
        <IconButton size="small" onClick={() => { setShowSettings(false) }}><CloseIcon /></IconButton>
      </Toolbar>
      <Divider />
      <div>
        <FormControlLabel control={<Switch checked={extensionEnabled} onClick={toggleExtensionEnabled} />} label={`Extension ${extensionEnabled ? 'Enabled' : 'Disabled'}`} labelPlacement="end" />
        <FormControlLabel control={<Switch checked={syncStorageEnabled} onClick={toggleSyncStorageEnabled} />} label={`Sync Storage ${syncStorageEnabled ? 'Enabled' : 'Disabled'}`} labelPlacement="end" />
        <Divider />
        <Button disabled={!syncStorageEnabled} onClick={updateSyncStorage}>Update Sync Storage</Button>
      </div>
    </div>
  )
}

export default Settings
