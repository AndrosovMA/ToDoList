import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}
export type TasksType = Array<TaskType>;
export type FilterValueType = "All" | "Active" | "Completed";


function App() {

    const [tasks, setTask] = useState<TasksType>([
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'TS', isDone: false},
        {id: v1(), title: 'React', isDone: true},
        {id: v1(), title: 'Redux', isDone: false},
    ]);
    const [filter, setFilter] = useState<FilterValueType>('All');

    const addTask = (tittle: string) => {
        let newTask = {
            id: v1(),
            title: tittle,
            isDone: false
        }
        let newTasks = [newTask, ...tasks];
        setTask(newTasks);
    }
    const removeTask = (id: string) => {
        let taskFilter = tasks.filter((el) => el.id !== id)
        setTask(taskFilter);
    }
    const changeFilter = (value: FilterValueType) => {
        setFilter(value);
    }

    let tasksForTodoList = tasks;
    if (filter === 'Active') {
        tasksForTodoList = tasks.filter((el) => !el.isDone);
    }
    if (filter === 'Completed') {
        tasksForTodoList = tasks.filter((el) => el.isDone);
    }

    return (
        <div className="App">
            <TodoList tasks={tasksForTodoList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
            />
        </div>
    );
}

export default App;


