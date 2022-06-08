import React, {ChangeEvent, useCallback} from "react";
import {useDispatch} from "react-redux";
import {changeStatusTaskAC, editableTitleTaskAC, removeTaskAC} from "./state/task-reducer";
import {Checkbox, IconButton} from "@mui/material";
import {Bookmark, BookmarkBorder, Delete} from "@mui/icons-material";
import {EditableTitle} from "./EditableTitle";

const label = {inputProps: {'aria-label': 'Checkbox demo'}};

type TaskType = {
    idTodoList: string
    idTask: string
    isDone: boolean
    title: string
}
export const Task = React.memo(({idTodoList, idTask, isDone, title}: TaskType) => {
    console.log('Task called')

    const dispatch = useDispatch();
    const onRemoveTask = useCallback(() => {
        const action = removeTaskAC(idTodoList, idTask);
        dispatch(action);
    }, [dispatch, idTodoList, idTask]);
    const onChangeCheckbox = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const action = changeStatusTaskAC(idTodoList, idTask, e.currentTarget.checked);
        dispatch(action);
    }, [dispatch, idTodoList, idTask]);
    const editableTitleTask = useCallback((value: string) => {
        const action = editableTitleTaskAC(idTodoList, idTask, value);
        dispatch(action);
    }, [dispatch, idTodoList, idTask]);

    return (
        <li key={idTask}>
            <Checkbox {...label} checked={isDone}
                      onChange={onChangeCheckbox}
                      icon={<BookmarkBorder/>}
                      checkedIcon={<Bookmark/>}/>

            <EditableTitle title={title}
                           editableTitleValue={editableTitleTask}/>

            <IconButton aria-label="delete" onClick={onRemoveTask}>
                <Delete/>
            </IconButton>
        </li>)
})