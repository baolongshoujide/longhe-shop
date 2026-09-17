import request from "@/utils/request";

export const getUserAPI = ({ account, password }) => {
  return request.post("/login", { account, password });
};
