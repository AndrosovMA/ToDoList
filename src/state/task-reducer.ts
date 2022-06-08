import {TasksTypeObject} from "../AppWithRedux";
import {v1} from "uuid";
import {AddTodoListActionType, DeleteTodoListActionType} from "./toDoList-reducer";


type addTaskType = {
    type: 'ADD-TASK'
    idTodoList: string
    titleTask: string
}
type removeTaskType = {
    type: 'REMOVE-TASK',
    idTodoList: string,
    idTask: string
}
type changeStatusTaskType = {
    type: 'CHANGE-STATUS'
    idTodoList: string
    idTask: string
    isDone: boolean
}
export type editableTitleTaskType = {
    type: 'EDITABLE-TASK-TITLE'
    idTodoList: string
    idTask: string
    title: string
}

type actionType =
    addTaskType
    | removeTaskType
    | changeStatusTaskType
    | editableTitleTaskType
    | AddTodoListActionType
    | DeleteTodoListActionType

const initialState: TasksTypeObject = {}

export const taskReducer = (state: TasksTypeObject = initialState, action: actionType): TasksTypeObject => {
    switch (action.type) {
        case 'ADD-TASK':
            const newTask = {
                id: v1(),
                title: action.titleTask,
                isDone: false
            }
            return {
                ...state,
                [action.idTodoList]: [
                    newTask,
                    ...state[action.idTodoList]
                ]
            }
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.idTodoList]: state[action.idTodoList].filter(el => el.id !== action.idTask)
            }
        case 'CHANGE-STATUS': {
            let todoListTask = state[action.idTodoList];
            state[action.idTodoList] = todoListTask
                .map(t => t.id === action.idTask
                    ? {...t, isDone: action.isDone}
                    : t);
            return ({...state})
        }
        case 'EDITABLE-TASK-TITLE': {
            let todoListTask = state[action.idTodoList];
            state[action.idTodoList] = todoListTask
                .map(t => t.id === action.idTask
                    ? {...t, title: action.title}
                    : t);
            return ({...state})
        }
        case 'ADD-TODO-LIST':
            return { ...state,
                [action.idTodoList]: [],

            }
        case 'DELETE-TODO-LIST':
            const copyState = {...state};
            delete copyState[action.id]
            return copyState
        default:
            return state
    }
}


/** action creator - AC*/
export const addTaskAC = (id: string, title: string): addTaskType => {
    return {
        type: 'ADD-TASK',
        idTodoList: id,
        titleTask: title
    }
}
export const removeTaskAC = (idTodoList: string, idTask: string): removeTaskType => {
    return {
        type: 'REMOVE-TASK',
        idTodoList: idTodoList,
        idTask: idTask
    }
}
export const changeStatusTaskAC = (idTodoList: string, idTask: string, isDone: boolean): changeStatusTaskType => {
    return {
        type: 'CHANGE-STATUS',
        idTodoList: idTodoList,
        idTask: idTask,
        isDone: isDone
    }
}
export const editableTitleTaskAC = (idTodoList: string, idTask: string, title: string): editableTitleTaskType => {
    return {
        type: 'EDITABLE-TASK-TITLE',
        idTodoList: idTodoList,
        idTask: idTask,
        title: title
    }
}

