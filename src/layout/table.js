import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import { useState, useEffect } from "react"
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    },
    fab: {
        margin: theme.spacing(1),
    },
    table: {
        minWidth: 650,
    },
}));

function SimpleTable() {

    const classes = useStyles();
    const [tasks, setTasks] = useState([]);
    const remove = (id) => {
        fetch("https://dailytaskerapi.herokuapp.com/tasks/" + id, {
            method: 'DELETE'
        }).then(() => {
           window.location.reload();
        }).catch(err => {
            console.error(err)
        });
    }
    const handleDelete = (e) => {
        console.log(e.currentTarget.dataset.id);
        remove(e.currentTarget.dataset.id);
    }
    useEffect(() => {
        async function fetchData() {
            const response = await fetch("https://dailytaskerapi.herokuapp.com/tasks/");
            const data = await response.json();
            setTasks(data);
        }
        fetchData();
    }, []);
    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>Task</TableCell>
                        <TableCell align="center">Description</TableCell>
                        <TableCell align="center">DeleteTask</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tasks.map((t) => (
                        <TableRow key={t.id}>
                            <TableCell component="th" scope="row">
                                {t.task}
                            </TableCell>
                            <TableCell 
                            align="center"
                            style={{
                            whiteSpace:"normal",
                            wordWrap:"break-word"
                                 }}
                            >
                            {t.description}
                            </TableCell>
                            <TableCell align="center">
                                <Fab 
                                aria-label="Delete" 
                                data-id={t.id} 
                                onClick={handleDelete} 
                                style = {{backgroundColor:'#ffffff',color:"#FF8C00"}}
                                size="small" 
                                className={classes.fab}>
                                    <DeleteIcon  />
                                </Fab>
                            </TableCell>
                        </TableRow>
                    )
                    )}
                </TableBody>
            </Table>
        </Paper>
    );
}

export default SimpleTable;

