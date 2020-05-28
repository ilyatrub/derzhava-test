<template>
    <b-container>
        <b-jumbotron header='Войдите или зарегистрируйтесь!' style='textAlign: center'>
            <b-button variant='outline-primary'><router-link to='/register'>Перейти к регистрации</router-link></b-button>
            <hr>
            <div class='formContent'>
            <b-form @submit.prevent="onSubmit" >
                <b-form-group
                    type='email'
                    id="input-group-1"
                    label="Email:"
                    label-for="input-1"
                >
                    <b-form-input
                    id="input-1"
                    v-model="form.email"
                    type="email"
                    required
                    placeholder="Введите Email"
                    ></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-2" label="Пароль:" label-for="input-2">
                    <b-form-input
                    type='password'
                    id="input-2"
                    v-model="form.password"
                    required
                    placeholder="Введите пароль"
                    ></b-form-input>
                </b-form-group>
                <b-button type="submit" variant="outline-primary">Войти</b-button>
            </b-form>
                
            </div>
        </b-jumbotron>
    </b-container>
</template>

<script>
import {mapActions} from 'vuex';

export default {
    name: 'LoginPage',
    props: {
        authError: Boolean
    },
    data: function() {
        return {
            form: {
                email: '',
                password: ''
            }
        }
    },
    methods: {
        ...mapActions({
            auth: 'auth'
        }),
        onSubmit: function() {
            let isSignup = false;
            this.auth({email: this.form.email, password: this.form.password, isSignup: isSignup});
            this.$router.push('/');
        }
    }
    
}
</script>

<style scoped>
a:hover {
    text-decoration: none;
    color: white;
}
.formContent {
    margin: 0 auto;
    width: 40%
}
</style>