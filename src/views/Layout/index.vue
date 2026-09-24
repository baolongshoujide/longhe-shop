<script setup>
import LayoutFooter from "./components/LayoutFooter.vue";
import LayoutHeader from "./components/LayoutHeader.vue";
import LayoutNav from "./components/LayoutNav.vue";
import LayoutFixed from "./components/LayoutFixed.vue";
import { useCategoryStore } from "@/stores/categoryStore.js";
import { useAllGoodsListStore } from "@/stores/AllGoodsList.js";

const AllGoodsListStore = useAllGoodsListStore();
AllGoodsListStore.getAllGoodsList();

const categoryStore = useCategoryStore();
categoryStore.getCategory();
</script>
<template>
  <LayoutFixed></LayoutFixed>
  <LayoutHeader></LayoutHeader>
  <LayoutNav></LayoutNav>
  <router-view></router-view>
  <LayoutFooter></LayoutFooter>
</template>
