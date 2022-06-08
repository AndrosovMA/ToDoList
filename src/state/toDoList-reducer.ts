import {v1} from "uuid";

/** Type*/
import {FilterValueType, TodoListType} from "../AppWithRedux";

export type AddTodoListActionType = {
    type: 'ADD-TODO-LIST'
    title: string
    idTodoList: string
}
export type DeleteTodoListActionType = {
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
type ActionTypes =
    | AddTodoListActionType
    | DeleteTodoListActionType
    | ChangeFilterActionType
    | EditTitleTodoListActionType


export const idTodoList_1: string = v1();
export const idTodoList_2: string = v1();

const initialState: Array<TodoListType> = [];

//Reducer должын вернуть такой же тип какой и получил
export const toDoListReducer = (state: Array<TodoListType> = initialState, action: ActionTypes): Array<TodoListType> => {
    switch (action.type) {
        case 'ADD-TODO-LIST': {
            return [
                {
                    id: action.idTodoList,
                    task: action.title,
                    filter: 'All'
                },
                ...state,
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
            return state;
    }
}

/** action creator - AC*/
export const addTodoListAC = (value: string): AddTodoListActionType => {
    return {
        type: 'ADD-TODO-LIST',
        title: value,
        idTodoList: v1()
    }
}
export const deleteTodoListAC = (id: string): DeleteTodoListActionType => {
    return {
        type: 'DELETE-TODO-LIST',
        id: id
    }
}
export const changeFilterAC = (id: string, value: FilterValueType): ChangeFilterActionType => {
    return {
        type: 'CHANGE-FILTER',
        id: id,
        value: value
    }
}
export const editTitleTodoListAC = (id: string, value: string): EditTitleTodoListActionType => {
    return {
        type: 'EDIT_TITLE_TODO_LIST',
        id: id,
        value: value
    }
}