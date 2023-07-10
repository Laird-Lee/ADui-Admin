<script setup lang="ts">
import {DictItem} from "@/views/DictManagement/DictDrawer.vue"
import {useDictStore} from "@/store";

const {dictCode, value} = defineProps<{ dictCode: string, value: string }>()

const dict = ref<DictItem[]>([])

const store = useDictStore()

onMounted(async () => {
  dict.value = await store.getDict(dictCode)
})

const text = computed(()=>{
  return dict.value.find(x=>x.value === value)?.text || '-'
})
</script>

<template>
  <div>{{ text }}</div>
</template>

<style scoped>

</style>
