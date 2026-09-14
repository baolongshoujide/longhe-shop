import { useIntersectionObserver } from "@vueuse/core";

// 懒加载插件
export const lazyPlugin = {
  install(app) {
    app.directive("img-lazy", {
      mounted(el, binding) {
        // el：当前绑定指令的元素
        // binding.value：指令传入的值，比如图片地址

        const { stop } = useIntersectionObserver(el, ([entry]) => {
          if (entry.isIntersecting) {
            // 图片进入可视区域
            el.src = binding.value;
            console.log(11);
            stop();
          }
        });
      },
    });
  },
};
