<template>
  <div class="page">
    <Header />
    <main class="main">
      <h2 class="title-h2">All Games</h2>
      <GoogleAd ad-slot="8763414748" class="ad1" />
      <InfiniteScrollList
        api-endpoint="/api/game/all_game"
        :initial-page="2"
        :page-size="30"
        :initial-items="allGames"
      >
        <template #default="{ items }">
          <GoogleAd ad-slot="2321634636" class="ad2" />
          <ContentItemCommon
            v-for="(item, index) in items"
            :key="index"
            :index="index"
            :item="item"
            :to="`/game/${item.path}/`"
          />
        </template>
      </InfiniteScrollList>

      <aside class="box-aside">
        <GoogleAd ad-slot="1008552965" />
        <h2 class="title-h2">Hot Games</h2>
        <ContentItemRow
          v-for="(item, index) in HotGames"
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
            mod_id: "hot-games",
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
  width: 770px;
}
.ad2 {
  grid-row-end: 4;
  grid-column: 1/-1;
}
@media screen and (max-width: 1235px) {
  .main {
    width: 100%;
  }
}
@media screen and (max-width: 750px) {
  .box-common {
    grid-template-columns: repeat(3, vw(200));
    margin: vw(36) 0 vw(48);
    justify-content: center;
  }
}
</style>
