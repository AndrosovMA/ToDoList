import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '265209c1-efc1-44a6-86c4-a72e38de47f6'
    }
})

export const todolistAPI = {
        getTodoList () {
            return instance.get<TodoListType[]>('todo-lists');
        },

        createTodoList(title:any) {
            return instance.post<ResponseTodoListType<{item: TodoListType}>>('todo-lists', title)
        },

        deleteTodoList(idTodoList: any) {
            return instance.delete<ResponseTodoListType<{}>>(`todo-lists/${idTodoList}`)
        },

        editTittleTodoList(idTodoList: any, title: any) {
            return instance.put<ResponseTodoListType<{}>>(`todo-lists/${idTodoList}`, title)
        }
}

// types
export type TodoListType = {
    id: string,
    addedData: string,
    order: number,
    title: string
}
type ResponseTodoListType<D> = {
    data: D
    fieldsErrors: String[],
    messages: String[],
    resultCode: number
}

