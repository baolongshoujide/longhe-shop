import { getCategoryAPI } from "@/api/category";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

export const useCategory = () => {
  const category = ref({});
  const route = useRoute();
  const getCategory = async () => {
    const res = await getCategoryAPI(route.params.id);
    category.value = res.data.result;
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
  };
};
