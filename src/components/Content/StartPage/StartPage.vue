<template>
    <b-container>
        <div class='container'>
            <b-jumbotron v-bind:header="'Добро пожаловать, ' + name">
            </b-jumbotron>
        </div>
    </b-container>
</template>

<script>


export default {
    name: 'StartPage',
    props: {
        user: Object
    },
    data: function () {
        return {
           
        }
    },
    computed: {
        name: function () {
            if (this.$store.state.token) {
                return 'вы зарегистрированы!'
            } else {
                return 'незнакомец!'
            }
        }
    }
}
</script>

<style scoped>
.container {
    margin-top: 100px;
}
</style>