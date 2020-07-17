<template>
  <div class="right-section">
    <div class="list-notes">
      <div class="note-search-container mt-3 ml-3">
        <input
          id="note-search"
          type="text"
          class="gray-9 pl-3 pr-5 pb-3 pt-3 fontsize-3"
          placeholder="Search for notes"
          @keyup="searching"
          v-model="textSearch"
        />

        <i class="fas fa-eraser gray-5 erase-input pt-3 pb-3 pr-3 pl-2" @click="eraseSearchInput"></i>
      </div>

      <div class="mt-3 list">
        <NoteItem
          v-for="(note,index) in noteItems"
          :key="note._id"
          :index="index + 1"
          :note="note"
          :isOpenDropdown="index + 1 === dropdownOpenIndex ? true : false"
          @activeNote="activeNote"
          @openDropDown="openDropdown"
          :isActive="index + 1 === activeNoteIndex"
        />
      </div>
    </div>
    <Editor v-if="activeNoteIndex !== null" :note="activeNoteEditor" />
    <NullEditor v-if="activeNoteIndex === null" />
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
      textSearch: "",
      activeNoteIndex: null,
      dropdownOpenIndex: null,
      activeNoteEditor: null,
      onSearchMode: false
    };
  },
  components: {
    NoteItem,
    Editor,
    NullEditor
  },
  computed: {
    ...mapGetters(["noteItems"])
  },
  created() {
    this.$store.dispatch("getNoteItems");
    EventBus.$on("activeNewNote", () => {
      this.activeNoteIndex = 1;
      this.activeNoteEditor = this.noteItems[0];
    });

    EventBus.$on("resetIndex", () => {
      this.activeNoteIndex = null;
      this.activeNoteEditor = null;
    });
  },
  methods: {
    eraseSearchInput() {
      console.log("Xoa search input");
      let noteSearchInput = document.getElementById("note-search");
      noteSearchInput.focus();
      this.textSearch = "";
      this.onSearchMode = false;
    },
    activeNote(index) {
      if (index !== this.activeNoteIndex) {
        this.activeNoteIndex = index;
        this.activeNoteEditor = this.noteItems[index - 1];
      }
    },
    openDropdown(index) {
      this.activeNote(index);
      this.dropdownOpenIndex = index;
    },
    searching() {
      const eraseInputIcon = document.querySelector(".erase-input");
      eraseInputIcon.style.display = "block";
      this.onSearchMode = true;
      this.$store.dispatch("searching", { textSearch: this.textSearch });
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
          this.dropdownOpenIndex = null;
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