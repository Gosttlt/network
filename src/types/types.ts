export type PostType = {
    img: string
    likeCount: number
    user_name: string
    text: string
    postId: number
}

 export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
export type PhotosType = {
    small: null | string
    large: null | string
}


export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType
}
export type UserType = {
    id: number
    name: string
    status: string
    photos: PhotosType
}