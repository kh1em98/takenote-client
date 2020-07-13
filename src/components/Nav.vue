<template>
  <div class="navbar-own pt-3">
    <div class="icon fontsize-2">
      <i class="fas fa-plus gray-5"></i>
      <i class="fas fa-sync-alt gray-5"></i>
      <i class="fas fa-cog gray-5"></i>
    </div>

    <div class="menu mt-3 fontsize-2">
      <div class="item pl-1">
        <i class="fas fa-book gray-5 mr-3 ml-3 pt-3 pb-3"></i>
        <p class="gray-5">All Notes</p>
      </div>

      <div class="item pl-1">
        <i class="fas fa-trash-alt gray-5 mr-3 ml-3 pt-3 pb-3"></i>
        <p class="gray-5">Trash</p>
      </div>
      <div class="item pl-1">
        <i class="fas fa-heart gray-5 mr-3 ml-3 pt-3 pb-3"></i>
        <p class="gray-5">Favorite</p>
      </div>

      <div class="item pl-1">
        <i class="fas fa-meh gray-5 mr-3 ml-3 pt-3 pb-3"></i>
        <p class="gray-5">About Me</p>
      </div>
      <div class="item pl-1">
        <i class="fas fa-briefcase gray-5 mr-3 ml-3 pt-3 pb-3"></i>
        <p class="gray-5">About Project</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Nav"
};
</script>

<style>
</style>