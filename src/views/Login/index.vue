<script setup>
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { Hide, View } from "@element-plus/icons-vue";
import { ref } from "vue";
import { useUserStore } from "@/stores/userStore";

const form = ref({
  name: "heima287",
  password: "hm#qd@23!",
  isTrue: false,
});
const passwordVisible = ref(false);
const rules = ref({
  name: [{ required: true, message: "昵称不能为空", trigger: "blur" }],
  password: [
    { required: true, message: "密码不能为空", trigger: "blur" },
    { min: 6, max: 14, message: "密码需要6-14位", trigger: "blur" },
  ],
  isTrue: [
    {
      validator: (rule, value, callback) => {
        if (value) {
          callback();
        } else {
          callback(new Error("请勾选协议"));
        }
      },
    },
  ],
});
const formRef = ref();
const router = useRouter();
const userStore = useUserStore();
const submit = () => {
  // 判断表单上所有要求结果是否为true
  formRef.value.validate(async (a) => {
    if (a) {
      const { name, password } = form.value;

      await userStore.getUser({ name, password });
      ElMessage.success("登陆成功");
      router.replace("/");
    } else {
      ElMessage.warning(form.value.isTrue ? "账号或用户名错误" : "请勾选条例");
    }
  });
};
</script>

<template>
  <div class="login-page" :class="{ 'privacy-accepted': form.isTrue }">
    <header class="login-header">
      <div class="container m-top-20">
        <h1 class="logo">
          <RouterLink to="/">龙核商城</RouterLink>
        </h1>
        <RouterLink class="entry" to="/">
          进入网站首页
          <i class="iconfont icon-angle-right"></i>
          <i class="iconfont icon-angle-right"></i>
        </RouterLink>
      </div>
    </header>
    <span class="login-eye-glow" aria-hidden="true"></span>
    <section class="login-section">
      <div class="wrapper">
        <nav>
          <a href="javascript:;">账户登录</a>
        </nav>
        <div class="account-box">
          <div class="form">
            <el-form
              :rules="rules"
              ref="formRef"
              :model="form"
              label-position="right"
              label-width="60px"
              status-icon
            >
              <el-form-item label="账户" prop="name">
                <el-input v-model="form.name" />
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="form.password" :type="passwordVisible ? 'text' : 'password'">
                  <template #suffix>
                    <button
                      class="password-toggle"
                      type="button"
                      :aria-label="passwordVisible ? '隐藏密码' : '显示密码'"
                      :title="passwordVisible ? '隐藏密码' : '显示密码'"
                      @mousedown.prevent
                      @click.stop="passwordVisible = !passwordVisible"
                    >
                      <el-icon><component :is="passwordVisible ? View : Hide" /></el-icon>
                    </button>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item label-width="22px" prop="isTrue">
                <el-checkbox size="large" v-model="form.isTrue">
                  我已同意隐私条款和服务条款
                </el-checkbox>
              </el-form-item>
              <el-button size="large" class="subBtn" @click="submit">点击登录</el-button>
            </el-form>
          </div>
        </div>
      </div>
    </section>

    <footer class="login-footer">
      <div class="container">
        <p>
          <a href="javascript:;">关于我们</a>
          <a href="javascript:;">帮助中心</a>
          <a href="javascript:;">售后服务</a>
          <a href="javascript:;">配送与验收</a>
          <a href="javascript:;">商务合作</a>
          <a href="javascript:;">搜索推荐</a>
          <a href="javascript:;">友情链接</a>
        </p>
        <p>CopyRight &copy; 龙核商城</p>
      </div>
    </footer>
  </div>
</template>

<style scoped lang="scss">
.login-header {
  background: rgba(8, 12, 24, 0.52);
  border-bottom: 1px solid var(--color-border);
  backdrop-filter: blur(8px);

  .container {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }

  .logo {
    width: 200px;

    a {
      display: block;
      height: 132px;
      width: 100%;
      text-indent: -9999px;
      background: url("@/assets/images/logo.png") no-repeat center / contain;
    }
  }

  .sub {
    flex: 1;
    font-size: 24px;
    font-weight: normal;
    margin-bottom: 38px;
    margin-left: 20px;
    color: var(--color-text-muted);
  }

  .entry {
    width: 120px;
    margin-bottom: 38px;
    font-size: 16px;

    i {
      font-size: 14px;
      color: $xtxColor;
      letter-spacing: -5px;
    }
  }
}

.login-section {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  min-height: 560px;
  padding: 48px max(calc((100% - 1240px) / 2), 6vw);

  .wrapper {
    width: 380px;
    flex: 0 0 380px;
    background: rgba(14, 24, 42, 0.88);
    border: 1px solid rgba(0, 184, 255, 0.32);
    border-radius: 8px;
    position: relative;
    z-index: 1;
    box-shadow:
      0 18px 60px rgba(0, 0, 0, 0.4),
      0 0 28px rgba(0, 145, 255, 0.12);
    backdrop-filter: blur(12px);

    nav {
      font-size: 14px;
      height: 55px;
      margin-bottom: 20px;
      border-bottom: 1px solid var(--color-border);
      display: flex;
      padding: 0 40px;
      text-align: right;
      align-items: center;

      a {
        flex: 1;
        line-height: 1;
        display: inline-block;
        font-size: 18px;
        position: relative;
        text-align: center;
      }
    }
  }
}

