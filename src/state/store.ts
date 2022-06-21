import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {toDoListReducer} from "./toDoList-reducer";
import {taskReducer} from "./task-reducer";
import thunk from "redux-thunk";
import {appReducer} from "./app-reducer";

export const reducers = combineReducers({
    toDoListReducer, taskReducer, appReducer
})

export const store = legacy_createStore(reducers, applyMiddleware(thunk));

export type AppStateType = ReturnType<typeof reducers>


// @ts-ignore
window.store = store;