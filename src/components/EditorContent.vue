<template>
  <div id="editor" class="gray-9">
    <input
      type="text"
      id="titleInput"
      class="pt-3 pb-3 pl-3 pr-3 fontweight-1 fontsize-3"
      placeholder="Enter title here.."
      v-model="note.title"
      autocomplete="off"
      @keyup="modifyNote"
      @keydown="modifyNote"
    />
    <vue-editor id="concac" v-model="note.content" @text-change="modifyNote"></vue-editor>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
  data() {
    return {
      typingTimer: null,
      isSaving: false
    };
  },
  props: ["note"],
  components: {
    VueEditor
  },
  methods: {
    modifyNote() {
      if (this.note._id.substr(0, 4) !== "temp") {
        if (this.isSaving) {
          clearTimeout(this.typingTimer);
          this.typingTimer = setTimeout(() => {
            this.$store.dispatch("modifyNote", {
              id: this.note._id,
              title: this.note.title,
              content: this.note.content
            });
            this.isSaving = false;
          }, 2000);
        } else {
          this.isSaving = true;
          this.typingTimer = setTimeout(() => {
            this.$store.dispatch("modifyNote", {
              id: this.note._id,
              title: this.note.title,
              content: this.note.content
            });
            this.isSaving = false;
          }, 2000);
        }
      } else {
        this.$store.dispatch("moveNoteTempToPermanent", {
          id: this.note._id,
          title: this.note.title,
          content: this.note.content
        });
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
</style>