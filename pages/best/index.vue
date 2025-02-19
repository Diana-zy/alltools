<template>
  <div class="page">
    <Header />
    <main class="main">
      <div class="main-left">
        <h2 class="title-h2">Best Games</h2>
        <!-- <GoogleAd ad-slot="3074328547" class="ad1 ad-width" /> -->
        <adm-slot
          adm-id="best-mid1"
          adm-unit="/23197833490/alltools1/alltools1_module_1"
          class="ad1 ad-width"
        />
        <section class="box-common box-category">
          <ContentItemSmall
            v-for="(item, index) in bestGames"
            :key="index"
            :index="index"
            :item="item"
            :to="`/game/${item.path}/`"
          />
        </section>

        <!-- <GoogleAd ad-slot="3091877513" class="ad2 ad-width" /> -->
        <adm-slot
          adm-id="best-mid2"
          adm-unit="/23197833490/alltools1/alltools1_module_2"
          class="ad2 ad-width"
        />
        <h2 class="title-h2">All Games</h2>

        <InfiniteScrollList
          :api-endpoint="`/api/game/all_game`"
          :initial-page="2"
          :page-size="30"
          :initial-items="allGames"
        >
          <template #default="{ items }">
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
          <!-- <GoogleAd ad-slot="9448165209" /> -->
          <adm-slot adm-id="best-mid3" adm-unit="/23197833490/alltools1/alltools1_module_3" />
          <h2 class="title-h2">Hot Games</h2>
          <ContentItemRow
            v-for="(item, index) in newGames.slice(0, 10)"
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
      const [newGamesResponse, bestGamesResponse, allGamesResponse] = await Promise.all([
        $axios.$get("/api/game/menu", {
          params: {
            site_id: env.SITE_ID,
            mod_id: "new-games",
            size: 10
          }
        }),
        $axios.$get("/api/game/menu", {
          params: {
            site_id: env.SITE_ID,
            mod_id: "best-games",
            size: 30
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
        newGames: newGamesResponse.list,
        bestGames: bestGamesResponse.list,
        allGames: allGamesResponse.list
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
.ad1,
.ad2 {
  width: 100%;
}
.box-category {
  margin-bottom: 32px;
  margin-top: 24px;
}
.title-h2 {
  display: flex;
  align-items: center;
  .icon {
    width: 48px;
    height: 48px;
    margin-right: 16px;
  }
}
.box-aside {
  top: 63px;
}
@media screen and (max-width: 1235px) {
  .main {
    width: 100%;
  }
}
@media screen and (max-width: 879px) {
  .main {
    padding: 0;
  }
  .main-left {
    width: 100%;
    margin-top: vw(14);
  }

  .title-h2 {
    .icon {
      width: vw(48);
      height: vw(48);
      margin-right: vw(16);
    }
  }
  .box-category {
    margin-bottom: vw(48);
    margin-top: vw(36);
  }
}
</style>
