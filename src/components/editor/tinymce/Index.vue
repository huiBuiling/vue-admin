<template>
  <div class="ad-editor-rich">
    <TinymceEditor
            v-if="tinymceActive"
            v-model="content"
            :height="height"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TinymceEditor from './Tinymce.vue';

@Component({
  name: 'richTextEditor',
  components: {
    TinymceEditor
  }
})
export default class RichTextEditor extends Vue {
  private content: string = `<h1 style="text-align: center;">Welcome to the TinyMCE demo!</h1>`;
  private tinymceActive: boolean = true;
  private height: string = '100%';

  private deactivated() {
    this.tinymceActive = false;
  }

  private activated() {
    this.tinymceActive = true;
  }
}
</script>
