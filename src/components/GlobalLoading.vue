<script setup>
import { globalLoadingVisible } from "@/utils/globalLoading";
import loadingVideo from "@/assets/videos/loading-background.mp4";
import logo from "@/assets/images/rex-logo-transparent.png";
</script>

<template>
  <Transition name="loading-fade">
    <div v-if="globalLoadingVisible" class="global-loading" role="status" aria-live="polite">
      <video class="global-loading__video" :src="loadingVideo" autoplay muted loop playsinline></video>
      <div class="global-loading__shade"></div>
      <div class="global-loading__content">
        <img :src="logo" alt="龙核商城" />
        <span class="global-loading__spinner"></span>
        <p>系统载入中</p>
        <small>INITIALIZING SYSTEM</small>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.global-loading {
  position: fixed;
  inset: 0;
  z-index: 3000;
  display: grid;
  place-items: center;
  overflow: hidden;
  background: #080c18;
  color: #e8f2ff;
}

.global-loading__video,
.global-loading__shade {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.global-loading__video { object-fit: cover; }

.global-loading__shade {
  background: linear-gradient(90deg, rgba(8, 12, 24, 0.28), rgba(8, 12, 24, 0.68)),
    radial-gradient(ellipse at center, rgba(0, 80, 130, 0.22), rgba(8, 12, 24, 0.58));
}

.global-loading__content {
  position: relative;
  display: grid;
  justify-items: center;
  gap: 14px;
  padding: 28px 44px;
  border: 1px solid rgba(0, 184, 255, 0.3);
  border-radius: 8px;
  background: rgba(8, 12, 24, 0.66);
  box-shadow: 0 0 38px rgba(0, 184, 255, 0.16);
  backdrop-filter: blur(8px);
}

.global-loading__content img { width: min(280px, 60vw); }
.global-loading__content p { margin: 0; font-size: 18px; letter-spacing: 0.22em; }
.global-loading__content small { color: #96a8c2; font: 11px Arial, sans-serif; letter-spacing: 0.2em; }

.global-loading__spinner {
  width: 24px;
  height: 24px;
  border: 2px solid rgba(0, 184, 255, 0.22);
  border-top-color: #00b8ff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.loading-fade-enter-active,
.loading-fade-leave-active { transition: opacity 0.25s ease; }
.loading-fade-enter-from,
.loading-fade-leave-to { opacity: 0; }

@keyframes spin { to { transform: rotate(360deg); } }
</style>
