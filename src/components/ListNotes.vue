<template>
  <div class="right-section">
    <Loader v-if="isLoading" />
    <div class="list-notes" v-if="!isLoading">
      <div class="note-search-container mt-3 ml-3">
        <input
          id="note-search"
          type="text"
          class="gray-9 pl-3 pr-5 pb-3 pt-3 fontsize-3"
          placeholder="Search for notes"
          @keyup="searchValueChange"
          v-model="searchValue"
          autocomplete="off"
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
          :isFavorite="note.favorite === 2"
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
          :isFavorite="note.favorite === 2"
        />
      </div>
    </div>
    <Editor
      v-if="activeNoteId !== null && !onSearchMode"
      :note="this.noteItems.find(item => item._id === activeNoteId)"
    />

    <NullEditor v-if="activeNoteId === null" />

    <Editor
      v-if="activeNoteId !== null && onSearchMode"
      :note="this.notesMatch.find(item => item._id === activeNoteId)"
    />
  </div>
</template>

<script>
import EventBus from "../EventBus";
import NoteItem from "./Note";
import { mapGetters } from "vuex";
import Editor from "./Editor";
import NullEditor from "./NullEditor";
import Loader from "./Loader";
export default {
  name: "ListNotes",
  data() {
    return {
      searchValue: "",
      activeNoteId: null,
      dropdownOpenId: null,
      onSearchMode: false,
      isLoading: true
    };
  },
  components: {
    NoteItem,
    Editor,
    NullEditor,
    Loader
  },
  computed: {
    ...mapGetters(["noteItems", "notesMatch"])
  },
  created() {
    this.$store.dispatch("getNoteItems").then(() => {
      this.isLoading = false;
    });
    EventBus.$on("reset", () => {
      this.searchValue = "";
      this.activeNoteId = null;
      this.dropdownOpenId = null;
      this.turnOffSearchMode();
    });
    EventBus.$on("activeNewNote", id => {
      this.activeNoteId = id;
    });
    EventBus.$on("sync", () => {
      this.searchValue = "";
      this.activeNoteId = null;
      this.dropdownOpenId = null;
      this.turnOffSearchMode();
      this.$store.dispatch("getNoteItems");
    });
  },
  methods: {
    reset() {
      this.searchValue = "";
      this.activeNoteId = null;
      console.log("Active note id = null");
      this.dropdownOpenId = null;
      this.turnOffSearchMode();
    },
    turnOffSearchMode() {
      const eraseInputIcon = document.querySelector(".erase-input");
      eraseInputIcon.style.display = "none";
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
      this.dropdownOpenId = id;
    },
    searchValueChange() {
      if (this.searchValue !== "") {
        const eraseInputIcon = document.querySelector(".erase-input");
        eraseInputIcon.style.display = "block";
        this.onSearchMode = true;
        this.activeNoteId = null;
        this.$store.dispatch("searching", { searchValue: this.searchValue });
      } else {
        this.turnOffSearchMode();
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
          this.dropdownOpenId = null;
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