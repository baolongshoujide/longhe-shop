import request from "@/utils/request";

export const addCartAPI = ({ skuId, count }) => {
  return request.post("/member/cart", {
    skuId,
    count,
  });
};

export const delCartAPI = (ids) => {
  return request.delete("/member/cart", { data: { ids } });
};

export const getCartListAPI = () => {
  return request.get("/member/cart");
};

export const updateCartAPI = ({ skuId, count, selected }) => {
  return request.put(`/member/cart/${skuId}`, { count, selected });
};

export const mergeCartListAPI = (cartList) => {
  return request.post("/member/cart/merge", cartList);
};
