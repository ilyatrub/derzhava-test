<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="primary">
            <b-container>
                <b-navbar-brand href="#">Держава Тест</b-navbar-brand>

                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

                <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item variant='light'><router-link to='/'>Главная</router-link></b-nav-item>
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-item><router-link v-if='isLoggedIn' to='/list' variant='light'>Список элементов</router-link></b-nav-item>
                    <b-nav-item v-if='isLoggedIn' variant='light'><router-link to='/profile'>Профиль</router-link></b-nav-item>
                    <b-nav-item v-else><router-link to='/login' variant='light'>Войти</router-link></b-nav-item>
                </b-navbar-nav>
                </b-collapse>
            </b-container>
        </b-navbar>
    </div>
</template>

<script>


export default {
    name: 'Navbar',
    computed: {
        isLoggedIn: function() {
            return this.$store.state.token ? true : false;
        }
    }
}
</script>

<style scoped>
    a {
        color: rgb(228, 228, 228)
    }
    a:hover {
        color: white
    }
    .router-link-active {
        color: white;
    }
</style>