<template>
  <div>
    <home-content />
  </div>
</template>

<script>

import HomeContent from "../components/home/HomeContent";

export default {
  name: "home",
  components: {
    HomeContent
  },
  mounted(){
    this.checkIfLoggedIn();
  },
  methods:{
    checkIfLoggedIn(){
      setTimeout(this.fetchHole, 1000)
      console.log(this.$auth.user.name)
      if(this.$auth.user.email == undefined){
        console.log('is null')
      } else{
        console.log('not null')
      }
    }
  },
  ready(){
    this.checkIfLoggedIn()
  }
};
</script>

<style lang="scss" scoped>

</style>