.login-page {
  position: relative;
  isolation: isolate;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  color: var(--color-text-main);
  background-color: #080c18;
  background-image:
    linear-gradient(
      90deg,
      rgba(5, 10, 20, 0.06) 0%,
      rgba(5, 10, 20, 0.04) 48%,
      rgba(5, 10, 20, 0.28) 100%
    ),
    url("@/assets/images/login-background-dragon-hidden.png");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}

.login-page.privacy-accepted {
  background-image:
    linear-gradient(
      90deg,
      rgba(5, 10, 20, 0.06) 0%,
      rgba(5, 10, 20, 0.04) 48%,
      rgba(5, 10, 20, 0.28) 100%
    ),
    url("@/assets/images/login-background-dragon.png");
}

.login-page > header,
.login-page > section,
.login-page > footer {
  position: relative;
  z-index: 1;
}

.login-eye-glow {
  display: none;
  position: absolute;
  z-index: 2;
  top: 44.5%;
  left: 41.8%;
  width: 74px;
  height: 48px;
  border-radius: 50%;
  pointer-events: none;
  background: radial-gradient(
    ellipse,
    rgba(99, 231, 255, 0.34) 0%,
    rgba(0, 184, 255, 0.2) 32%,
    transparent 72%
  );
  filter: blur(5px);
  mix-blend-mode: screen;
  transform: translate(-50%, -50%);
  animation: eye-energy-pulse 3.2s ease-in-out infinite;

  &::after {
    content: "";
    position: absolute;
    top: 49%;
    left: 35%;
    width: 30%;
    height: 2px;
    border-radius: 50%;
    background: rgba(190, 249, 255, 0.9);
    box-shadow: 0 0 6px 2px rgba(0, 184, 255, 0.72);
    transform-origin: center;
    animation: eye-energy-scan 4.8s ease-in-out infinite;
  }
}

.login-page.privacy-accepted .login-eye-glow {
  display: block;
}

@keyframes eye-energy-pulse {
  0%,
  100% {
    opacity: 0.38;
    scale: 0.88;
  }

  50% {
    opacity: 0.9;
    scale: 1.16;
  }
}

@keyframes eye-energy-scan {
  0%,
  15% {
    opacity: 0;
    scale: 0.25 1;
  }

  28% {
    opacity: 0.9;
  }

  48% {
    opacity: 0;
    scale: 1.35 1;
  }

  100% {
    opacity: 0;
  }
}

@media (max-width: 900px) {
  .login-eye-glow {
    left: 35%;
  }

  .login-section {
    justify-content: center;
    padding: 40px 24px;
  }
}

@media (max-width: 640px) {
  .login-eye-glow {
    display: none;
  }

  .login-page {
    background-position: 34% center;
  }

  .login-header {
    .logo {
      width: 150px;

      a {
        height: 96px;
      }
    }

    .entry {
      margin-bottom: 28px;
    }
  }

  .login-section {
    min-height: 520px;
    padding: 32px 16px;

    .wrapper {
      width: min(380px, calc(100% - 32px));
      flex-basis: min(380px, calc(100% - 32px));
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .login-eye-glow,
  .login-eye-glow::after {
    animation: none;
  }
}

.login-footer {
  padding: 30px 0 50px;
  background: rgba(8, 12, 24, 0.68);
  border-top: 1px solid rgba(0, 184, 255, 0.16);
  backdrop-filter: blur(8px);

  p {
    text-align: center;
    color: var(--color-text-muted);
    padding-top: 20px;

    a {
      line-height: 1;
      padding: 0 10px;
      color: var(--color-text-muted);
      display: inline-block;

      ~ a {
        border-left: 1px solid #ccc;
      }
    }
  }
}

.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;

    a {
      color: $xtxColor;

      i {
        font-size: 14px;
      }
    }
  }

  .form {
    padding: 0 20px 20px 20px;

    &-item {
      margin-bottom: 28px;

      .input {
        position: relative;
        height: 36px;

        > i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }

        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;

          &.error {
            border-color: $priceColor;
          }

          &.active,
          &:focus {
            border-color: $xtxColor;
          }
        }

        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: rgba(20, 30, 50, 0.9);
          color: var(--color-text-muted);
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }

      > .error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: $priceColor;

        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }

    .agree {
      a {
        color: #069;
      }
    }

    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: $xtxColor;

      &.disabled {
        background: #cfcdcd;
      }
    }
  }

  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .url {
      a {
        color: var(--color-text-muted);
        margin-left: 10px;
      }
    }
  }
}

.subBtn {
  background: $xtxColor;
  width: 100%;
  color: #fff;
}

.password-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border: 0;
  background: transparent;
  color: var(--color-text-muted);
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover,
  &:focus-visible {
    color: var(--color-primary);
  }

  .el-icon {
    font-size: 18px;
  }
}
</style>
