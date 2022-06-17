import {todolistAPI, TodoListType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {TodolistDomainType} from "../features/TodoListsList/TodoListsList";

const initialState: Array<TodolistDomainType> = [];

export const toDoListReducer = (state: Array<TodolistDomainType> = initialState, action: ActionTypes): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'ADD-TODO-LIST':
            return [...state, {...action.todoList, filter: "all"}];
        case 'DELETE-TODO-LIST':
            return state.filter(el => el.id !== action.idTodoList);
        case 'CHANGE-FILTER':
            return state.map(tl => tl.id === action.idTodoList ? {...tl, filter: action.filter} : tl);
        case 'CHANGE_TITLE_TODO_LIST':
            return state.map(tl => tl.id === action.idTodoList ? {...tl, title: action.newTitle} : tl);
        case "SET-TODOLIST":
            return action.todoLists.map(el => ({...el, filter: 'all'}));
        default:
            return state;
    }
}

// action creator
export const createTodoListAC = (todoList: TodoListType) => {
    return {type: 'ADD-TODO-LIST', todoList} as const
}

export const deleteTodoListAC = (idTodoList: string) => {
    return {type: 'DELETE-TODO-LIST', idTodoList} as const
}

export const changeFilterAC = (idTodoList: string, filter: FilterValuesType) => {
    return {type: 'CHANGE-FILTER', idTodoList, filter} as const
}

export const changeTitleTodoListAC = (idTodoList: string, newTitle: string) => {
    return {type: 'CHANGE_TITLE_TODO_LIST', idTodoList, newTitle} as const
}

export const setTodoListAC = (todoLists: TodoListType[]) => {
    return {type: 'SET-TODOLIST', todoLists} as const
}

// thunk creator
export const fetchTodoListTC = () => {
    return (dispatch: Dispatch<ActionTypes>) => {
        todolistAPI.getTodoList()
            .then((res) => {
                const action = setTodoListAC(res.data);
                dispatch(action);
            })
    }
}

export const deleteTodoListTC = (idTodoList: string) => {
    return (dispatch: Dispatch<ActionTypes>) => {
        todolistAPI.deleteTodoList(idTodoList)
            .then(() => {
                const action = deleteTodoListAC(idTodoList);
                dispatch(action);
            })
    }
}

export const createTodoListTC = (title: string) => {
    return (dispatch: Dispatch<ActionTypes>) => {
        todolistAPI.createTodoList({title})
            .then((res) => {
                const action = createTodoListAC(res.data.data.item);
                dispatch(action);
            })
    }
}

export const changeTittleTodoListTC = (idTodoList: string, title: string) => {
    return (dispatch: Dispatch<ActionTypes>) => {
        todolistAPI.editTittleTodoList(idTodoList, {title})
            .then(() => {
                const action = changeTitleTodoListAC(idTodoList, title)
                dispatch(action);
            })
    }
}

// types
export type FilterValuesType = "all" | "active" | "completed";
export type AddTodoListActionType = ReturnType<typeof createTodoListAC>
export type DeleteTodoListActionType = ReturnType<typeof deleteTodoListAC>
export type SetTodoListActionType = ReturnType<typeof setTodoListAC>
type ActionTypes =
    | AddTodoListActionType
    | DeleteTodoListActionType
    | ReturnType<typeof changeFilterAC>
    | ReturnType<typeof changeTitleTodoListAC>
    | SetTodoListActionType