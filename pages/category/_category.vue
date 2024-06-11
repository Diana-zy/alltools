<template>
  <div class="page">
    <Header />
    <main class="main">
      <h2 class="title-h2">{{ currentCategoryName }}</h2>
      <GoogleAd ad-slot="4887713525" class="ad1" />
      <section class="box-common box-category">
        <ContentItemCommon
          v-for="(item, index) in currentCategory"
          :key="index"
          :index="index"
          :item="item"
          :to="`/game/${item.path}/`"
        />
      </section>
      <GoogleAd ad-slot="9948468514" class="ad2" />
      <h2 class="title-h2">All Games</h2>

      <section
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="0"
        class="box-common"
      >
        <ContentItemCommon
          v-for="(item, index) in allGames"
          :key="index"
          :index="index"
          :item="item"
          :to="`/game/${item.path}/`"
        />
      </section>
      <Loading v-if="loading"></Loading>

      <aside class="box-aside">
        <GoogleAd ad-slot="8635386842" />
        <h2 class="title-h2">Hot Games</h2>
        <ContentItemRow
          v-for="(item, index) in recommendGames"
          :key="index"
          :item="item"
          :index="index"
          :to="`/game/${item.path}/`"
        />
      </aside>
    </main>

    <Footer />
    <BackTop />
    <AdLoading />
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, params, env }) {
    try {
      const path = params.category;
      const lastDashIndex = path.lastIndexOf("-");
      const id = path.substring(lastDashIndex + 1, path.length);

      const [
        allCategoriesResponse,
        currentCategoryResponse,
        allGamesResponse,
        recommendGamesResponse
      ] = await Promise.all([
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
        }),
        $axios.$get("/api/game/menu", {
          params: {
            site_id: env.SITE_ID,
            mod_id: "subrec-games",
            size: 12
          }
        })
      ]);
      return {
        navCategories: allCategoriesResponse.list.slice(0, 8),
        currentCategory: currentCategoryResponse.list,
        currentCategoryName: currentCategoryResponse.category_name,
        allGames: allGamesResponse.list,
        recommendGames: recommendGamesResponse.list
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
.main {
  width: 770px;
}
.box-category {
  margin-bottom: 32px;
  margin-top: 24px;
}
</style>
