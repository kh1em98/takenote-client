<template>
  <div class="note-container pl-4 pr-4 pb-3 pt-3" @click="activeNote(index)">
    <div class="note">
      <p class="gray-9 fontweight-1 fontsize-3">{{note.title}}</p>
      <p class="gray-7 fontsize-2">{{note.content}}</p>
      <p class="gray-6 fontsize-1">{{note.lastModified | formatDate}}</p>
    </div>

    <div class="note-option pt-3 pl-3 pr-3 pb-3" @click="openDropDown(index)">
      <span class="note-option-dot"></span>
      <span class="note-option-dot"></span>
      <span class="note-option-dot"></span>
    </div>

    <DropdownOptions v-if="isOpenDropdown" />
  </div>
</template>

<script>
import DropdownOptions from "./DropdownOptions";

export default {
  name: "Note",
  props: ["note", "index", "isOpenDropdown"],
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
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #ced4da;
  position: relative;

  .note {
    p {
      margin-bottom: 0.5rem;
    }
    p:nth-last-child(1) {
      margin-bottom: 0;
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

.active {
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