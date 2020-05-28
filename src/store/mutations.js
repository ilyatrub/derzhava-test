export const AUTH_START = (state) => {
    state.loading = true;
    state.error = null
}

export const AUTH_SUCCESS = (state, payload) => {
    state.token = payload.idToken;
    state.userId = payload.userId;
    state.error = null;
    state.loading = false;
}

export const AUTH_FAIL = (state, error) => {
    state.error = error;
    state.loading = false;
}

export const AUTH_LOGOUT = (state) => {
    state.token = null;
    state.userId = null;
}

export const SET_AUTH_REDIRECT_PATH = (state, path) => {
    state.authRedirectPath = path;
}

export const START_LOADING = (state) => {
    state.loading = true;
}

export const FINISH_LOADING = (state) => {
    state.loading = false;
}

export const POPULATE_LIST = (state, payload) => {
    state.listData = payload.data;
}