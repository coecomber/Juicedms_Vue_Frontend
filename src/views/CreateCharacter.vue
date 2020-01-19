<template>
    <div>
      <div>
        <h5>Username</h5>
        <input type="text" v-model="userName" />
      </div>
      </br>
      <div>
        <input type="submit" value="Create character" v-on:click="submit" />
      </div>
    </div>
</template>

<script>
import axios from 'axios';
import discoveryService from "../discovery-service/Eureka-service.js";

export default {
  name: "createcharacter",
  data: () => ({
    userName: ''
  }),
  methods:{
      submit: async function() {
        const { userName } = this;
        discoveryService.getInstance("character-service").then(response => {
        axios
          .post(response.data + 'api/public/character/add/' + userName + '/' + this.$auth.user.email )
          .then(response => (this.characters = JSON.stringify(response.data)))
          .catch()
        
        this.$router.push('characterselection') 
        return response.data
      });
    }
  }
}
  
</script>

<style>

</style>
