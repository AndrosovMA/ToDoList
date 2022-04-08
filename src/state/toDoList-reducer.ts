import {v1} from "uuid";

/** Type*/
import {FilterValueType, TodoListType} from "../App";

type AddTodoListActionType = {
    type: 'ADD-TODO-LIST',
    title: string
}
type DeleteTodoListActionType = {
    type: 'DELETE-TODO-LIST',
    id: string,
}
type ChangeFilterActionType = {
    type: 'CHANGE-FILTER',
    id: string,
    value: FilterValueType
}
type EditTitleTodoListActionType = {
    type: 'EDIT_TITLE_TODO_LIST',
    id: string,
    value: string
}
type ActionTypes = AddTodoListActionType | DeleteTodoListActionType | ChangeFilterActionType | EditTitleTodoListActionType


export const toDoListReducer = (state: Array<TodoListType>, action: ActionTypes) => {
    switch (action.type) {
        case 'ADD-TODO-LIST': {
            let todoList = {
                id: v1(),
                task: action.title,
                filter: 'All'
            }
            return [
                ...state,
                todoList
            ]
        }
        case 'DELETE-TODO-LIST': {
            return state.filter(el => el.id !== action.id);
        }
        case 'CHANGE-FILTER': {
            let todoList = state.find((el) => el.id === action.id);
            if (todoList) {
                todoList.filter = action.value;
            }
            return [...state]
        }
        case 'EDIT_TITLE_TODO_LIST': {
            let newTitleTask = state.find(el => el.id === action.id)
            if (newTitleTask) {
                newTitleTask.task = action.value;
            }
            return [...state];
        }
        default:
            throw new Error("I don't understand this action")
    }
}

/** action creator - AC*/
export const addTodoListAC = (value: string):AddTodoListActionType => {
    return {
        type:'ADD-TODO-LIST',
        title: value
    }
}
export const deleteTodoListAC = (id: string):DeleteTodoListActionType => {
    return {
        type:  'DELETE-TODO-LIST',
        id: id
    }
}
export const changeFilterAC = (id: string, value:FilterValueType):ChangeFilterActionType => {
    return {
        type: 'CHANGE-FILTER',
        id: id,
        value: value
    }
}
export const editTitleTodoListAC = (id: string, value: string):EditTitleTodoListActionType  => {
    return {
        type: 'EDIT_TITLE_TODO_LIST',
        id: id,
        value: value
    }
}