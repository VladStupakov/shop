import { $authHost, $host } from "./index"
import { loginFail, loginStart, loginSuccess, logout, checkFail, checkStart, checkSuccess,registrationFail,registrationSuccess } from "../store/userSlice"


export const login = async (dispatch, user) => {
    dispatch(loginStart())
    try {
        const { data } = await $host.post('user/login', user)
        dispatch(loginSuccess({ ...data.user, accessToken: data.accessToken }))       
    } catch (err) {
        dispatch(loginFail(err.response.data.message))      
    }
};

export const register = async (dispatch, user) => {
    dispatch(loginStart())
    try {
        const { data } = await $host.post('user/registration', user)
        dispatch(registrationSuccess())
        return new Promise((resolve, reject) => {
            resolve()
        })
    } catch (err) {
        dispatch(registrationFail(err.response.data.message))
        return new Promise((resolve, reject) => {
            reject()
        })
    }
};

export const logoutRequest = async (dispatch) => {
    dispatch(logout())
    const { data } = await $authHost.post('user/logout')
    return data
};

export const check = async(dispatch) =>{
    dispatch(checkStart())
    try {
        const { data } = await $authHost.get('user/refresh')
        dispatch(checkSuccess({accessToken: data.accessToken }))
    } catch (err) {
        dispatch(checkFail())
    }
}