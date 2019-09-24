<template>
  <div class="details container">
    <h1 class="page-header">编辑用户</h1>
    <form @submit="updateUser">
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
        <button class="btn btn-primary" type="button" @click="updateUser">确认</button>
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
    fetchUser(id) {
      let me = this;
      const axios = require("axios");
      axios
        .get("http://localhost:3000/users/" + id)
        .then(res => {
          console.log("user", res);
          me.user = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateUser() {
      let me = this;
      if (!this.user.name || !this.user.phone || !this.user.email) {
        this.alert="请添加对应的信息！";
      } else {
        let updateUser = {
          name: this.user.name,
          phone: this.user.phone,
          email: this.user.email
        };

        const axios = require("axios");
        axios
          .put("http://localhost:3000/users/" + me.$route.params.id, updateUser)
          .then(res => {
            me.$router.push({
              path: "/",
              query: { alert: "用户信息更新成功" }
            });
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  },
  created() {
    this.fetchUser(this.$route.params.id);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
