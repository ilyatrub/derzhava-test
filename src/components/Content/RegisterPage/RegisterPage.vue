<template>
    <b-container>
        <b-jumbotron header='Войдите или зарегистрируйтесь!' style='textAlign: center'>
            <b-button variant='outline-primary'><router-link to='/login'>Перейти ко входу</router-link></b-button>
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
                    <b-alert :show='form.error' variant='danger'>Пароль должен содержать хотя бы одну цифру (0-9) и специальный символ (!?,.@#$%^*())</b-alert>
                </b-form-group>
                <b-form-group id='input-group-3'>
                    <b-form-checkbox
                        id='input-3'
                        v-model='form.register'
                        name='input-3'
                        required
                    >Зарегистрировать меня!</b-form-checkbox>
                </b-form-group>
                <b-button type="submit" variant="outline-primary">Зарегистрироваться</b-button>
            </b-form>
            </div>
        </b-jumbotron>
    </b-container>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'RegisterPage',
    data: function() {
        return {
            form: {
                email: '',
                password: '',
                register: false,
                error: false
            }
        }
    },
    methods: {
        ...mapActions({
            auth: 'auth'
        }),
        validatePassword: function(pass) {
            let digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
            let specialSymbols = ['!', '?', ',', '.', '@', '#', '$', '%', '^', '*', '(', ')']
            let hasDigit = digits.some(digit => pass.indexOf(digit) != -1);
            let hasSpecialSymbol = specialSymbols.some(symbol => pass.indexOf(symbol) != -1);
            return hasDigit && hasSpecialSymbol;
        },
        onSubmit: function() {
            let isSignup = true;
            if (this.validatePassword(this.form.password)){
                this.auth({email: this.form.email, password: this.form.password, isSignup: isSignup});
                this.$router.push('/');
            } else {
                this.form.error = true;
            }
            
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