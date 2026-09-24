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
      <CustomLink to="/rankings/" class="menu-item" @click.native="$emit('close')"
        ><i class="icon-rank"></i>Top Rankings</CustomLink
      >

      <div class="menu-group">
        <div class="menu-item" @click="categoriesExpanded = !categoriesExpanded"
          ><i class="icon-categories"></i>Categories<i
            class="icon-arrow"
            :class="{ 'icon-arrow-up': categoriesExpanded }"
          ></i
        ></div>
        <div v-if="categoriesExpanded" class="submenu">
          <CustomLink
            v-for="item in allCategories"
            :key="`${item.kind}-${item.id}`"
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
      categoriesExpanded: false,
      allCategories: [],
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
        // 只展示这个站点下实际有内容的分类（total > 0），空分类不在导航里出现；
        // Games/Apps 分类合并成一个平铺列表，不再分组
        this.allCategories = [...(response.list || []), ...(response.app_list || [])].filter(
          (item) => item.total > 0
        );
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
  background: #ffffff;
  border-right: 1px solid #eef0f3;
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
.icon-rank,
.icon-categories {
  width: 24px;
  height: 24px;
  margin-right: 12px;
}
.icon-home {
  @include icon(24px, 24px, "icon-home.png");
}
.icon-rank {
  @include icon(24px, 24px, "icon-rank.png");
}
.icon-categories {
  @include icon(24px, 24px, "icon-categories.png");
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
