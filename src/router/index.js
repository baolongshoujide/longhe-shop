import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/Login/index.vue";
import Layout from "@/views/Layout/index.vue";
import { useUserStore } from "@/stores/userStore";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Layout,
      children: [
        {
          path: "",
          component: () => import("@/views/Home/index.vue"),
        },
        {
          path: "category/:id",
          component: () => import("@/views/Category/index.vue"),
        },
        {
          path: "category/sub/:id",
          component: () => import("@/views/subcategory/index.vue"),
        },
        {
          path: "detail/:id",
          component: () => import("@/views/Detail/index.vue"),
        },
        {
          path: "cartlist",
          component: () => import("@/views/CartList/index.vue"),
        },
        {
          path: "checkout",
          component: () => import("@/views/Checkout/index.vue"),
        },
        {
          path: "pay/:id",
          component: () => import("@/views/Pay/index.vue"),
        },
        {
          path: "paycallback",
          component: () => import("@/views/Pay/PayBack.vue"),
        },
        {
          path: "member",
          component: () => import("@/views/Member/index.vue"),
          children: [
            {
              path: "",
              component: () => import("@/views/Member/components/Userinfo.vue"),
            },
            {
              path: "/member/order",
              component: () => import("@/views/Member/components/UserOrder.vue"),
            },
            {
              path: "message",
              component: () => import("@/views/None/index.vue"),
            },
            {
              path: "profile",
              component: () => import("@/views/None/index.vue"),
            },
            {
              path: "security",
              component: () => import("@/views/None/index.vue"),
            },
            {
              path: "address",
              component: () => import("@/views/None/index.vue"),
            },
            {
              path: "integral",
              component: () => import("@/views/None/index.vue"),
            },
            {
              path: "footprint",
              component: () => import("@/views/None/index.vue"),
            },
            {
              path: "invite",
              component: () => import("@/views/None/index.vue"),
            },
            {
              path: "lottery",
              component: () => import("@/views/None/index.vue"),
            },

            {
              path: "coupon",
              component: () => import("@/views/None/index.vue"),
            },
            {
              path: "card",
              component: () => import("@/views/None/index.vue"),
            },
            {
              path: "evaluate",
              component: () => import("@/views/None/index.vue"),
            },
            {
              path: "after-sale",
              component: () => import("@/views/None/index.vue"),
            },

            {
              path: "collect",
              component: () => import("@/views/None/index.vue"),
            },
            {
              path: "shop-collect",
              component: () => import("@/views/None/index.vue"),
            },
            {
              path: "history",
              component: () => import("@/views/None/index.vue"),
            },

            {
              path: "shopping-guide",
              component: () => import("@/views/None/index.vue"),
            },
            {
              path: "payment",
              component: () => import("@/views/None/index.vue"),
            },
            {
              path: "delivery",
              component: () => import("@/views/None/index.vue"),
            },
            {
              path: "service",
              component: () => import("@/views/None/index.vue"),
            },
            {
              path: "contact",
              component: () => import("@/views/None/index.vue"),
            },
          ],
        },
      ],
    },
    {
      path: "/login",
      component: Login,
    },
  ],
  // 切换路由的时候自动回到顶部
  scrollBehavior() {
    return {
      top: 0,
    };
  },
});

router.beforeEach((to) => {
  const userStore = useUserStore();
  const token = userStore.user?.result?.token;
  if (to.path === "/login" && token) {
    return "/";
  }
});

export default router;
