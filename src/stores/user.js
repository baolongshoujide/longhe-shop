import { defineStore } from "pinia";
import { ref } from "vue";
import { getUserAPI } from "@/api/user";

export const useUserStore = defineStore(
  "user",
  () => {
    const user = ref({});

    // 请求user数据
    const getUser = async ({ name, password }) => {
      const res = await getUserAPI({ account: name, password });
      console.log(res);
      user.value = res.data;
    };

    // 删除user数据(退出登录)
    const delUser = () => {
      user.value = {};
    };
    return {
      user,
      getUser,
      delUser,
    };
  },
  {
    persist: true,
  },
);
