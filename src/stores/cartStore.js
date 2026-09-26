import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { delCartAPI, addCartAPI, getCartListAPI, updateCartAPI } from "@/api/cart";
import { ElMessage } from "element-plus";

import { useUserStore } from "./userStore";

export const useCartStore = defineStore(
  "cart",
  () => {
    const useStore = useUserStore();
    const isLogin = computed(() => useStore.user?.result?.token);
    const cartList = ref([]);
  const loading = ref(false);

    const getCartList = async () => {
      loading.value = true;
      try {
        const res = await getCartListAPI();
        cartList.value = res.data.result;
      } finally { loading.value = false; }
      console.log(cartList.value);
    };
    const addCart = async (goods) => {
      if (isLogin.value) {
        await addCartAPI(goods);
        getCartList();
      } else {
        const item = cartList.value.find((item) => {
          return item.skuId === goods.skuId;
        });
        if (item) {
          item.count += goods.count;
        } else {
          cartList.value.push(goods);
        }
      }
    };
    const delCart = async (id) => {
      if (isLogin.value) {
        if (!Array.isArray(id)) {
          id = [id];
        }
        await delCartAPI(id);
        getCartList();
      } else {
        if (id) {
          cartList.value = cartList.value.filter((item) => {
            return item.skuId !== id;
          });
        } else {
          ElMessage.error("商品不存在");
        }
      }
    };
    const clearCartList = () => {
      cartList.value = [];
    };

    const count = computed(() => {
      return cartList.value.reduce((sum, item) => {
        return sum + item.count;
      }, 0);
    });
    const price = computed(() => {
      return cartList.value.reduce((sum, item) => {
        return sum + item.count * item.price;
      }, 0);
    });

    const isAll = computed(() => {
      return (
        cartList.value.length > 0 &&
        cartList.value.every((item) => {
          return item.selected;
        })
      );
    });
    const changeAll = async (selected) => {
      cartList.value.forEach((item) => {
        item.selected = selected;
      });
      const results = await Promise.allSettled(
        cartList.value.map((item) =>
          updateCartAPI({ skuId: item.skuId, count: item.count, selected }),
        ),
      );
      if (results.some((result) => result.status === "rejected")) await getCartList();
    };
    const updateCart = async ({ skuId, count, selected }) => {
      try {
        await updateCartAPI({ skuId, count, selected });
      } catch {
        await getCartList();
      }
    };
    const checkedNum = computed(() => {
      return cartList.value.reduce((sum, item) => {
        if (item.selected) {
          sum += item.count;
        }
        return sum;
      }, 0);
    });
    const checkedPrice = computed(() => {
      return cartList.value.reduce((sum, item) => {
        if (item.selected) {
          sum += item.count * item.price;
        }
        return sum;
      }, 0);
    });
    return {
      cartList,
    loading,
      addCart,
      delCart,
      count,
      price,
      isAll,
      changeAll,
      updateCart,
      checkedNum,
      checkedPrice,
      clearCartList,
      getCartList,
    };
  },
  {
    persist: true,
  },
);
