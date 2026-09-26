import { ref } from "vue";

export const globalLoadingVisible = ref(false);
export const fullScreenLoadingVisible = ref(false);
export const homeTransitionLoadingVisible = ref(false);
let pendingRequests = 0;
let pageLoadingHideTimer;
let homeLoadingHideTimer;
let fullScreenTimer;
let fullScreenStartedAt = 0;
let layoutMounted = false;
let pageLoadingShownAt = 0;
let homeLoadingShownAt = 0;

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
  clearTimeout(pageLoadingHideTimer);
  if (!globalLoadingVisible.value) {
    pageLoadingShownAt = Date.now();
    globalLoadingVisible.value = true;
  }
};

const scheduleHomeLoadingHide = () => {
  clearTimeout(homeLoadingHideTimer);
  const minDuration = 360;
  const remaining = Math.max(0, minDuration - (Date.now() - homeLoadingShownAt));
  homeLoadingHideTimer = setTimeout(() => {
    if (pendingRequests === 0) {
      homeTransitionLoadingVisible.value = false;
      homeLoadingShownAt = 0;
    }
  }, remaining);
};

export const startHomeTransitionLoading = () => {
  clearTimeout(homeLoadingHideTimer);
  if (!homeTransitionLoadingVisible.value) {
    homeLoadingShownAt = Date.now();
    homeTransitionLoadingVisible.value = true;
  }
  if (pendingRequests === 0) scheduleHomeLoadingHide();
};

export const finishPageLoading = () => {
  pendingRequests = Math.max(0, pendingRequests - 1);
  if (pendingRequests > 0) return;
  clearTimeout(pageLoadingHideTimer);
  const minDuration = 360;
  const remaining = Math.max(0, minDuration - (Date.now() - pageLoadingShownAt));
  pageLoadingHideTimer = setTimeout(() => {
    if (pendingRequests === 0) {
      globalLoadingVisible.value = false;
      pageLoadingShownAt = 0;
    }
  }, remaining);
  if (homeTransitionLoadingVisible.value) scheduleHomeLoadingHide();
  hideFullScreenWhenReady();
};
