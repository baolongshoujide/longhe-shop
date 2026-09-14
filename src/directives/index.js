import { useIntersectionObserver } from "@vueuse/core";

// 懒加载插件
export const lazyPlugin = {
  // 这里是固定结构
  install(app) {
    // 创建v-指令的步骤，定义v-img-lazy指令
    app.directive("img-lazy", {
      // 元素创建时再触发
      mounted(el, binding) {
        // el：当前绑定指令的元素
        // binding.value：指令传入的值，比如图片地址
        // 从里面解构出stop方法
        const { stop } = useIntersectionObserver(el, ([entry]) => {
          //   如果entry（观察对象）进入屏幕
          if (entry.isIntersecting) {
            // 图片进入可视区域
            el.src = binding.value;
            11;
            // 停止监视
            stop();
          }
        });
      },
    });
  },
};
