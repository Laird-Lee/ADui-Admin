<script setup lang="ts">
import {hostMap} from "../wujie.config.ts";

const vueUrl = ref(hostMap('//localhost:8890/'))
</script>

<template>
  <WujieVue width="100%" height="100%" name="vue-app" :url="vueUrl" :sync="true"></WujieVue>
</template>

<style scoped>

</style>
