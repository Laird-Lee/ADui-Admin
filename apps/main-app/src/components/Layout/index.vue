<template>
  <a-layout has-sider>
    <Menu/>
    <a-layout :style="{ marginLeft: '200px' }">
      <Header/>
      <a-layout-content :style="{ margin: '24px 16px 0', overflow: 'initial' }">
        <div :style="{ padding: '24px', background: '#fff', textAlign: 'center' }">
          <router-view/>
        </div>
      </a-layout-content>
      <a-layout-footer :style="{ textAlign: 'center' }">
        ADui Admin ©2023 Created by ADui
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
</script>
<style scoped>
#components-layout-demo-fixed-sider .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}

[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}
</style>
