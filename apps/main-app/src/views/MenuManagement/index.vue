<script setup lang="ts">
import {PlusSquareOutlined} from "@ant-design/icons-vue";
import MenuModal from "@/views/MenuManagement/MenuModal.vue";

const columns = ref([
  {
    title: '应用名称',
    dataIndex: 'appCode',
    key: 'appCode',
    ellipsis: true,
  },
  {
    title: '菜单名称',
    dataIndex: 'routerName',
    key: 'routerName',
    ellipsis: true,
  },
  {
    title: '图标',
    dataIndex: 'icon',
    key: 'icon',
    ellipsis: true,
  },
  {
    title: '路由地址',
    dataIndex: 'router',
    key: 'router',
    ellipsis: true,
  },
  {
    title: '操作',
    key: 'action',
  },
])

interface DataItem {
  id: string
  appCode: string
  routerName: string
  icon: string
  router: string
}

const rowSelection = ref({
  checkStrictly: false,
  onChange: (selectedRowKeys: (string | number)[], selectedRows: DataItem[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  onSelect: (record: DataItem, selected: boolean, selectedRows: DataItem[]) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected: boolean, selectedRows: DataItem[], changeRows: DataItem[]) => {
    console.log(selected, selectedRows, changeRows);
  },
});
</script>

<template>
  <a-space direction="vertical" size="large">
    <a-button type="primary">
      <plus-square-outlined #icon/>
      新增主菜单
    </a-button>
    <a-table :columns="columns" :row-selection="rowSelection" :pagination="false" bordered></a-table>
  </a-space>
  <menu-modal />
</template>

<style scoped>

</style>
