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
      <CustomLink to="/games/" class="menu-item" @click.native="$emit('close')"
        ><i class="icon-games"></i>All Games</CustomLink
      >
      <CustomLink to="/apps/" class="menu-item" @click.native="$emit('close')"
        ><i class="icon-apps"></i>All Apps</CustomLink
      >
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
</style>
