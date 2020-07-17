<template>
  <div
    class="note-container pl-4 pr-4 pb-3 pt-3"
    @click="activeNote(index)"
    :class="{'note-active' : isActive}"
  >
    <div class="note">
      <p id="note-title" class="gray-9 fontweight-2 fontsize-3 mb-1">{{note.title}}</p>

      <div>
        <i class="fas fa-book gray-5 mt-1 mr-2"></i>
        <p class="gray-6 fontsize-1 fontweight-1">{{note.lastModified | formatDate}}</p>
      </div>
    </div>

    <div class="note-option pt-2 pl-2 pr-2 pb-2" @click="openDropDown(index)">
      <span class="note-option-dot"></span>
      <span class="note-option-dot"></span>
      <span class="note-option-dot"></span>
    </div>

    <DropdownOptions v-if="isOpenDropdown" :id="note._id" />
  </div>
</template>

<script>
import DropdownOptions from "./DropdownOptions";

export default {
  name: "Note",
  props: ["note", "index", "isOpenDropdown", "isActive"],
  methods: {
    activeNote(index) {
      this.$emit("activeNote", index);
    },
    openDropDown(index) {
      this.$emit("openDropDown", index);
    }
  },
  components: {
    DropdownOptions
  }
};
</script>

<style lang="scss">
.note-container {
  width: 100%;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #ced4da;
  position: relative;

  #note-title {
    width: 100%;
    overflow: hidden;
    height: 25px !important;
  }

  .note {
    div {
      width: auto;
      display: flex;
      align-items: center;
    }
  }

  .note-option {
    display: flex;
    flex-direction: row;
    .note-option-dot {
      display: block;
      width: 3px;
      height: 3px;
      margin-left: 1px;
      border-radius: 50%;
      background: #495057;
    }
  }

  &:hover {
    background: #ccc;
  }
}

.note-active {
  background: #5183f5;
  p {
    color: #f8f9fa !important;
  }

  .note-option-dot {
    background: #f8f9fa !important;
  }

  &:hover {
    background: #5183f5 !important;
  }
}
</style>