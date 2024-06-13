<template>
  <div class="page">
    <Header />
    <h2 class="title-h2">Games</h2>
    <div class="box-category">
      <CustomLink
        v-for="(item, i) in gameCategories"
        :key="i"
        :to="`/category/${item.path}/`"
        class="category-item"
      >
        <NuxtImg
          v-if="item.icon_dark"
          format="auto"
          fit="cover"
          width="62"
          height="62"
          :src="item.icon_dark"
          :alt="item.name"
          class="icon"
        />
        <span>{{ item.name }}</span>
      </CustomLink>
    </div>
    <h2 class="title-h2">Apps</h2>
    <div class="box-category">
      <CustomLink
        v-for="(item, i) in appCategories"
        :key="i"
        :to="`/category/${item.path}/`"
        class="category-item"
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
        <span>{{ item.name }}</span>
      </CustomLink>
    </div>
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
        appCategories: allCategoriesResponse.app_list,
        gameCategories: allCategoriesResponse.list
      };
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
};
</script>

<style lang="scss" scoped>
.box-category {
  display: flex;
  flex-wrap: wrap;
  padding: 0 vw(46);
  font-size: vw(28);
}
.category-item {
  display: flex;
  align-items: center;
  padding: 0 vw(16);
  width: vw(328);
  height: vw(80);
  @include ellipsis;
  .icon {
    width: vw(48);
    height: vw(48);
    margin-right: vw(16);
  }
}
</style>
