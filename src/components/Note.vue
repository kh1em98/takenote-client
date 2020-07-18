<template>
  <div
    class="note-container pl-4 pr-4 pb-3 pt-3"
    @click="activeNote(note._id)"
    :class="{'note-active' : isActive}"
  >
    <div class="note">
      <div class="note-header mb-1">
        <i class="far fa-star mr-2 gray-9" v-if="isFavorite"></i>
        <p id="note-title" class="gray-9 fontweight-2 fontsize-3 mb-1">{{note.title}}</p>
      </div>

      <div class="note-body">
        <i class="fas fa-book gray-5 mt-1 mr-2"></i>
        <p class="gray-6 fontsize-1 fontweight-1">{{note.timeCreated | formatDate}}</p>
      </div>
    </div>

    <div class="note-option pt-2 pl-2 pr-2 pb-2" @click="openDropDown(note._id)">
      <span class="note-option-dot"></span>
      <span class="note-option-dot"></span>
      <span class="note-option-dot"></span>
    </div>

    <DropdownOptions
      v-if="isOpenDropdown"
      :id="note._id"
      @downloadNote="downloadNote"
      @changeFavorite="changeFavorite"
    />
  </div>
</template>

<script>
var FileSaver = require("file-saver");
import DropdownOptions from "./DropdownOptions";

export default {
  name: "Note",
  props: ["note", "isOpenDropdown", "isActive", "isFavorite"],
  methods: {
    activeNote(id) {
      this.$emit("activeNote", id);
    },
    openDropDown(id) {
      this.$emit("openDropDown", id);
    },
    downloadNote() {
      let htmlFile = "<h1>" + this.note.title + "</h1>\n" + this.note.content;
      var blob = new Blob([htmlFile], {
        type: "text/html;charset=utf-8"
      });
      FileSaver.saveAs(blob, `${this.note.title}.html`);
    },
    async changeFavorite() {
      let newFavoriteStatus = this.note.favorite === 1 ? 2 : 1;
      console.log(`New favorite : ${newFavoriteStatus}`);
      await this.$store.dispatch("changeFavorite", {
        id: this.note._id,
        favorite: newFavoriteStatus
      });
    },
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

  .note-header {
    display: flex;

    i {
      color: #5183f5;
    }

    #note-title {
      padding-top: 3px;
      width: 100%;
      overflow: hidden;
      height: 25px !important;
    }
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
  .note-header {
    i {
      color: #f8f9fa !important;
    }
    p {
      color: #f8f9fa !important;
    }
  }

  .note-body {
    i {
      color: #f8f9fa !important;
    }
    p {
      color: #f8f9fa !important;
    }
  }

  .note-option-dot {
    background: #f8f9fa !important;
  }

  &:hover {
    background: #5183f5 !important;
  }
}
</style>