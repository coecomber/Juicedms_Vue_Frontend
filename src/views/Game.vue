<template>
  <div class="container">
    <h5>Welcome, {{ $cookies.get('username') }}. </h5>
    
    <div class="game">
      <p>Current floor: {{ characterStats.floor }} <br />
      Power: {{ characterStats.power }} <br />
      Gold: {{ characterStats.gold }} </p>

      <img v-if="characterFight.fightingMonster" src="http://217.101.44.31:8100/images/Animations/attack.gif" class="character">
      <img v-if="!characterFight.fightingMonster" src="http://217.101.44.31:8100/images/Animations/walk.gif" class="character">

      <p>Time left to kill: {{ characterFight.timeToKill }} </p>

      <img v-if="characterFight.fightingMonster" class="monster" src="http://217.101.44.31:8100/images/monsters/slime.gif">
    </div>

    
  
    <div class="chat">
      <iframe style="width: 100%; height:240px;" v-bind:src="this.chatUrl"></iframe>
    </div>

    <div class="loggedInUsers">
      <p>Currently connected players: </p>
      {{ players }}
    </div>

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
      characterStats: {
        gold: null,
        power: null,
        floor: null
      },
      characterFight: {
        fightingMonster: false,
        timeToKill: null,
        monsterToAttack: 'Slime'
      },
      characterSrc: {
        baseUrl: 'http://217.101.44.31:8100/images/Animations/',
        animation: 'walk', 
        type: '.gif'
      },
      players: null,
      chatUrl: 'http://217.101.44.31:8200/?name='+$cookies.get('username'),
      wsMessage: {
        Action: null,
        GoldToAdd: 0,
        User: {
          username: null,
          email: null
        },
      }
    }
  },created(){
    this.$options.sockets.onmessage = data => this.messageReceived(data)
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
      console.log('MSG RECEIVED: ' + data.data)
      const jsonData = JSON.parse(data.data);
      switch (jsonData.action) {
        case "UPDATEPLAYERS": {
          this.players = jsonData.content;
          break;
        }
        case "GETPLAYERINFORMATION": {
          this.characterStats.gold = jsonData.content.gold
          this.characterStats.power = jsonData.content.power
          this.characterStats.floor = jsonData.content.floor
          this.characterFight.fightingMonster = jsonData.content.fighting 
          this.characterFight.timeToKill = jsonData.content.timeToKill
          this.killMonster()
          break;
        }
      }
    },
    killMonster(){
      if(this.characterFight.timeToKill > 0){
        setTimeout(() => {
          this.characterFight.timeToKill = this.characterFight.timeToKill - 1.0
          this.killMonster()
        }, 1000)
      } else {
          this.characterFight.fightingMonster = false
          
          setTimeout(() => {
            this.sendDoneWithKillToServer()
          }, 5000)
      }
    },
    sendDoneWithKillToServer(){
      if(!this.characterFight.fightingMonster){
        this.wsMessage.Action = "NEWFIGHT";
        this.wsMessage.User.username = $cookies.get('username');
        this.wsMessage.User.email = this.$auth.user.email;
        this.wsMessage.GoldToAdd = this.characterStats.floor;
        this.$socket.send(JSON.stringify(this.wsMessage));
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
  align-items: center;
}
.character{
  position: relative;
  top: 260px;
  left: 10%;
  height: 120px;
}
.monster{
  position: absolute;
  top: 45%;
  left: 50%;
}
</style>