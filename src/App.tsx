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
export type TasksTypeObject = {
    [idTodoList: string]: TasksType

}

export type FilterValueType = "All" | "Active" | "Completed";
export type TodoListType = {
    id: string,
    task: string,
    filter: FilterValueType
}


function App() {
    const idTodoList_1: string = v1();
    const idTodoList_2: string = v1();

    const [tasks, setTask] = useState<TasksTypeObject>({
        [idTodoList_1]: [
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'TS', isDone: false},
            {id: v1(), title: 'React', isDone: true},
            {id: v1(), title: 'Redux', isDone: false},
        ],
        [idTodoList_2]: [
            {id: v1(), title: 'SocialNetwork', isDone: true},
            {id: v1(), title: 'TodoList', isDone: false},
        ],
    });
    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: idTodoList_1, task: 'What to learn', filter: 'All'},
        {id: idTodoList_2, task: 'My project', filter: 'Active'},
    ])

    const addTask = (tittle: string, id: string) => {
        let newTask = {
            id: v1(),
            title: tittle,
            isDone: false
        }
        tasks[id] = [newTask, ...tasks[id]]
        setTask({...tasks});
    }
    const removeTask = (idList: string, idTask: string) => {
        tasks[idList] = tasks[idList].filter((el) => el.id !== idTask);
        setTask({...tasks});
    }
    const changeFilter = (value: FilterValueType, id: string) => {
        let todoList = todoLists.find((el: TodoListType) => el.id === id);
        if (todoList) {
            todoList.filter = value;
            setTodoLists([...todoLists]);
        }
    }
    const changeStatusTask = (idList: string, id: string, isDone: boolean) => {
        let copyTasks = tasks[idList].find(el => el.id === id)
        if (copyTasks) {
            copyTasks.isDone = isDone;
        }
        setTask({...tasks})
    }
    const deleteTodoList = (id: string) => {
        let todoList = todoLists.filter(el => el.id !== id);
        setTodoLists(todoList);
        delete tasks[id];
        setTask(tasks);
    }

    return (
        <div className="App">
            {
                todoLists.map((el) => {
                    let tasksForTodoList: TasksType = tasks[el.id];
                    if (el.filter === 'Active') {
                        tasksForTodoList = tasks[el.id].filter((el) => !el.isDone);
                    }
                    if (el.filter === 'Completed') {
                        tasksForTodoList = tasks[el.id].filter((el) => el.isDone);
                    }

                    return (
                        <TodoList
                            key={el.id}
                            id={el.id}
                            taskName={el.task}
                            tasks={tasksForTodoList}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeStatusTask={changeStatusTask}
                            filter={el.filter}
                            deleteTodoList={deleteTodoList}
                        />
                    )
                })
            }

        </div>
    );
}

export default App;


