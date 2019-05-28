import React from 'react';
import { useState, useEffect } from "react"
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
    return (
        <div>
            {
                tasks.map((t) =>
                    (
                        <div key={t.id}>
                            {t.task}
                        </div>
                    )
                )
            }
            <form onSubmit={handleSubmit}>
                <label>
                    Task:
        <input
                        type="text"
                        value={task}
                        onChange={e => setTask(e.target.value)}
                    />
                </label>
                <input type="submit" value="Submit" />
            </form>
            <button onClick={refreshPage}>Refresh</button>
        </div>
    );
}

export default App;
