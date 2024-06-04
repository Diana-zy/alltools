<template>
  <div class="page">
    <Header />
    <Navigation
      current-path="category"
      :nav-categories="navCategories"
      :current-category="currentCategoryName"
    />
    <main>
      <h1 class="title-h2"
        ><i class="icon-related"></i> {{ currentCategoryName.toUpperCase() }} GAMES</h1
      >
      <section class="box-module">
        <CustomLink
          v-for="(item, i) in currentCategory"
          :key="i"
          :to="`/game/${item.path}/`"
          class="item"
        >
          <NuxtImg
            format="auto"
            fit="cover"
            width="120"
            height="120"
            :src="item.icon"
            :alt="item.name"
            loading="lazy"
            class="icon"
          />
          <p class="name">{{ item.name }}</p>
        </CustomLink>
        <template v-if="currentCategory.length < 9">
          <div v-for="i in (currentCategory.length, 9)" :key="i" class="empty"></div>
        </template>
      </section>

      <GoogleAd ad-slot="4504570149" />

      <h2 class="title-h2"><i class="icon-related"></i> MORE GAMES</h2>
      <section
        v-infinite-scroll="loadMore"
        class="box-module"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="0"
      >
        <CustomLink v-for="(item, i) in allGames" :key="i" :to="`/game/${item.path}/`" class="item">
          <NuxtImg
            format="auto"
            fit="cover"
            width="120"
            height="120"
            :src="item.icon"
            :alt="item.name"
            loading="lazy"
            class="icon"
          />
          <p class="name">{{ item.name }}</p>
        </CustomLink>
      </section>
      <Loading v-if="loading"></Loading>
    </main>
    <Footer />
    <BackTop />
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, params, env }) {
    try {
      const path = params.category;
      const lastDashIndex = path.lastIndexOf("-");
      const id = path.substring(lastDashIndex + 1, path.length);

      const [allCategoriesResponse, currentCategoryResponse, allGamesResponse] = await Promise.all([
        $axios.$get("/api/game/get_all_category", {
          params: {
            site_id: env.SITE_ID
          }
        }),
        $axios.$get("/api/game/get_category_game", {
          params: {
            site_id: env.SITE_ID,
            category_id: id
          }
        }),
        $axios.$get("/api/game/all_game", {
          params: {
            site_id: env.SITE_ID,
            page: 1,
            size: 30
          }
        })
      ]);
      return {
        navCategories: allCategoriesResponse.list.slice(0, 8),
        currentCategory: currentCategoryResponse.list,
        currentCategoryName: currentCategoryResponse.category_name,
        allGames: allGamesResponse.list
      };
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
  data() {
    return {
      loading: false,
      endOfList: false,
      currentPage: 2
    };
  },
  methods: {
    async loadMore() {
      if (this.loading || this.endOfList) return;
      this.loading = true;
      const newData = await this.$axios.$get("/api/game/all_game", {
        params: {
          site_id: process.env.SITE_ID,
          page: this.currentPage,
          size: 30
        }
      });

      this.allGames = this.allGames.concat(newData.list);

      if (newData.list.length === 0 || newData.list.length < 30) {
        this.endOfList = true;
      }
      this.loading = false;
      this.currentPage++;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/module.scss";
</style>
