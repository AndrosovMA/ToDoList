import React, {useCallback} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from '@mui/icons-material';
import {addTodoListAC, changeFilterAC, deleteTodoListAC, editTitleTodoListAC} from "./state/toDoList-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "./state/store";

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

function AppWithRedux() {

    const dispatch = useDispatch();
    const todoLists = useSelector<AppStateType, Array<TodoListType>>((state) => state.toDoListReducer);

    const addTodoList = useCallback((title: string) => {
        const action = addTodoListAC(title);
        dispatch(action);
    }, [dispatch]);
    const deleteTodoList = useCallback((id: string) => {
        const action = deleteTodoListAC(id);
        dispatch(action);
    }, [dispatch]);
    const changeFilter = useCallback((value: FilterValueType, id: string) => {
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
                <Grid container style={{padding: "10px 20px 20px 0"}} key={v1()}>

                    <div>
                        <div><h3>Create new to do list</h3></div>
                        <AddItemForm addItem={addTodoList}/>
                    </div>
                </Grid>

                {/**render todoLists*/}
                <Grid container spacing={3} key={v1()}>

                    {
                        todoLists.map((el) => {

                            return (
                                <Grid item key={el.id}>
                                    <Paper elevation={3} style={{padding: "20px"}}>
                                        <TodoList
                                            id={el.id}
                                            taskName={el.task}
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



