import React, { useState, useEffect } from 'react'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import { getStorage, saveStorage, updateSyncStorage } from '../storageHandler'

function Settings() {
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

      setExtensionEnabled(isExtensionEnabled)
      setSyncStorageEnabled(isSyncStorageEnabled)
    }

    getData()
  }, [])

  return (
    <div>
      <Typography use="h6">Settings</Typography>
      <Divider />
      <FormControlLabel control={<Switch checked={extensionEnabled} onClick={toggleExtensionEnabled} />} label="Extension Enabled?" labelPlacement="end" />
      <FormControlLabel control={<Switch checked={syncStorageEnabled} onClick={toggleSyncStorageEnabled} />} label="Sync Storage Enabled?" labelPlacement="end" />
      <Divider />
      <Button disabled={!syncStorageEnabled} onClick={updateSyncStorage}>Update Sync Storage</Button>
    </div>
  )
}

export default Settings
