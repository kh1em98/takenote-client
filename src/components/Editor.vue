<template>
  <div class="editor">
    <label for="title">Title</label>
    <input
      type="text"
      name="title"
      autocomplete="false"
      id="title"
      v-model="title"
      @keyup.enter="submitNote"
    />
    <label for="content">Content</label>
    <input
      type="text"
      name="content"
      autocomplete="false"
      v-model="content"
      @keyup.enter="submitNote"
      id="content"
    />
    <button @click="submitNote">Submit</button>
  </div>
</template>

<script>
export default {
  name: "Editor",
  data() {
    return {
      title: "",
      content: ""
    };
  },
  methods: {
    submitNote() {
      if (this.title === "") {
        let titleElement = document.querySelector("#title");
        titleElement.classList.add("gray-6");
        this.title = "Khong duoc de trong title";
        setTimeout(() => {
          this.title = "";
        }, 700);
      } else if (this.content === "") {
        let contentElement = document.querySelector("#content");
        contentElement.classList.add("gray-6");
        this.content = "Khong duoc de trong content";
        setTimeout(() => {
          this.content = "";
        }, 700);
      } else {
        const payload = {
          title: this.title,
          content: this.content
        };
        this.$store.dispatch("addNote", payload);
        this.title = "";
        this.content = "";
      }
    }
  }
};
</script>

<style lang="scss">
.editor {
  background: #f5f5f5;
}
</style>