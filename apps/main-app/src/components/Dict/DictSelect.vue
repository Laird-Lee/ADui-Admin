<script setup lang="ts">
import {DictItem} from "@/views/DictManagement/DictDrawer.vue"
import {useDictStore} from "@/store";

const {dictCode, value, mode} = defineProps<{
  dictCode: string,
  value: string | string[],
  mode?: 'multiple' | 'tags' | 'combobox',
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
  <a-select v-model:value="originValue"
            :placeholder="placeholder"
            showSearch
            :mode="mode"
            allow-clear
            style="width: 100%;">
    <a-select-option v-for="item in dict" :value="item.value">{{ item.text }}</a-select-option>
  </a-select>
</template>

<style scoped>

</style>
