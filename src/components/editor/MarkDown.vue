<template>
  <div class="ad-editor-mk">
    <mavon-editor
          v-model="content"
          ref="md"
          @change="changes"
          style="min-height: 600px"
    />

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mavonEditor } from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
Vue.use(mavonEditor);

@Component({
  name: 'markDown',
  components: {
    mavonEditor,
  },
})
export default class MarkDown extends Vue {
  private content: string = '开始编辑...';

  private changes(markdown: string, html: string)  {
      console.log('markdown内容: ' + markdown);
      console.log('html内容:' + markdown);
  }
}
</script>
