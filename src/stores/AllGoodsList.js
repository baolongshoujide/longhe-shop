import { defineStore } from "pinia";
import { ref } from "vue";
import { useCategoryStore } from "@/stores/categoryStore";

export const useAllGoodsListStore = defineStore("allList", () => {
  const allGoods = ref(null);
  const categoryStore = useCategoryStore();
  const getAllGoodsList = async () => {
    await categoryStore.getCategory();
    console.log(categoryStore.cateList);
  };

  return {
    allGoods,
    getAllGoodsList,
  };
});
