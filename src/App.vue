<template>
  <div id="app">
    <Index />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Index from '@/views/Index.vue';
@Component({
  name: 'app',
  components: {
    Index
  }
})
export default class extends Vue {}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
