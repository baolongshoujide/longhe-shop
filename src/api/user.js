import request from "@/utils/request";

export const getUserAPI = ({ account, password }) => {
  return request.post("/login", { account, password });
};

export const getLikeListAPI = ({ limit = 4 }) => {
  return request({
    url: "/goods/relevant",
    params: {
      limit,
    },
  });
};
