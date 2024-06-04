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

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  height: 72px;
  padding: 0 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
  background: #ffffff;
}
.header-menu {
  width: 300px;
  display: flex;
  justify-content: flex-end;
}
.pwa-download {
  width: 140px;
  height: 48px;
  background: #ffffff;
  border-radius: 24px;
  border: 2px solid #e6e8eb;
  font-family: "Poppins-SemiBold";
  font-size: 16px;
  padding-top: 0.1em;
  @include center;
  cursor: pointer;
}
.random-detail {
  font-size: 16px;
  color: #ffffff;
  margin-left: 25px;
  @include btn-img(134px, 48px, "btn_random.png");
  i {
    @include icon(24px, 24px, "icon_random.png");
    margin-right: 4px;
    margin-top: -2px;
  }
}
.m-search {
  display: none;
}
.logo {
  font-family: Poppins-BlackItalic;
  font-size: 22px;
  color: #171e27;
  text-decoration: none;
  @include center;
}
.icon-logo {
  @include icon(48px, 46px, "icon_logo.png");
  margin-right: 10px;
}
.pc-search-box {
  position: relative;
  .search {
    box-sizing: border-box;
    width: 300px;
    height: 50px;
    background: #f5f6f7;
    border-radius: 24px;
    border: 2px solid #e6e8eb;
    font-size: 16px;
    font-family: "Poppins-SemiBold";
    padding-left: 20px;
    padding-right: 50px;
    color: #171e27;
    &::placeholder {
      color: #898e97;
    }
    &:active {
      border: 2px solid #e6e8eb;
    }
  }
  .icon-search {
    @include icon(24px, 24px, "icon_search.png");
    cursor: pointer;
    position: absolute;
    right: 16px;
    top: 12px;
  }
}
@media screen and (min-width: 879px) and (max-width: 970px) {
  .logo {
    margin: 0 20px;
  }
}
@media screen and (max-width: 879px) {
  .header {
    height: vw(123);
    padding: 0 vw(46);
  }
  .random-detail,
  .pc-search-box {
    display: none;
  }
  .header-menu {
    width: vw(77);
  }
  .pwa-download {
    border: none;
    @include icon(vw(77), vw(77), "icon_pwa.png");
    span {
      display: none;
    }
  }
  .m-search {
    display: block;
    @include icon(vw(77), vw(77), "icon_search2.png");
  }
  .logo {
    font-size: vw(35);
  }
  .icon-logo {
    @include icon(vw(54), vw(54), "icon_logo.png");
    margin-right: vw(12);
  }
}
</style>
