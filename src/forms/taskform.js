import React from "react"
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useState } from "react"
import Fab from '@material-ui/core/Fab';
import RefreshIcon from '@material-ui/icons/Refresh';
import { makeStyles } from '@material-ui/core/styles';


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
        marginLeft: theme.spacing(5),
        marginRight: theme.spacing(0),
      },
}));

export default function TaskForm() {

    const [task, setTask] = useState("");
    const [description, setDescription] = useState("");
    const classes = useStyles();

    const handleSubmit = (event) => {
        event.preventDefault();
        postData(task, description);
    }
    
    const refreshPage = () => {
        window.location.reload();
    }

    return (
        <form onSubmit={handleSubmit}>
            <Typography variant="h5" id="modal-title" className={classes.textField}>
                Add New Task
          </Typography>

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
                multiline
                label="Description"
                placeholder="Description"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                value={description}
                onChange={e => setDescription(e.target.value)}
            />
            <br />
            <Button variant="contained" color="primary" style={{ background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'}}type="submit" className={classes.textField} >Add</Button>
            <br />

            <Typography className={classes.textField}> Please Refresh Page after
                adding new task
                        <br />
                <Fab
                    style={{ backgroundColor: '#ffffff', color: "#FF8C00" }}
                    onClick={refreshPage}
                    size="small"
                    aria-label="refresh"
                    className={classes.fab}
                >
                    <RefreshIcon size="small" />
                </Fab>
            </Typography>
        </form>
    );
}