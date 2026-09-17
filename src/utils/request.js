import axios from "axios";
import { ElMessage } from "element-plus";
import { useUserStore } from "@/stores/user";
import router from "@/router";

const httpInstance = axios.create({
  baseURL: "https://pcapi-xiaotuxian-front-devtest.itheima.net",
  timeout: 5000,
});

// 添加请求拦截器
httpInstance.interceptors.request.use(
  function (config) {
    // 在请求发送之前执行某些操作
    const userStore = useUserStore();
    const token = userStore.user?.result?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    // 处理请求错误
    return Promise.reject(error);
  },
);

// 添加响应拦截器
httpInstance.interceptors.response.use(
  function (response) {
    // 状态码在 2xx 范围内的响应会触发此函数
    // 处理响应数据
    return response;
  },
  function (error) {
    // 状态码不在 2xx 范围内的响应会触发此函数
    // 处理响应错误
    console.log(error);

    ElMessage.warning(error.response?.data?.message);
    if (error.response?.status === 401) {
      const userStore = useUserStore();
      userStore.delUser();
      router.push("/login");
    }
    return Promise.reject(error);
  },
);

export default httpInstance;
