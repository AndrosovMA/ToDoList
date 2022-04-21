import {TasksTypeObject} from "../AppWithRedux";
import {v1} from "uuid";
import {AddTodoListActionType, DeleteTodoListActionType, idTodoList_1, idTodoList_2} from "./toDoList-reducer";


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

const initialState:TasksTypeObject = {
    [idTodoList_1]: [
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'TS', isDone: false},
        {id: v1(), title: 'React', isDone: true},
        {id: v1(), title: 'Redux', isDone: false},
    ],
    [idTodoList_2]: [
        {id: v1(), title: 'SocialNetwork', isDone: true},
        {id: v1(), title: 'TodoList', isDone: false},
    ],
}

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
            const stateCopy = {...state};
            const tasks = stateCopy[action.idTodoList]
            const task = tasks.find(el => el.id === action.idTask);
            if (task) {
                task.isDone = action.isDone
            }
            return stateCopy;
        }
        case 'EDITABLE-TASK-TITLE': {
            const stateCopy = {...state};
            const tasks = stateCopy[action.idTodoList]
            const task = tasks.find(el => el.id === action.idTask);
            if (task) {
                task.title = action.title
            }
            return stateCopy;
        }
        case 'ADD-TODO-LIST':
            return {
                [action.idTodoList]: [],
                ...state
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

