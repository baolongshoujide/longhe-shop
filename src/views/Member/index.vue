<script setup>
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const menuList = [
  {
    label: "我的账户",
    children: [
      {
        label: "个人中心",
        path: "/member",
      },
      {
        label: "消息通知",
        path: "/member/message",
      },
      {
        label: "个人信息",
        path: "/member/profile",
      },
      {
        label: "安全设置",
        path: "/member/security",
      },
      {
        label: "地址管理",
        path: "/member/address",
      },
      {
        label: "我的积分",
        path: "/member/integral",
      },
      {
        label: "我的足迹",
        path: "/member/footprint",
      },
      {
        label: "邀请有礼",
        path: "/member/invite",
      },
      {
        label: "会员中心",
        path: "/member/lottery",
      },
    ],
  },

  {
    label: "交易管理",
    children: [
      {
        label: "我的订单",
        path: "/member/order",
      },
      {
        label: "优惠券",
        path: "/member/coupon",
      },
      {
        label: "礼品卡",
        path: "/member/card",
      },
      {
        label: "评价晒单",
        path: "/member/evaluate",
      },
      {
        label: "售后服务",
        path: "/member/after-sale",
      },
    ],
  },

  {
    label: "我的收藏",
    children: [
      {
        label: "收藏的商品",
        path: "/member/collect",
      },
      {
        label: "收藏的店铺",
        path: "/member/shop-collect",
      },
      {
        label: "浏览记录",
        path: "/member/history",
      },
    ],
  },

  {
    label: "帮助中心",
    children: [
      {
        label: "购物指南",
        path: "/member/shopping-guide",
      },
      {
        label: "支付方式",
        path: "/member/payment",
      },
      {
        label: "配送方式",
        path: "/member/delivery",
      },
      {
        label: "售后服务",
        path: "/member/service",
      },
      {
        label: "联系客服",
        path: "/member/contact",
      },
    ],
  },
];

const handleClick = (data) => {
  if (!data.path) return;

  router.push(data.path);
};
</script>

<template>
  <div class="container">
    <div class="xtx-member-aside">
      <el-tree
        :data="menuList"
        :props="{
          label: 'label',
          children: 'children',
        }"
        :expand-on-click-node="true"
        @node-click="handleClick"
      >
        <template #default="{ data }">
          <span
            class="tree-node"
            :class="{
              title: !data.path,
              active: data.path === route.path,
            }"
          >
            {{ data.label }}
          </span>
        </template>
      </el-tree>
    </div>

    <div class="article">
      <RouterView />
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  height: 600px;
  padding-top: 20px;

  .xtx-member-aside {
    width: 220px;
    margin-right: 20px;
    border-radius: 2px;
    background: var(--color-card-bg);
    overflow-y: auto;

    .el-tree {
      padding: 10px 0;
      background: var(--color-card-bg);

      // 每一行节点
      :deep(.el-tree-node__content) {
        height: auto;

        padding-left: 0;

        &:hover {
          background: none;
        }
      }

      // 小三角
      :deep(.el-tree-node__expand-icon) {
        color: var(--color-text-muted);

        margin-left: 20px;
        margin-top: 15px;
        margin-right: 0;
      }

      // 子节点缩进
      :deep(.el-tree-node__children) {
        padding-left: 30px;
      }

      .tree-node {
        display: block;

        position: relative;

        padding: 15px 0;

        font-size: 14px;

        color: var(--color-text-muted);

        &:hover {
          color: $xtxColor;
        }

        &.active {
          color: $xtxColor;

          &:before {
            display: block;
          }
        }

        &:before {
          content: "";

          display: none;

          width: 6px;

          height: 6px;

          border-radius: 50%;

          position: absolute;

          top: 20px;

          left: -16px;

          background: $xtxColor;
        }
      }

      // 一级标题
      .title {
        font-size: 18px;

        font-weight: 400;

        color: var(--color-text-main);

        padding: 20px 0 5px;
      }
    }
  }

  .article {
    width: 1000px;

    background: var(--color-card-bg);
  }
}
</style>
