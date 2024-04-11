<script setup lang="ts">
import {Icon} from "@/components/Icon";


import {createFromIconfontCN} from '@ant-design/icons-vue';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_4109092_p81b3zpzepp.js',
});

const router = useRouter()
const route = useRoute()

const selectedKeys = computed(() => {
  if (routes.some(x => x.path === route.path)) {
    return [routes.find(x => x.path === route.path).key]
  }
  return []
})


const handleMenu = ({key}) => {
  router.push({path: routes.find(x => x.key === key).path})
}

const routes = [
  {
    key: 'react',
    path: '/react-app',
    name: 'react-app',
    icon: 'UserOutlined',
    title: 'React微应用'
  },
  {
    key: 'vue',
    path: '/vue-app',
    name: 'vue-app',
    icon: 'VideoCameraOutlined',
    title: 'Vue微应用'
  },
  {
    key: 'home',
    path: '/home',
    name: 'home',
    icon: 'UploadOutlined',
    title: '首页'
  },
  {
    key: 'dict',
    path: '/dict-management',
    name: 'react-app',
    icon: 'BookOutlined',
    title: '字典表管理'
  },
  {
    key: 'menu',
    path: '/menu-management',
    name: 'react-app',
    icon: 'MenuOutlined',
    title: '菜单管理'
  },
]
</script>

<template>
  <a-layout-sider
      :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }"
  >
    <div class="logo" @click="router.push('/home')">
      <icon-font type="adui-logo"/>
    </div>
    <a-menu :selectedKeys="selectedKeys" @click="handleMenu" theme="dark" mode="inline">
      <a-menu-item v-for="item in routes" :key="item.key">
        <a-space>
          <icon :type="item.icon"/>
          <span class="nav-text">{{ item.title }}</span>
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
  cursor: pointer;

  .anticon {
    color: #83d1d4;
    font-size: 50px;
  }
}
</style>
