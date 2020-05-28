import * as actionTypes from './actionTypes';
import axios from 'axios';
import faker from 'faker';

export const authStart = ({commit}) => {
    commit(actionTypes.AUTH_START);
}

export const authSuccess = ({commit}, idToken, userId) => {
    commit(actionTypes.AUTH_SUCCESS, {idToken, userId});
}

export const authFail = ({commit}, error) => {
    commit(actionTypes.AUTH_FAIL, error);
}

export const logout = ({commit}) => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    commit(actionTypes.AUTH_LOGOUT)
}

export const checkAuthTimeout = ({dispatch}, payload) => {
        setTimeout(() => {
            dispatch('logout');
        }, payload.expirationTime*1000)
}

export const auth = ({dispatch}, payload) => {
        dispatch('authStart');
        const authData = {
            email: payload.email,
            password: payload.password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDk-4PHmq6NLzXhhsfMjWp9o8gLIESGKO8';
        if (!payload.isSignup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDk-4PHmq6NLzXhhsfMjWp9o8gLIESGKO8'
        }
        axios.post(url, authData)
            .then(response => {
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);
                dispatch('authSuccess', {
                    idToken: response.data.idToken,
                    userId: response.data.localId
                });
                dispatch('checkAuthTimeout', {
                    expirationTime: response.data.expiresIn
                })
            })
            .catch(error => {
                dispatch('authFail', {
                    error: error.response.data.error
                })
            })
}

export const setAuthRedirectPath = ({commit}, path) => {
    commit(actionTypes.SET_AUTH_REDIRECT_PATH, {
        path: path
    })
}

export const authCheckState = ({dispatch}) => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch('logout');
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch('logout');
            } else {
                const userId = localStorage.getItem('userId');
                dispatch('authSuccess', {
                    isToken: token,
                    userId: userId
                });
                dispatch('checkAuthTimeout', {
                    expirationTime: ((expirationDate.getTime() - new Date().getTime())/1000)
                });
            }
        }
}

export const populateList = ({commit}) => {
    commit('START_LOADING')
    let listData = []
    for(let i = 0; i < 500; i++){
        let data = {};
        data.Name = faker.name.findName();
        data.Position = faker.name.jobTitle();
        data.Office = faker.address.city();
        data.Age = faker.random.number().toFixed(0) % 100;
        let date = faker.date.recent()
        data.startDate = `${date.getFullYear()}/${date.getMonth() >= 9 ? date.getMonth() : `0${date.getMonth() + 1}`}/${date.getDate()}`;
        data.Salary = faker.random.number().toFixed(2)
        data.Currency = faker.finance.currencySymbol();
        listData.push(data);
    }
    commit('POPULATE_LIST', {data: listData});
    commit('FINISH_LOADING');
}