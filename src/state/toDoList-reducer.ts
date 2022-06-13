import {v1} from "uuid";
import {Dispatch} from "redux";
import {TodolistDomainType} from "../AppWithRedux";
import {todolistAPI} from "../api/todolist-api";



// Types
import {TodoListType} from "../api/todolist-api";
export type FilterValuesType = "all" | "active" | "completed";
export type AddTodoListActionType = ReturnType<typeof addTodoListAC>
export type DeleteTodoListActionType = ReturnType<typeof deleteTodoListAC>
export type SetTodoListActionType = ReturnType<typeof setTodoListAC>

type ActionTypes =
    | AddTodoListActionType
    | DeleteTodoListActionType
    | ReturnType<typeof changeFilterAC>
    | ReturnType<typeof editTitleTodoListAC>
    | SetTodoListActionType


export const idTodoList_1: string = v1();
export const idTodoList_2: string = v1();

const initialState: Array<TodolistDomainType> = [];

export const toDoListReducer = (state: Array<TodolistDomainType> = initialState, action: ActionTypes): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'ADD-TODO-LIST': {
            return [
                {
                    id: action.idTodoList,
                    title: action.title,
                    filter: 'all',
                    addedData: '',
                    order: 0,
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
            const newTitle = state.find(el => el.id === action.id)
            if (newTitle) {
                newTitle.title = action.value;
            }
            return [...state];
        }
        case "SET-TODOLIST": {
            return action.todoLists.map(el => {
                return {
                    ...el,
                    filter: 'all'
                }
            })
        }
        default:
            return state;
    }
}

// action creator
export const addTodoListAC = (value: string) => {
    return {type: 'ADD-TODO-LIST', title: value, idTodoList: v1()} as const
}
export const deleteTodoListAC = (id: string) => {
    return {type: 'DELETE-TODO-LIST', id: id} as const
}
export const changeFilterAC = (id: string, value: FilterValuesType) => {
    return {type: 'CHANGE-FILTER', id: id, value: value} as const
}
export const editTitleTodoListAC = (id: string, value: string) => {
    return {type: 'EDIT_TITLE_TODO_LIST', id: id, value: value} as const
}
export const setTodoListAC = (todoLists: TodoListType[]) => {
    return {type: 'SET-TODOLIST', todoLists} as const
}


//thunk creator
export const fetchTodoListTC = () => {
    return (dispatch: Dispatch) => {
        todolistAPI.getTodoList()
            .then((res) => {
                const action = setTodoListAC(res.data);
                dispatch(action)
            })
    }
}


