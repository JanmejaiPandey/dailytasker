import React from 'react';
import { useState, useEffect } from "react"
import { PrimaryButton, TextField, DefaultButton, DetailsList } from "office-ui-fabric-react"
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import './App.css';

function App() {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState("");

    useEffect(() => {
        async function fetchData() {
            const response = await fetch("https://dailytaskerapi.herokuapp.com/tasks/");
            const data = await response.json();
            setTasks(data);
        }
        fetchData();
    }, []);
    function postData(n) {
        var url = 'https://dailytaskerapi.herokuapp.com/tasks/';
        var data = { task: n, description: "default" };

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

    const handleSubmit = (event) => {
        event.preventDefault();
        postData(task);
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
        <fabric>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Task:"
                    underlined
                    required
                    placeholder="Enter task here"
                    value={task}
                    onChange={e => setTask(e.target.value)}
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
        </fabric>
    );
}

export default App;
