<template>
  <div class="ad-editor-json">
    <textarea ref="textarea" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import CodeMirror, { Editor } from 'codemirror';
import 'codemirror/addon/lint/lint.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/rubyblue.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/lint/lint';
import 'codemirror/addon/lint/json-lint';
// parse json need script-loader jsonlint
require('script-loader!jsonlint');

@Component({
  name: 'jsonEditor',
})
export default class JsonEditor extends Vue {
  private jsonEditor?: Editor;
  private value: string = '';

  @Watch('value')
  private onValueChange(value: string) {
    if (this.jsonEditor) {
      const editorValue = this.jsonEditor.getValue();
      if (value !== editorValue) {
        this.jsonEditor.setValue(JSON.stringify(this.value, null, 2));
      }
    }
  }

  private setValue(value: string) {
    if (this.jsonEditor) {
      this.jsonEditor.setValue(value);
    }
  }

  private getValue() {
    if (this.jsonEditor) {
      return this.jsonEditor.getValue();
    }
    return '';
  }

  public mounted() {
    // 根据DOM元素构造编辑器
    this.jsonEditor = CodeMirror.fromTextArea(this.$refs.textarea as HTMLTextAreaElement, {
      lineNumbers: true, // 显示行号
      mode: 'application/json', // 实现json代码高亮
      gutters: ['CodeMirror-lint-markers'],
      theme: 'rubyblue', // 设置主题
      lint: true,
    });

    const jsonData = '[{"items":[{"name":"Layi","age":"20"},{"name":"Jery","name":"22"},{"name":"May","age":"21"}],"name":"机电学院"},{"items":[{"name":"Kaolary","age":"24"},{"name":"Forg","age":"21"},{"name":"Seriaes","age":"22"},{"name":"Daliy","age":"21"}],"name":"金融学院"},{"items":[{"name":"Maries","age":"21"},{"name":"Boarid","age":"23"},{"name":"Nacy","age":"22"},{"name":"Jery","age":"21"}],"name":"信息学院"},{"items":[{"name":"Herai","age":"20"},{"name":"Paris","age":"22"},{"name":"Jack","age":"23"}],"name":"商学院"}]';
    this.value = JSON.parse(jsonData);
    this.jsonEditor.setValue(JSON.stringify(jsonData, null, 2));
  }
}
</script>
