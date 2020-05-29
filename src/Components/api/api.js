import * as axios from 'axios';

const instans = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    withCredentials: true,
    headers: {
        'API-KEY': 'c4acea08-d8fa-46b0-af92-ff3591e2e069'
    },
})


export const userAPI = {
    getUsers(currentPage = 1, pageSize = 5) {
        return instans.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    userUnfollow(id) {
        return instans.delete(`follow/${id}`)
            .then(response => response.data)
    },
    userFollow(id) {
        return instans.post(`follow/${id}`)
            .then(response => response.data)
    }
}

export const authAPI = {
    getAuth() {
        return instans.get(`auth/me`)
    },
    login(email, password, rememberMe = false) {
        return instans.post(`auth/login`, { email, password, rememberMe })
    },
    logout() {
        return instans.delete(`auth/login`)
    }
}
export const profileAPI = {
    getProfile(userId) {
        return instans.get(`profile/${userId}`)
            .then(response => response.data)
    },
    getStatus(userId) {
        return instans.get(`profile/status/${userId}`)
            .then(response => response.data)
    },
    updateStatus(status) {
        return instans.put(`/profile/status`, { status: status })
    },
    savePhoto(photoFile) {
        const formData = new FormData();
        formData.append('image', photoFile);
        return instans.put(`/profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}



