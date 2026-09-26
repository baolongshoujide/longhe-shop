<script setup>
import loadingAnimation from "@/assets/videos/loading-background-transparent.png";
import { globalLoadingVisible } from "@/utils/globalLoading";

defineProps({
  active: { type: Boolean, default: false },
  global: { type: Boolean, default: false },
});
</script>

<template>
  <div
    v-if="active && (!global || globalLoadingVisible)"
    class="data-loading"
    role="status"
    aria-live="polite"
  >
    <div class="data-loading__stage">
      <img :src="loadingAnimation" alt="" aria-hidden="true" />
    </div>
  </div>
</template>

<style scoped>
.data-loading {
  position: absolute;
  inset: 0;
  z-index: 5;
  display: grid;
  place-items: center;
  min-height: 180px;
  overflow: hidden;
  color: #e8f2ff;
  background: transparent;
}

.data-loading__stage {
  position: relative;
  width: 100%;
  height: min(760px, 100%);
  background: transparent;
}

.data-loading__stage img {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
