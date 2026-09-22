import { computed, onUnmounted, ref } from "vue";
import dayjs from "dayjs";

export const useCountDown = () => {
  // 定义一个响应式的数据
  const formatTime = ref(0);
  let timer = null;
  const dayjsTime = computed(() => {
    return dayjs.unix(formatTime.value).format("mm分ss秒");
  });
  const start = (time) => {
    // 给响应式数据赋值（由调用者决定什么时候开始）
    formatTime.value = time;
    timer = setInterval(() => {
      formatTime.value--;
    }, 1000);
  };
  //   组件销毁时消除定时器
  onUnmounted(() => {
    timer && clearInterval(timer);
  });
  return {
    dayjsTime,
    start,
  };
};
