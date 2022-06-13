import React, {ChangeEvent, useCallback} from "react";
import {useDispatch} from "react-redux";
import {changeStatusTaskAC, deleteTaskTC, editableTitleTaskAC} from "./state/task-reducer";
import {Checkbox, IconButton} from "@mui/material";
import {Bookmark, BookmarkBorder, Delete} from "@mui/icons-material";
import {EditableTitle} from "./EditableTitle";
import {TaskStatuses, TaskType} from "./api/tasks-api";
import {DispatchType} from "./AppWithRedux";


const label = {inputProps: {'aria-label': 'Checkbox demo'}};

type TaskPropsType = {
    todoListId: string
    task: TaskType
    idTask: string
    title: string
}

export const Task = React.memo(({todoListId, task, idTask, title}: TaskPropsType) => {
    const dispatch: DispatchType = useDispatch();

    const onRemoveTask = useCallback(() => {
        const thunk = deleteTaskTC(todoListId, idTask);
        dispatch(thunk);
    }, [dispatch, todoListId, idTask]);

    const onChangeCheckbox = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        // console.log(todoListId, 'Task - ', idTask)
        const action = changeStatusTaskAC(todoListId, idTask, e.currentTarget.checked);
        dispatch(action);
    }, [dispatch, todoListId, idTask]);

    const editableTitleTask = useCallback((value: string) => {
        const action = editableTitleTaskAC(todoListId, idTask, value);
        dispatch(action);
    }, [dispatch, todoListId, idTask]);

    return (
        <li key={idTask}>
            <Checkbox {...label} checked={task.status === TaskStatuses.Completed}
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