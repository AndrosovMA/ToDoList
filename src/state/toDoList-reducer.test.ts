import {v1} from "uuid";
import {
    addTodoListAC,
    changeFilterAC,
    deleteTodoListAC,
    editTitleTodoListAC,
    toDoListReducer
} from "./toDoList-reducer";
import {FilterValueType, TodoListType} from "../App";


test('todo list should be added', () => {
    const idTodoList_1 = v1();
    const idTodoList_2 = v1();

    let newTodoListTitle = 'new todo list';

    const startState: Array<TodoListType> = [
        {id: idTodoList_1, task: 'What to learn', filter: 'All'},
        {id: idTodoList_2, task: 'My project', filter: 'Active'},
    ];

    const endState = toDoListReducer(startState, addTodoListAC(newTodoListTitle))

    expect(endState.length).toBe(3);
    expect(endState[2].task).toBe(newTodoListTitle);
    expect(endState[2].filter).toBe('All');

})

test('todo list should be delete', () => {
    const idTodoList_1 = v1();
    const idTodoList_2 = v1();

    const startState: Array<TodoListType> = [
        {id: idTodoList_1, task: 'What to learn', filter: 'All'},
        {id: idTodoList_2, task: 'My project', filter: 'Active'},
    ];

    const endState = toDoListReducer(startState, deleteTodoListAC(idTodoList_1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(idTodoList_2)
})

test('to do list should be change filter', () => {
    const idTodoList_1 = v1();
    const idTodoList_2 = v1();

    let newFilter: FilterValueType = "Active"

    const startState: Array<TodoListType> = [
        {id: idTodoList_1, task: 'What to learn', filter: 'All'},
        {id: idTodoList_2, task: 'My project', filter: 'All'},
    ];

    const endState = toDoListReducer(startState, changeFilterAC(idTodoList_2, newFilter))

    expect(endState[1].filter).toBe(newFilter);

})

test('to do list should be edit title', () => {
    const idTodoList_1 = v1();
    const idTodoList_2 = v1();

    let newTitle = 'learn Hook'

    const startState: Array<TodoListType> = [
        {id: idTodoList_1, task: 'What to learn', filter: 'All'},
        {id: idTodoList_2, task: 'My project', filter: 'All'},
    ];

    const endState = toDoListReducer(startState, editTitleTodoListAC(idTodoList_2, newTitle))

    expect(endState[1].task).toBe(newTitle);
})