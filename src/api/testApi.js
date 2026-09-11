import httpInstance from "@/utils/request";

export const test = () => {
  return httpInstance({
    url: "home/category/head",
  });
};
