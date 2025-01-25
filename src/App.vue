<template>
  <v-app>
    <v-main>
      <nav>
        <router-link to="/"><span class="text-h3">Phases</span></router-link> |&nbsp;
        <router-link to="/home"><span class="text-h3">Home</span></router-link> <!--|&nbsp;-->
        <!--<router-link to="/fiche"><span class="text-h3">Fiche</span></router-link>-->
      </nav>
  <router-view/>

    </v-main>
  </v-app>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: white;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
