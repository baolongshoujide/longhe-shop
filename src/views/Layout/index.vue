<script setup>
import LayoutFooter from "./components/LayoutFooter.vue";
import LayoutHeader from "./components/LayoutHeader.vue";
import LayoutNav from "./components/LayoutNav.vue";
</script>
<template>
  <div>我是首页</div>
  <LayoutHeader></LayoutHeader>
  <LayoutNav></LayoutNav>
  <router-view></router-view>
  <LayoutFooter></LayoutFooter>
</template>
