<template>
  <p>{{ info }}</p>
  <button @click="addTask">ADD TASK</button>
  <button @click="getUsers">GET USERS</button>
  <p>userInfo</p>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      info:null,
      userInfo:null
    }
  },
  mounted() {
    axios
    .get('http://localhost:8000/api/tasks/')
    .then(response => (this.info = response))
  },
  methods: {
    addTask() {
      axios
      .post('http://localhost:8000/api/tasks/',{
        "title": "task front",
        "discription": "this is task",
        "status": "draft",
        "author": 1
      })
      .then(response => (this.info = response))
    },
    getUsers() {
      axios
      .get('http://localhost:8000/api/users/')
      .then(response => (this.userInfo = response))
    }
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
