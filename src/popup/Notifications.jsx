import React from 'react'
import Snackbar from '@mui/material/Snackbar'
import Button from '@mui/material/Button'

const UndoButton = ({undo}) => (
  <Button color="secondary" size="small" onClick={undo}>
    UNDO
  </Button>
)

const Notifications = ({snackbarOpen, closeSnackBar, snackbarMessage, undo}) => (
  <Snackbar
    open={snackbarOpen}
    autoHideDuration={6000}
    onClose={closeSnackBar}
    message={snackbarMessage}
    action={<UndoButton undo={undo}/>}
  />
)

export default Notifications
