<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {}

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
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
  margin: 0;
  padding: 5px;
  border-radius: 30px;
}

.change__style {
  background-color: #eee;
  font-size: 1em;
  margin-bottom: 10px;
  padding: 5px;
}
</style>
