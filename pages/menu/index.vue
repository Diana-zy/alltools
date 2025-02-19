<template>
  <div class="page">
    <Header />
    <CustomLink to="/" class="menu-item"><i class="icon-home"></i>Home</CustomLink>
    <CustomLink to="/games/" class="menu-item"><i class="icon-games"></i>All Games</CustomLink>
    <!-- <CustomLink to="/topics/" class="menu-item"><i class="icon-topics"></i>Topics</CustomLink> -->
    <CustomLink to="/apps/" class="menu-item"><i class="icon-apps"></i>All Apps</CustomLink>
    <CustomLink to="/category/" class="menu-item"
      ><i class="icon-categories"></i>Category</CustomLink
    >
    <div class="line"></div>
    <CustomLink
      v-for="(item, i) in navCategories"
      :key="i"
      :to="`/category/${item.path}/`"
      class="menu-item"
    >
      <NuxtImg
        v-if="item.icon_dark"
        format="auto"
        fit="cover"
        width="62"
        height="62"
        :src="item.icon_dark || ''"
        :alt="item.name"
        class="icon"
      />
      {{ item.name }}
    </CustomLink>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, env }) {
    try {
      const [allCategoriesResponse] = await Promise.all([
        $axios.$get("/api/game/get_all_category", {
          params: {
            site_id: env.SITE_ID
          }
        })
      ]);

      return {
        navCategories: allCategoriesResponse.app_list.slice(0, 10)
      };
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
};
</script>
<style lang="scss" scoped>
::v-deep .m-menu,
::v-deep .m-search,
::v-deep .pwa-download {
  display: none;
}
::v-deep .header {
  justify-content: center;
  margin-bottom: vw(32);
}
.page {
  height: 100vh;
}
.menu-item {
  display: flex;
  align-items: center;
  height: vw(80);
  padding-left: vw(46);
  font-size: vw(28);
  color: $font1;
  font-family: "sesb";
}
.line {
  height: vw(2);
  background: #eee;
  margin: vw(12) 0;
}
$items: home, games, apps, categories;
@each $item in $items {
  .icon-#{$item} {
    @include icon(vw(48), vw(48), "icon-#{$item}.png");
    margin-right: vw(16);
  }
}
.icon {
  width: vw(48);
  height: vw(48);
  margin-right: vw(16);
}
</style>
