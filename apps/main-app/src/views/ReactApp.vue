<script setup lang="ts">
import {hostMap} from "../wujie.config.ts";

const reactUrl = ref(hostMap('//localhost:8889/'))
</script>

<template>
  <WujieVue width="100%" height="100%" name="react-app" :url="reactUrl" :sync="true"></WujieVue>
</template>

<style scoped>

</style>
