import {Provider} from "react-redux";
import {AppStateType} from "./state/store";
import React from "react";
import {combineReducers, legacy_createStore} from "redux";
import {v1} from "uuid";
import {taskReducer} from "./state/task-reducer";
import {toDoListReducer} from "./state/toDoList-reducer";

const rootReducer = combineReducers({
    todoLists: toDoListReducer,
    tasks: taskReducer
})
const initialGlobalState = {
    todoLists: [
        {id: 'idTodoList_1', task: 'What to learn', filter: 'All'},
        {id: 'idTodoList_2', task: 'My project', filter: 'Active'},
    ] ,
    tasks: {
        'idTodoList_1': [
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'TS', isDone: false},
            {id: v1(), title: 'React', isDone: true},
            {id: v1(), title: 'Redux', isDone: false},
        ],
        'idTodoList_2': [
            {id: v1(), title: 'SocialNetwork', isDone: true},
            {id: v1(), title: 'TodoList', isDone: false},
        ],
    }
};
export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as any);


export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}> {storyFn} </Provider>
}