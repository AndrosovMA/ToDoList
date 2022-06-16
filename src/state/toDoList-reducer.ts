import {v1} from "uuid";
import {Dispatch} from "redux";
import {TodolistDomainType} from "../AppWithRedux";
import {todolistAPI} from "../api/todolist-api";



// Types
import {TodoListType} from "../api/todolist-api";
export type FilterValuesType = "all" | "active" | "completed";
export type AddTodoListActionType = ReturnType<typeof createTodoListAC>
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
            const newTodoList:TodolistDomainType = {...action.todoList, filter: "all"};
            return [...state, newTodoList];
        }
        case 'DELETE-TODO-LIST': {
            return state.filter(el => el.id !== action.idTodoList);
        }
        case 'CHANGE-FILTER': {
            let todoList = state.find((el) => el.id === action.idTodoList);
            if (todoList) {
                todoList.filter = action.value;
            }
            return [...state]
        }
        case 'EDIT_TITLE_TODO_LIST': {
            const newTitle = state.find(el => el.id === action.idTodoList)
            if (newTitle) {
                newTitle.title = action.newTitle;
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
export const createTodoListAC = (todoList: TodoListType) => {
    return {type: 'ADD-TODO-LIST', todoList} as const
}
export const deleteTodoListAC = (idTodoList: string) => {
    return {type: 'DELETE-TODO-LIST', idTodoList} as const
}
export const changeFilterAC = (idTodoList: string, value: FilterValuesType) => {
    return {type: 'CHANGE-FILTER', idTodoList, value} as const
}
export const editTitleTodoListAC = (idTodoList: string, newTitle: string) => {
    return {type: 'EDIT_TITLE_TODO_LIST', idTodoList, newTitle} as const
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
                dispatch(action);
            })
    }
}

export const deleteTodoListTC = (idTodoList: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.deleteTodoList(idTodoList)
            .then((res) => {
                const action = deleteTodoListAC(idTodoList);
                dispatch(action);
            })
    }
}

export const createTodoListTC = (title: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.createTodoList({title})
            .then((res) => {
                const action = createTodoListAC(res.data.data.item);
                dispatch(action);
            })
    }
}

export const editTittleTodoListTC = (idTodoList: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.editTittleTodoList(idTodoList, {title})
            .then((res) => {
                const action = editTitleTodoListAC(idTodoList, title)
                dispatch(action);
            })
    }
}