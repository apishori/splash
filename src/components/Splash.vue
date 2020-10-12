<template>
    <div id="app">
        <img alt="Splash logo" src="../assets/splash_logo.png" height="100">
        <h1 style="font-family: Avenir, sans-serif; color:white;">Dive into Splash</h1>
        <br/>

        <div class="container-fluid">
            <tabs :mode="mode">
                <tab title="Daily Splash">
                    <DailySplash></DailySplash>
                </tab>
                <tab title="Watering Hole" v-on:click="authenticateWateringhole()">
                    <droplet></droplet>
                </tab>
                <tab title="Profile">
                    <profile></profile>
                </tab>
            </tabs>
        </div>
        <opening-page msg="Welcome to Splash"/>
    </div>
</template>

<script>
    import openingPage from './openingPage.vue'
    import Tab from './Tab.vue'
    import Tabs from './Tabs.vue'
    import Droplet from './Droplet.vue'
    import Profile from "./Profile";
    import DailySplash from "./DailySplash";

    import Vue from 'vue'
    import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
    // Install BootstrapVue
    Vue.use(BootstrapVue)
    // Optionally install the BootstrapVue icon components plugin
    Vue.use(IconsPlugin)
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'

    export default {
        name: "Splash",
        components: {
            Profile,
            openingPage,
            Tab,
            Tabs,
            Droplet,
            DailySplash
        },
        data () {
            return {
                mode:'light'
            }
        },
        methods:{
            authenticateWateringhole(){
                this.$router.push({name: '/wateringhole'});
            }
        }

    }
</script>

<style scoped>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        /*margin-top: 0;*/
        min-height: 100vh;
        background-color: #064273;
    }

    * {
        margin: 0;
        padding: 0;
        font-family: 'Karla', sans-serif;
    }
    .wrapper {
        width: 100%;
        min-height: 100vh;
        background-color: #064273;
        border-radius: 30px;
        margin: 0;
        padding: 5px;
    }
</style>