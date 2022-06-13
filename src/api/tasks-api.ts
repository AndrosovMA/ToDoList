import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists/',
    withCredentials: true,
    headers: {
        'API-KEY': '265209c1-efc1-44a6-86c4-a72e38de47f6'
    }
})

export enum TaskStatuses  {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TodoTaskPriorities {
    Low = 0,
    Middle = 1,
    Completed = 2,
    Draft = 3
}

export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: TaskStatuses
    priority: TodoTaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
type GetTaskType = {
    items: TaskType[]
    totalCount: number
    error: string
}
type ResponseTaskType<D> = {
    resultCode: number
    messages: string[],
    data: D
}

export const taskAPI = {
    getTasks(idTodoList: string) {
        return  instance.get<GetTaskType>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${idTodoList}/tasks`)
    },

    createTask(idTodoList: string, params: {title: string}) {
        return instance.post<ResponseTaskType<{item: TaskType}>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${idTodoList}/tasks`, params)
    },

    deleteTask(idTodoList: string, idTask: string) {
        return instance.delete<ResponseTaskType<{}>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${idTodoList}/tasks/${idTask}`)
    },

    updateTask(idTodoList: string, idTask: string, newTitle:{ title: string} ) {
        return instance.put<ResponseTaskType<{title: string}>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${idTodoList}/tasks/${idTask}`, newTitle)
    }
}
















