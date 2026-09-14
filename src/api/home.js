import request from "@/utils/request";

export const getBannerAPI = () => {
  return request.get("/home/banner");
};

export const getNewAPI = () => {
  return request.get("/home/new");
};

export const getHotAPI = () => {
  return request.get("/home/hot");
};
