import { ref } from "vue";
import { getBannerAPI } from "@/api/home";

export const useBanner = () => {
  const bannerList = ref([]);

  const getBanner = async () => {
    const res = await getBannerAPI(2);
    bannerList.value = res.data.result;
  };
  getBanner();
  return {
    bannerList,
  };
};
