import {v1} from "uuid";
// import {
//     addTaskAC,
//     changeTaskStatusAC,
//     editableTitleTaskAC,
//     editableTitleTaskType,
//     removeTaskAC,
//     taskReducer
// } from "./task-reducer";
// import { TasksTypeObject} from "../App";
// import {deleteTodoListAC} from "./toDoList-reducer";
//


// let idTodoList1: string;
// let idTodoList2: string;
// let startState: TasksTypeObject;

// beforeEach(()=>{
//     idTodoList1 = v1();
//     idTodoList2 = v1();
//     startState = {
//         [idTodoList1]: [
//             {id: '1', title: 'JS', isDone: true},
//             {id: '2', title: 'TS', isDone: false},
//             {id: '3', title: 'React', isDone: true},
//             {id: '4', title: 'Redux', isDone: false},
//         ],
//         [idTodoList2]: [
//             {id: '1', title: 'SocialNetwork', isDone: true},
//             {id: '2', title: 'TodoList', isDone: false},
//         ],
//     }
// })
//
// it('task should be added in state', () => {
//     const endState = taskReducer(startState, addTaskAC(idTodoList2, 'new task'))
//
//     expect(endState[idTodoList2].length).toBe(3)
//     expect(endState[idTodoList2][0].title).toBe('new task')
//     expect(endState[idTodoList2][0].isDone).toBe(false)
//
// });
// test('task should be remove from todo list', () => {
//
//     const endState = taskReducer(startState, removeTaskAC(idTodoList1, '3'))
//
//     expect(endState[idTodoList1].length).toBe(3);
//     expect(endState[idTodoList1][2].id).toBeDefined();
//     expect(endState[idTodoList1][2].id).toBe('4');
// });
// test('task should be change status', () => {
//
//     const action = changeTaskStatusAC(idTodoList1, '3', false);
//     const endState = taskReducer(startState, action)
//
//     expect(endState[idTodoList1][2].isDone).toBe(false);
// })
// test('task title should be editable and save value after changed', () => {
//
//     const action = editableTitleTaskAC(idTodoList1, '1', 'CSS');
//     const endState = taskReducer(startState, action);
//
//     expect(endState[idTodoList1]['0'].title).toBe('CSS');
//     expect(endState[idTodoList1].length).toBe(4);
// })
test('property with todolistId should be deleted', () => {

    // const action = deleteTodoListAC(idTodoList2);
    // const endState = taskReducer(startState, action)
    //
    // const keys = Object.keys(endState);
    //
    // expect(keys.length).toBe(1);
    // expect(endState[idTodoList2]).not.toBeDefined();
})