import React from 'react'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add'
import PropTypes from 'prop-types'

function AddExceptionInput({
  exceptionInput, setExceptionInput, addException, addExceptionButtonDisabled,
}) {
  return (
    <>
      <TextField
        sx={{ width: '90%' }}
        variant="standard"
        value={exceptionInput}
        onKeyDown={(e) => { if (e.key === 'Enter' && !addExceptionButtonDisabled) { addException(exceptionInput) } }}
        onChange={(v) => setExceptionInput(v.target.value)}
        placeholder="e.x. https://www.example.com/subpath"
      />
      <IconButton onClick={addException} disabled={addExceptionButtonDisabled}>
        <AddIcon />
      </IconButton>
    </>
  )
}

AddExceptionInput.propTypes = {
  exceptionInput: PropTypes.string.isRequired,
  setExceptionInput: PropTypes.func.isRequired,
  addException: PropTypes.func.isRequired,
  addExceptionButtonDisabled: PropTypes.bool.isRequired,
}

export default AddExceptionInput
