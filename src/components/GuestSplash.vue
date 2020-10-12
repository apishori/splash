<template>
    <div id="app">
        <img alt="Splash logo" src="../assets/splash_logo.png" height="100">
        <h1 style="font-family: Avenir, sans-serif; color:white;">Dive into Splash</h1>
        <br/>
        <div class="container-fluid">
            <DailySplash></DailySplash>
        </div>
        <div><b-button variant="outline-primary" class="p-2 my-5" v-on:click="gologin()">Create an account</b-button></div>
    </div>
</template>

<script>
    import DailySplash from "./DailySplash";
    export default {
        components: {DailySplash},
        methods: {
            gologin() {
                this.$router.push({name: 'login'});
            }
        }
    }
</script>

<style scoped>
    #app {
        color: white;
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        margin-top: 0;
        background-color: #064273;
        min-height: 100vh;
    }
    * {
        margin: 0;
        padding: 0;
    }
    .wrapper {
        width: 100%;
        min-height: 100vh;
        background-color: #064273;
        margin: 0;
        padding: 5px;
        border-radius: 30px;
    }
</style>