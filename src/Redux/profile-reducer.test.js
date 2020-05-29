// import profileReducer, { addPost } from "./profile-reducer";
const { addPost } = require('./profile-reducer');
const profileReducer  = require('/profile-reducer');


it('testttt', () => {
    let action = addPost('tut noviy text')
    let state = {
        PostsData: [
            { img: 'https://avatars.mds.yandex.net/get-pdb/1025945/86f10e6d-eab5-4572-8c07-c672b854d2a5/s1200?webp=false', likeCount: '20', user_name: 'Ivan Ivanov', text: 'post 1 teeeext raznii' },
            { img: 'https://avatars.mds.yandex.net/get-pdb/1667260/3ec2154a-cd3f-4c24-b13b-6c60951dd0b0/s1200', likeCount: '30', user_name: 'Vasilii Ivanov', text: 'post 2 teeeext raznii' },
            { img: 'https://i.livelib.ru/auface/471251/o/ab9f/Yurij_Belous.jpg', likeCount: '10', user_name: 'Petr Ivanov', text: 'post 3 teeeext raznii' },
        ]
    }
let newStete = profileReducer(state, action);
expect(newStete.PostsData.length).toBe(4);
}
)  
