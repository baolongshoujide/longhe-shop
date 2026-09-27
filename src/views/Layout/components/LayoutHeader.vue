<script setup>
import { useUserStore } from "@/stores/userStore";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();
const confirm = () => {
  userStore.delUser();
};

const noLogin = () => {
  ElMessage.warning("请先登录");
};
</script>

<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <template v-if="userStore.user?.result?.token">
          <li>
            <a href="javascript:;" @click="router.push('/member')"
              ><i class="iconfont icon-user"></i>{{ userStore.user.result.account }}</a
            >
          </li>
          <li>
            <el-popconfirm
              @confirm="confirm"
              title="确认退出吗?"
              confirm-button-text="确认"
              cancel-button-text="取消"
            >
              <template #reference>
                <a href="javascript:;">退出登录</a>
              </template>
            </el-popconfirm>
          </li>
          <li><a href="javascript:;" @click="router.push('/member/order')">我的订单</a></li>
          <li><a href="javascript:;" @click="router.push('/member/lottery')">会员中心</a></li>
        </template>
        <template v-else>
          <li><a href="javascript:;" @click="$router.push('/login')">请先登录</a></li>
          <li><a href="javascript:;" @click="noLogin">帮助中心</a></li>
          <li><a href="javascript:;" @click="noLogin">关于我们</a></li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<style scoped lang="scss">
.app-topnav {
  background: #06111f;
  border-bottom: 1px solid #163552;
  ul {
    display: flex;
    height: 48px;
    justify-content: flex-end;
    align-items: center;
    li {
      a {
        padding: 0 15px;
        color: #a9bfd3;
        line-height: 1;
        display: inline-block;

        i {
          font-size: 14px;
          margin-right: 2px;
        }

        &:hover {
          color: $xtxColor;
        }
      }

      ~ li {
        a {
          border-left: 1px solid #29445f;
        }
      }
    }
  }
}
</style>
