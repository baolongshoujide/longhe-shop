<script setup>
import { getBannerAPI } from "@/api/home";
import { ref } from "vue";
import DataLoading from "@/components/DataLoading.vue";

const bannerList = ref([]);
const loading = ref(true);

const getBanner = async () => {
  try {
    const res = await getBannerAPI();
    bannerList.value = res.data.result;
  } finally {
    loading.value = false;
  }
};
getBanner();
</script>

<template>
  <div class="home-banner">
    <DataLoading v-if="loading" label="正在载入商城推荐" />
    <el-carousel height="500px">
      <el-carousel-item v-for="item in bannerList" :key="item">
        <img v-img-lazy="item.imgUrl" alt="" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style scoped lang="scss">
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
  border: 1px solid rgba(0, 184, 255, 0.34);
  border-radius: 4px;
  box-shadow: 0 0 24px rgba(0, 136, 204, 0.2);
  overflow: hidden;
  position: absolute;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    opacity: 0.22;
    mix-blend-mode: screen;
    background: repeating-linear-gradient(0deg, transparent 0 36px, rgba(0, 184, 255, 0.28) 37px),
      repeating-linear-gradient(90deg, transparent 0 88px, rgba(0, 184, 255, 0.22) 89px);
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 2;
    pointer-events: none;
    background:
      linear-gradient(90deg, transparent 0 68%, rgba(0, 184, 255, 0.07) 68.1%, transparent 68.3%),
      repeating-linear-gradient(0deg, transparent 0 29px, rgba(0, 184, 255, 0.04) 30px),
      linear-gradient(90deg, rgba(3, 10, 22, 0.1), transparent 36%, rgba(0, 9, 23, 0.16));
    box-shadow: inset 0 0 55px rgba(0, 98, 170, 0.24);
  }

  img {
    width: 100%;
    height: 500px;
    object-fit: cover;
  }
}
</style>
