<script setup lang="ts">
import {Form} from "ant-design-vue";
import {useRequest} from "@adui/request";

const visible = ref<boolean>(false)

const title = ref<'新增字典表' | '编辑字典表'>('新增字典表')
const showModal = (openType: 'add' | 'edit', record?: any) => {
  type.value = openType
  if (openType === 'edit') {
    title.value = '编辑字典表'
    dictForm.id = record.id
    dictForm.dictName = record.dictName
    dictForm.dictCode = record.dictCode
    dictForm.description = record.description
  }
  visible.value = true
}

const isAdd = computed(() => {
  return title.value.includes('新增')
})

const type = ref<'add' | 'edit'>('add')

interface DictState {
  dictName: string
  dictCode: string
  description: string
  id?: string
}

const useForm = Form.useForm

const dictForm: DictState = reactive({
  dictName: '',
  dictCode: '',
  description: ''
})

const rules = reactive({
  dictName: [
    {
      required: true,
      message: '请输入字典表名称',
    },
  ],
  dictCode: [
    {
      required: true,
      message: '请输入字典表编码',
    },
  ],
  description: [
    {
      required: false,
      message: '请输入描述',
    },
  ],
})

const {resetFields, validate, validateInfos} = useForm(dictForm, rules)

const emit = defineEmits(['update:tableData'])

const confirmLoading = ref<boolean>(false)
const handleSubmit = () => {
  confirmLoading.value = true
  validate().then(async () => {
    const url = isAdd.value ? 'dict' : `dict/${dictForm.id}`
    const [res, err] = await useRequest(url, isAdd.value ? 'post' : 'patch', toRaw(dictForm))
    emit('update:tableData')
    handleCancel()
    confirmLoading.value = false
    visible.value = false
  }).catch(err => {
    console.log('error', err);
    confirmLoading.value = false
  });
}

const handleCancel = () => {
  resetFields()
}

defineExpose({
  showModal
})
</script>

<template>
  <a-modal v-model:open="visible" :title="title" @ok="handleSubmit" @cancel="handleCancel"
           :confirm-loading="confirmLoading">
    <a-form layout="vertical">
      <a-form-item label="字典表名称" name="dictName" v-bind="validateInfos.dictName">
        <a-input v-model:value="dictForm.dictName" placeholder="请输入字典表名称"/>
      </a-form-item>
      <a-form-item label="字典表编码" name="dictCode" v-bind="validateInfos.dictCode">
        <a-input v-model:value="dictForm.dictCode" placeholder="请输入字典表编码"/>
      </a-form-item>
      <a-form-item label="描述" name="description" v-bind="validateInfos.description">
        <a-textarea v-model:value="dictForm.description" :auto-size="{ minRows: 2, maxRows: 6 }"
                    placeholder="请输入描述" allow-clear/>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<style scoped>

</style>
