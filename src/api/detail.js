import request from "@/utils/request";

export const getGoodsAPI = (id) => {
  return request.get("/goods", { params: { id } });
};
