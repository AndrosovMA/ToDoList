import React from 'react';
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


function App() {
    const dispatch = useDispatch();
    const todoLists = useSelector<AppStateType, Array<TodoListType>>((state) => state.toDoListReducer);

    const addTodoList = (title: string) => {
        const action = addTodoListAC(title);
        dispatch(action);
    }
    const deleteTodoList = (id: string) => {
        const action = deleteTodoListAC(id);
        dispatch(action);
    }
    const changeFilter = (value: FilterValueType, id: string) => {
        const action = changeFilterAC(id, value);
        dispatch(action);
    }
    const editableTitleHeaderHandler = (idTodoList: string, value: string) => {
        const action = editTitleTodoListAC(idTodoList, value);
        dispatch(action);
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
                <Grid container style={{padding: "10px 20px 20px 0"}} key={v1()}>
                    {/**Form for add new to do list*/}
                    <div>
                        <div><h3>Create new to do list</h3></div>
                        <AddItemForm addItem={addTodoList}/>
                    </div>
                </Grid>
                <Grid container spacing={3} key={v1()}>
                    {/**render todoLists*/}
                    {
                        todoLists.map((el) => {

                            return (
                                <Grid item key={v1()}>
                                    <Paper elevation={3} style={{padding: "20px"}}>
                                        <TodoList
                                            key={v1()}
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

export default App;



