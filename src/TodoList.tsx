import React, {ChangeEvent} from "react";
import {FilterValueType, TasksType} from "./App";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {EditableTitle} from "./EditableTitle";

/** Material UI*/
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete, BookmarkBorder, Bookmark, DeleteForever} from '@mui/icons-material';
const label = {inputProps: {'aria-label': 'Checkbox demo'}};

type Props = {
    id: string
    taskName: string
    tasks: TasksType
    removeTask: (idList: string, idTask: string) => void
    changeFilter: (value: FilterValueType, id: string) => void
    addTask: (tittle: string, id: string) => void
    changeStatusTask: (idList: string, idTask: string, isDone: boolean) => void
    filter: FilterValueType
    deleteTodoList: (id: string) => void
    editableTitleTaskHandler: (idTodoList: string, idTask: string, value: string) => void
    editableTitleHeaderHandler: (idTodoList: string, value: string) => void
}

export function TodoList(props: Props) {

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
        props.addTask(title, props.id)
    } // обертка над props.addTask что бы не передавать id
    const editableTitleHeader = (value: string) => {
        props.editableTitleHeaderHandler(props.id, value);
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
                    props.tasks.map((el) => {
                        const onRemoveTask = () => {
                            props.removeTask(props.id, el.id)
                        }
                        const onChangeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatusTask(props.id, el.id, e.currentTarget.checked);
                        }
                        const editableTitleTask = (value: string) => {
                            props.editableTitleTaskHandler(props.id, el.id, value)
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


