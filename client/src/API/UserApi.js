import { $authHost, $host } from "./index"
import { loginFail, loginStart, loginSuccess, logout, checkFail, checkStart, checkSuccess } from "../store/userSlice"

export const fetchCart = async (id) => {
    const { data } = await $host.get('basket/' + id)
    return data
}


export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const { data } = await $host.post('user/login', user)
        //localStorage.setItem('token', data.accessToken)
        //return jwt_decode(data.token)
        dispatch(loginSuccess({ ...data.user, accessToken: data.accessToken }));
    } catch (err) {
        dispatch(loginFail());
    }
};

export const logoutRequest = async (dispatch) => {
    dispatch(logout());
    const { data } = await $authHost.post('user/logout')
    return data
};

export const check = async(dispatch) =>{
    dispatch(checkStart())
    try {
        const { data } = await $host.get('user/refresh')
        dispatch(checkSuccess({accessToken: data.accessToken }))
    } catch (err) {
        dispatch(checkFail());
    }
}