<script setup>
import { useRoute } from "vue-router";
import { getCategoryFilterAPI, getSubCategoryAPI } from "@/api/category";
import { ref } from "vue";
import GoodsItem from "../Home/components/GoodsItem.vue";
import DataLoading from "@/components/DataLoading.vue";
// 返回一级导航
const route = useRoute();
const category = ref([]);
const categoryLoading = ref(true);
const getCategory = async () => {
  try {
    const res = await getCategoryFilterAPI(route.params.id);
    category.value = res.data.result;
  } finally { categoryLoading.value = false; }
};
getCategory();

// 筛选功能
const goodList = ref([]);
const goodsLoading = ref(true);
const reqData = ref({
  categoryId: route.params.id,
  page: 1,
  pageSize: 20,
  sortField: "publishTime",
});
const getGoodList = async () => {
  goodsLoading.value = true;
  try {
    const res = await getSubCategoryAPI(reqData.value);
    goodList.value = res.data.result.items;
  } finally { goodsLoading.value = false; }
};
getGoodList();
const tabChange = () => {
  reqData.value.page = 1;
  getGoodList();
};

// 加载更多
const disabled = ref(false);
const load = async () => {
  reqData.value.page++;
  const res = await getSubCategoryAPI(reqData.value);
  goodList.value = [...goodList.value, ...res.data.result.items];
  //   加载完毕停止监听
  if (res.data.result.items.length === 0) {
    disabled.value = true;
  }
};
</script>

<template>
  <div class="container">
    <!-- 面包屑 -->
    <div class="bread-container">
      <DataLoading v-if="categoryLoading" label="正在载入分类" />
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/category/${category.parentId}` }"
          >{{ category.parentName }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ category.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <el-tabs v-model="reqData.sortField" @tab-change="tabChange">
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <div class="body results" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
        <DataLoading v-if="goodsLoading" label="正在载入商品" />
        <!-- 商品列表-->
        <GoodsItem v-for="item in goodList" :good="item" :key="item.id"></GoodsItem>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bread-container {
  position: relative;
  min-height: 66px;
  padding: 25px 0;
  color: var(--color-text-muted);
}

.sub-container {
  padding: 20px 10px;
  background-color: var(--color-card-bg);

  .body {
    position: relative;
    min-height: 360px;
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: var(--color-text-muted);
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}
</style>
