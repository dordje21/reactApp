import axios from "axios";
import {AUTH_SUCCESS, LOG_OUT} from "./actionTypes";

export function auth(email, password, isLogin){
    return async dispatch => {
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }

        console.log(authData)

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyADQGNRpCbShbMCiDPdfqRQadE80POWkMA';


        if(isLogin){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyADQGNRpCbShbMCiDPdfqRQadE80POWkMA';
        }

        const res = await axios.post(url, authData)
        const data = res.data;
        const expdate = new Date(new Date().getTime() + data.expiresIn * 1000)
        console.log(data)

        localStorage.setItem('token', data.idToken)
        localStorage.setItem('localId', data.localId)
        localStorage.setItem('expiresIn', expdate)

        dispatch(authSuccess(data.idToken))
        dispatch(authLogOut(data.expiresIn))
    }
}


export function authLogOut(time){
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, time * 1000)
    }
}

export function logout(){
    localStorage.removeItem('token')
    localStorage.removeItem('localId')
    localStorage.removeItem('expiresIn')
    return{
        type: LOG_OUT
    }
}


export function authSuccess(idToken){
     return{
         type: AUTH_SUCCESS,
         idToken
     }
}