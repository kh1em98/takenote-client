<template>
  <div id="editor" class="gray-9" v-if="note">
    <input
      type="text"
      id="titleInput"
      class="pt-3 pb-3 pl-3 pr-3 fontweight-1 fontsize-3"
      placeholder="Enter title here.."
      v-model="note.title"
      autocomplete="off"
      @keyup="modifyNote"
    />
    <vue-editor id="concac" v-model="note.content" @text-change="modifyNote"></vue-editor>
    <transition name="fade">
      <Notification v-if="showSavedNoti" />
    </transition>
  </div>
</template>

<script>
import axios from "axios";
import { VueEditor } from "vue2-editor";
import _ from "lodash";
import Notification from "./Notification";

export default {
  data() {
    return {
      currentNotesSaving: [],
      showSavedNoti: false
    };
  },
  props: ["note"],
  components: {
    VueEditor,
    Notification
  },
  methods: {
    modifyNote() {
      let index = _.findIndex(this.currentNotesSaving, { id: this.note._id });
      if (index !== -1) {
        let noteSaving = this.currentNotesSaving[index];
        clearTimeout(noteSaving.typingTimer);

        let id = this.note._id;
        let title = this.note.title;
        let content = this.note.content;

        noteSaving.typingTimer = setTimeout(async () => {
          await axios.put("notes/", { id, title, content });
          _.remove(this.currentNotesSaving, function(note) {
            return note.id === id;
          });
          if (!this.showSavedNoti) {
            this.showSavedNoti = true;
            setTimeout(() => {
              this.showSavedNoti = false;
            }, 1500);
          }
        }, 2300);
      } else {
        let newNoteSaving = {
          id: this.note._id,
          typingTimer: null
        };
        this.currentNotesSaving.push(newNoteSaving);
        let id = this.note._id;
        let title = this.note.title;
        let content = this.note.content;
        newNoteSaving.typingTimer = setTimeout(async () => {
          await axios.put("notes/", { id, title, content });
          _.remove(this.currentNotesSaving, function(note) {
            return note.id === id;
          });
          if (!this.showSavedNoti) {
            this.showSavedNoti = true;
            setTimeout(() => {
              this.showSavedNoti = false;
            }, 1500);
          }
        }, 2300);
      }
    }
  }
};
</script>

<style scoped lang="scss">
#editor {
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding-bottom: 0;
}

#titleInput {
  width: 100%;
  border: none;
  outline: none;
  background: #f5f5f5;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  text-align: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>