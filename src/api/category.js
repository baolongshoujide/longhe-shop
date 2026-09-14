import request from "@/utils/request";

export const getCategoryAPI = (id) => {
  return request.get("/category", { params: { id } });
};
