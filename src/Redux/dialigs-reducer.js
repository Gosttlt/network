const CHANGE_MESSAGE_VALUE = 'CHANGE-MESSAGE-VALUE';
const SEND_MESSAGE = 'SEND-MESSAGE';

let initialState = {
    dialogsData: [
        { id: '1', name: 'Dimych' },
        { id: '2', name: 'Andrey' },
        { id: '3', name: 'Sveta' },
        { id: '4', name: 'Sasha' },
        { id: '5', name: 'Valera' },
    ],
    messagesData: [
        { id: '1', message: 'Hallo' },
        { id: '2', message: 'Yo' },
        { id: '3', message: 'Hi' },
        { id: '4', message: 'Good day' },
        { id: '5', message: 'Privet' },
    ],
}

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            let body = action.messageValue;
           return {
                ...state,
                messagesData: [...state.messagesData, { id: '6', message: body }]
            }

        default: return state;
    }
}

export const addMessage = (messageValue) => ({
    type: SEND_MESSAGE, messageValue
})
export default dialogsReducer;