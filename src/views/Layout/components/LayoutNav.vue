<script setup></script>
<template>
  <div class="box">
    <div class="left">
      <img src="@/assets/images/logo.png" alt="" />
      <router-link to="">首页</router-link>
      <router-link to="">居家</router-link>
      <router-link to="">美食</router-link>
      <router-link to="">服饰</router-link>
    </div>
    <div class="right">
      <input type="text" placeholder="搜一搜" />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.box {
  height: 80px;
  width: 100%;
  padding: 0 40px;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  .left {
    height: 100%;
    display: flex;
    align-items: center;
    font-size: large;
    font-weight: 600;
    img {
      max-width: 100%;
      max-height: 100%;
      vertical-align: middle;
      background: white;
    }
    a {
      margin-left: 40px;
    }
  }
  .right {
    height: 100%;
    display: flex;
    align-items: center;
    input {
      width: 300px;
      border-bottom: 2px solid beige;
      padding-bottom: 5px;
      font-size: large;
    }
  }
}
</style>
