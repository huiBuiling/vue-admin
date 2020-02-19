<template>
  <Editor
          id="tinId"
          v-model="tinymceContent"
          :init="options"
  />
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Editor from '@tinymce/tinymce-vue';
import 'tinymce/tinymce';
import 'tinymce/themes/silver';
import 'tinymce/skins/ui/oxide/skin.css';
// plugins
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/autosave';
import 'tinymce/plugins/code';
import 'tinymce/plugins/codesample';
import 'tinymce/plugins/directionality';
import 'tinymce/plugins/emoticons';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/hr';
import 'tinymce/plugins/image';
import 'tinymce/plugins/imagetools';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/link';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/media';
import 'tinymce/plugins/nonbreaking';
import 'tinymce/plugins/noneditable';
import 'tinymce/plugins/pagebreak';
import 'tinymce/plugins/paste';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/print';
import 'tinymce/plugins/save';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/spellchecker';
import 'tinymce/plugins/tabfocus';
import 'tinymce/plugins/table';
import 'tinymce/plugins/template';
import 'tinymce/plugins/textpattern';
import 'tinymce/plugins/visualblocks';
import 'tinymce/plugins/visualchars';
import 'tinymce/plugins/wordcount';
import { plugins, toolbar } from './config';

@Component({
  name: 'TinymceEditor',
  components: {
    Editor,
  },
})
export default class TinymceEditor extends Vue {
  @Prop({ required: true }) private value!: string;
  @Prop({ default: () => [] }) private toolbar!: string[];
  // @Prop({ default: 'file edit insert view format table' })
  private menubar!: string;
  @Prop({ default: '360px' }) private height!: string | number;


  get tinymceContent() {
    return this.value;
  }

  set tinymceContent(value) {
    this.$emit('input', value);
  }

  private options: object = {
    language_url: `${process.env.BASE_URL}tinymce/langs/zh_CN.js`, // 语言包的路径
    language: 'zh_CN',
    skin_url: `${process.env.BASE_URL}tinymce/skins/ui/oxide`,
    emoticons_database_url: `${process.env.BASE_URL}tinymce/emojis.min.js`,
    // plugins: plugins, // 插件
    toolbar: this.toolbar.length > 0 ? this.toolbar : toolbar, // 工具栏
    menubar: true, // 顶部菜单栏显示
    height: this.height,
  };

  public mounted() {
    const tinymceManager = (window as any).tinymce;
    tinymceManager.init(this.options);
  }

}
</script>
