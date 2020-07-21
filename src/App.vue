<template>
  <div id="app">
    <Nav />
    <ListNote />
  </div>
</template>

<script>
import ListNote from "./components/ListNotes";
import Nav from "./components/Nav";

export default {
  name: "App",
  components: {
    Nav,
    ListNote
  }
};
</script>

<style>
@import "./assets/styles/boiler.css";
@import "./assets/styles/style.css";

#app {
  display: grid;
  grid-template-columns: 200px auto;
  height: 100%;
}
</style>
