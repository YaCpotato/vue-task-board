<template>
  <p>{{ info }}</p>
  <button @click="addTask">ADD TASK</button>
  <button @click="getUsers">GET USERS</button>
  <p v-for="user in userInfo" :key="user.id">{{ user.name }}</p>

<el-button type="text" @click="dialogVisible = true">click to open the Dialog</el-button>

<el-dialog
  title="Tips"
  v-model="dialogVisible"
  width="30%">
  <span>This is a message</span>
  <template #footer>
    <span class="dialog-footer">
      <el-button @click="dialogVisible = false">Cancel</el-button>
      <el-button type="primary" @click="dialogVisible = false">Confirm</el-button>
    </span>
  </template>
</el-dialog>

</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      info:null,
      userInfo:[],
      dialogVisible:false
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
      .then(response => {
        for (var i = 0;i < response.data.length;i++) {
          this.userInfo.push({
            "id":response.data[i].id,
            "name":response.data[i].username
          })
        }
      })
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
