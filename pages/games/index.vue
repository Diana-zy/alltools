<template>
  <div class="page">
    <div class="page-bg"></div>
    <Header />
    <main class="main">
      <div class="main-left">
        <h2 class="title-h2">All Games</h2>
        <!-- <GoogleAd ad-slot="5592680679" class="ad1 ad-width" /> -->
        <adm-slot
          adm-id="games-mid1"
          adm-unit="/23197833490/alltools1/alltools1_module_1"
          class="ad1 ad-width"
        />

        <InfiniteScrollList
          api-endpoint="/api/game/all_game"
          :initial-page="2"
          :page-size="30"
          :initial-items="allGames"
        >
          <template #default="{ items }">
            <!-- <GoogleAd ad-slot="6905762344" class="ad2" /> -->
            <adm-slot
              adm-id="games-mid2"
              adm-unit="/23197833490/alltools1/alltools1_module_2"
              class="ad2"
            />
            <ContentItemDetail
              v-for="(item, index) in items"
              :key="index"
              :index="index"
              :item="item"
              :to="`/game/${item.path}/`"
            />
          </template>
        </InfiniteScrollList>

        <aside class="box-aside">
          <!-- <GoogleAd ad-slot="5477796884" /> -->
          <adm-slot adm-id="games-mid3" adm-unit="/23197833490/alltools1/alltools1_module_3" />
          <h2 class="title-h2">Favorite Games</h2>
          <ContentItemRow
            v-for="(item, index) in HotGames"
            :key="index"
            :item="item"
            :index="index"
            :to="`/game/${item.path}/`"
          />
        </aside>
      </div>
    </main>
    <Footer />
    <BackTop />
    <!-- <AdLoading /> -->
  </div>
</template>
<script>
export default {
  async asyncData({ $axios, env }) {
    try {
      const [allGamesResponse, HotGamesResponse] = await Promise.all([
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
            mod_id: "best-games",
            size: 12
          }
        })
      ]);

      return {
        allGames: allGamesResponse.list,
        HotGames: HotGamesResponse.list
      };
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
};
</script>
<style lang="scss" scoped>
.main {
  max-width: 1200px;
  padding: 0 20px;
  margin: 0 auto;
  position: relative;
  box-sizing: content-box;
}
.main-left {
  width: 770px;
}
.ad2 {
  grid-row-end: 4;
  grid-column: 1/-1;
}
.box-aside {
  top: 63px;
}
@media screen and (max-width: 1200px) {
  .main-left {
    width: 100%;
  }
}
@media screen and (max-width: 879px) {
  .main {
    padding: 0;
  }
  .main-left {
    margin-top: vw(14);
  }
  .box-common {
    grid-template-columns: repeat(3, vw(200));
    margin: vw(36) 0 vw(48);
    justify-content: center;
  }
}
</style>
