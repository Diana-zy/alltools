<template>
  <header class="header">
    <CustomLink class="pc-hidden m-menu" to="/menu/"></CustomLink>

    <!-- logo -->
    <CustomLink to="/" class="logo"><i class="icon-logo"></i></CustomLink>
    <!-- 下载到桌面 -->
    <div v-if="showInstallButton" class="pwa-download" @click="installPWA">
      <i class="icon-pwa"></i><span>TO DESKTOP</span>
    </div>

    <CustomLink to="/topics/" class="btn-topics">
      <i class="icon-topics"></i><span>TOPICS</span>
    </CustomLink>

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
  background: $color1;
  border-radius: 8px;
  color: #fff;
  margin-left: 24px;
  cursor: pointer;
}
.icon-pwa {
  @include icon(24px, 24px, "icon-pwa.png");
  margin-right: 4px;
}
.btn-topics {
  display: inline-block;
  @include center;
  width: 97px;
  height: 32px;
  background: $color1;
  border-radius: 8px;
  color: #fff;
  margin: 0 20px;
  cursor: pointer;
}
.icon-topics {
  @include icon(24px, 24px, "icon-topics-pc.png");
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
@media screen and (max-width: 750px) {
  .header {
    width: 100%;
    position: fixed;
    top: 0;
    background: #fff;
    height: vw(96);
    padding: 0 vw(46);
    z-index: 10;
    &:before {
      box-shadow: 0 vw(8) vw(8) 0 rgba(0, 0, 0, 0.16);
    }
  }
  .m-menu {
    display: block;
    @include icon(vw(48), vw(48), "icon-menu.png");
    margin-right: auto;
  }
  .logo {
    @include btn-img(vw(260), vw(55), "logo-text.png");
    background-size: vw(195) vw(36);
  }
  .icon-logo {
    width: vw(55);
    height: vw(55);
    margin-right: auto;
  }
  .pwa-download {
    @include center;
    width: vw(64);
    height: vw(64);
    background: rgba($color1, 0.5);
    border-radius: 50%;
    margin-left: vw(22);
    span {
      display: none;
    }
  }
  .icon-pwa {
    @include icon(vw(48), vw(48), "icon-pwa.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: vw(32) vw(32);
    margin-right: 0;
    background-color: $color1;
    border-radius: 50%;
  }
  .btn-topics {
    display: none;
  }
  .pc-search {
    display: none;
  }
  .m-search {
    display: block;
    @include icon(vw(48), vw(48), "icon-search-m.png");
    margin-left: auto;
  }
}
</style>
