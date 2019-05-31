import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import RefreshIcon from '@material-ui/icons/Refresh';
import Modal from '@material-ui/core/Modal';
import TaskForm from "../forms/taskform"

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
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
        marginRight: theme.spacing(1),
      },
}));

function FloatingActionButtons() {

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [modalStyle] = React.useState(getModalStyle);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };   
    const refreshPage = () => {
        window.location.reload();
    }

    return (
        <div>
            <Fab 
            style = {{backgroundColor:'#ffffff',color:"#FF0000"}}             
            onClick={handleOpen} 
            size="medium" 
            aria-label="Add" 
            className={classes.fab}
            >
                <AddIcon  />
            </Fab>
            <Fab 
            style = {{backgroundColor:'#ffffff',color:"#FF8C00"}}
            onClick={refreshPage} 
            size="medium" 
            aria-label="Add" 
            className={classes.fab}
            >
                <RefreshIcon />
            </Fab>
            <div>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={open}
                    onClose={handleClose}
                >
                    
                <div style={modalStyle} className={classes.paper}>
                   <TaskForm />
                </div> 
                </Modal>
            </div>
        </div>
    );
}

export default FloatingActionButtons;