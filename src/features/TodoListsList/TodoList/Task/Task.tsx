import React, {ChangeEvent, useCallback} from "react";
import {useDispatch} from "react-redux";
import {deleteTaskTC, updateTaskTC} from "../../../../state/task-reducer";
import {Checkbox, IconButton} from "@mui/material";
import {Bookmark, BookmarkBorder, Delete} from "@mui/icons-material";
import {EditableTitle} from "../../../../components/EditableTitle/EditableTitle";
import {TaskStatuses, TaskType} from "../../../../api/tasks-api";
import {DispatchType} from "../../TodoListsList";

const label = {inputProps: {'aria-label': 'Checkbox demo'}};

export const Task = React.memo(({todoListId, task, idTask, title, changeTaskStatus}: TaskPropsType) => {
    const dispatch: DispatchType = useDispatch();

    const onRemoveTask = useCallback(() => {
        const thunk = deleteTaskTC(todoListId, idTask);
        dispatch(thunk);
    }, [dispatch, todoListId, idTask]);

    const onChangeCheckbox = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        console.log(newIsDoneValue)
        changeTaskStatus(todoListId, idTask, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New)
    }, [dispatch, todoListId, idTask]);

    const editableTitleTask = useCallback((value: string) => {
        const thunk = updateTaskTC(todoListId, idTask, {title:value});
        dispatch(thunk);
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


// types
type TaskPropsType = {
    todoListId: string
    task: TaskType
    idTask: string
    title: string
    changeTaskStatus: (todoListId: string, idTask: string, status: TaskStatuses) => void
}