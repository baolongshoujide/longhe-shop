import { ref } from "vue";

export const globalLoadingVisible = ref(false);

let pendingRequests = 0;
let initialLoadingFinished = false;
let showTimer;

export const startInitialLoading = () => {
  pendingRequests += 1;
  if (initialLoadingFinished || showTimer || globalLoadingVisible.value) return;

  showTimer = setTimeout(() => {
    showTimer = undefined;
    if (pendingRequests > 0 && !initialLoadingFinished) {
      globalLoadingVisible.value = true;
    }
  }, 250);
};

export const finishInitialLoading = () => {
  pendingRequests = Math.max(0, pendingRequests - 1);
  if (pendingRequests > 0) return;

  initialLoadingFinished = true;
  clearTimeout(showTimer);
  showTimer = undefined;
  globalLoadingVisible.value = false;
};
