<template>
  <div class="right-section">
    <div class="list-notes">
      <div class="note-search-container mt-3 ml-3">
        <input
          id="note-search"
          type="text"
          class="gray-9 pl-3 pr-5 pb-3 pt-3 fontsize-3"
          placeholder="Search for notes"
          @keyup="turnOnSearchMode"
          v-model="searchValue"
        />

        <i class="fas fa-eraser gray-5 erase-input pt-3 pb-3 pr-3 pl-2" @click="turnOffSearchMode"></i>
      </div>

      <div class="mt-3 list" v-if="!onSearchMode">
        <NoteItem
          v-for="(note) in noteItems"
          :key="note._id"
          :note="note"
          :isOpenDropdown="note._id === dropdownOpenId ? true : false"
          @activeNote="activeNote"
          @openDropDown="openDropdown"
          :isActive="note._id === activeNoteId"
        />
      </div>

      <div class="mt-3 list" v-if="onSearchMode">
        <NoteItem
          v-for="(note) in notesMatch"
          :key="note._id"
          :note="note"
          :isOpenDropdown="note._id === dropdownOpenId ? true : false"
          @activeNote="activeNote"
          @openDropDown="openDropdown"
          :isActive="note._id === activeNoteId"
        />
      </div>
    </div>
    <Editor
      v-if="activeNoteId !== null"
      :note="this.noteItems.find(item => item._id === activeNoteId)"
    />
    <NullEditor v-if="activeNoteId === null" />
  </div>
</template>

<script>
import EventBus from "../EventBus";
import NoteItem from "./Note";
import { mapGetters } from "vuex";
import Editor from "./EditorContent";
import NullEditor from "./NullEditor";
export default {
  name: "ListNotes",
  data() {
    return {
      searchValue: "",
      activeNoteId: null,
      dropdownOpenId: null,
      onSearchMode: false
    };
  },
  components: {
    NoteItem,
    Editor,
    NullEditor
  },
  computed: {
    ...mapGetters(["noteItems", "notesMatch"])
  },
  created() {
    this.$store.dispatch("getNoteItems");
    EventBus.$on("activeNewNote", () => {
      this.activeNoteId = 1;
    });

    EventBus.$on("resetActiveNoteId", () => {
      this.activeNoteId = null;
    });
  },
  methods: {
    turnOffSearchMode() {
      let noteSearchInput = document.getElementById("note-search");
      noteSearchInput.focus();
      this.searchValue = "";
      this.onSearchMode = false;
      this.activeNoteId = null;
    },
    activeNote(id) {
      if (id !== this.activeNoteId) {
        this.activeNoteId = id;
      }
    },
    openDropdown(id) {
      this.activeNote(id);
      this.dropdownOpenid = id;
    },
    turnOnSearchMode() {
      if (this.searchValue !== "") {
        const eraseInputIcon = document.querySelector(".erase-input");
        eraseInputIcon.style.display = "block";
        this.onSearchMode = true;
        this.activeNoteId = null;
        this.$store.dispatch("searching", { searchValue: this.searchValue });
      } else {
        const eraseInputIcon = document.querySelector(".erase-input");
        eraseInputIcon.style.display = "none";
        this.onSearchMode = false;
        this.activeNoteId = null;
      }
    }
  },
  mounted() {
    // Khi click ra ben ngoai dropdown, thi dropdown se bien mat
    document.body.addEventListener("click", e => {
      if (
        e.target.classList[0] !== "note-option" &&
        e.target.parentElement.classList[0] !== "note-option"
      ) {
        let dropdownOptions = document.querySelector(".dropdown-options");
        if (dropdownOptions != null) {
          this.activeNoteId = null;
        }
      }
    });
  }
};
</script>

<style lang ="scss">
.right-section {
  display: grid;
  grid-template-columns: 330px auto;
}
</style>