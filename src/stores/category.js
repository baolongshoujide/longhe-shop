import { defineStore } from "pinia";
import { ref } from "vue";
import { getCategoryAPI } from "@/api/layout";

export const useCategoryStore = defineStore("category", () => {
  const cateList = ref([]);

  const getCategory = async () => {
    const res = await getCategoryAPI();
    console.log(res);
    cateList.value = res.data.result;
  };
  return {
    cateList,
    getCategory,
  };
});
