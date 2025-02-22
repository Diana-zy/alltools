<template>
  <header class="header">
    <div class="header-main">
      <CustomLink class="pc-hidden m-menu" to="/menu/"></CustomLink>

      <!-- logo -->
      <CustomLink to="/" class="logo" :class="{ 'shadow-hidden': currentPath === 'home' }"
        ><i class="icon-logo"></i
      ></CustomLink>
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
        <div class="btn-search">
          <i class="icon-search" @click="search"></i>
        </div>
      </div>
      <!-- 移动 搜索 -->

      <CustomLink to="/search/" class="m-search">
        <i class="icon-search-m" />
      </CustomLink>
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
  background: $color1;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.16);
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
  width: 160px;
  height: 40px;
  @include center;
  background-size: 100% 100%;
  box-shadow: 4px 4px 8px 0px rgba(40, 11, 69, 0.2), -4px -4px 8px 0px rgba(255, 255, 255, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 38px;

  .icon-logo {
    @include btn-img(132px, 34px, "logo.png");
  }
}

.pwa-download {
  @include center;
  width: 132px;
  height: 32px;
  box-shadow: 4px 4px 8px 0px rgba(99, 82, 101, 0.16), -4px -4px 8px 0px #ffffff;
  border: 1px solid #ffffff;
  border-radius: 38px;
  color: $font1;
  margin-left: 24px;
  font-family: seb;
  cursor: pointer;
}
.icon-pwa {
  @include icon(24px, 24px, "icon-pwa-pc.png");
  margin-right: 4px;
}
.pc-search {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 3px 0 16px;
  width: 320px;
  height: 40px;
  box-shadow: inset 4px 4px 8px 0px rgba(99, 82, 101, 0.16), inset -4px -4px 8px 0px #ffffff;
  border: 1px solid #ffffff;
  border-radius: 100px;
  margin-left: auto;
  .search {
    &::placeholder {
      color: rgba($font1, 0.4);
    }
  }
}
.btn-search {
  width: 83px;
  height: 34px;
  background: $color3;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.shadow-hidden {
  box-shadow: none;
  border-radius: 0;
  border: none;
}
.icon-search {
  @include icon(24px, 24px, "icon-search.png");
  cursor: pointer;
}
@media screen and (max-width: 750px) {
  .header {
    width: 100%;
    height: vw(96);
    position: fixed;
    top: 0;
    z-index: 10;
    box-shadow: none;
    // position: fixed;
    // top: 0;
    // background: #fff;
    // height: vw(96);
    // padding: 0 vw(46);
    // z-index: 10;
    // &:before {
    //   box-shadow: 0 vw(8) vw(8) 0 rgba(0, 0, 0, 0.16);
    // }
  }
  .header-main {
    width: 100%;
    background: $color2;
    height: 100%;
    padding: 0 vw(46);
    justify-content: space-between;
  }

  .m-menu {
    display: block;
    @include icon(vw(48), vw(48), "icon-menu.png");
    margin-right: vw(36);
  }
  .logo {
    width: vw(300);
    height: vw(80);
    border-radius: vw(48);

    .icon-logo {
      @include btn-img(vw(264), vw(68), "logo-text.png");
    }
  }

  .pwa-download {
    @include center;
    width: vw(80);
    height: vw(80);
    border-radius: vw(32);
    box-shadow: 4px 4px 8px 0px rgba(40, 11, 69, 0.2), -4px -4px 8px 0px rgba(255, 255, 255, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.1);
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
    @include center;
    width: vw(80);
    height: vw(80);
    border-radius: vw(32);
    box-shadow: 4px 4px 8px 0px rgba(40, 11, 69, 0.2), -4px -4px 8px 0px rgba(255, 255, 255, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.1);
    margin-left: vw(32);
  }
  .icon-search-m {
    @include icon(vw(48), vw(48), "icon-search-m.png");
    background-repeat: no-repeat;
  }
}
</style>
