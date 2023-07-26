<script setup lang="ts">
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons-vue';
import {Icon} from "@/components/Icon";

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
      <icon-font type="adui-logo" />
    </div>
    <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
      <a-menu-item key="1">
        <a-space>
          <user-outlined/>
          <router-link to="/react-app">
            <span class="nav-text">react</span>
          </router-link>
        </a-space>
      </a-menu-item>
      <a-menu-item key="2">
        <a-space>
          <video-camera-outlined/>
          <router-link to="/vue-app">
            <span class="nav-text">vue</span>
          </router-link>
        </a-space>
      </a-menu-item>
      <a-menu-item key="3">
        <a-space>
          <upload-outlined/>
          <router-link to="/home">
            <span class="nav-text">home</span>
          </router-link>
        </a-space>
      </a-menu-item>
      <a-menu-item key="4">
        <a-space>
          <icon type="BookOutlined"/>
          <router-link to="/dict-management">
            <span class="nav-text">字典表管理</span>
          </router-link>
        </a-space>
      </a-menu-item>
      <a-menu-item key="5">
        <a-space>
          <icon type="MenuOutlined"/>
          <router-link to="/menu-management">
            <span class="nav-text">菜单管理</span>
          </router-link>
        </a-space>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>

<style lang="less" scoped>
.logo {
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  .anticon {
    color: #83d1d4;
    font-size: 50px;
  }
}
</style>
