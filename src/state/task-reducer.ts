import {TasksTypeObject} from "../AppWithRedux";
import {AddTodoListActionType, DeleteTodoListActionType, SetTodoListActionType} from "./toDoList-reducer";
import {Dispatch} from "redux";
import {taskAPI, TaskStatuses, TaskType, TodoTaskPriorities, UpdateTaskModelType} from "../api/tasks-api";
import {AppStateType} from "./store";


export type editableTitleTaskType = ReturnType<typeof editableTitleTaskAC>

type actionType =
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof setTasksAC>
    | editableTitleTaskType
    | AddTodoListActionType
    | DeleteTodoListActionType
    | SetTodoListActionType

const initialState: TasksTypeObject = {}

export const taskReducer = (state: TasksTypeObject = initialState, action: actionType): TasksTypeObject => {
    switch (action.type) {
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const newTask: TaskType = action.task
            const tasks = stateCopy[action.task.todoListId];
            stateCopy[action.task.todoListId] = [newTask, ...tasks];
            return stateCopy;
        }
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].filter(el => el.id !== action.idTask)
            }
        case "UPDATE-TASK": {
            const tasksTodoList = state[action.todoListId];
            const newTasksTodolist = tasksTodoList
                .map(el => (el.id === action.idTask ? {...el, ...action.domainModel} : el));
            state[action.todoListId] = newTasksTodolist;
            return {...state}
        }
        case 'ADD-TODO-LIST':
            return {
                ...state,
                [action.todoList.id]: [],
            }
        case 'DELETE-TODO-LIST': {
            const copyState = {...state};
            delete copyState[action.idTodoList]
            return copyState
        }
        case "SET-TODOLIST": {
            const copyState = {...state};
            action.todoLists.forEach((el) => {
                copyState[el.id] = []
            })

            return copyState;
        }
        case 'SET-TASKS': {
            const copyState = {...state};
            copyState[action.todoListId] = action.tasks
            return copyState;
        }
        default:
            return state
    }
}


// action creator
export const addTaskAC = (task: TaskType) => {
    return {type: 'ADD-TASK', task} as const
}

export const removeTaskAC = (todoListId: string, idTask: string) => {
    return {type: 'REMOVE-TASK', todoListId, idTask} as const
}

export const editableTitleTaskAC = (todoListId: string, idTask: string, title: string) => {
    return {type: 'EDITABLE-TASK-TITLE', todoListId, idTask, title} as const
}

export const setTasksAC = (todoListId: string, tasks: TaskType[]) => {
    return {type: 'SET-TASKS', todoListId, tasks} as const
}

export const updateTaskAC = (todoListId: string, idTask: string, domainModel: UpdateDomainTaskModelType) => {
    return {type: 'UPDATE-TASK', todoListId, idTask, domainModel} as const
}


//thunks
export const fetchTasksTC = (todoListId: string) => {
    return (dispatch: Dispatch) => {
        taskAPI.getTasks(todoListId)
            .then((res) => {
                const action = setTasksAC(todoListId, res.data.items);
                dispatch(action);
            })
    }
}

export const deleteTaskTC = (todoListId: string, idTask: string) => {
    return (dispatch: Dispatch) => {
        taskAPI.deleteTask(todoListId, idTask)
            .then(() => {
                const action = removeTaskAC(todoListId, idTask);
                dispatch(action)
            })
    }
}

export const addTaskTC = (todoListId: string, title: string) => {
    return (dispatch: Dispatch) => {
        taskAPI.createTask(todoListId, {title})
            .then((res) => {
                const action = addTaskAC(res.data.data.item)
                dispatch(action)
            })
    }
}

export type UpdateDomainTaskModelType = {
    title?: string,
    description?: string,
    completed?: boolean,
    status?: TaskStatuses,
    priority?: TodoTaskPriorities,
    startDate?: string,
    deadline?: string
}
export const updateTaskTC = (todoListId: string, idTask: string, domainModel: UpdateDomainTaskModelType) => {
    return (dispatch: Dispatch, getState: () => AppStateType) => {

        const task = getState().taskReducer[todoListId].find(el => el.id === idTask)
        if (task) {
            const apiModel: UpdateTaskModelType = {
                title: task.title,
                description: task.description,
                completed: task.completed,
                status: task.status,
                priority: task.priority,
                startDate: task.startDate,
                deadline: task.deadline,
                ...domainModel
            }
            taskAPI.updateTask(todoListId, idTask, apiModel)
                .then(() => {
                    const action = updateTaskAC(todoListId, idTask, domainModel);
                    dispatch(action);
                })
        }
    }
}








