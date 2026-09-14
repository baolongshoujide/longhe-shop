import request from "@/utils/request";

export const getCategoryAPI = (id) => {
  return request.get("/category", { params: { id } });
};

export const getCategoryFilterAPI = (id) => {
  return request({
    url: "/category/sub/filter",
    params: {
      id,
    },
  });
};
