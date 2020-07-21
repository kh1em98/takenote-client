<template>
  <div id="app">
    <Nav />
    <ListNote />
  </div>
</template>

<script>
import ListNote from "./ListNotes";
import Nav from "./Nav";

export default {
  name: "GoodApp",
  components: {
    Nav,
    ListNote
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
