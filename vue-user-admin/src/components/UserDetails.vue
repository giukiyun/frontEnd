<template>
  <div class="details container">
     <router-link class="btn btn-default" to="/">返回</router-link>
    <h1 class="page-header">
      {{user.name}}
      <span class="pull-right">
        
      </span>
    </h1>
    <ul class="list-group">
      <li class="list-group-item">
        <span class="glyphicon glyphicon-phone">{{user.phone}}</span>
      </li>
      <li class="list-group-item">
        <span class="glyphicon glyphicon-envelope">{{user.email}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "userDetails",
  data() {
    return{
      user: {},
    }
    
  },
  methods: {
    fetchUser(id) {
      let me = this;
      const axios = require("axios");
      axios
        .get("http://localhost:3000/users/" +id)
        .then(res => {
          console.log("user",res);
          me.user = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created(){
    this.fetchUser(this.$route.params.id);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
