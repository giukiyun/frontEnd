<template>
  <div class="user container">
    <h1 class="page-header">用户管理</h1>
    <table class="table table-striped">
      <thead>
        <th>姓名</th>
        <th>电话</th>
        <th>邮箱</th>
        <th></th>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{user.name}}</td>
          <td>{{user.phone}}</td>
          <td>{{user.email}}</td>
          <td><router-link :to="/user/ + user.id">详情</router-link></td>
        </tr>
      </tbody>
    </table>
     <router-view />
  </div>
</template>

<script>
export default {
  name: "User",
  data() {
    return{
      users: [],
    }
    
  },
  methods: {
    fetchUser() {
      let me = this;
      const axios = require("axios");
      axios
        .get("http://localhost:3000/users")
        .then(res => {
          console.log(res);
          me.users = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created(){
    this.fetchUser();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
