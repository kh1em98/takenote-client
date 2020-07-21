<template>
  <div class="pl-1 item" @click="activeItemMenu(index)" :class="{'item-active': isActiveItem}">
    <i class="fas fa-book gray-5 mr-3 ml-3 pt-3 pb-3" :class="icon"></i>
    <p class="gray-5">{{title}}</p>
  </div>
</template>

<script>
export default {
  name: "nav-item",
  props: ["index", "title", "icon", "isActiveItem", "link"],
  methods: {
    activeItemMenu(index) {
      this.$emit("activeItemMenu", index);
    }
  }
};
</script>

<style>
</style>