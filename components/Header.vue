<template>
  <header class="header">
    <div class="header-main" :class="{ 'home-header': currentPath === 'home' }">
      <div class="m-list">
        <div class="more-btn" :class="{ 'home-icon': currentPath === 'home' }" @click="openDrawer">
          <i class="icon-more"></i>
        </div>

        <!-- logo -->
        <CustomLink
          to="/"
          class="logo"
          :class="{ 'home-logo shadow-hidden': currentPath === 'home' }"
          ><i class="icon-logo"></i
        ></CustomLink>
      </div>
      <div class="menu">
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
    <NavDrawer :open="drawerOpen" @close="drawerOpen = false" />
  </header>
</template>

<script>
import { simulateSearch } from "~/utils/utils";
import NavDrawer from "~/components/NavDrawer.vue";

export default {
  components: { NavDrawer },
  props: {
    currentPath: {
      type: String
    }
  },
  data() {
    return {
      input: "",
      drawerOpen: false
    };
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
    openDrawer() {
      this.drawerOpen = true;
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

.more-btn {
  @include center;
  width: 40px;
  height: 40px;
  margin-right: 16px;
  box-shadow: 6px 6px 12px 0px rgba(132, 40, 0, 0.27), -6px -6px 12px 0px rgba(255, 255, 255, 0.48);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  background: $color2;
  color: $font1;
  font-family: seb;
  cursor: pointer;
}

.icon-more {
  @include icon(24px, 24px, "icon-menu.png");
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

  .more-btn {
    width: vw(80);
    height: vw(80);
    border-radius: vw(24);
    background: $color4;
    box-shadow: 6px 6px 12px 0px rgba(114, 35, 10, 0.21);
    border: 2px solid #ffffff;
    margin-right: vw(36);
  }

  .icon-more {
    @include icon(vw(48), vw(48), "icon-menu.png");
  }

  .logo {
    @include btn-img(vw(280), vw(80), "logo.png");
    width: vw(320);
    background-color: $color4;
    background-size: vw(232) vw(64);
    box-shadow: 6px 6px 12px 0px rgba(114, 35, 10, 0.21);
    border-radius: vw(60);
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
