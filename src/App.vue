<template>
<div>
<el-menu
  class="header"
  mode="horizontal"
  background-color="#545c64"
  active-text-color="#ffd04b">
<div style="text-align:center;margin:0 auto;">
  <span style="font-size:28px;font-weight:bold;color:white;">タスク管理ツール</span>
</div>
</el-menu>
<el-row>
  <el-col :span="8">
    <el-card v-for="(draft,id) in draftList" :key="id" shadow="hover">
      <template #header>
        <div class="card-header">
          <span>{{ draft.title }}</span>
        </div>
      </template>
      <template #body>
        {{ draft.discription }}
      </template>
      {{ author(draft.author) }}
    </el-card>
  </el-col>
  <el-col :span="8">
    <el-card v-for="(wip,id) in wipList" :key="id" shadow="hover">
      <template #header>
        <div class="card-header">
          <span>{{ wip.title }}</span>
        </div>
      </template>
      <template #body>
        {{ wip.discription }}
      </template>
      {{ author(wip.author) }}
    </el-card>
  </el-col>
  <el-col :span="8">
    <el-card v-for="(done,id) in doneList" :key="id" shadow="hover">
      <template #header>
        <div class="card-header">
          <span>{{ done.title }}</span>
        </div>
      </template>
      <template #body>
        {{ done.discription }}
      </template>
      {{ author(done.author) }}
    </el-card>
  </el-col>
</el-row>
<el-button type="primary" @click="dialogVisible = true">タスク追加</el-button>

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
</div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      info:null,
      taskInfo:[],
      draftList:[],
      wipList:[],
      doneList:[],
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
    this.updateTaskInfo()
    this.getUsers()
  },
  methods: {
    updateTaskInfo() {
      axios
      .get('http://localhost:8000/api/tasks/')
      .then(response => {
        console.log(response)
        for (var i = 0;i < response.data.length;i++) {
          switch(response.data[i].status) {
            case 'draft':
              this.draftList.push({
                "id":response.data[i].id,
                "title":response.data[i].title,
                "discription":response.data[i].discription,
                "author":response.data[i].author
              })
            break;
            case 'wip':
              this.wipList.push({
                "id":response.data[i].id,
                "title":response.data[i].title,
                "discription":response.data[i].discription,
                "author":response.data[i].author
              })
            break;
            case 'done':
              this.doneList.push({
                "id":response.data[i].id,
                "title":response.data[i].title,
                "discription":response.data[i].discription,
                "author":response.data[i].author
              })
            break;
          }
        }
      })
    },
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
    },
    author(id) {
      var result = ''
      for (var i = 0;i < this.userInfo.length;i++) {
        if(this.userInfo[i].id === id) {
          result = this.userInfo[i].name
        } else {
          result = 'unknown'
        }
      }
      return result
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.header {
  width:100vw;
  height:10vh;
  background-color:black;
}
</style>
