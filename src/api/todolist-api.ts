import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '265209c1-efc1-44a6-86c4-a72e38de47f6'
    }
})

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

export const todolistAPI = {
        getTodoList () {
            return instance.get<TodoListType[]>('todo-lists');
        },

        createTodoList(data:any) {
            return instance.post<ResponseTodoListType<{item: TodoListType}>>('todo-lists', data)
        },

        deleteTodoList(idTodoList: any) {
            return instance.delete<ResponseTodoListType<{}>>(`todo-lists/${idTodoList}`)
        },

        updateTodoList(p:{idTodoList: any, newTitle: any}) {
            return instance.put<ResponseTodoListType<{}>>(`todo-lists/${p.idTodoList}`, p.newTitle)
        }
}


