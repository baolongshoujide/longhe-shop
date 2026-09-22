import request from "@/utils/request";

export const getCheckoutAPI = () => {
  return request.get("/member/order/pre");
};
