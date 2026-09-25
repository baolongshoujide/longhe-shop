import request from "@/utils/request";

export const getCheckoutAPI = () => {
  return request.get("/member/order/pre");
};

export const createOrderAPI = (data) => {
  return request.post("/member/order", data);
};

export const addAddressAPI = (data) => {
  return request.post("/member/address", data);
};

export const delAddressAPI = ({ id }) => {
  return request.delete(`/member/address/${id}`);
};

export const editAddressAPI = ({ id, ...data }) => {
  return request.put(`/member/address/${id}`, data);
};
