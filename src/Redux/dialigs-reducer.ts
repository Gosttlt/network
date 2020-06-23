const SEND_MESSAGE = 'SEND-MESSAGE';

type InitialStateDialogsDataType = {
    id: number
    name: string
}

type InitialStateMessagesDataType = {
    id: number
    message: string
}



let initialState = {
    dialogsData: [
        { id: 1, name: 'Dimych' },
        { id: 2, name: 'Andrey' },
        { id: 3, name: 'Sveta' },
        { id: 4, name: 'Sasha' },
        { id: 5, name: 'Valera' }
    ] as Array<InitialStateDialogsDataType>,
    messagesData: [
        { id: 1, message: 'Hallo' },
        { id: 2, message: 'Yo'},
        { id: 3, message: 'Hi'},
        { id: 4, message: 'Good day'},
        { id: 5, message: 'Privet' }
    ] as Array<InitialStateMessagesDataType>,
}
type InitialStateType = typeof initialState;

const dialogsReducer = (state = initialState, action:any):InitialStateType  => {
    switch (action.type) {
        case SEND_MESSAGE:
            let body = action.messageValue;
            return {
                ...state,
                messagesData: [...state.messagesData, { id: 6, message: body }]
            }

        default: return state;
    }
}

type AddMessageActionType = {
    type: typeof SEND_MESSAGE
    messageValue: string
}

export const addMessage = (messageValue:string):AddMessageActionType => ({
    type: SEND_MESSAGE, messageValue
})
export default dialogsReducer;