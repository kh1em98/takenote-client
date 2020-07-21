<template>
  <div class="navbar-own pt-3">
    <div class="icon fontsize-2">
      <i class="fas fa-plus gray-5" @click="addNote"></i>
      <i class="fas fa-sync-alt gray-5" @click="sync"></i>
    </div>

    <div class="menu mt-3 fontsize-2">
      <NavItem
        v-for="(item, index) in navTitles"
        :key="index"
        :title="navTitles[index]"
        :icon="navIcons[index]"
        :link="navLink[index]"
        :index="index+1"
        :isActiveItem="index+1 === menuActiveIndex ? true : false"
        @activeItemMenu="activeItemMenu"
      />
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import EventBus from "../EventBus";
import NavItem from "./NavItem";
export default {
  name: "Nav",
  data() {
    return {
      menuActiveIndex: 1,
      navTitles: ["All Notes", "About Me", "About Project"],
      navIcons: ["fa-book", "fa-meh", "fa-briefcase"],
      navLink: ["/notes", "/", "/"]
    };
  },
  components: {
    NavItem
  },
  methods: {
    activeItemMenu(index) {
      this.menuActiveIndex = index;
    },
    async addNote() {
      let id = uuidv4();
      await this.$store.dispatch("addNote", {
        id,
        title: "",
        content: ""
      });
      EventBus.$emit("activeNewNote", id);
    },
    sync() {
      EventBus.$emit("sync");
    }
  }
};
</script>

<style>
</style>