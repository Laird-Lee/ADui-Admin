<script setup lang="ts">
import {Form} from "ant-design-vue";
import {IconSelect} from "@/components/Icon/IconSelect";
import {useRequest} from "@adui/request";

const visible = ref<boolean>(true)
const title = ref<string>('新增主菜单')
const type = ref<'add' | 'edit'>('add')

interface FormState {
  appCode: string
  routerName: string
  icon: string
  router: string
  id?: string

}

const form: FormState = reactive({
  appCode: '',
  routerName: '',
  icon: '',
  router: ''
})

const rules = reactive({
  appCode: [
    {
      required: true,
      message: '请输入应用名称',
    },
  ],
  routerName: [
    {
      required: true,
      message: '请输入菜单名称',
    },
  ],
  icon: [
    {
      required: false,
      message: '请选择图标',
    },
  ],
  router: [
    {
      required: true,
      message: '请输入路由地址',
    },
  ],
})

const useForm = Form.useForm

const {resetFields, validate, validateInfos} = useForm(form, rules)

const handleSubmit = () => {
  validate().then(async () => {
    visible.value = false
  }).catch(err => {
    console.log('form', toRaw(form));
    console.log('error', err);
  });
}
</script>

<template>
  <a-modal v-model:open="visible" :title="title" @ok="handleSubmit">
    <a-form layout="vertical">
      <a-form-item label="应用名称" name="appCode" v-bind="validateInfos.appCode">
        <a-input v-model:value="form.appCode" placeholder="请输入应用名称"/>
      </a-form-item>
      <a-form-item label="菜单名称" name="routerName" v-bind="validateInfos.routerName">
        <a-input v-model:value="form.routerName" placeholder="请输入菜单名称"/>
      </a-form-item>
      <a-form-item label="路由地址" name="router" v-bind="validateInfos.router">
        <a-input v-model:value="form.router" placeholder="请输入路由地址"/>
      </a-form-item>
      <a-form-item label="图标" name="icon" v-bind="validateInfos.icon">
        <icon-select v-model:modelValue="form.icon" placeholder="请选择图标"></icon-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<style scoped>

</style>
