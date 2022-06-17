import {v1} from "uuid";
// import {createTodoListAC, deleteTodoListAC, toDoListReducer} from "./toDoList-reducer";
// import {TasksTypeObject, TodoListType} from "../App";
// import {taskReducer} from "./task-reducer";
//
test('new array should be added when new todolist is added', () => {
    const idTodoList_1: string = v1();
    const idTodoList_2: string = v1();
//
//     const startState_todoList: Array<TodoListType> = [
//         {id: idTodoList_1, task: 'What to learn', filter: 'All'},
//         {id: idTodoList_2, task: 'My project', filter: 'Active'},
//     ];
//     const startState_task:TasksTypeObject = {
//         [idTodoList_1]: [
//             {id: v1(), title: 'JS', isDone: true},
//             {id: v1(), title: 'TS', isDone: false},
//             {id: v1(), title: 'React', isDone: true},
//             {id: v1(), title: 'Redux', isDone: false},
//         ],
//         [idTodoList_2]: [
//             {id: v1(), title: 'SocialNetwork', isDone: true},
//             {id: v1(), title: 'TodoList', isDone: false},
//         ],
//     }
//
//     const action = createTodoListAC('CSS')
//     const endState_todoList = toDoListReducer(startState_todoList, action)
//     const endState_task =  taskReducer(startState_task, action)
//
//
//     const keys = Object.keys(endState_task);
//     const idFromTasks = keys[0];
//     const idFromTodolist = endState_todoList[0].id;
//
//     expect(idFromTasks).toBe(action.idTodoList);
//     expect(idFromTodolist).toBe(action.idTodoList);
})
