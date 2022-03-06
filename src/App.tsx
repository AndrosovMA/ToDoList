import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean,
}
export type TasksType = Array<TaskType>;
export type FilterValueType = "All" | "Active" | "Completed";



function App() {

    let [tasks, setTask] = useState<TasksType>([
        {id: 1, title: 'JS', isDone: true},
        {id: 2, title: 'TS', isDone: false},
        {id: 3, title: 'React', isDone: true},
        {id: 4, title: 'Redux', isDone: false},
    ]);

    let [filter, setFilter] = useState<FilterValueType>('All');

    const removeTask = (id: number) => {
        let taskFilter  = tasks.filter((el)=> el.id !== id)
        setTask(taskFilter);
    }
    const changeFilter = (value:FilterValueType) => {
        setFilter(value);
    }

    let tasksForTodoList = tasks;

    if (filter === 'Active' ) {
        tasksForTodoList  = tasks.filter((el)=> !el.isDone);
    }
    if (filter === 'Completed' ) {
        tasksForTodoList  = tasks.filter((el)=> el.isDone);
    }


    return (
        <div className="App">
            <TodoList tasks={tasksForTodoList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}/>
        </div>
    );
}

export default App;


