<template>
  <div id="app">
    <Nav />
    <ListNotes />
  </div>
</template>

<script>
import ListNotes from "./components/ListNotes";
import Nav from "./components/Nav";

export default {
  name: "App",
  components: {
    Nav,
    ListNotes
  }
};
</script>

<style>
#app {
  display: grid;
  grid-template-columns: 200px auto;
  height: 100%;
}
</style>
