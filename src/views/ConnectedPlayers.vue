<template>
  <div class="container">
    <h5>Welcome, {{ $cookies.get('username') }}. </h5>
    <p>The following players are currently playing: </p>

    {{ players }}

  </br>

  </div>
</template>

<script>
import axios from 'axios';
import discoveryService from "../discovery-service/Eureka-service.js";

export default {
  name: "game",
  data(){
    return {
      players: null,
      chatUrl: 'http://217.101.44.31:8200/?name=' + $cookies.get('username'),
      wsMessage: {
        Action: null,
        User: {
          username: null,
          email: null
        },
      }
    }
  },created(){
    this.$options.sockets.onmessage = data => this.messageReceived(data);
  },
  mounted(){
    this.checkIfCharacterSelected()
    this.registerWithWebsocketServer()
  }, methods:{
    checkIfCharacterSelected(){
      if($cookies.get('username') === 'null'){
        this.$router.push('characterselection') 
      }
    },
    async registerWithWebsocketServer() {
      console.log('register method called')
      if($cookies.get('username') !== null){
        this.wsMessage.Action = "REGISTER";
        this.wsMessage.User.username = $cookies.get('username');
        this.wsMessage.User.email = this.$auth.user.email;
        this.$socket.send(JSON.stringify(this.wsMessage));
      }
      console.log(this.wsMessage);
    },
    messageReceived(data){
      const jsonData = JSON.parse(data.data);
      console.log(jsonData)
      switch (jsonData.action) {
        case "UPDATEPLAYERS": {
          console.log(jsonData.content)
          this.players = jsonData.content;
          break;
        }
      }
    }
  }
};
</script>

<style>
.game{
  height: 500px;
  background-image: url(http://217.101.44.31:8100/images/background1.jpg);
  background-size: cover;
  background-repeat: no-repeat;
}


</style>