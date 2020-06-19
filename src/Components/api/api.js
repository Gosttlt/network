import * as axios from 'axios';

const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    withCredentials: true,
    headers: {
        'API-KEY': 'c4acea08-d8fa-46b0-af92-ff3591e2e069'
    },
})


export const userAPI = {
    getUsers(currentPage = 1, pageSize = 5) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    userUnfollow(id) {
        return instance.delete(`follow/${id}`)
            .then(response => response.data)
    },
    userFollow(id) {
        return instance.post(`follow/${id}`)
            .then(response => response.data)
    }
}

export const authAPI = {
    getAuth() {
        return instance.get(`auth/me`)
    },
    login(email, password, rememberMe = false, captcha = null) {
        return instance.post(`auth/login`, { email, password, rememberMe, captcha })
    },
    logout() {
        return instance.delete(`auth/login`)
    }
}
export const profileAPI = {
    getProfile(userId) {
        return instance.get(`profile/${userId}`)
            .then(response => response.data)
    },
    getStatus(userId) {
        return instance.get(`profile/status/${userId}`)
            .then(response => response.data)
    },
    updateStatus(status) {
        return instance.put(`/profile/status`, { status: status })
    },
    savePhoto(photoFile) {
        const formData = new FormData();
        formData.append('image', photoFile);
        return instance.put(`/profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    saveProfile(profile) {
        return instance.put(`/profile`, profile)
    }
}
export const securityAPI = {
    getCapchaURL(){
        return instance.get('/security/get-captcha-url')
    }
}


