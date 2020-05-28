import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as mutations from './mutations'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        loading: false,
        token: '',
        userId: '',
        error: null,
        authRedirectPath: '/login',
        listData: []
    },
    mutations,
    actions,
    getters: {
        getListData: state => {
            return state.listData;
        }
    }
})