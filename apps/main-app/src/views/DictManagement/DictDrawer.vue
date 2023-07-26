<script setup lang="ts">
import {
  PlusSquareOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  QuestionCircleOutlined,
  FormOutlined,
  DeleteOutlined,
  EyeOutlined
} from "@ant-design/icons-vue";
import {Form} from "ant-design-vue";
import {useRequest} from "@adui/request";

interface DictInfo {
  dictId: string
  dictName: string
  dictCode: string
}

const visible = ref<boolean>(false)
const secondVisible = ref<boolean>(false)
const openType = ref<'add' | 'edit' | 'view'>('add')
const dictInfo: DictInfo = reactive({
  dictId: '',
  dictName: '',
  dictCode: ''
})
const showDrawer = (record: any) => {
  dictInfo.dictId = record.id
  dictInfo.dictName = record.dictName
  dictInfo.dictCode = record.dictCode
  loadDictItem()
  visible.value = true
}
const handleAdd = () => {
  openType.value = "add"
  secondVisible.value = true
}
const handleClose = () => {
  tableData.value = []
  dictInfo.dictId = ''
  dictInfo.dictName = ''
  dictInfo.dictCode = ''
  visible.value = false
}
const handleSecondClose = () => {
  itemForm.id = ''
  itemForm.text = ''
  itemForm.textEn = ''
  itemForm.value = ''
  itemForm.description = ''
  itemForm.seq = 1
  resetFields()
  loadDictItem()
  secondVisible.value = false
}

const tableData = ref<[]>([])

const loadDictItem = async () => {
  const [res, err] = await useRequest(`dict/${dictInfo.dictId}/dict-item`, 'get', {})
  tableData.value = res
}

const columns = ref<any[]>([
  {
    title: '中文',
    dataIndex: 'text',
    key: 'text',
    ellipsis: true,
  },
  {
    title: '英文',
    dataIndex: 'textEn',
    key: 'textEn',
    ellipsis: true,
  },
  {
    title: '数据值',
    dataIndex: 'value',
    key: 'value',
    ellipsis: true,
  },
  {
    title: '操作',
    key: 'action',
  },
]);


const useForm = Form.useForm

export interface DictItem {
  text: string
  textEn: string
  value: string
  description: string
  seq: number,
  id?: string
}


const itemForm: DictItem = reactive({
  text: '',
  textEn: '',
  value: '',
  description: '',
  seq: 1
})

const rules = reactive({
  text: [
    {
      required: true,
      message: '请输入中文',
    },
  ],
  textEn: [
    {
      required: true,
      message: '请输入英文',
    },
  ],
  value: [
    {
      required: true,
      message: '请输入数据值',
    },
  ],
  description: [
    {
      required: false,
      message: '请输入描述',
    },
  ],
})

const handleView = (record: any) => {
  itemForm.id = record.id
  itemForm.text = record.text
  itemForm.textEn = record.textEn
  itemForm.value = record.value
  itemForm.description = record.description
  itemForm.seq = record.seq
  openType.value = "view"
  secondVisible.value = true
}
const handleEdit = (record: any) => {
  console.log(record, 'record');
  itemForm.id = record.id
  itemForm.text = record.text
  itemForm.textEn = record.textEn
  itemForm.value = record.value
  itemForm.description = record.description
  itemForm.seq = record.seq
  openType.value = "edit"
  secondVisible.value = true
}

const title = computed(() => {
  if (openType.value === 'add') {
    return '新增字典表项'
  }
  if (openType.value === 'edit') {
    return '编辑字典表项'
  }
  if (openType.value === 'view') {
    return '查看字典表项'
  }
})

const editable = computed(() => {
  return openType.value !== 'view'
})

const {resetFields, validate, validateInfos} = useForm(itemForm, rules)

const handleSubmit = () => {
  validate().then(async () => {
    const url = openType.value === 'add' ? `dict/${dictInfo.dictId}/dict-item` : `dict/${dictInfo.dictId}/dict-item/${itemForm.id}`
    const [res, err] = await useRequest(url, openType.value === 'add' ? 'post' : 'patch', toRaw(itemForm))
    handleSecondClose()
  }).catch(err => {
    console.log('error', err);
  });
}

const handleConfirmDelete = async (record: any) => {
  const [res, err] = await useRequest(`dict/${dictInfo.dictId}/dict-item/${record.id}`, 'delete', {})
  loadDictItem()
}

defineExpose({
  showDrawer
})
</script>

<template>
  <a-drawer title="字典表配置" width="720" :open="visible" @close="handleClose" :body-style="{ paddingBottom: '80px' }">
    <a-space direction="vertical" size="large">
      <a-form layout="vertical">
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="字典表名称">
              <span style="font-size: 20px;">{{ dictInfo.dictName }}</span>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="字典表编码">
              <span style="font-size: 20px;">{{ dictInfo.dictCode }}</span>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <a-row>
        <a-col :span="24" style="text-align: right;">
          <a-button type="primary" @click="handleAdd">
            <plus-square-outlined #icon/>
            新增
          </a-button>
        </a-col>
      </a-row>
      <a-table :columns="columns" :data-source="tableData" :pagination="false" bordered>
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
            <a-space wrap>
              <a-button size="small" @click="handleView(record)">
                <template #icon>
                  <eye-outlined/>
                </template>
                查看
              </a-button>
              <a-button type="primary" size="small" @click="handleEdit(record)">
                <template #icon>
                  <form-outlined/>
                </template>
                编辑
              </a-button>
              <a-popconfirm
                title="确认删除该字典表项？"
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
            </a-space>
          </template>
        </template>
      </a-table>
    </a-space>
    <a-drawer :title="title" width="520" :open="secondVisible" @close="handleSecondClose"
              :body-style="{ paddingBottom: '80px' }">
      <a-form layout="vertical" :disabled="!editable">
        <a-form-item label="中文" name="text" v-bind="validateInfos.text">
          <a-input v-model:value="itemForm.text" placeholder="请输入中文" allow-clear/>
        </a-form-item>
        <a-form-item label="英文" name="textEn" v-bind="validateInfos.textEn">
          <a-input v-model:value="itemForm.textEn" placeholder="请输入英文" allow-clear/>
        </a-form-item>
        <a-form-item label="数据值" name="value" v-bind="validateInfos.value">
          <a-input v-model:value="itemForm.value" placeholder="请输入数据值" allow-clear/>
        </a-form-item>
        <a-form-item label="描述" name="description" v-bind="validateInfos.description">
          <a-textarea v-model:value="itemForm.description" :disabled="!editable" :auto-size="{ minRows: 2, maxRows: 6 }"
                      placeholder="请输入描述" allow-clear/>
        </a-form-item>
        <a-form-item label="排序">
          <a-input-number v-model:value="itemForm.seq" :disabled="!editable" :min="1">
            <template #upIcon>
              <arrow-up-outlined/>
            </template>
            <template #downIcon>
              <arrow-down-outlined/>
            </template>
          </a-input-number>
        </a-form-item>
      </a-form>
      <template #footer>
        <a-space>
          <a-button v-if="editable" @click="handleSecondClose">取消</a-button>
          <a-button v-if="editable" type="primary" @click="handleSubmit">提交</a-button>
          <a-button v-else type="primary" @click="handleSecondClose">确认</a-button>
        </a-space>
      </template>
    </a-drawer>
  </a-drawer>
</template>

<style scoped>

</style>
