<script setup>
import { ref } from "vue";
import HomePanel from "./HomePanel.vue";
import { getHotAPI } from "@/api/home.js";
import DataLoading from "@/components/DataLoading.vue";

const hotList = ref([]);
const loading = ref(true);
const getHotList = async () => {
  try {
    const res = await getHotAPI();
    hotList.value = res.data.result;
  } finally { loading.value = false; }
};
getHotList();
</script>

<template>
  <HomePanel title="人气推荐" sub-titie="人气爆款 不容错过">
    <div class="goods-results">
    <DataLoading v-if="loading" label="正在载入人气推荐" />
    <ul v-else class="goods-list">
      <li v-for="item in hotList" :key="item.id">
        <RouterLink to="/">
          <img v-img-lazy="item.picture" alt="" />
          <p class="name">{{ item.name }}</p>
          <p class="small">{{ item.alt }}</p>
        </RouterLink>
      </li>
    </ul>
    </div>
  </HomePanel>
  <!-- 下面是插槽主体内容模版
  <ul class="goods-list">
    <li v-for="item in hotList" :key="item.id">
      <RouterLink to="/">
        <img v-img-lazy="item.picture" alt="" />
        <p class="name">{{ item.name }}</p>
        <p class="price">&yen;{{ item.price }}</p>
      </RouterLink>
    </li>
  </ul>
  -->
</template>

<style scoped lang="scss">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;

  li {
    width: 306px;
    height: 406px;

    background: rgba(20, 30, 50, 0.75);
    border: 1px solid rgba(0, 184, 255, 0.25);
    border-radius: 6px;
    color: #e5f2ff;
    transition: all 0.5s;

    &:hover {
      transform: translate3d(0, -3px, 0);
      box-shadow: 0 8px 25px rgba(0, 144, 255, 0.14);
      border-color: #00b8ff;
      box-shadow: 0 0 12px rgba(0, 184, 255, 0.4);
    }

    img {
      width: 306px;
      height: 306px;
    }

    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .small {
      color: #91abc3;
      margin-left: 20px;
    }
  }
}
.goods-results { position: relative; min-height: 406px; }
</style>
