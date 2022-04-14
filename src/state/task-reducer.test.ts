import {v1} from "uuid";
import {
    addTaskAC,
    changeStatusTaskAC,
    editableTitleTaskAC,
    editableTitleTaskType,
    removeTaskAC,
    taskReducer
} from "./task-reducer";
import {TasksTypeObject} from "../App";
import {deleteTodoListAC} from "./toDoList-reducer";


test('task should be added in state', () => {
    const idTodoList1 = v1();
    const idTodoList2 = v1();

    const startState = {
        [idTodoList1]: [
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'TS', isDone: false},
            {id: v1(), title: 'React', isDone: true},
            {id: v1(), title: 'Redux', isDone: false},
        ],
        [idTodoList2]: [
            {id: v1(), title: 'SocialNetwork', isDone: true},
            {id: v1(), title: 'TodoList', isDone: false},
        ],
    }

    const endState = taskReducer(startState, addTaskAC(idTodoList2, 'new task'))

    expect(endState[idTodoList2].length).toBe(3)
    expect(endState[idTodoList2][0].title).toBe('new task')
    expect(endState[idTodoList2][0].isDone).toBe(true)

});
test('task should be remove from todo list', () => {

    const idTodoList2 = v1();
    const idTodoList1 = v1();

    const startState = {
        [idTodoList1]: [
            {id: '1', title: 'JS', isDone: true},
            {id: '2', title: 'TS', isDone: false},
            {id: '3', title: 'React', isDone: true},
            {id: '4', title: 'Redux', isDone: false},
        ],
        [idTodoList2]: [
            {id: '1', title: 'SocialNetwork', isDone: true},
            {id: '2', title: 'TodoList', isDone: false},
        ],
    }

    const endState = taskReducer(startState, removeTaskAC(idTodoList1, '3'))

    expect(endState[idTodoList1].length).toBe(3);
    expect(endState[idTodoList1][2].id).toBeDefined();
    expect(endState[idTodoList1][2].id).toBe('4');
});
test('task should be change status', () => {
    const idTodoList2 = v1();
    const idTodoList1 = v1();

    const startState = {
        [idTodoList1]: [
            {id: '1', title: 'JS', isDone: true},
            {id: '2', title: 'TS', isDone: false},
            {id: '3', title: 'React', isDone: false},
            {id: '4', title: 'Redux', isDone: false},
        ],
        [idTodoList2]: [
            {id: '1', title: 'SocialNetwork', isDone: true},
            {id: '2', title: 'TodoList', isDone: false},
        ],
    }

    const action = changeStatusTaskAC(idTodoList1, '3', true);
    const endState = taskReducer(startState, action)

    expect(endState[idTodoList1][2].isDone).toBeTruthy();
})
test('task title should be editable and save value after changed', () => {
    const idTodoList2 = v1();
    const idTodoList1 = v1();

    const startState = {
        [idTodoList1]: [
            {id: '1', title: 'JS', isDone: true},
            {id: '2', title: 'TS', isDone: false},
            {id: '3', title: 'React', isDone: false},
            {id: '4', title: 'Redux', isDone: false},
        ],
        [idTodoList2]: [
            {id: '1', title: 'SocialNetwork', isDone: true},
            {id: '2', title: 'TodoList', isDone: false},
        ],
    }

    const action = editableTitleTaskAC(idTodoList1, '1', 'CSS');
    const endState = taskReducer(startState, action);

    expect(endState[idTodoList1]['0'].title).toBe('CSS');
    expect(endState[idTodoList1].length).toBe(4);
})
test('property with todolistId should be deleted', () => {
    const idTodoList_1: string= v1();
    const idTodoList_2: string = v1();

    const startState_task:TasksTypeObject = {
        [idTodoList_1]: [
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'TS', isDone: false},
            {id: v1(), title: 'React', isDone: true},
            {id: v1(), title: 'Redux', isDone: false},
        ],
        [idTodoList_2]: [
            {id: v1(), title: 'SocialNetwork', isDone: true},
            {id: v1(), title: 'TodoList', isDone: false},
        ],
    }

    const action = deleteTodoListAC(idTodoList_2);
    const endState = taskReducer(startState_task, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState[idTodoList_2]).not.toBeDefined();
})