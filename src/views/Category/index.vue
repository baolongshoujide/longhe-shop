<script setup>
import { useBanner } from "./composables/useBanner.js";
import { useCategory } from "./composables/useCategory.js";
import GoodsItem from "../Home/components/GoodsItem.vue";
import DataLoading from "@/components/DataLoading.vue";
import { computed } from "vue";

const { bannerList, loading: bannerLoading } = useBanner();
const { category, loading: categoryLoading } = useCategory();
const contentLoading = computed(() => bannerLoading.value || categoryLoading.value);
</script>

<template>
  <div class="top-category">
    <div class="container m-top-20">
      <!-- 面包屑 -->
      <div class="bread-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ category.name || "商品分类" }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div v-if="contentLoading" class="category-loading-area">
        <DataLoading active label="正在载入商城内容" />
      </div>
      <template v-else>
        <!-- 轮播图 -->
        <div class="home-banner">
          <el-carousel height="500px">
            <el-carousel-item v-for="item in bannerList" :key="item">
              <img v-img-lazy="item.imgUrl" alt="" />
            </el-carousel-item>
          </el-carousel>
        </div>
        <!-- 分类 -->
        <div class="sub-list">
          <h3>全部分类</h3>
          <ul>
            <li v-for="i in category.children" :key="i.id">
              <RouterLink :to="`/category/sub/${i.id}`">
                <img v-img-lazy="i.picture" />
                <p>{{ i.name }}</p>
              </RouterLink>
            </li>
          </ul>
        </div>
        <div class="ref-goods" v-for="item in category.children" :key="item.id">
          <div class="head">
            <h3>- {{ item.name }}-</h3>
          </div>
          <div class="body">
            <GoodsItem v-for="good in item.goods" :good="good" :key="good.id" />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
.top-category {
  h3 {
    font-size: 28px;
    color: var(--color-text-muted);
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }

  .sub-list {
    position: relative;
    min-height: 220px;
    margin-top: 20px;
    background-color: var(--color-card-bg);

    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;

      li {
        width: 168px;
        height: 160px;

        a {
          text-align: center;
          display: block;
          font-size: 16px;

          img {
            width: 100px;
            height: 100px;
          }

          p {
            line-height: 40px;
          }

          &:hover {
            color: $xtxColor;
          }
        }
      }
    }
  }

  .ref-goods {
    background-color: var(--color-card-bg);
    margin-top: 20px;
    position: relative;

    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }

      .tag {
        text-align: center;
        color: var(--color-text-muted);
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }

    .body {
      display: flex;
      justify-content: space-around;
      padding: 0 40px 30px;
    }
  }

  .bread-container {
    padding: 25px 0;
  }

  .category-loading-area {
    position: relative;
    height: clamp(420px, 72vh, 760px);
    margin-top: 12px;
    overflow: hidden;
    border: 1px solid rgba(0, 184, 255, 0.16);
    border-radius: 5px;
    background: transparent;
  }
}
.home-banner {
  position: relative;
  width: 1240px;
  height: 500px;
  margin: 0 auto;
  z-index: 98;

  img {
    width: 100%;
    height: 500px;
  }
}
</style>
