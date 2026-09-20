import { defineStore } from "pinia";
import { ref } from "vue";
import { getUserAPI } from "@/api/user";
import { useCartStore } from "./cartStore";
import { mergeCartListAPI } from "@/api/cart";

export const useUserStore = defineStore(
  "user",
  () => {
    const user = ref({});
    const CartStore = useCartStore();
    // 请求user数据
    const getUser = async ({ name, password }) => {
      const res = await getUserAPI({ account: name, password });
      user.value = res.data;
      await mergeCartListAPI(
        CartStore.cartList.map((item) => {
          return {
            skuId: item.skuId,
            selected: item.selected,
            count: item.count,
          };
        }),
      );
      CartStore.getCartList();
    };

    // 删除user数据(退出登录)
    const delUser = () => {
      user.value = {};
      CartStore.clearCartList();
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
