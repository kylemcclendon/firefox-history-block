import React from 'react'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Typography from '@mui/material/Typography'
import Toolbar from '@mui/material/Toolbar'
import SettingsIcon from '@mui/icons-material/Settings'
import IconButton from '@mui/material/IconButton'
import PropTypes from 'prop-types'

// @ts-expect-error TODO
function TopBar({ toggleSettings }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1, display: 'block',
            }}
          >
            History Block
          </Typography>
          <IconButton onClick={toggleSettings}>
            <SettingsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

TopBar.propTypes = {
  toggleSettings: PropTypes.func.isRequired,
}

export default TopBar
