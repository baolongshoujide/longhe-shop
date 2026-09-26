import { ref } from "vue";

export const globalLoadingVisible = ref(false);
let pendingRequests = 0;
let showTimer;

export const startPageLoading = () => {
  pendingRequests += 1;
  if (pendingRequests !== 1) return;
  showTimer = setTimeout(() => {
    if (pendingRequests > 0) globalLoadingVisible.value = true;
  }, 180);
};

export const finishPageLoading = () => {
  pendingRequests = Math.max(0, pendingRequests - 1);
  if (pendingRequests > 0) return;
  clearTimeout(showTimer);
  showTimer = undefined;
  globalLoadingVisible.value = false;
};
