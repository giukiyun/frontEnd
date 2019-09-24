<template>
  <div class="details container">
    <h1 class="page-header">添加用户</h1>
    <form @submit="addUser">
      <div class="well">
        <h4>用户信息</h4>
        <div class="form-group">
          <label>姓名</label>
          <input type="text" class="form-control" placeholder="name" v-model="user.name" />
        </div>
        <div class="form-group">
          <label>电话</label>
          <input type="text" class="form-control" placeholder="phone" v-model="user.phone" />
        </div>
        <div class="form-group">
          <label>邮箱</label>
          <input type="text" class="form-control" placeholder="email" v-model="user.email" />
        </div>
        <button class="btn btn-primary" type="button" @click="addUser">提交</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "updateUser",
  data() {
    return {
      user: {}
    };
  },
  methods: {
    addUser() {
      let me = this;
      if (!this.user.name || !this.user.phone || !this.user.email) {
        this.alert = "请添加对应的信息！";
      } else {
        let newUser = {
          name: this.user.name,
          phone: this.user.phone,
          email: this.user.email
        };
        const axios = require("axios");
        axios
          .post("http://localhost:3000/users/",newUser)
          .then(res => {
            me.$router.push({
              path: "/",
              query: { alert: "用户信息添加成功" }
            });
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
