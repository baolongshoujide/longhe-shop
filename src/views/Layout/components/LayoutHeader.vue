<script setup>
import { ref } from "vue";

const link = ref();
console.log(link);
</script>
<template>
  <div class="box" v-if="1">
    <div class="header">
      <router-link to="" ref="link">周杰伦</router-link>
      <router-link to="">退出登录</router-link>
      <router-link to="">我的订单</router-link>
      <router-link to="">会员中心</router-link>
    </div>
  </div>
  <div class="box" v-else></div>
</template>
<style lang="scss" scoped>
.box {
  width: 100%;
  .header {
    width: 100%;
    height: 40px;
    background-color: black;
    color: white;
    display: flex;
    justify-content: end;
    align-items: center;
    a {
      color: white;
      padding: 0 10px;
      border-right: 2px solid;
    }
    a:last-child {
      border: none;
      padding-right: 80px;
    }
  }
}
</style>
