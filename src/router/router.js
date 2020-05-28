import Vue from 'vue';
import Router from 'vue-router';
import StartPage from '../components/Content/StartPage/StartPage.vue';
import LoginPage from '../components/Content/LoginPage/LoginPage.vue';
import RegisterPage from '../components/Content/RegisterPage/RegisterPage.vue';
// import Profile from '../components/Content/Profile/Profile.vue';
// import List from '../components/Content/List/List.vue';

Vue.use(Router);

const List = () => import('../components/Content/List/List.vue');
const Profile = () => import('../components/Content/Profile/Profile.vue');

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/login',
            name: 'login',
            component: LoginPage,
            meta: {
                authRequired: false,
                isAlreadyAuthenticated: true
            },
            props: {
                authError: false
            }
        },
        {
            path: '/register',
            name: 'register',
            component: RegisterPage,
            meta: {
                authRequired: false,
                isAlreadyAuthenticated: true
            }
        },
        {
            path: '/profile',
            name: 'profile',
            component: Profile,
            meta: {
                authRequired: true
            }
        },
        {
            path: '/list',
            name: 'list',
            component: List,
            meta: {
                authRequired: true
            },
        },
        {
            path: '/',
            name: 'start',
            component: StartPage,
            meta: {
                authRequired: false
            }
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (!to.meta.authRequired) {
        if (to.meta.isAlreadyAuthenticated && localStorage.getItem('token')) {
            return next('/profile');
        } else {
            return next();
        }
    } else {
        if (localStorage.getItem('token')){
            return next();
        } else {
            return next('/login');
        }
    }

})

export default router;