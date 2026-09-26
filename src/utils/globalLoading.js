import { ref } from "vue";

export const globalLoadingVisible = ref(false);
export const fullScreenLoadingVisible = ref(false);
let pendingRequests = 0;
let showTimer;
let fullScreenTimer;
let fullScreenStartedAt = 0;
let layoutMounted = false;

const hideFullScreenWhenReady = () => {
  if (!layoutMounted || pendingRequests > 0) return;
  clearTimeout(fullScreenTimer);
  const minDuration = 700;
  const remaining = Math.max(0, minDuration - (Date.now() - fullScreenStartedAt));
  fullScreenTimer = setTimeout(() => {
    if (layoutMounted && pendingRequests === 0) {
      fullScreenLoadingVisible.value = false;
      layoutMounted = false;
    }
  }, remaining);
};

export const startLayoutTransitionLoading = () => {
  clearTimeout(fullScreenTimer);
  fullScreenStartedAt = Date.now();
  layoutMounted = false;
  fullScreenLoadingVisible.value = true;
};

export const finishLayoutTransitionLoadingWhenIdle = () => {
  layoutMounted = true;
  hideFullScreenWhenReady();
};

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
  hideFullScreenWhenReady();
};
