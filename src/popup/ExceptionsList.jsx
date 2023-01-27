import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import React from 'react'

const ExceptionsList = ({numExceptions, filterText, setFilterText, visibleExceptions, removeException, clearExceptions}) => (
  <Card>
    <CardContent>
      <Stack direction="row" spacing={1}>
        <Typography variant="h6" component="h6">
          Exceptions
        </Typography>
        <Typography variant="overline" component="h6">
          (Total:{numExceptions})
        </Typography>
        {numExceptions > 0 && <TextField size="small" variant="outlined" margin="dense" value={filterText} onChange={(v) => setFilterText(v.target.value)} placeholder="Filter Exceptions"/>}
      </Stack>
      <List sx={{maxHeight:'200px', overflow: 'scroll'}}>
        {
          visibleExceptions.map((exception) => (
            <ListItem secondaryAction={
              <IconButton onClick={() => removeException(exception)}>
                <DeleteIcon/>
              </IconButton>
            }>
              <ListItemText sx={{maxWidth:'90%',overflow:'scroll'}} primary={exception}/>
            </ListItem>
          ))
        }
      </List>
    </CardContent>
    <CardActions>
      <Button variant="outlined" onClick={clearExceptions}>
        Clear All Exceptions
      </Button>
    </CardActions>
  </Card>
)

export default ExceptionsList
