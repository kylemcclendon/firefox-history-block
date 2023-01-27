import React from 'react'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Typography from '@mui/material/Typography'

const TopBar = () => (
  <Box sx={{flexGrow: 1}}>
    <AppBar position="static">
      <Typography variant="h6" component="div" sx={{ flexGrow: 1, marginLeft: '10px', marginTop:'5px', display: 'block' }}>
        History Block
      </Typography>
    </AppBar>
  </Box>
)

export default TopBar
