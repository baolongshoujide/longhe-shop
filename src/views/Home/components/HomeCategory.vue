<script setup>
import { useCategoryStore } from "@/stores/categoryStore";
import DataLoading from "@/components/DataLoading.vue";

const category = useCategoryStore();
const visibleGoods = (item) => (Array.isArray(item.goods) ? item.goods.slice(0, 6) : []);
</script>

<template>
  <nav class="home-category" aria-label="商品分类">
    <DataLoading v-if="category.loading" label="正在载入分类" />
    <ul class="menu">
      <li v-for="item in category.cateList" :key="item.id">
        <div class="category-row">
          <RouterLink class="category-name" :to="`/category/${item.id}`">{{ item.name }}</RouterLink>
          <RouterLink
            v-for="child in item.children?.slice(0, 2) || []"
            :key="child.id"
            class="category-shortcut"
            :to="`/category/sub/${child.id}`"
          >
            {{ child.name }}
          </RouterLink>
        </div>

        <section class="category-panel" :aria-label="`${item.name}分类推荐`">
          <header class="panel-heading">
            <RouterLink :to="`/category/${item.id}`">{{ item.name }}精选</RouterLink>
            <span>精选商品</span>
          </header>

          <div v-if="item.children?.length" class="child-links">
            <RouterLink
              v-for="child in item.children.slice(0, 6)"
              :key="child.id"
              :to="`/category/sub/${child.id}`"
            >
              {{ child.name }}
            </RouterLink>
          </div>

          <ul v-if="visibleGoods(item).length" class="recommend-grid">
            <li v-for="good in visibleGoods(item)" :key="good.id">
              <RouterLink class="recommend-card" :to="`/detail/${good.id}`">
                <img v-img-lazy="good.picture" :alt="good.name" />
                <span class="recommend-info">
                  <span class="recommend-name">{{ good.name }}</span>
                  <span class="recommend-desc">{{ good.desc }}</span>
                  <span class="recommend-price">¥{{ good.price }}</span>
                </span>
              </RouterLink>
            </li>
          </ul>
        </section>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
.home-category {
  position: relative;
  z-index: 99;
  width: 250px;
  height: 500px;
  border: 1px solid rgba(0, 184, 255, 0.25);
  background: rgba(8, 12, 24, 0.88);
  box-shadow: inset 0 0 28px rgba(0, 129, 211, 0.08);

  .menu {
    height: 100%;

    > li {
      height: 55px;

      &:hover,
      &:focus-within {
        background: rgba(0, 184, 255, 0.14);

        .category-panel { display: block; }
      }
    }
  }

  .category-row {
    display: flex;
    align-items: center;
    gap: 7px;
    height: 100%;
    padding: 0 12px 0 28px;
    white-space: nowrap;
  }

  .category-name {
    flex: 0 0 auto;
    color: #fff;
    font-size: 16px;
  }

  .category-shortcut {
    overflow: hidden;
    color: #aebed0;
    font-size: 12px;
    text-overflow: ellipsis;
  }

  a:hover { color: #33ccff; }

  .category-panel {
    position: absolute;
    top: -1px;
    left: 100%;
    display: none;
    width: min(990px, calc(100vw - 300px));
    max-height: 500px;
    overflow: auto;
    padding: 18px 20px;
    border: 1px solid rgba(0, 184, 255, 0.32);
    background: rgba(8, 12, 24, 0.97);
    box-shadow: 8px 10px 32px rgba(0, 0, 0, 0.38), inset 0 0 28px rgba(0, 129, 211, 0.08);
    backdrop-filter: blur(12px);
  }

  .panel-heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;

    a { color: #e8f2ff; font-size: 18px; }
    span { color: #96a8c2; font-size: 12px; }
  }

  .child-links {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 14px;

    a {
      padding: 4px 10px;
      border: 1px solid rgba(0, 184, 255, 0.18);
      border-radius: 3px;
      color: #b6c7dc;
      font-size: 12px;
      line-height: 1.4;
    }
  }

  .recommend-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 10px;

    > li { min-width: 0; }
  }

  .recommend-card {
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 0;
    min-height: 102px;
    padding: 9px;
    border: 1px solid rgba(0, 184, 255, 0.2);
    border-radius: 4px;
    background: rgba(20, 30, 50, 0.76);
    transition: border-color 0.18s ease, background 0.18s ease;

    &:hover {
      border-color: #00b8ff;
      background: rgba(0, 136, 204, 0.18);
    }

    img {
      flex: 0 0 78px;
      width: 78px;
      height: 78px;
      object-fit: contain;
      background: transparent;
    }
  }

  .recommend-info {
    display: flex;
    flex-direction: column;
    min-width: 0;
    gap: 4px;
  }

  .recommend-name,
  .recommend-desc {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .recommend-name { color: #e8f2ff; font-size: 14px; }
  .recommend-desc { color: #96a8c2; font-size: 12px; }
  .recommend-price { color: #ff3344; font-size: 16px; }
}
</style>
