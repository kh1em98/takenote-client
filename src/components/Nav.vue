<template>
  <div class="navbar-own pt-3">
    <div class="icon fontsize-2">
      <i class="fas fa-plus gray-5" @click="addNoteTemp"></i>
      <i class="fas fa-sync-alt gray-5"></i>
      <i class="fas fa-cog gray-5"></i>
    </div>

    <div class="menu mt-3 fontsize-2">
      <NavItem
        v-for="(item, index) in navTitles"
        :key="index"
        :title="navTitles[index]"
        :icon="navIcons[index]"
        :index="index+1"
        :isActiveItem="index+1 === menuActiveIndex ? true : false"
        @activeItemMenu="activeItemMenu"
      />
    </div>
  </div>
</template>

<script>
import EventBus from "../EventBus";
import NavItem from "./NavItem";
export default {
  name: "Nav",
  data() {
    return {
      menuActiveIndex: 1,
      navTitles: [
        "All Notes",
        "Trash",
        "Favorite",
        "About Me",
        "About Project"
      ],
      navIcons: [
        "fa-book",
        "fa-trash-alt",
        "fa-heart",
        "fa-meh",
        "fa-briefcase"
      ]
    };
  },
  components: {
    NavItem
  },
  methods: {
    activeItemMenu(index) {
      this.menuActiveIndex = index;
    },
    async addNoteTemp() {
      await this.$store.dispatch("AddNoteTemp");
      EventBus.$emit("activeNewNote");
    }
  }
};
</script>

<style>
</style>