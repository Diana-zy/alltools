<template>
  <header class="header">
    <!-- logo -->
    <CustomLink to="/" class="logo"><i class="icon-logo"></i></CustomLink>
    <!-- 下载到桌面 -->
    <div v-if="showInstallButton" class="pwa-download" @click="installPWA">
      <i class="icon-pwa"></i><span>TO DESKTOP</span>
    </div>

    <!-- pc 搜索 -->
    <div class="pc-search">
      <input
        v-model="input"
        placeholder="SEARCH"
        class="search m-hidden"
        name="search"
        @keyup.enter="search"
      />
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

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  height: 64px;
  position: relative;
  z-index: 1;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100vw;
    height: 100%;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.16);
    z-index: -1;
  }
}
.logo {
  display: flex;
  height: 100%;
  font-size: 22px;
  color: $font1;
  @include btn-img(163px, 34px, "logo-text.png");
  background-size: 121px 22px;
  background-position: right center;
  background-repeat: no-repeat;
}
.icon-logo {
  @include icon(34px, 34px, "logo.png");
  margin-right: auto;
}
.pwa-download {
  @include center;
  width: 132px;
  height: 32px;
  background: #5bad6d;
  border-radius: 8px;
  color: #fff;
  margin-left: 24px;
  cursor: pointer;
}
.icon-pwa {
  @include icon(24px, 24px, "icon-pwa.png");
  margin-right: 4px;
}
.pc-search {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  width: 320px;
  height: 40px;
  background: #f5f5f5;
  border-radius: 100px;
  margin-left: auto;
  .search {
    &::placeholder {
      color: rgba($font1, 0.4);
    }
  }
}
.icon-search {
  @include icon(24px, 24px, "icon-search.png");
  cursor: pointer;
}
</style>
