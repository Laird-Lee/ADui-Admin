<script setup lang="ts">
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BarChartOutlined,
  CloudOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ShopOutlined,
} from '@ant-design/icons-vue';

const selectedKeys = ref<string[]>(['4']);

import {createFromIconfontCN} from '@ant-design/icons-vue';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_4109092_p81b3zpzepp.js',
});
</script>

<template>
  <a-layout-sider
      :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }"
  >
    <div class="logo">
      <icon-font type="adui-logo" style="color: #fff;"/>
    </div>
    <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
      <a-menu-item key="1">
        <user-outlined/>
        <router-link to="/react-app">
          <span class="nav-text">react</span>
        </router-link>
      </a-menu-item>
      <a-menu-item key="2">
        <video-camera-outlined/>
        <router-link to="/vue-app">
          <span class="nav-text">vue</span>
        </router-link>
      </a-menu-item>
      <a-menu-item key="3">
        <upload-outlined/>
        <router-link to="/home">
          <span class="nav-text">home</span>
        </router-link>
      </a-menu-item>
      <a-menu-item key="4">
        <bar-chart-outlined/>
        <span class="nav-text">nav 4</span>
      </a-menu-item>
      <a-menu-item key="5">
        <cloud-outlined/>
        <span class="nav-text">nav 5</span>
      </a-menu-item>
      <a-menu-item key="6">
        <appstore-outlined/>
        <span class="nav-text">nav 6</span>
      </a-menu-item>
      <a-menu-item key="7">
        <team-outlined/>
        <span class="nav-text">nav 7</span>
      </a-menu-item>
      <a-menu-item key="8">
        <shop-outlined/>
        <span class="nav-text">nav 8</span>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>

<style scoped>

</style>
