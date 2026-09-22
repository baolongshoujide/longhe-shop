import request from "@/utils/request";

export const getCheckoutAPI = () => {
  return request.get("/member/order/pre");
};

export const createOrderAPI = (data) => {
  return request.post("/member/order", data);
};
