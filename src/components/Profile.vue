<template>
    <b-container id="container">
        <b-row id="profileheader">
            <b-col cols="4">
                <b-img id="profilepic" center fluid src="https://i.ibb.co/2Ynb2xg/2019-03-01-18-42-53.jpg"
                       alt="Profile Picture" rounded="circle"></b-img>
            </b-col>
            <b-col cols="8">
                <h3 id="username">@{{user.username}}</h3>
                <h5 id="fullname">{{user.fname}} {{user.lname}}</h5>
                <br>
                <p id="bio">{{user.biography}}</p>
            </b-col>
        </b-row>
        <b-container class="post my-4"
                     v-for="(droplet, index) in droplet"
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
    </b-container>
</template>

<script>
    import ProfileService from "../frontend_service_files/ProfileService";

    export default {
        name: "Profile",
        data() {
            return {
                user: {
                    img: '',
                    username: '',
                    password:'',
                    email:'',
                    fname: '',
                    lname: '',
                    verified: false,
                    biography: ''
                },
                form: {
                    fullname:'',
                    biography:''
                },
                droplet: []
            }
        }, async created() {
            try {
                const data = await ProfileService.getProfile(this.$store.state.userid);
                console.log(this.$store.state.userid);
                this.user.username = data.user_object.username;
                //finish rest of implementation here
                this.user.img = data.user_object.img;
                this.user.fname = data.user_object.fname;
                this.user.lname = data.user_object.lname;
                this.user.biography = data.user_object.bio;
                this.user.verified = data.user_object.verified;

                this.droplet = data.droplet_objects.reverse();

            } catch(err){
                this.error = err.message;
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
    #profilepic {
        object-fit: cover;
        width:200px;
        height:200px;
    }
    #username {
        font-family: "Avenir", sans-serif;
        color: #4AABF8;
    }

    #bio {
        font-family: "Helvetica Neue", sans-serif;
    }

    #container {
        text-align: left;
        padding: 70px 0;
        margin: 0 auto;
    }

    #profileheader {
        padding-bottom: 50px;
        border-bottom-style: solid;
        border-color: white;
        border-width: 2px;

    }

</style>