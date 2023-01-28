import React from 'react'
import Snackbar from '@mui/material/Snackbar'
import Button from '@mui/material/Button'
import PropTypes from 'prop-types'

const UndoButton = ({ undo }) => (
  <Button color="secondary" size="small" onClick={undo}>
    UNDO
  </Button>
)

UndoButton.propTypes = {
  undo: PropTypes.func.isRequired,
}

function Notifications({
  snackbarOpen, closeSnackBar, snackbarMessage, undo,
}) {
  return (
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={6000}
      onClose={closeSnackBar}
      message={snackbarMessage}
      action={<UndoButton undo={undo} />}
    />
  )
}

Notifications.propTypes = {
  snackbarOpen: PropTypes.bool.isRequired,
  closeSnackBar: PropTypes.func.isRequired,
  snackbarMessage: PropTypes.string.isRequired,
  undo: PropTypes.func.isRequired,
}

export default Notifications
