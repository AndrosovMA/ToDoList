import React, {ChangeEvent} from "react";
import {FilterValueType, TasksType} from "./AppWithRedux";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {EditableTitle} from "./EditableTitle";

/** Material UI*/
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete, BookmarkBorder, Bookmark, DeleteForever} from '@mui/icons-material';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "./state/store";
import {addTaskAC, changeStatusTaskAC, editableTitleTaskAC, removeTaskAC} from "./state/task-reducer";
import {TasksTypeObject} from "./AppWithRedux";
const label = {inputProps: {'aria-label': 'Checkbox demo'}};

type Props = {
    id: string
    taskName: string
    changeFilter: (value: FilterValueType, id: string) => void
    filter: FilterValueType
    deleteTodoList: (id: string) => void
    editableTitleHeaderHandler: (idTodoList: string, value: string) => void
}

export function TodoList(props: Props) {
    const dispatch = useDispatch();
    const tasks = useSelector<AppStateType, TasksTypeObject>((state) => state.taskReducer)

    const allClickHandler = () => {
        props.changeFilter('All', props.id)
    };
    const activeClickHandler = () => {
        props.changeFilter('Active', props.id)
    };
    const completedClickHandler = () => {
        props.changeFilter('Completed', props.id)
    };
    const handlerDeleteTodoList = () => {
        props.deleteTodoList(props.id)
    }
    const addTask = (title: string) => {
        const action = addTaskAC(props.id, title)
        dispatch(action);
    }
    const editableTitleHeader = (value: string) => {
        props.editableTitleHeaderHandler(props.id, value);
    }


    let tasksForTodoList: TasksType = tasks[props.id];
    if (props.filter === 'Active') {
        tasksForTodoList = tasks[props.id].filter((el) => !el.isDone);
    }
    if (props.filter === 'Completed') {
        tasksForTodoList = tasks[props.id].filter((el) => el.isDone);
    }

    return (
        <div>
            {/**Title to do list*/}
            <h3>
                <EditableTitle title={props.taskName}
                               editableTitleValue={editableTitleHeader}
                />
                <IconButton aria-label="delete" onClick={handlerDeleteTodoList} color="primary">
                    <DeleteForever/>
                </IconButton>
            </h3>

            {/**Add new task*/}
            <AddItemForm addItem={addTask}/>

            {/**All tasks*/}
            <ul>
                {
                    tasksForTodoList.map((el) => {
                        const onRemoveTask = () => {
                            const action = removeTaskAC(props.id, el.id);
                            dispatch(action);
                        }
                        const onChangeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
                            const action = changeStatusTaskAC(props.id, el.id, e.currentTarget.checked);
                            dispatch(action);
                        }
                        const editableTitleTask = (value: string) => {
                            const action = editableTitleTaskAC(props.id, el.id, value);
                            dispatch(action);
                        }

                        return (
                            <li key={v1()}>
                                <Checkbox {...label} checked={el.isDone}
                                          onChange={onChangeCheckbox}
                                          icon={<BookmarkBorder/>}
                                          checkedIcon={<Bookmark/>}/>

                                <EditableTitle title={el.title}
                                               editableTitleValue={editableTitleTask}/>

                                <IconButton aria-label="delete" onClick={onRemoveTask}>
                                    <Delete/>
                                </IconButton>
                            </li>)
                    })
                }
            </ul>

            {/**Buttons for filter tasks*/}
            <div>
                <Button color={"info"} variant={props.filter === 'All' ? 'contained' : 'text'}
                        onClick={allClickHandler}>All
                </Button>
                <Button color={"secondary"} variant={props.filter === 'Active' ? 'contained' : 'text'}
                        onClick={activeClickHandler}>Active
                </Button>
                <Button color={"success"} variant={props.filter === 'Completed' ? 'contained' : 'text'}
                        onClick={completedClickHandler}>Completed
                </Button>

            </div>
        </div>
    )
}


