import React, {useCallback, useMemo} from "react";
import {FilterValueType, TasksType, TasksTypeObject} from "./AppWithRedux";
import {AddItemForm} from "./AddItemForm";
import {EditableTitle} from "./EditableTitle";

/** Material UI*/
import {Button, IconButton} from "@mui/material";
import {DeleteForever} from '@mui/icons-material';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "./state/store";
import {addTaskAC} from "./state/task-reducer";
import {Task} from "./Task";

type PropsType = {
    id: string
    taskName: string
    changeFilter: (value: FilterValueType, id: string) => void
    filter: FilterValueType
    deleteTodoList: (id: string) => void
    editableTitleHeaderHandler: (idTodoList: string, value: string) => void

}

export const TodoList = React.memo((props: PropsType) => {
    const {id, taskName, changeFilter, filter, deleteTodoList, editableTitleHeaderHandler} = props;

    console.log('to do list is called')

    const dispatch = useDispatch();
    const tasks = useSelector<AppStateType, TasksTypeObject>((state) => state.taskReducer)

    const allClickHandler = useCallback(() => {
        changeFilter('All', id)
    }, [changeFilter, id]);
    const activeClickHandler = useCallback(() => {
        changeFilter('Active', id)
    }, [changeFilter, id]);
    const completedClickHandler = useCallback(() => {
        changeFilter('Completed', id)
    }, [changeFilter, id]);
    const handlerDeleteTodoList = useCallback(() => {
        deleteTodoList(id)
    }, [deleteTodoList, id]);
    const addTask = useCallback((title: string) => {
        const action = addTaskAC(id, title)
        dispatch(action);
    }, [dispatch, id])
    const editableTitleHeader = useCallback((value: string) => {
        editableTitleHeaderHandler(id, value);
    }, [editableTitleHeaderHandler, id])

    let tasksForTodoList: TasksType = tasks[id];
    if (filter === 'Active') {
        tasksForTodoList = tasks[id].filter((el: any) => !el.isDone);
    }
    if (filter === 'Completed') {
        tasksForTodoList = tasks[id].filter((el: any) => el.isDone);
    }

    return (
        <div>
            {/**Title to do list*/}
            <h3>
                <EditableTitle title={taskName}
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
                        return <Task
                            key={el.id}
                            idTodoList={id}
                            idTask={el.id}
                            isDone={el.isDone}
                            title={el.title}
                        />
                    })
                }
            </ul>

            {/**Buttons for filter tasks*/}
            <div>
                <Button color={"info"} variant={filter === 'All' ? 'contained' : 'text'}
                        onClick={allClickHandler}>All
                </Button>
                <Button color={"secondary"} variant={filter === 'Active' ? 'contained' : 'text'}
                        onClick={activeClickHandler}>Active
                </Button>
                <Button color={"success"} variant={filter === 'Completed' ? 'contained' : 'text'}
                        onClick={completedClickHandler}>Completed
                </Button>

            </div>
        </div>
    )
})

