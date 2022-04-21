import React, {useReducer, useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from '@mui/icons-material';
import {
    addTodoListAC,
    changeFilterAC,
    deleteTodoListAC,
    editTitleTodoListAC,
    toDoListReducer
} from "./state/toDoList-reducer";
import {addTaskAC, changeStatusTaskAC, editableTitleTaskAC, removeTaskAC, taskReducer} from "./state/task-reducer";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}
export type TasksType = Array<TaskType>;
export type TasksTypeObject = {
    [idTodoList: string]: TasksType
}
export type FilterValueType = "All" | "Active" | "Completed";
export type TodoListType = {
    id: string,
    task: string,
    filter: FilterValueType
}

// function App() {
//     const idTodoList_1: string = v1();
//     const idTodoList_2: string = v1();
//
//     const [tasks, dispatchTask] = useReducer(taskReducer, {
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
//     });
//     const [todoLists, dispatchTodoList] = useReducer(toDoListReducer, [
//         {id: idTodoList_1, task: 'What to learn', filter: 'All'},
//         {id: idTodoList_2, task: 'My project', filter: 'Active'},
//     ])
//
//     const addTask = (title: string, id: string) => {
//         const action = addTaskAC(id, title)
//         dispatchTask(action);
//     }
//     const removeTask = (idList: string, idTask: string) => {
//         const action = removeTaskAC(idList, idTask);
//         dispatchTask(action);
//     }
//     const changeStatusTask = (idList: string, id: string, isDone: boolean) => {
//         const action = changeStatusTaskAC(idList, id, isDone);
//         dispatchTask(action);
//     }
//     const editableTitleTaskHandler = (idTodoList: string, idTask: string, value: string) => {
//         const action = editableTitleTaskAC(idTodoList, idTask, value);
//         dispatchTask(action);
//     }
//
//     const addTodoList = (title: string) => {
//         const action = addTodoListAC(title);
//         dispatchTodoList(action);
//         dispatchTask(action);
//     }
//     const deleteTodoList = (id: string) => {
//         const action = deleteTodoListAC(id);
//         dispatchTodoList(action);
//     }
//     const changeFilter = (value: FilterValueType, id: string) => {
//         const action = changeFilterAC(id, value);
//         dispatchTodoList(action);
//     }
//     const editableTitleHeaderHandler = (idTodoList: string, value: string) => {
//         const action = editTitleTodoListAC(idTodoList, value);
//         dispatchTodoList(action);
//     }
//
//     return (
//         <div className="App">
//             {/**Header App bar with burger menu*/}
//             <AppBar position="static">
//                 <Toolbar>
//                     <IconButton
//                         size="large"
//                         edge="start"
//                         color="inherit"
//                         aria-label="menu"
//                         sx={{mr: 2}}
//                     >
//                         <Menu/>
//                     </IconButton>
//                     <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
//                         Planning learning
//                     </Typography>
//                     <Button color="inherit">Login</Button>
//                 </Toolbar>
//             </AppBar>
//
//             <Container maxWidth="xl">
//                 <Grid container style={{padding: "10px 20px 20px 0"}}>
//                     {/**Form for add new to do list*/}
//                     <div>
//                         <div><h3>Create new to do list</h3></div>
//                         <AddItemForm addItem={addTodoList}/>
//                     </div>
//                 </Grid>
//                 <Grid container spacing={3}>
//                     {/**render todoList*/}
//                     {
//                         todoLists.map((el) => {
//                             let tasksForTodoList: TasksType = tasks[el.id];
//                             if (el.filter === 'Active') {
//                                 tasksForTodoList = tasks[el.id].filter((el) => !el.isDone);
//                             }
//                             if (el.filter === 'Completed') {
//                                 tasksForTodoList = tasks[el.id].filter((el) => el.isDone);
//                             }
//
//                             return (
//                                 <Grid item>
//                                     <Paper elevation={3} style={{padding: "20px"}}>
//                                         <TodoList
//                                             key={el.id}
//                                             id={el.id}
//                                             taskName={el.task}
//                                             tasks={tasksForTodoList}
//                                             removeTask={removeTask}
//                                             changeFilter={changeFilter}
//                                             addTask={addTask}
//                                             changeStatusTask={changeStatusTask}
//                                             filter={el.filter}
//                                             deleteTodoList={deleteTodoList}
//                                             editableTitleTaskHandler={editableTitleTaskHandler}
//                                             editableTitleHeaderHandler={editableTitleHeaderHandler}
//                                         />
//                                     </Paper>
//                                 </Grid>
//                             )
//                         })
//                     }
//                 </Grid>
//             </Container>
//
//         </div>
//     );
// }
//
// export default App;
//


