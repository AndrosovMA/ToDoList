import React, {useCallback, useEffect} from "react";
import {DispatchType} from "./AppWithRedux";
import {AddItemForm} from "./AddItemForm";
import {EditableTitle} from "./EditableTitle";

/** Material UI*/
import {Button, IconButton} from "@mui/material";
import {DeleteForever} from '@mui/icons-material';
import {useDispatch} from "react-redux";
import {addTaskTC, fetchTasksTC, updateTaskTC} from "./state/task-reducer";
import {Task} from "./Task";
import {FilterValuesType} from "./state/toDoList-reducer";
import {TaskStatuses, TaskType} from "./api/tasks-api";

type PropsType = {
    todoListId: string
    taskName: string
    tasks: TaskType[]
    changeFilter: (value: FilterValuesType, id: string) => void
    filter: FilterValuesType
    deleteTodoList: (id: string) => void
    editableTitleHeaderHandler: (idTodoList: string, value: string) => void
}

export const TodoList = React.memo((props: PropsType) => {
    const {todoListId, taskName, tasks, changeFilter, filter, deleteTodoList, editableTitleHeaderHandler} = props;

    const dispatch: DispatchType = useDispatch();

    useEffect(() => {
        dispatch(fetchTasksTC(todoListId))
    }, [dispatch, todoListId])

    const allClickHandler = useCallback(() => {
        changeFilter('all', todoListId)
    }, [changeFilter, todoListId]);
    const activeClickHandler = useCallback(() => {
        changeFilter('active', todoListId)
    }, [changeFilter, todoListId]);
    const completedClickHandler = useCallback(() => {
        changeFilter('completed', todoListId)
    }, [changeFilter, todoListId]);
    const handlerDeleteTodoList = useCallback(() => {
        deleteTodoList(todoListId)
    }, [deleteTodoList, todoListId]);

    const addTask = useCallback((title: string) => {
        const thunk = addTaskTC(todoListId, title);
        dispatch(thunk);
    }, [dispatch, todoListId])
    const editableTitleHeader = useCallback((newTitle: string) => {
        editableTitleHeaderHandler(todoListId, newTitle);
    }, [editableTitleHeaderHandler, todoListId])
    const changeTaskStatus = useCallback((todoListId: string, idTask: string, newStatus: TaskStatuses) => {
        const thunk = updateTaskTC(todoListId, idTask, {status: newStatus});
        dispatch(thunk);
    }, [dispatch])


    let tasksForTodoList = tasks;

    if (filter === 'active') {
        tasksForTodoList = tasks.filter((el) => el.status === TaskStatuses.New);
    }
    if (filter === 'completed') {
        tasksForTodoList = tasks.filter((el) => el.status === TaskStatuses.Completed);
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
            <AddItemForm addItem={addTask} labelName='task'/>

            {/**All tasks*/}
            <ul>
                {
                    tasksForTodoList.map((el) => {
                        return <Task
                            key={el.id}
                            todoListId={todoListId}
                            task={el}
                            idTask={el.id}
                            title={el.title}
                            changeTaskStatus={changeTaskStatus}
                        />
                    })
                }
            </ul>

            {/**Buttons for filter tasks*/}
            <div>
                <Button color={"info"} variant={filter === 'all' ? 'contained' : 'text'}
                        onClick={allClickHandler}>All
                </Button>
                <Button color={"secondary"} variant={filter === 'active' ? 'contained' : 'text'}
                        onClick={activeClickHandler}>Active
                </Button>
                <Button color={"success"} variant={filter === 'completed' ? 'contained' : 'text'}
                        onClick={completedClickHandler}>Completed
                </Button>

            </div>
        </div>
    )
})

