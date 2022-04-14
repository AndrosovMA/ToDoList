import React, {useReducer, useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from '@mui/icons-material';

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
    const changeStatusTask = (idList: string, id: string, isDone: boolean) => {
        let copyTasks = tasks[idList].find(el => el.id === id)
        if (copyTasks) {
            copyTasks.isDone = isDone;
        }
        setTask({...tasks})
    }
    const editableTitleTaskHandler = (idTodoList: string, idTask: string, value: string) => {
        return tasks[idTodoList].filter((el) => {
            if (el.id === idTask) {
                el.title = value
                setTask({...tasks});
            }
        })
    }

    const addTodoList = (title: string) => {
        let todoList: TodoListType = {
            id: v1(),
            task: title,
            filter: 'All'
        };
        setTodoLists([todoList, ...todoLists]);
        setTask({[todoList.id]: [], ...tasks})
    }
    const deleteTodoList = (id: string) => {
        let todoList = todoLists.filter(el => el.id !== id);
        setTodoLists(todoList);
        delete tasks[id];
        setTask(tasks);
    }
    const changeFilter = (value: FilterValueType, id: string) => {
        let todoList = todoLists.find((el: TodoListType) => el.id === id);
        if (todoList) {
            todoList.filter = value;
            setTodoLists([...todoLists]);
        }
    }
    const editableTitleHeaderHandler = (idTodoList: string, value: string) => {
        return todoLists.filter((el) => {
            if (el.id === idTodoList) {
                el.task = value;
                setTodoLists([...todoLists])
            }
        })
    }

    return (
        <div className="App">
            {/**Header App bar with burger menu*/}
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Planning learning
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>

            <Container maxWidth="xl">
                <Grid container style={{padding: "10px 20px 20px 0"}}>
                    {/**Form for add new to do list*/}
                    <div>
                        <div><h3>Create new to do list</h3></div>
                        <AddItemForm addItem={addTodoList}/>
                    </div>
                </Grid>
                <Grid container spacing={3}>
                    {/**render todoList*/}
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
                                <Grid item>
                                    <Paper elevation={3} style={{padding: "20px"}}>
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
                                            editableTitleTaskHandler={editableTitleTaskHandler}
                                            editableTitleHeaderHandler={editableTitleHeaderHandler}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>

        </div>
    );
}

export default App;



