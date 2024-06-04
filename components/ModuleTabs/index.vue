<template>
  <div class="module-tabs">
    <CustomLink to="/best/" :class="{ active: currentPath === 'best' }"
      >BEST {{ currentPath === "best" ? "GAMES" : "" }}
    </CustomLink>
    <CustomLink to="/hot/" :class="{ active: currentPath === 'hot' }"
      >HOT {{ currentPath === "hot" ? "GAMES" : "" }}
    </CustomLink>
    <CustomLink to="/top/" :class="{ active: currentPath === 'top' }"
      >TOP {{ currentPath === "top" ? "GAMES" : "" }}
    </CustomLink>
    <CustomLink to="/new/" :class="{ active: currentPath === 'new' }"
      >NEW {{ currentPath === "new" ? "GAMES" : "" }}
    </CustomLink>
  </div>
</template>

<script>
export default {
  props: {
    currentPath: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.module-tabs {
  display: none;
}
@media screen and (max-width: 879px) {
  .module-tabs {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: vw(40) vw(46);
    position: fixed;
    top: vw(123);
    left: 0;
    background-color: #ffffff;
    z-index: 9;
    a {
      color: #898e97;
      font-size: vw(30);
    }
    .active {
      color: #171e27;
      font-weight: bold;
      position: relative;
      &::after {
        position: absolute;
        left: 0;
        bottom: vw(-18);
        display: block;
        content: "";
        width: 100%;
        height: vw(8);
        background: #780dff;
      }
    }
  }
}
</style>
