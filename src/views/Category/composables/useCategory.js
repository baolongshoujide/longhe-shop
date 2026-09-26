import { getCategoryAPI } from "@/api/category";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

export const useCategory = () => {
  const category = ref({});
  const loading = ref(true);
  const route = useRoute();
  const getCategory = async () => {
    loading.value = true;
    try {
      const res = await getCategoryAPI(route.params.id);
      category.value = res.data.result;
    } finally { loading.value = false; }
  };

  watch(
    () => route.params.id,
    () => {
      getCategory();
    },
    {
      immediate: true,
    },
  );

  return {
    category,
    loading,
  };
};
