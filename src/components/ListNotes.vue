<template>
  <div class="list-notes">
    <div class="note-search-container mt-3 ml-3">
      <input
        id="note-search"
        type="text"
        class="gray-9 pl-3 pr-5 pb-3 pt-3 fontsize-3"
        placeholder="Search for notes"
        @keyup="eraseIconAppear"
        v-model="search"
      />

      <i class="fas fa-eraser gray-5 erase-input pt-3 pb-3 pr-3 pl-2" @click="eraseSearchInput"></i>
    </div>

    <div class="mt-3 list">
      <Note
        v-for="(note,index) in noteItems"
        :key="note.id"
        :index="index + 1"
        :note="note"
        :isOpenDropdown="index + 1 === dropdownOpenIndex ? true : false "
        @activeNote="activeNote"
        :class="{'active' : index + 1===activeNoteIndex}"
        @openDropDown="showDropDown"
      />
    </div>
  </div>
</template>

<script>
import Note from "./Note";
import { mapGetters } from "vuex";
export default {
  name: "ListNotes",
  data() {
    return {
      search: "",
      activeNoteIndex: 1,
      dropdownOpenIndex: null
    };
  },
  components: {
    Note
  },
  computed: {
    ...mapGetters(["noteItems"])
  },
  created() {
    this.$store.dispatch("getNoteItems");
  },
  methods: {
    eraseIconAppear() {
      const eraseInputIcon = document.querySelector(".erase-input");
      if (this.search !== "") {
        eraseInputIcon.style.display = "block";
      } else {
        eraseInputIcon.style.display = "none";
      }
    },
    eraseSearchInput() {
      let noteSearchInput = document.getElementById("note-search");
      noteSearchInput.focus();
      this.search = "";
    },
    activeNote(index) {
      if (index !== this.activeNoteIndex) {
        document
          .querySelector(`.list div:nth-child(${this.activeNoteIndex})`)
          .classList.remove("active");
        this.activeNoteIndex = index;
      }
    },
    showDropDown(index) {
      console.log("Mo dropdown");
      this.activeNote(index);
      this.dropdownOpenIndex = index;
    }
  },
  mounted() {
    document.body.addEventListener("click", e => {
      console.log("Da click");
      if (
        e.target.classList[0] !== "note-option" &&
        e.target.parentElement.classList[0] !== "note-option"
      ) {
        if (
          e.target.classList[0] !== "dropdown-options" &&
          e.target.classList[0] !== "option-item" &&
          e.target.parentElement.classList[0] !== "option-item"
        ) {
          console.log(e.target);
          let dropdownOptions = document.querySelector(".dropdown-options");
          if (dropdownOptions != null) {
            this.dropdownOpenIndex = null;
          }
        }
      }
    });
  }
};
</script>

<style>
</style>