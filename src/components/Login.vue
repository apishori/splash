<template>
<div id="wrapper" style="background-color:#064273;">
    <b-container id="outercontainer" class="container-fluid w-25 p-5 rounded" >
        <img alt="Splash logo" src="../assets/splash_logo.png" class="center" height="100">
        <h3 id="logintitle">Dive into Splash!</h3>
        <br>
        <b-tabs content-class="mt-3">
            <b-tab title="Sign In" active>
                <b-form align-v="center">
                    <b-form-group id="input-group-1" class="label" label="Username" label-for="input-1">
                        <b-form-input id="input-1" name="username" v-model="input.username" type="text" required placeholder="Enter username"></b-form-input>
                    </b-form-group>
                    <b-form-group id="input-group-2" class="label" label="Password" label-for="input-2">
                        <b-form-input id="input-2" name="password" v-model="input.password" type="password" required placeholder="Enter password"></b-form-input>
                    </b-form-group>
                    <b-button variant="primary" type="button" class="buttoncolor my-3" v-on:click="login()">Login</b-button> <br>
                    <b-button variant="outline-light" type="button" class="my-3" v-on:click="loginAsGuest()">Login as Guest</b-button>
                </b-form>
            </b-tab>
            <b-tab title="Create Account">
                <registration></registration>
            </b-tab>
        </b-tabs>

    </b-container>
</div>
</template>

<script>
    import axios from 'axios'
    import LoginService from "../frontend_service_files/LoginService";
    import Registration from "./Registration";

    export default {
        name: "Login",
        components: {
            Registration
        },
        data() {
            return {
                input: {
                    username:"",
                    password:""
                }
            }
        },
        methods: {
            async login() {
                let status = false;
                //login and authenticate here
                await axios.post('http://localhost:80/login',
                    {
                        username: this.input.username,
                        password: this.input.password
                    })
                    .then((response) => {
                        console.log(response);
                        status = true;
                        console.log(status);
                    }, (error) => {
                        console.log(error);
                    });
                console.log('before if block');
                if (status) { //data is empty is just a placeholder rn
                    this.$store.commit('setAuthentication', true);
                    const data = await LoginService.login(this.input.username, this.input.password);
                    //console.log(data.username);
                    this.$store.commit('setUsername', data.username);
                    this.$store.commit('setFirstname', data.fname);
                    this.$store.commit('setLastname', data.lname);
                    this.$store.commit('setUser_id', data._id);
                    await this.$router.push({name: 'splash'});

                }
            },
            async loginAsGuest() {
                let status = false;
                //login and authenticate here
                await axios.post('http://localhost:80/login',
                    {
                        username: 'guest_user',
                        password: '123'
                    })
                    .then((response) => {
                        console.log(response);
                        status = true;
                        console.log(status);
                    }, (error) => {
                        console.log(error);
                    });
                console.log('before if block');
                if (status) { //data is empty is just a placeholder rn
                    this.$store.commit('setAuthentication', true);
                    this.$store.commit('toggleGuestStatus', true);

                    //const data = await LoginService.login('guest_user', '123');
                    //console.log(data.username);
                    this.$store.commit('setUsername', 'guest_user');
                    this.$store.commit('setFirstname', 'Guest');
                    this.$store.commit('setLastname', 'User');
                    await this.$router.push({name: 'splash'});

                }
            }


            // need help implementing signup method to create user

            // async signup() {
            //     let status = false;
            //     await axios.post('http://localhost:80/registration')
            // }


        }
    }
</script>

<style scoped>
    html, body {
        height: 100%;
        margin: 0;
    }

    #wrapper {
        min-height: 100vh;
    }

    #outercontainer {
        background-color: #064273;
    }

    #logintitle {
        font-family: Avenir, sans-serif;
        text-align: center;
        color: white;
    }
    .center {
        display: block;
        margin-left: auto;
        margin-right: auto;
    }

    .label {
        color: white;
    }

    .buttoncolor {
        background-color: #4AABF8;
    }
</style>