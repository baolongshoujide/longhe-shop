import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/Login/index.vue";
import Layout from "@/views/Layout/index.vue";
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

export default router;
