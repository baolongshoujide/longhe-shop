<script setup>
import LayoutFooter from "./components/LayoutFooter.vue";
import LayoutHeader from "./components/LayoutHeader.vue";
import LayoutNav from "./components/LayoutNav.vue";
import LayoutFixed from "./components/LayoutFixed.vue";
import { useCategoryStore } from "@/stores/categoryStore.js";
import DataLoading from "@/components/DataLoading.vue";
import { useRoute } from "vue-router";
import { computed, onMounted } from "vue";
import { finishLayoutTransitionLoadingWhenIdle, globalLoadingVisible } from "@/utils/globalLoading";

const categoryStore = useCategoryStore();
categoryStore.getCategory();
const route = useRoute();
const dedicatedLoadingRoute = computed(
  () =>
    route.path === "/" ||
    route.path.startsWith("/checkout") ||
    route.path.startsWith("/category/") ||
    route.path.startsWith("/detail/"),
);
const showLayoutLoading = computed(
  () => globalLoadingVisible.value && !dedicatedLoadingRoute.value,
);
onMounted(finishLayoutTransitionLoadingWhenIdle);
</script>
<template>
  <LayoutFixed></LayoutFixed>
  <LayoutHeader></LayoutHeader>
  <LayoutNav></LayoutNav>
  <div class="layout-content">
    <div class="layout-page-view" :class="{ 'is-loading': showLayoutLoading }">
      <router-view></router-view>
    </div>
    <div v-if="showLayoutLoading" class="layout-loading-area">
      <DataLoading active label="正在载入商城内容" />
    </div>
    <LayoutFooter></LayoutFooter>
  </div>
</template>

<style scoped>
.layout-content {
  min-height: calc(100vh - 180px);
}

.layout-page-view.is-loading {
  display: none;
}

.layout-loading-area {
  position: relative;
  width: min(1240px, calc(100% - 32px));
  height: var(--small-loading-height);
  margin: 0 auto;
  overflow: hidden;
  border: 1px solid rgba(0, 184, 255, 0.16);
  border-radius: 5px;
  background: transparent;
}
</style>
