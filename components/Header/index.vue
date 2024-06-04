<template>
  <header class="header">
    <!-- 下载到桌面 -->
    <div class="header-menu">
      <div v-if="showInstallButton" class="pwa-download" @click="installPWA">
        <span>TO DESKTOP</span>
      </div>
      <!-- 随机详情 -->
      <div class="random-detail" @click="randomGame"><i></i>RANDOM</div>
    </div>

    <!-- logo -->
    <CustomLink to="/" class="logo"><i class="icon-logo"></i>Alltools1</CustomLink>

    <!-- pc 搜索 -->
    <div class="pc-search-box">
      <input v-model="input" placeholder="SEARCH" class="search" @keyup.enter="search" />
      <i class="icon-search" @click="search"></i>
    </div>
    <!-- 移动 搜索 -->
    <CustomLink class="m-search" to="/search/"></CustomLink>
  </header>
</template>

<script>
import { simulateSearch } from "~/utils/utils";

export default {
  data() {
    return {
      input: "",
      deferredPrompt: null,
      showInstallButton: false
    };
  },
  mounted() {
    // 判断是否支持 PWA
    if ("serviceWorker" in navigator && "PushManager" in window) {
      if (window.deferredPrompt) {
        this.deferredPrompt = window.deferredPrompt;
        this.showInstallButton = true;
      } else {
        window.addEventListener("beforeinstallprompt", (e) => {
          e.preventDefault();
          this.deferredPrompt = e;
          this.showInstallButton = true;
        });
      }
    }
  },
  methods: {
    search() {
      if (this.input.length < 2) {
        this.$globalMethod.showNotification({
          message: "Please enter at least 2 characters",
          type: "warning"
        });
        return;
      }
      simulateSearch(this.input);
    },
    installPWA() {
      if (this.deferredPrompt) {
        this.deferredPrompt.prompt();
        this.deferredPrompt.userChoice.then(() => {
          this.deferredPrompt = null;
        });
      }
    },
    randomGame() {
      const links = document.querySelectorAll('a[href*="/game"]');
      const randomIndex = Math.floor(Math.random() * links.length);
      const randomLink = links[randomIndex];
      randomLink.click();
    }
  }
};
</script>

<style lang="scss" scoped></style>
