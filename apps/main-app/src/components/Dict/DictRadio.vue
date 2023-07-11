<script setup lang="ts">
import {DictItem} from "@/views/DictManagement/DictDrawer.vue"
import {useDictStore} from "@/store";

const {dictCode, value} = defineProps<{
  dictCode: string,
  value: string,
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
  <a-radio-group v-model:value="originValue">
    <a-radio v-for="item in dict" :value="item.value">{{ item.text }}</a-radio>
  </a-radio-group>
</template>

<style scoped>

</style>
