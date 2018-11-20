<template>
  <div id="app">
    <tabulardata></tabulardata>
  </div>
</template>

<script>
import tabulardata from "./components/tabulardata.vue";

export default {
  name: "app",
  components: {
    tabulardata
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
