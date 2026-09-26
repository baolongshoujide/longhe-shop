<script setup>
import HomeCategory from "./components/HomeCategory.vue";
import HomeBanner from "./components/HomeBanner.vue";
import HomeNew from "./components/HomeNew.vue";
import HomeHot from "./components/HomeHot.vue";
import homeProduct from "./components/HomeProduct.vue";
import DataLoading from "@/components/DataLoading.vue";
import { homeTransitionLoadingVisible } from "@/utils/globalLoading";
</script>

<template>
  <div class="home-page">
    <div class="home-page-content" :class="{ 'is-loading': homeTransitionLoadingVisible }">
      <div class="container">
        <HomeCategory />
        <HomeBanner />
      </div>
      <HomeNew />
      <HomeHot />
      <homeProduct />
    </div>
    <div v-if="homeTransitionLoadingVisible" class="home-loading-area">
      <DataLoading active label="正在载入商城首页" />
    </div>
  </div>
</template>

<style scoped>
.home-page {
  position: relative;
}

.home-page-content.is-loading {
  display: none;
}

.home-loading-area {
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
