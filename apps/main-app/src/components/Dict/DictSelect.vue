<script setup lang="ts">
import {DictItem} from "@/views/DictManagement/DictDrawer.vue"
import {useDictStore} from "@/store";

const {dictCode, value, type} = defineProps<{
  dictCode: string,
  value: any,
  type: 'select' | 'radio' | 'checkbox',
  placeholder?: string
}>()

const emit = defineEmits(['update:value'])

const dict = ref<DictItem[]>([])

const originValue = ref<any>(value)

const store = useDictStore()

onMounted(async () => {
  dict.value = await store.getDict(dictCode)
})

watch(() => originValue.value, (val) => {
  emit('update:value', val)
})
</script>

<template>
  <a-checkbox-group v-if="type==='checkbox'" v-model:value="originValue" style="width: 100%">
    <a-checkbox v-for="item in dict" :value="item.value">{{ item.text }}</a-checkbox>
  </a-checkbox-group>
  <a-radio-group v-if="type==='radio'" v-model:value="originValue">
    <a-radio v-for="item in dict" :value="item.value">{{ item.text }}</a-radio>
  </a-radio-group>
  <a-select v-if="type==='select'" v-model:value="originValue" :placeholder="placeholder" allow-clear
            style="width: 100%;">
    <a-select-option v-for="item in dict" :value="item.value">{{ item.text }}</a-select-option>
  </a-select>
</template>

<style scoped>

</style>
