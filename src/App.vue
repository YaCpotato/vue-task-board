<template>
  <p>{{ info }}</p>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      info:null
    }
  },
  mounted() {
    axios
    .get('http://localhost:8000/api/tasks/')
    .then(response => (this.info = response))
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
