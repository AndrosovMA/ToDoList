import {ThunkDispatch} from "redux-thunk";
import {AppStateType} from "../../state/store";
import {AnyAction} from "redux";
import {TaskType} from "../../api/tasks-api";
import {useDispatch, useSelector} from "react-redux";
import React, {useCallback, useEffect} from "react";
import {
    changeFilterAC,
    changeTittleTodoListTC,
    createTodoListTC,
    deleteTodoListTC,
    fetchTodoListTC,
    FilterValuesType
} from "../../state/toDoList-reducer";
import {Grid, Paper} from "@mui/material";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {TodoList} from "./TodoList/TodoList";
import {TodoListType} from "../../api/todolist-api";
import {RequestStatusType} from "../../state/app-reducer";

export const TodoListsList = () => {
    const dispatch: DispatchType = useDispatch();

    const todoLists = useSelector<AppStateType, Array<TodolistDomainType>>((state) => state.toDoListReducer);

    const tasks = useSelector<AppStateType, TasksTypeObject>((state) => state.taskReducer);

    useEffect(() => {
        dispatch(fetchTodoListTC())
    }, [dispatch]);

    const addTodoList = useCallback((title: string) => {
        dispatch(createTodoListTC(title));
    }, [dispatch]);

    const deleteTodoList = useCallback((id: string) => {
        const thunk = deleteTodoListTC(id)
        dispatch(thunk)
    }, [dispatch]);

    const changeFilter = useCallback((value: FilterValuesType, id: string) => {
        const action = changeFilterAC(id, value);
        dispatch(action);
    }, [dispatch])

    const changeTitleTodolist = useCallback((idTodoList: string, newTitle: string) => {
        dispatch(changeTittleTodoListTC(idTodoList, newTitle));
    }, [dispatch]);

    return (
        <>
            {/*Form for add new to do list*/}
            <Grid container style={{padding: "10px 20px 20px 0"}}>

                <div>
                    <div><h3>Create new to do list</h3></div>
                    <AddItemForm addItem={addTodoList} labelName='todolist'/>
                </div>
            </Grid>

            {/*render todoLists*/}
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
                                        status={el.entityStatus}
                                        deleteTodoList={deleteTodoList}
                                        changeTitleTodolist={changeTitleTodolist}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </>
    )
}

// types
export type DispatchType = ThunkDispatch<AppStateType, unknown, AnyAction>
export type TodolistDomainType = TodoListType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
export type TasksType = Array<TaskType>;
export type TasksTypeObject = {
    [idTodoList: string]: TasksType
}
