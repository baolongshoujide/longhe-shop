import { defineStore } from "pinia";
import { ref } from "vue";
import { getCategoryAPI } from "@/api/layout";

export const useCategoryStore = defineStore("category", () => {
  const cateList = ref([]);
  const loading = ref(false);
  let categoryRequest;

  const getCategory = async () => {
    if (cateList.value.length) return cateList.value;
    if (categoryRequest) return categoryRequest;
    loading.value = true;
    categoryRequest = getCategoryAPI()
      .then((res) => {
        cateList.value = res.data.result;
        return cateList.value;
      })
      .finally(() => {
        loading.value = false;
        categoryRequest = undefined;
      });
    return categoryRequest;
  };
  return {
    cateList,
    loading,
    getCategory,
  };
});
