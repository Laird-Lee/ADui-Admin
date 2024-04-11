<template>
  <a-config-provider :locale="zhCN">
    <a-layout has-sider>
      <Menu/>
      <a-layout :style="{ marginLeft: '200px', minHeight:'100vh'}">
        <Header/>
        <a-layout-content :style="{ margin: '24px 16px 0', overflow: 'initial', flexGrow: 1}">
          <watermark :content="['ADui Admin', '@ADui']">
            <div :style="{ padding: '24px', background: '#fff',height:'100%' }">
              <router-view/>
            </div>
          </watermark>
        </a-layout-content>
        <a-layout-footer :style="{ textAlign: 'center' }">
          ADui Admin © 2023 Created by ADui
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </a-config-provider>
</template>
<script lang="ts" setup>
import {Watermark} from "ant-design-vue";

import zhCN from 'ant-design-vue/es/locale/zh_CN';
import * as dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

dayjs.locale('cn');

</script>
<style lang="less" scoped>
.ant-layout-content > div {
  height: 100%;
}
</style>
