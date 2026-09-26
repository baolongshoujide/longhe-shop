<script setup>
import { useCategoryStore } from "@/stores/categoryStore.js";
import HeaderCart from "./HeaderCart.vue";
const categoryStore = useCategoryStore();
</script>

<template>
  <header class="app-header">
    <div class="container">
      <h1 class="logo">
        <RouterLink to="/">龙核商城</RouterLink>
      </h1>
      <div class="nav-container">
        <ul class="app-header-nav">
          <li>
            <RouterLink
              to="/"
              active-class="active"
              exact-active-class="active"
            >
              首页
            </RouterLink>
          </li>
          <li class="home" v-for="item in categoryStore.cateList" :key="item.id">
            <RouterLink active-class="active" :to="`/category/${item.id}`">{{ item.name }}</RouterLink>
          </li>
        </ul>
      </div>
      <div class="search">
        <i class="iconfont icon-search"></i>
        <input type="text" placeholder="功能未开启" disabled />
      </div>
      <!-- 头部购物车 -->
      <HeaderCart></HeaderCart>
    </div>
  </header>
</template>

<style scoped lang="scss">
.app-header {
  position: relative;
  background:
    linear-gradient(
      90deg,
      transparent 0 18%,
      rgba(0, 184, 255, 0.08) 18.1%,
      transparent 18.3% 100%
    ),
    repeating-linear-gradient(0deg, transparent 0 25px, rgba(0, 184, 255, 0.045) 26px), #0a192b;
  border-bottom: 1px solid rgba(0, 184, 255, 0.25);
  box-shadow: 0 5px 24px rgba(0, 132, 220, 0.12);

  .container {
    display: flex;
    align-items: center;
  }

  .logo {
    width: 280px;
    flex: 0 0 280px;

    a {
      display: block;
      height: 132px;
      width: 100%;
      text-indent: -9999px;
      background: url("@/assets/images/logo.png") no-repeat left center / 270px auto;
    }
  }

  .app-header-nav {
    flex: 1;
    width: auto;
    display: flex;
    padding-left: 18px;
    position: relative;
    z-index: 998;

    li {
      margin-right: 28px;
      width: 38px;
      text-align: center;

      a {
        color: #d6e7f7;
        font-size: 16px;
        line-height: 32px;
        height: 32px;
        display: inline-block;

        &:hover {
          color: $xtxColor;
          border-bottom: 1px solid $xtxColor;
        }
      }

      .active {
        color: $xtxColor;
        border-bottom: 1px solid $xtxColor;
      }
    }
  }

  .nav-container {
    position: relative;
    flex: 1;
    min-width: 0;
    min-height: 38px;
  }

  .search {
    width: 190px;
    height: 38px;
    flex: 0 0 190px;
    position: relative;
    border: 1px solid #00b8ff;
    border-radius: 9px;
    background: linear-gradient(110deg, rgba(20, 30, 50, 0.9), rgba(0, 80, 130, 0.62));
    box-shadow:
      0 0 16px rgba(0, 184, 255, 0.3),
      inset 0 0 10px rgba(0, 125, 255, 0.12);
    line-height: 36px;

    .icon-search {
      font-size: 18px;
      margin-left: 5px;
      color: #54c8ff;
    }

    input {
      width: 140px;
      padding-left: 5px;
      color: #e3f1ff;
      background: transparent;

      &::placeholder {
        color: #8db9d6;
      }
    }
  }

  .cart {
    width: 50px;
    color: #d6e7f7;

    .curr {
      height: 32px;
      line-height: 32px;
      text-align: center;
      position: relative;
      display: block;

      .icon-cart {
        font-size: 22px;
      }

      em {
        font-style: normal;
        position: absolute;
        right: 0;
        top: 0;
        padding: 1px 6px;
        line-height: 1;
        background: $helpColor;
        color: #fff;
        font-size: 12px;
        border-radius: 10px;
        font-family: Arial;
      }
    }
  }
}
</style>
