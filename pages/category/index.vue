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
}
.category-item {
  display: block;
  align-items: center;
  padding: 0 vw(16);
  width: vw(328);
  height: vw(80);
  @include ellipsis;
}
</style>
