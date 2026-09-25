<script setup>
import { useCategoryStore } from "@/stores/categoryStore";

const category = useCategoryStore();
</script>

<template>
  <div class="home-category">
    <ul class="menu">
      <li v-for="item in category.cateList" :key="item">
        <RouterLink to="/">{{ item.name }}</RouterLink>
        <RouterLink v-for="i in item.children.slice(0, 2)" :key="i" to="/">{{ i.name }}</RouterLink>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.home-category {
  width: 250px;
  height: 500px;
  background: rgba(8, 12, 24, 0.86);
  border: 1px solid rgba(0, 184, 255, 0.25);
  box-shadow: inset 0 0 28px rgba(0, 129, 211, 0.08);
  position: relative;
  z-index: 99;

  .menu {
    li {
      padding-left: 40px;
      height: 55px;
      line-height: 55px;

      &:hover {
        background: rgba(0, 184, 255, 0.14);
      }

      a {
        margin-right: 4px;
        color: #fff;

        &:first-child {
          font-size: 16px;
        }
      }

    }
  }
}
</style>
