<template>
  <div class="dropdown-options">
    <div class="option-item gray-7 pt-2 pl-3 pr-3 pb-2">
      <i class="far fa-star mr-4 gray-7"></i>
      <span>Favorite</span>
    </div>
    <div class="option-item gray-7 pt-2 pl-3 pr-3 pb-2" @click="deleteNote(id)">
      <i class="far fa-trash-alt mr-4 gray-7"></i>
      <span>Delete</span>
    </div>
    <div class="option-item gray-7 pt-2 pl-3 pr-3 pb-2" @click="downloadNote">
      <i class="fas fa-download mr-4 gray-7"></i>
      <span>Download</span>
    </div>
  </div>
</template>

<script>
import EventBus from "../EventBus";

export default {
  name: "DropdownOptions",
  props: ["id"],
  methods: {
    async deleteNote(id) {
      await this.$store.dispatch("deleteNote", id);
      EventBus.$emit("reset");
    },
    downloadNote() {
      this.$emit("downloadNote");
    }
  }
};
</script>

<style lang="scss">
.dropdown-options {
  z-index: 2;
  position: absolute;
  right: -220px;
  top: 15px;
  background: white;
  color: black;
  min-width: 250px;
  padding: 0.25rem;
  border: 1px solid #c3c3c3;
  border-radius: 4px;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.07), 0 5px 5px rgba(0, 0, 0, 0.2);

  .option-item {
    display: flex;
    align-items: center;
    i {
      display: block;
      width: 12px;
    }

    &:hover {
      background: #e9ecef;
    }
  }
}
</style>