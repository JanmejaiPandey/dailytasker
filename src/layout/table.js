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
            console.log('removed');
        }).catch(err => {
            console.error(err)
        });
    }
    const handleDelete = (e) => {
        console.log(e.target.dataset.id);
        remove(e.target.dataset.id);
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
                        <TableCell align="middle">Description</TableCell>
                        <TableCell>DeleteTask</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tasks.map((t) => (
                        <TableRow key={t.id}>
                            <TableCell component="th" scope="row">
                                {t.task}
                            </TableCell>
                            <TableCell align="middle">{t.description}</TableCell>
                            <TableCell>
                                <Fab aria-label="Delete" color="primary" size="small" className={classes.fab}>
                                    <DeleteIcon data-id={t.id} onClick={handleDelete} />
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

