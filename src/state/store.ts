import {combineReducers, legacy_createStore} from "redux";
import {toDoListReducer} from "./toDoList-reducer";
import {taskReducer} from "./task-reducer";

export const reducers = combineReducers({
    toDoListReducer,
    taskReducer,
})

export const store = legacy_createStore(reducers);

export type AppStateType = ReturnType<typeof reducers>


// @ts-ignore
window.store = store;