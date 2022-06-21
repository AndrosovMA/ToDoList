const initialState:InitialStateType = {
    status: 'idle',
    error: null
}

export const appReducer = (state = initialState, action: ActionType): InitialStateType => {
        switch (action.type) {
            case 'APP/SET-STATUS':
                return {...state, status: action.status}
            case 'APP/SET-ERROR':
                return {...state, error: action.error}
            default:
                return {...state}
        }
}

// action creator
export const setErrorAppAC = (error: string | null) => {
    return {type: 'APP/SET-ERROR', error} as const
}
export const setStatusAppAC = (status: RequestStatusType) => {
    return {type: 'APP/SET-STATUS', status} as const
}

// types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType,

    // если произошла глобальная ошибка, запишим её в error
    error: string | null
}

export type SetErrorAppType = ReturnType<typeof setErrorAppAC>;
export type SetStatusAppType = ReturnType<typeof setStatusAppAC>;
type ActionType =
    | SetErrorAppType
    | SetStatusAppType