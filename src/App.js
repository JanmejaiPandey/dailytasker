import React from 'react';
import { useState, useEffect } from "react"
import { PrimaryButton, TextField, DefaultButton, DetailsList } from "office-ui-fabric-react"
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import './App.css';

function App() {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState("");
    const [description, setDescription] = useState("");
    const [i, setID] = useState();

    useEffect(() => {
        async function fetchData() {
            const response = await fetch("https://dailytaskerapi.herokuapp.com/tasks/");
            const data = await response.json();
            setTasks(data);
        }
        fetchData();
    }, []);
    function postData(n,desc) {
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
    const remove = (id) => {
        fetch("https://dailytaskerapi.herokuapp.com/tasks/" + id, {
            method: 'DELETE'
        }).then(() => {
            console.log('removed');
        }).catch(err => {
            console.error(err)
        });
    }

        const handleDelete = (event) => {
            event.preventDefault();
            remove(i);
        }

    const handleSubmit = (event) => {
        event.preventDefault();
        postData(task,description);
    }

    const refreshPage = () => {
        window.location.reload();
    }
    const _columns = [
        { key: 'column1', name: 'id', fieldName: 'id', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: 'column2', name: 'Task', fieldName: 'task', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: 'column3', name: 'Description', fieldName: 'description', minWidth: 100, maxWidth: 200, isResizable: true }
    ];
    return (
        <Fabric>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Task:"
                    underlined
                    required
                    placeholder="Enter task here"
                    value={task}
                    onChange={e => setTask(e.target.value)}
                />
                <TextField
                    label="Description"
                    underlined
                    placeholder="Enter description here"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                <DefaultButton
                    type="submit"
                    text="Submit"
                />
                <PrimaryButton
                    data-automation-id="test"
                    text="Refresh"
                    onClick={refreshPage}
                    allowDisabledFocus={true}
                />
            </form>
            <form onSubmit={handleDelete}>
                <TextField
                    label="ID:"
                    underlined
                    required
                    placeholder="Enter id here"
                    value={i}
                    onChange={e => setID(e.target.value)}
                />
                <DefaultButton
                    data-automation-id="test"
                    text="Delete"
                    type="submit"
                    onClick={handleDelete}
                    allowDisabledFocus={true}
                />
                <PrimaryButton
                    data-automation-id="test"
                    text="Refresh"
                    onClick={refreshPage}
                    allowDisabledFocus={true}
                />
            </form>
            {/* <table>
                {
                    tasks.map((t) =>
                        (
                            <tr key={t.id}>
                                <td>
                                    {t.task}
                                </td>
                            </tr>
                        )
                    )
                }
            </table> */}
            {/* <div className={exampleChildClass}>{selectionDetails}</div> */}
            {/* <TextField
                //   className={exampleChildClass}
                label="Filter by name:"
                //   onChange={this._onFilter}
                styles={{ root: { maxWidth: '300px' } }}
            /> */}
            {/* <MarqueeSelection selection={this._selection}> */}
            <DetailsList
                items={tasks}
                columns={_columns}
                setKey="set"
                // layoutMode={DetailsListLayoutMode.fixedColumns}
                // selection={this._selection}
                selectionPreservedOnEmptyClick={true}
                ariaLabelForSelectionColumn="Toggle selection"
                ariaLabelForSelectAllCheckbox="Toggle selection for all items"
            //onItemInvoked={this._onItemInvoked}
            />
            {/* </MarqueeSelection> */}
           
        </Fabric>
    );
}

export default App;