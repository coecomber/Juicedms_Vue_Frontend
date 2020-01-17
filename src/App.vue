<template>
  <div id="app" class="d-flex flex-column h-100">
    <nav-bar />
      <div id="myContainer" class="container flex-grow-1">
        <error />
        <div class="mt-5">
          <router-view />
        </div>
      </div>
    <footer class="bg-light text-center p-3">
      <p>
        ©Juiced client 2020 
        
        <div v-if="$cookies.get('username') !== 'null'">
            Current character: {{$cookies.get('username')}}
        </div>

      </p>
    </footer>
  </div>
</template>

<script>
import NavBar from "./components/navbar/NavBar";
import Error from "./components/error/Error";

export default {
  components: {
    NavBar,
    Error
  }
};
</script>
