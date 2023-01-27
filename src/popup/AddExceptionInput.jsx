import React from 'react'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add'

const AddExceptionInput = ({exceptionInput, setExceptionInput, addException, addExceptionButtonDisabled}) => (
  <React.Fragment>
    <TextField style={{width:'90%'}} variant="standard" value={exceptionInput} onChange={(v) => setExceptionInput(v.target.value)} placeholder="e.x. https://www.example.com/subpath"/>
    <IconButton onClick={addException} disabled={addExceptionButtonDisabled}>
      <AddIcon/>
    </IconButton>
  </React.Fragment>
)

export default AddExceptionInput
