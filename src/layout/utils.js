import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import RefreshIcon from '@material-ui/icons/Refresh';
import { useState, useEffect } from "react"
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import NavigationIcon from '@material-ui/icons/Navigation';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
function postData(n, desc) {
  var url = 'https://dailytaskerapi.herokuapp.com/tasks/';
  var data = { task: n, description: desc };

  fetch(url, {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
    .then(response => console.log('Success:', JSON.stringify(response)))
    .catch(error => console.error('Error:', error));

}




const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: 'none',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

function FloatingActionButtons() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    postData(task, description);
  }
  const refreshPage = () => {
    window.location.reload();
  }


  return (
    <div>
      <Fab color="secondary" size="medium" aria-label="Add" className={classes.fab}>
        <AddIcon onClick={handleOpen} />
      </Fab>
      <Fab color="primary" size="medium" aria-label="Add" className={classes.fab}>
        <RefreshIcon onClick={refreshPage} />
      </Fab>
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={handleClose}
        >
          <div style={modalStyle} className={classes.paper}>
            <Typography variant="h6" id="modal-title">
              Add New Task
          </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                id="outlined-with-placeholder"
                label="Task"
                placeholder="Task"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                value={task}
                onChange={e => setTask(e.target.value)}
              />
              <TextField
                id="outlined-with-placeholder"
                label="Description"
                placeholder="Description"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
              <br />
              <Button variant="contained" color="primary" type="submit" >Add</Button>
            </form>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default FloatingActionButtons;