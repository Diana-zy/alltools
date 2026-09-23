<template>
  <div v-if="open" class="drawer-root">
    <div class="backdrop" @click="$emit('close')"></div>
    <div class="panel">
      <div class="panel-header">
        <span class="close-btn" @click="$emit('close')">&times;</span>
      </div>
      <CustomLink to="/" class="menu-item" @click.native="$emit('close')"
        ><i class="icon-home"></i>Home</CustomLink
      >
      <CustomLink to="/best/" class="menu-item" @click.native="$emit('close')"
        ><i class="icon-games"></i>Top Games</CustomLink
      >
      <CustomLink to="/bestools/" class="menu-item" @click.native="$emit('close')"
        ><i class="icon-apps"></i>Top Apps</CustomLink
      >

      <div class="menu-group">
        <div class="menu-item" @click="gamesExpanded = !gamesExpanded"
          ><i class="icon-games"></i>Games<i
            class="icon-arrow"
            :class="{ 'icon-arrow-up': gamesExpanded }"
          ></i
        ></div>
        <div v-if="gamesExpanded" class="submenu">
          <CustomLink to="/games/" class="submenu-item" @click.native="$emit('close')"
            >All Games</CustomLink
          >
          <CustomLink
            v-for="item in gameCategories"
            :key="item.id"
            :to="`/category/${item.path}/`"
            class="submenu-item"
            @click.native="$emit('close')"
            >{{ item.name }}</CustomLink
          >
        </div>
      </div>

      <div class="menu-group">
        <div class="menu-item" @click="appsExpanded = !appsExpanded"
          ><i class="icon-apps"></i>Apps<i
            class="icon-arrow"
            :class="{ 'icon-arrow-up': appsExpanded }"
          ></i
        ></div>
        <div v-if="appsExpanded" class="submenu">
          <CustomLink to="/apps/" class="submenu-item" @click.native="$emit('close')"
            >All Apps</CustomLink
          >
          <CustomLink
            v-for="item in appCategories"
            :key="item.id"
            :to="`/category/${item.path}/`"
            class="submenu-item"
            @click.native="$emit('close')"
            >{{ item.name }}</CustomLink
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    open: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      gamesExpanded: false,
      appsExpanded: false,
      gameCategories: [],
      appCategories: [],
      categoriesLoaded: false
    };
  },
  watch: {
    open(isOpen) {
      if (isOpen && !this.categoriesLoaded) {
        this.fetchCategories();
      }
    }
  },
  methods: {
    async fetchCategories() {
      this.categoriesLoaded = true;
      try {
        const response = await this.$axios.$get("/api/game/get_all_category", {
          params: {
            site_id: process.env.SITE_ID
          }
        });
        // 只展示这个站点下实际有内容的分类（total > 0），空分类不在导航里出现
        this.gameCategories = (response.list || []).filter((item) => item.total > 0);
        this.appCategories = (response.app_list || []).filter((item) => item.total > 0);
      } catch (error) {
        console.error("Error fetching categories:", error);
        this.categoriesLoaded = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.drawer-root {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
}

.backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
}

.panel {
  position: absolute;
  top: 0;
  left: 0;
  width: 280px;
  max-width: 80%;
  height: 100%;
  background: $color1;
  box-shadow: 6px 0 16px rgba(0, 0, 0, 0.2);
  padding-top: 16px;
  overflow-y: auto;
}

.panel-header {
  display: flex;
  justify-content: flex-end;
  padding: 0 16px 8px;
}

.close-btn {
  font-size: 28px;
  line-height: 1;
  color: $font1;
  cursor: pointer;
}

.menu-item {
  display: flex;
  align-items: center;
  height: 56px;
  padding-left: 24px;
  font-size: 16px;
  color: $font1;
  font-family: "sesb";
  cursor: pointer;
}

.icon-home,
.icon-games,
.icon-apps {
  width: 24px;
  height: 24px;
  margin-right: 12px;
}
.icon-home {
  @include icon(24px, 24px, "icon-home.png");
}
.icon-games {
  @include icon(24px, 24px, "icon-games.png");
}
.icon-apps {
  @include icon(24px, 24px, "icon-apps.png");
}

.icon-arrow {
  width: 8px;
  height: 8px;
  margin-left: auto;
  margin-right: 24px;
  border-right: 2px solid rgba($font1, 0.5);
  border-bottom: 2px solid rgba($font1, 0.5);
  transform: rotate(45deg);
  transition: transform 0.15s ease;
  flex-shrink: 0;
}
.icon-arrow-up {
  transform: rotate(-135deg);
}

.submenu {
  display: flex;
  flex-direction: column;
  padding-bottom: 8px;
}

.submenu-item {
  display: flex;
  align-items: center;
  height: 44px;
  padding-left: 60px;
  font-size: 14px;
  color: rgba($font1, 0.7);
  @include ellipsis;
}
</style>
