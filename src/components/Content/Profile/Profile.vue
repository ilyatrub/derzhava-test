<template>
    <b-button variant='danger' @click='onLogout'>Выйти</b-button>
</template>

<script>
import {mapActions} from 'vuex';

export default {
    name: 'Profile',
    methods: {
        ...mapActions({
            logout: 'logout'
        }),
        onLogout: function() {
            this.logout();
            this.$router.push('/')
        }
    }
}
</script>

<style scoped>

</style>