import {TasksTypeObject} from "../AppWithRedux";
import {AddTodoListActionType, DeleteTodoListActionType, SetTodoListActionType} from "./toDoList-reducer";
import {Dispatch} from "redux";
import {taskAPI, TaskType} from "../api/tasks-api";


export type editableTitleTaskType = ReturnType<typeof editableTitleTaskAC>

type actionType =
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof changeStatusTaskAC>
    | ReturnType<typeof setTasksAC>
    | editableTitleTaskType
    | AddTodoListActionType
    | DeleteTodoListActionType
    | SetTodoListActionType

const initialState: TasksTypeObject = {}

export const taskReducer = (state: TasksTypeObject = initialState, action: actionType): TasksTypeObject => {
    switch (action.type) {
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const newTask: TaskType = action.task
            const tasks = stateCopy[action.task.todoListId];
            stateCopy[action.task.todoListId] = [newTask, ...tasks];
            return stateCopy;
        }
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].filter(el => el.id !== action.idTask)
            }
        case 'CHANGE-STATUS': {
            let todoListTask = state[action.todoListId];
            state[action.todoListId] = todoListTask
                .map(t => t.id === action.idTask
                    ? {...t, isDone: action.isDone}
                    : t);
            return ({...state})
        }
        case 'EDITABLE-TASK-TITLE': {
            let todoListTask = state[action.todoListId];
            state[action.todoListId] = todoListTask
                .map(t => t.id === action.idTask
                    ? {...t, title: action.title}
                    : t);
            return ({...state})
        }
        case 'ADD-TODO-LIST':
            return {
                ...state,
                [action.idTodoList]: [],
            }
        case 'DELETE-TODO-LIST': {
            const copyState = {...state};
            delete copyState[action.id]
            return copyState
        }
        case "SET-TODOLIST": {
            const copyState = {...state};
            action.todoLists.forEach((el) => {
                copyState[el.id] = []
            })

            return copyState;
        }
        case 'SET-TASKS': {
            const copyState = {...state};
            copyState[action.todoListId] = action.tasks
            return copyState;
        }
        default:
            return state
    }
}


// action creator
export const addTaskAC = (task: TaskType) => {
    return {type: 'ADD-TASK', task} as const
}
export const removeTaskAC = (todoListId: string, idTask: string) => {
    return {type: 'REMOVE-TASK', todoListId, idTask} as const
}

export const changeStatusTaskAC = (todoListId: string, idTask: string, isDone: boolean) => {
    return {type: 'CHANGE-STATUS', todoListId, idTask, isDone} as const
}

export const editableTitleTaskAC = (todoListId: string, idTask: string, title: string) => {
    return {type: 'EDITABLE-TASK-TITLE', todoListId, idTask, title} as const
}

export const setTasksAC = (todoListId: string, tasks: TaskType[]) => {
    return {type: 'SET-TASKS', todoListId, tasks} as const
}


//thunks
export const fetchTasksTC = (todoListId: string) => {
    return (dispatch: Dispatch) => {
        taskAPI.getTasks(todoListId)
            .then((res) => {
                const action = setTasksAC(todoListId, res.data.items);
                dispatch(action);
            })
    }
}

export const deleteTaskTC = (todoListId: string, idTask: string) => {
    return (dispatch: Dispatch) => {
        taskAPI.deleteTask(todoListId, idTask)
            .then(() => {
                const action = removeTaskAC(todoListId, idTask);
                dispatch(action)
            })
    }
}

export const addTaskTC = (todoListId: string, title: string) => {
    return (dispatch: Dispatch) => {
       taskAPI.createTask(todoListId, {title})
           .then((res) => {
               console.log(res)
               const action = addTaskAC(res.data.data.item)
               dispatch(action)
           })
    }
}