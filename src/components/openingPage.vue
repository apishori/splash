<template>
  <div class="hello" style="color: white; background-color: #064273">
    <h1>{{ msg }}</h1>
    <h3 style="color: white;">Project members</h3>
    <ul style="color: white;">
      <li><a href="https://vuejs.org" target="_blank" rel="noopener">Ryan</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Armaan</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Alex</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Lauren</a></li>
      <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">Vedant</a></li>
      <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">Jocelyn</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'openingPage',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #c2b280;
}
</style>
