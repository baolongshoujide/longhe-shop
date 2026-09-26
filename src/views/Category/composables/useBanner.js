import { ref } from "vue";
import { getBannerAPI } from "@/api/home";

export const useBanner = () => {
  const bannerList = ref([]);
  const loading = ref(true);

  const getBanner = async () => {
    try {
      const res = await getBannerAPI(2);
      bannerList.value = res.data.result;
    } finally { loading.value = false; }
  };
  getBanner();
  return {
    bannerList,
    loading,
  };
};
