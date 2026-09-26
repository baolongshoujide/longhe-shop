<script setup>
import LayoutFooter from "./components/LayoutFooter.vue";
import LayoutHeader from "./components/LayoutHeader.vue";
import LayoutNav from "./components/LayoutNav.vue";
import LayoutFixed from "./components/LayoutFixed.vue";
import { useCategoryStore } from "@/stores/categoryStore.js";
import DataLoading from "@/components/DataLoading.vue";
import { useRoute } from "vue-router";
import { onMounted } from "vue";
import { finishLayoutTransitionLoadingWhenIdle } from "@/utils/globalLoading";

const categoryStore = useCategoryStore();
categoryStore.getCategory();
const route = useRoute();
onMounted(finishLayoutTransitionLoadingWhenIdle);
</script>
<template>
  <LayoutFixed></LayoutFixed>
  <LayoutHeader></LayoutHeader>
  <LayoutNav></LayoutNav>
  <div class="layout-content">
    <router-view></router-view>
    <LayoutFooter></LayoutFooter>
    <DataLoading
      :active="route.path === '/' || !route.path.startsWith('/category/')"
      global
      label="正在载入商城内容"
    />
  </div>
</template>

<style scoped>
.layout-content {
  position: relative;
  min-height: calc(100vh - 180px);
}

.layout-content > :deep(.data-loading) {
  z-index: 2000;
  min-height: calc(100vh - 180px);
}
</style>
