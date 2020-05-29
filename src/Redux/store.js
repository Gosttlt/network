import sidebarReducer from './sidebarreducer';
import profileReducer from './profile-reducer';
import dialogsReducer from './dialigs-reducer';

const store = {
    _state: {
        messagePage: {
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
            messageValue:'',
        },
        profilePage: {
            PostsData: [
                { img: 'https://avatars.mds.yandex.net/get-pdb/1025945/86f10e6d-eab5-4572-8c07-c672b854d2a5/s1200?webp=false', likeCount: '20', user_name: 'Ivan Ivanov', text: 'post 1 teeeext raznii' },
                { img: 'https://avatars.mds.yandex.net/get-pdb/1667260/3ec2154a-cd3f-4c24-b13b-6c60951dd0b0/s1200', likeCount: '30', user_name: 'Vasilii Ivanov', text: 'post 2 teeeext raznii' },
                { img: 'https://i.livelib.ru/auface/471251/o/ab9f/Yurij_Belous.jpg', likeCount: '10', user_name: 'Petr Ivanov', text: 'post 3 teeeext raznii' },
            ],
            PostsValue: '',
        },
        sidebar: {
            userOnline: [
                { img: 'https://avatars.mds.yandex.net/get-pdb/1025945/86f10e6d-eab5-4572-8c07-c672b854d2a5/s1200?webp=false', user_name: 'Ivan' },
                { img: 'https://avatars.mds.yandex.net/get-pdb/1667260/3ec2154a-cd3f-4c24-b13b-6c60951dd0b0/s1200', user_name: 'Vasilii' },
                { img: 'https://i.livelib.ru/auface/471251/o/ab9f/Yurij_Belous.jpg', user_name: 'Petr' },
            ],
        }
    },
    _callSubscriber() {
        console.log('ololshla')
    },
    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;

    },
    dispatch(action){
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.messagePage = dialogsReducer(this._state.messagePage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);
        this._callSubscriber(this._state);

    },
}

export default store;
window.store = store;
