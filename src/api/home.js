import request from "@/utils/request";

export const getBannerAPI = (distributionSite = 1) => {
  return request.get("/home/banner", { params: { distributionSite } });
};

export const getNewAPI = () => {
  return request.get("/home/new");
};

export const getHotAPI = () => {
  return request.get("/home/hot");
};

export const getGoodsAPI = () => {
  return request.get("/home/goods");
};
