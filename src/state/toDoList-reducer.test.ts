import {v1} from "uuid";
import {
    createTodoListAC,
    changeFilterAC,
    deleteTodoListAC,
    editTitleTodoListAC,
    toDoListReducer
} from "./toDoList-reducer";



//
// let idTodoList_1: string;
// let idTodoList_2: string;
// let newTodoListTitle:string;
// let startState: Array<TodoListType>;
//
// beforeEach(() => {
//    idTodoList_1 = v1();
//    idTodoList_2 = v1();
//
//    newTodoListTitle = 'new todo list';
//
//     startState = [
//         {id: idTodoList_1, task: 'What to learn', filter: 'All'},
//         {id: idTodoList_2, task: 'My project', filter: 'Active'},
//     ];
// })
//
// test('todo list should be added', () => {
//
//     const endState = toDoListReducer(startState, createTodoListAC(newTodoListTitle))
//
//     expect(endState.length).toBe(3);
//     expect(endState[0].task).toBe(newTodoListTitle);
//     expect(endState[0].filter).toBe('All');
//
// })
// test('todo list should be delete', () => {
//
//     const endState = toDoListReducer(startState, deleteTodoListAC(idTodoList_1))
//
//     expect(endState.length).toBe(1);
//     expect(endState[0].id).toBe(idTodoList_2)
// })
// test('to do list should be change filter', () => {
//
//     let newFilter: FilterValuesType = "Active"
//
//     const endState = toDoListReducer(startState, changeFilterAC(idTodoList_1, newFilter))
//
//     expect(endState[0].filter).toBe(newFilter);
//
// })
// test('to do list should be edit title', () => {
//
//     let newTitle = 'learn Hook'
//
//
//     const endState = toDoListReducer(startState, editTitleTodoListAC(idTodoList_2, newTitle))
//
//     expect(endState[1].task).toBe(newTitle);
// })