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
  <template #header>
    <span class="dialog-header">
      タスク追加フォーム
    </span>
  </template>
  <el-form>
    <el-form-item label="タスク名">
      <el-input v-model="task.title" autocomplete="off"></el-input>
      <el-select v-model="task.status">
        <el-option v-for="status in taskStatusSelect" :key="status" :value="status" :label="status"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="詳細">
      <el-input type="textarea" v-model="task.discription" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="担当者">
      <el-select v-model="task.author">
        <el-option v-for="user in userInfo" :key="user.id" :value="user.id" :label="user.name"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <template #footer>
    <span class="dialog-footer">
      <el-button @click="dialogVisible = false">Cancel</el-button>
      <el-button type="primary" @click="dialogVisible = false;addTask()">Confirm</el-button>
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
      dialogVisible:false,
      task: {
        "title": "",
        "discription": "",
        "status": "",
        "author": null
      },
      taskStatusSelect:["draft", "wip", "done"]
    }
  },
  mounted() {
    axios
    .get('http://localhost:8000/api/tasks/')
    .then(response => (this.info = response))

    this.getUsers()
  },
  methods: {
    addTask() {
      axios
      .post('http://localhost:8000/api/tasks/',this.task)
      .then(response => (this.info = response))

      console.log()
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
  },
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
