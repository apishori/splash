<template>
<div>
    <b-container class="container-fluid mt-5 mb-3">
        <b-form-textarea id="textarea" v-model="text" placeholder="What's on your mind..." rows="4" max-rows="6"
        ></b-form-textarea>
        <b-button variant="outline-primary" type="button" class="my-3" v-on:click="postDroplet">free your droplet</b-button> <br>
    </b-container>
    <p class="error" v-if="error">{{ error }}</p>
    <b-container class="post my-4"
                 v-for="(droplet, index) in droplets"
                 v-bind:item="droplet"
                 v-bind:index="index"
                 v-bind:key="droplet._id"
    >
        <b-row fluid align-content="center px-3 py-3">
            <b-col cols="2" align-self="center">
                <b-img class="profilepic" center fluid src="https://pbs.twimg.com/media/EJJ9ecLUcAA44pd.png"
                       alt="Profile Picture" rounded="circle"></b-img>
            </b-col>
            <b-col cols="10" align-self="center" class="text-left" >
                <b-row class="userinfo"> {{droplet.user_id.fname}} {{droplet.user_id.lname}} @{{droplet.user_id.username}} <br> </b-row>
                <b-row class="droplettext py-2"> {{ droplet.text }}</b-row>
                <b-row class="releasedate"> released at: {{ droplet.created.split("T")[0] }} </b-row>
                <!-- <img :src="droplet.img_url" alt="Droplet img"/> -->

            </b-col>
        </b-row>
    </b-container>
</div>
</template>

<script>
    import DropletService from '../frontend_service_files/DropletSevice'


    export default {
        name: "Droplet",
        data (){
            return{
                droplets: [],
                error: '',
                text: '',
                username:''
            }
        },
        async created() {
            try{
                this.droplets = await DropletService.getDroplets();
            }catch(err){
                this.error = err.message;
            }
        },
        methods: {
            async postDroplet() {
                console.log(this.$store.state.userid);
                await DropletService.postDroplets(this.text, this.$store.state.userid);

                this.droplets = await DropletService.getDroplets();

            }

        }


    }
</script>

<style scoped>
    .userinfo {
        font-size: 16px;
        color: #4AABF8;
    }

    .droplettext {
        font-size: 20px;
    }

    .releasedate {
        color: slategrey;
        font-size: 14px;
    }

    .profilepic {
        object-fit: cover;
        width:75px;
        height:75px;
    }

    .post {
        font-family: "Helvetica Neue", sans-serif;
        border-width: 3px;
        border-color: white;
        border-radius: 30px;
        background: #17202A;
    }
</style>