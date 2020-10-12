<template>
    <div>
        <b-form align-v="center">
            <b-form-group id="create-input-group-1" class="label" label="Username" label-for="create-input-1">
                <b-form-input id="create-input-1" name="username"  type="text" v-model="input.username" required placeholder="Enter username"></b-form-input>
            </b-form-group>
            <b-form-group id="create-input-group-2" class="label" label="Password" label-for="create-input-2">
                <b-form-input id="create-input-2" name="password" type="password" v-model="input.password" required placeholder="Enter password"></b-form-input>
            </b-form-group>
            <b-form-group id="create-input-group-3" class="label" label="Confirm Password" label-for="create-input-3">
                <b-form-input id="create-input-3" name="confirmpassword" type="password" required placeholder="Confirm password"></b-form-input>
            </b-form-group>
            <b-form-group id="create-input-group-4" class="label" label="Email" label-for="create-input-4">
                <b-form-input id="create-input-4" name="createemail" type="email" v-model="input.email" required placeholder="Enter email"></b-form-input>
            </b-form-group>
            <b-form-group id="create-input-group-5" class="label" label="First Name" label-for="create-input-5">
                <b-form-input id="create-input-5" name="createfirstname" type="text" v-model="input.fname" required placeholder="Enter first name"></b-form-input>
            </b-form-group>
            <b-form-group id="create-input-group-6" class="label" label="Last Name" label-for="create-input-6">
                <b-form-input id="create-input-6" name="createlastname" type="text" v-model="input.lname" required placeholder="Enter last name"></b-form-input>
            </b-form-group>
            <b-button variant="primary" type="button" class="buttoncolor my-3" v-on:click="register()">Create Account</b-button> <br>
        </b-form>
    </div>
</template>

<script>
    import LoginService from "../frontend_service_files/LoginService";
    import axios from "axios";
    export default {
        name: "Registration",
        data() {
            return {
                input: {
                    username:'',
                    password:'',
                    fname:'',
                    lname:'',
                    email:''
                }
            }
        },
        methods: {
            async register() {
                let status = false;
                //login and authenticate here
                await axios.post('http://localhost:80/registration',
                    {
                        username: this.input.username,
                        password: this.input.password,
                        email: this.input.email,
                        fname: this.input.fname,
                        lname: this.input.lname
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
                    console.log(data);
                    this.$store.commit('setUsername', data.username);
                    this.$store.commit('setFirstname', data.fname);
                    this.$store.commit('setLastname', data.lname);
                    this.$store.commit('setUser_id', data._id);
                    await this.$router.push({name: 'splash'});

                }
            }
        }
    }
</script>

<style scoped>
    .label {
        color: white;
    }
</style>