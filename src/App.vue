<template>
  <div id="app">
    <Nav />
    <ListNotes />
    <AddNote />
  </div>
</template>

<script>
import AddNote from "./components/AddNote";
import ListNotes from "./components/ListNotes";
import Nav from "./components/Nav";

export default {
  name: "App",
  components: {
    Nav,
    ListNotes,
    AddNote
  }
};
</script>

<style>
#app {
  display: grid;
  grid-template-columns: 200px 330px auto;
  height: 100vh;
}
</style>
