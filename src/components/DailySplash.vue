<template>
    <div>
    <b-container id="dailysplashcontainer" class="container-fluid mt-5" >
        <b-row fluid align-content="center" class="py-3">
            <b-col cols="8">
                <div id="dropletDiv">
                    <h1 class="title">Droplet of the Day</h1>
                    <b-row fluid align-content="center" class="post px-3 py-3" >
                        <b-col cols="2" align-self="center">
                            <b-img class="profilepic" center fluid src="https://pbs.twimg.com/media/EJJ9ecLUcAA44pd.png"
                                   alt="Profile Picture" rounded="circle"></b-img>
                        </b-col>
                        <b-col cols="10" align-self="center" class="text-left" >
                            <b-row class="userinfo">{{droplet.user_id.fname}} {{droplet.user_id.lname}} @{{droplet.user_id.username}} <br> </b-row>
                            <b-row class="droplettext py-2">{{droplet.text}}</b-row>
                            <b-row class="releasedate"> released at: {{droplet.user_id.createdAt.split("T")[0]}} </b-row>
                            <!-- <img :src="droplet.img_url" alt="Droplet img"/> -->
                        </b-col>
                    </b-row>
                    <b-row fluid class="py-3 pr-3" id="meme"><b-img center fluid v-bind:src="memeurl"></b-img></b-row>
                </div>
            </b-col>
            <b-col cols="4">
                <h1 class="title">Weather</h1>
                <b-container id="weatherDiv" class="text-center py-3">
                    <h1 id="citytitle">{{city}}</h1>
                    <h2>{{description}}</h2>
                    <h2>{{temperature.current}}°</h2>
                    <h3>Low: {{temperature.min}}°</h3>
                    <h3>High: {{temperature.max}}°</h3>
                    <h3>Feels: {{temperature.realFeel}}°</h3>
                    <h3>Humidity: {{temperature.humidity}}%</h3>
                </b-container>
            </b-col>
        </b-row>
    </b-container>
    </div>
</template>

<script>
    import DailySplashService from "../frontend_service_files/DailySplashService";

    export default {
        name: "DailySplash",
        data (){
            return{
                droplet: Object,
                description:'',
                city:'',
                temperature:{
                    current: '',
                    min:'',
                    max:'',
                    humidity:'',
                    realFeel: '',
                },
                memeurl: ''
            }
        },
        async created() {
            try{
                const data = await DailySplashService.getSplishySplashy();
                //console.log(data);
                this.droplet = data.droplet;
                this.temperature.min = data.weather_overview.main.temp_min;
                this.temperature.max = data.weather_overview.main.temp_max;
                this.temperature.humidity = data.weather_overview.main.humidity;
                this.temperature.realFeel = data.weather_overview.main.feels_like;
                this.temperature.current = data.weather_overview.main.temp;
                this.city = data.weather_overview.name;
                this.description = data.weather_details.description;
                this.memeurl = data.meme;
            }catch(err){
                this.error = err.message;
            }
        },
    }
</script>

<style scoped>
    .title {
        font-family: Avenir, sans-serif;
        font-size: 30px;
    }

    #dailysplashcontainer {
        min-height: 60vh;
    }

    #dropletDiv{
        min-height: 50vh;
    }
    #weatherDiv{
        font-family: Helvetica Neue, sans-serif;
        min-height: 50vh;
        border-width: 3px;
        border-color: white;
        border-radius: 30px;
        background-image: url("../assets/weatherbg.png");
    }

    #citytitle {
        font-family: Avenir, sans-serif;
        color: white;
    }

    /* droplet styling */
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