<template>
  <header class="header">
    <div class="header-main" :class="{ 'home-header': currentPath === 'home' }">
      <div class="m-list">
        <CustomLink class="pc-hidden m-menu" to="/menu/"></CustomLink>

        <!-- logo -->
        <CustomLink
          to="/"
          class="logo"
          :class="{ 'home-logo shadow-hidden': currentPath === 'home' }"
          ><i class="icon-logo"></i
        ></CustomLink>
      </div>
      <!-- 下载到桌面 -->
      <div class="menu">
        <div
          v-if="showInstallButton"
          class="pwa-download"
          :class="{ 'home-icon': currentPath === 'home' }"
          @click="installPWA"
        >
          <i class="icon-pwa"></i>
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
          <div class="btn-search" @click="search">
            <i class="icon-search"></i>
          </div>
        </div>
        <!-- 移动 搜索 -->

        <CustomLink to="/search/" class="m-search" :class="{ 'home-icon': currentPath === 'home' }">
          <i class="icon-search" />
        </CustomLink>
      </div>
    </div>
  </header>
</template>

<script>
import { simulateSearch } from "~/utils/utils";

export default {
  props: {
    currentPath: {
      type: String
    }
  },
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
  width: 100%;
  background: $color3;
  box-shadow: 0px 6px 12px 0px rgba(132, 40, 0, 0.26);
}

.header-main {
  max-width: 1200px;
  height: 64px;
  display: flex;
  align-items: center;
  margin: 0 auto;
  position: relative;
  justify-content: space-between;
  z-index: 1;
}

.logo {
  display: flex;
  height: 100%;
  @include btn-img(180px, 48px, "logo.png");
  width: 164px;
  background-size: 116px 32px;
  background-position: center;
  background-repeat: no-repeat;
  box-shadow: 6px 6px 12px 0px rgba(132, 40, 0, 0.27), -6px -6px 12px 0px rgba(255, 255, 255, 0.48);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 38px;
}

.menu {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.pwa-download {
  @include center;
  width: 40px;
  height: 40px;
  box-shadow: 6px 6px 12px 0px rgba(132, 40, 0, 0.27), -6px -6px 12px 0px rgba(255, 255, 255, 0.48);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  background: $color2;
  color: $font1;
  font-family: seb;
  cursor: pointer;
}

.icon-pwa {
  @include icon(24px, 24px, "icon-pwa-pc.png");
}

.pc-search {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 4px 0 16px;
  width: 320px;
  height: 40px;
  box-shadow: inset 6px 6px 12px 0px rgba(132, 40, 0, 0.27),
    inset -6px -6px 12px 0px rgba(255, 255, 255, 0.48);
  background: $color3;
  border-radius: 100px;
  margin-left: 24px;
  .search {
    color: $font1;
    &::placeholder {
      color: rgba($font1, 0.4);
    }
  }
}

.btn-search {
  width: 83px;
  height: 32px;
  background: $color2;
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.shadow-hidden {
  box-shadow: none;
  border-radius: 0;
  border: none;
}

.icon-search {
  @include icon(24px, 24px, "icon-search.png");
}

.m-search {
  display: none;
}

@media screen and (max-width: 879px) {
  .header {
    width: 100%;
    height: vw(96);
    position: fixed;
    top: 0;
    z-index: 10;
    box-shadow: none;
  }

  .header-main {
    width: 100%;
    background: $color1;
    height: 100%;
    padding: 0 vw(46);
    justify-content: space-between;
  }

  .home-header {
    background: $color3;
  }

  .m-list {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .m-menu {
    display: block;
    @include icon(vw(48), vw(48), "icon-menu.png");
    margin-right: vw(36);
  }

  .logo {
    @include btn-img(vw(280), vw(80), "logo.png");
    width: vw(320);
    background-color: $color4;
    background-size: vw(232) vw(64);
    box-shadow: 6px 6px 12px 0px rgba(114, 35, 10, 0.21);
    border-radius: vw(60);
  }
  .pwa-download {
    @include center;
    width: vw(80);
    height: vw(80);
    border-radius: vw(24);
    background: $color4;
    box-shadow: 6px 6px 12px 0px rgba(114, 35, 10, 0.21);
    border: 2px solid #ffffff;
    margin-left: auto;
    span {
      display: none;
    }
  }

  .icon-pwa {
    @include icon(vw(48), vw(48), "icon-pwa-m.png");
    background-repeat: no-repeat;
    background-position: center;
    margin-right: 0;
  }

  .pc-search {
    display: none;
  }

  .m-search {
    display: block;
    @include center;
    width: vw(80);
    height: vw(80);
    border-radius: vw(24);
    background: $color4;
    box-shadow: 6px 6px 12px 0px rgba(114, 35, 10, 0.21);
    border: 2px solid #ffffff;
    margin-left: vw(32);
  }

  .icon-search {
    @include icon(vw(48), vw(48), "icon-search3.png");
  }

  .home-icon {
    background: $color3;
    border: none;
    box-shadow: none;
  }

  .shadow-hidden {
    background-color: $color3;
    box-shadow: none;
  }
}
</style>
