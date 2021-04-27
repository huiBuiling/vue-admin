<template>
  <div class="ad-editor">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'editor'
})
export default class EditorView extends Vue {}
</script>
