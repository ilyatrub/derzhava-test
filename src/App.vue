<template>
  <div id="app">
    <Navbar></Navbar>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import Navbar from './components/Navbar';
import {mapActions} from 'vuex';

export default {
  name: 'App',
  components: {
    Navbar
  },
  methods: {
    ...mapActions({
      tryAutoLogin: 'authCheckState'
    })
  },
  beforeMount: function() {
    this.tryAutoLogin();
    
  }
}
</script>

<style>

</style>
