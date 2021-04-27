<template>
    <div v-if="name === 'default'">
      <div v-for="iconD in defaultIcons" :key="iconD" class="ad-icons-item">
          <el-tooltip placement="top">
            <div slot="content">
              {{ renderDefaultIcon(iconD) }}
            </div>
            <div>
              <p>
                  <svg-icon
                    :name="iconD"
                    class="ad-icons-svg"
                    color="#42b983 #35495e"
                  />
              </p>
              <p class="ad-icon-items-text"><span>{{ iconD }}</span></p>
            </div>
          </el-tooltip>
      </div>
    </div>
    <div v-else>
      <div v-for="iconI in elementIcons":key="iconI" class="ad-icons-item">
        <el-tooltip placement="top">
            <div slot="content">
              {{ renderElementIcon(iconI) }}
            </div>
            <div>
                <p><i :class="'el-icon-' + iconI" style="color: #42b983" /></p>
                <p class="ad-icon-items-text"><span>{{ iconI }}</span></p>
            </div>
        </el-tooltip>
      </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import defaultIcons from './svg-icons';
import elementIcons from './element-icons';

@Component({
  name: 'iconIndex'
})
export default class IconIndex extends Vue {
  @Prop() private name!: string;
  private defaultIcons = defaultIcons;
  private elementIcons = elementIcons;

  private renderDefaultIcon(symbol: string) {
    return `<svg-icon name="${symbol}" />`;
  }

  private renderElementIcon(symbol: string) {
    return `<i class="el-icon-${symbol}" />`;
  }
}
</script>
