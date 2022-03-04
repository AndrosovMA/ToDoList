import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean,
}
export type TasksType = Array<TaskType>;


function App() {

    let [tasks, setTask] = useState([
        {id: 1, title: 'JS', isDone: true},
        {id: 2, title: 'TS', isDone: false},
        {id: 3, title: 'React', isDone: true},
        {id: 4, title: 'Redax', isDone: false},
    ]);

    const removeTask = (id: number) => {
        let taskFilter  = tasks.filter((el)=>{
            return el.id !== id
        })
        setTask(taskFilter);
    }

    return (
        <div className="App">
            <TodoList tasks={tasks} removeTask={removeTask}/>
        </div>
    );
}

export default App;


