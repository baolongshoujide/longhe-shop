<script setup>
defineProps({
  good: {
    type: Object,
    default: () => {},
  },
});
</script>

<template>
  <RouterLink :to="`/detail/${good.id}`" class="goods-item">
    <img v-img-lazy="good.picture" alt="" />
    <p class="name ellipsis">{{ good.name }}</p>
    <p class="desc ellipsis">{{ good.desc }}</p>
    <p class="price">&yen;{{ good.price }}</p>
  </RouterLink>
</template>
<style lang="scss" scoped>
.goods-item {
  display: block;
  width: 220px;
  padding: 20px 30px;
  text-align: center;
  color: $themeText;
  background: rgba(20, 30, 50, 0.75);
  border: 1px solid rgba(0, 184, 255, 0.25);
  border-radius: 6px;
  transition: all 0.5s;

  &:hover {
    transform: translate3d(0, -3px, 0);
    box-shadow: 0 8px 25px rgba(0, 144, 255, 0.14);
    border-color: #00b8ff;
    box-shadow: 0 0 12px rgba(0, 184, 255, 0.4);
  }

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
    color: $themeMuted;
    height: 29px;
  }

  .price {
    color: $priceColor;
    font-size: 20px;
  }
}
</style>
