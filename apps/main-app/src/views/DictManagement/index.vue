<script setup lang="ts">
import {useRequest} from "@adui/request";
import {TablePaginationConfig} from "ant-design-vue"
import {
  PlusSquareOutlined,
  SearchOutlined,
  QuestionCircleOutlined,
  FormOutlined,
  DeleteOutlined,
  SettingOutlined
} from "@ant-design/icons-vue";
import DictDialog from "./DictDialog.vue";
import DictDrawer from "./DictDrawer.vue";

const dictModalRef = ref<any>(null)
const dictDrawerRef = ref<any>(null)

interface SearchState {
  dictName: string
  dictCode: string
}

const searchForm: SearchState = reactive({
  dictName: '',
  dictCode: ''
})

const onSearchFinish = (value: any) => {
  searchForm.dictName = value.dictName
  searchForm.dictCode = value.dictCode
  pagination.current = 1
  loadDictList()
};

const handleAdd = () => {
  dictModalRef.value.showModal('add')
}

const handleEdit = (record: any) => {
  dictModalRef.value.showModal('edit', toRaw(record))
}

const handleConfirmDelete = async (record: any) => {
  const [res, err] = await useRequest(`dict/${record.id}`, 'delete', {})
}

const handleSetting = (record: any) => {
  dictDrawerRef.value.showDrawer(toRaw(record))
}
const loadDictList = async () => {
  tableLoading.value = true
  const params = {
    ...toRaw(searchForm),
    pageSize: pagination.pageSize,
    pageNo: pagination.current
  }
  const [res, err] = await useRequest('dict', 'get', params)
  tableData.value = res.records
  pagination.total = res.total
  tableLoading.value = false
}

onMounted(() => {
  loadDictList()
})

const tableData = ref<[]>([])
const tableLoading = ref<boolean>(false)
const pagination: TablePaginationConfig = reactive({
  current: 1,
  pageSize: 10,
  pageSizeOptions: ['10', '20', '30', '40'],
  showQuickJumper: true,
  total: 0,
})

const columns = ref<any[]>([
  {
    title: '字典表名称',
    dataIndex: 'dictName',
    key: 'dictName',
    ellipsis: true,
  },
  {
    title: '字典表编码',
    dataIndex: 'dictCode',
    key: 'dictCode',
    ellipsis: true,
  },
  {
    title: '描述',
    key: 'description',
    dataIndex: 'description',
    ellipsis: true,
  },
  {
    title: '操作',
    key: 'action',
  },
]);

const handleTableChange = (val: any) => {
  pagination.current = val.current
  loadDictList()
}
</script>

<template>
  <a-form ref="searchForm" :model="searchForm" @finish="onSearchFinish">
    <a-row :gutter="24">
      <a-col :span="8">
        <a-form-item label="字典表名称" name="dictName">
          <a-input v-model:value="searchForm.dictName" allow-clear placeholder="请输入字典表名称"/>
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="字典表编码" name="dictCode">
          <a-input v-model:value="searchForm.dictCode" allow-clear placeholder="请输入字典表编码"/>
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-space style="width: 100%;">
          <a-tooltip title="search">
            <a-button type="primary" shape="circle" html-type="submit">
              <search-outlined #icon/>
            </a-button>
          </a-tooltip>
          <a-button type="primary" @click="handleAdd">
            <plus-square-outlined #icon/>
            新增字典表
          </a-button>
        </a-space>
      </a-col>
    </a-row>
  </a-form>
  <a-table :data-source="tableData" :columns="columns" :loading="tableLoading" :pagination="pagination"
           bordered @change="handleTableChange">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'action'">
        <a-space>
          <a-button type="primary" size="small" @click="handleEdit(record)">
            <template #icon>
              <form-outlined/>
            </template>
            编辑
          </a-button>
          <a-popconfirm
            title="确认删除该字典表？"
            ok-text="确认"
            cancel-text="取消"
            @confirm="handleConfirmDelete(record)"
          >
            <template #icon>
              <question-circle-outlined style="color: red"/>
            </template>
            <a-button type="primary" danger size="small">
              <template #icon>
                <delete-outlined/>
              </template>
              删除
            </a-button>
          </a-popconfirm>
          <a-button size="small" @click="handleSetting(record)">
            <template #icon>
              <setting-outlined/>
            </template>
            字典表配置
          </a-button>
        </a-space>
      </template>
    </template>
  </a-table>
  <dict-dialog ref="dictModalRef" @update:tableData="loadDictList"/>
  <dict-drawer ref="dictDrawerRef"/>
</template>

<style scoped>

</style>
