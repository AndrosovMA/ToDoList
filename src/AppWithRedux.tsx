import React, {useCallback, useEffect} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from '@mui/icons-material';
import {
    addTodoListAC, changeFilterAC, deleteTodoListAC,
    editTitleTodoListAC, fetchTodoListTC, FilterValuesType
} from "./state/toDoList-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "./state/store";
import {TodoListType} from "./api/todolist-api";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import {TaskType} from "./api/tasks-api";


export type DispatchType  = ThunkDispatch<AppStateType, unknown, AnyAction>
export type TodolistDomainType = TodoListType & {
    filter: FilterValuesType
}

export type TasksType = Array<TaskType>;
export type TasksTypeObject = {
    [idTodoList: string]: TasksType
}



function AppWithRedux() {
    const dispatch:DispatchType = useDispatch();

    const todoLists = useSelector<AppStateType, Array<TodolistDomainType>>((state) => state.toDoListReducer);
    const tasks = useSelector<AppStateType, TasksTypeObject>((state) => state.taskReducer)

    useEffect(() => {
        dispatch(fetchTodoListTC())
    },[dispatch])

    const addTodoList = useCallback((title: string) => {
        const action = addTodoListAC(title);
        dispatch(action);
    }, [dispatch]);
    const deleteTodoList = useCallback((id: string) => {
        const action = deleteTodoListAC(id);
        dispatch(action);
    }, [dispatch]);
    const changeFilter = useCallback((value: FilterValuesType, id: string) => {
        const action = changeFilterAC(id, value);
        dispatch(action);
    }, [dispatch])
    const editableTitleHeaderHandler = useCallback((idTodoList: string, value: string) => {
        const action = editTitleTodoListAC(idTodoList, value);
        dispatch(action);
    }, [dispatch]);

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
                {/**Form for add new to do list*/}
                <Grid container style={{padding: "10px 20px 20px 0"}}>

                    <div>
                        <div><h3>Create new to do list</h3></div>
                        <AddItemForm addItem={addTodoList} labelName='todolist'/>
                    </div>
                </Grid>
                {/**render todoLists*/}
                <Grid container spacing={3}>

                    {
                        todoLists.map((el) => {
                            let allTodolistTasks = tasks[el.id];

                            return (
                                <Grid item key={el.id}>
                                    <Paper elevation={3} style={{padding: "20px"}}>
                                        <TodoList
                                            todoListId={el.id}
                                            taskName={el.title}
                                            tasks={allTodolistTasks}
                                            changeFilter={changeFilter}
                                            filter={el.filter}
                                            deleteTodoList={deleteTodoList}
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

export default AppWithRedux;



