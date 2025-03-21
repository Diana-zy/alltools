<template>
  <div class="page">
    <div class="page-bg"></div>
    <Header ref="headerElem" />
    <main class="main">
      <div class="main-left">
        <h2 class="title-h2"><i class="icon-favorite-game" />Favorite Games</h2>
        <!-- <GoogleAd ad-slot="3610867204" class="ad1 ad-width" /> -->
        <adm-slot
          class="ad1 ad-width"
          adm-id="fav-game-mid1"
          adm-unit="/23197833490/alltools1/alltools1_module_1"
          ads-slot="3610867204"
        />
        <section class="box-module box-category">
          <ContentItemCommon2
            v-for="(item, index) in bestGames"
            :key="index"
            :index="index"
            :item="item"
            :to="`/game/${item.path}/`"
          />
        </section>

        <!-- <GoogleAd ad-slot="6838895260" class="ad2 ad-width" /> -->
        <adm-slot
          class="ad2 ad-width"
          adm-id="fav-game-mid2"
          adm-unit="/23197833490/alltools1/alltools1_module_2"
          ads-slot="6838895260"
        />
        <h2 class="title-h2"><i class="icon-recommend" />All Games</h2>

        <InfiniteScrollList
          :api-endpoint="`/api/game/all_game`"
          :initial-page="2"
          :page-size="30"
          :initial-items="allGames"
          class="box-module-common"
        >
          <template #default="{ items }">
            <ContentItemCommon1
              v-for="(item, index) in items"
              :key="index"
              :index="index"
              :item="item"
              :to="`/game/${item.path}/`"
            />
          </template>
        </InfiniteScrollList>

        <aside class="box-aside">
          <!-- <GoogleAd ad-slot="4212731925" /> -->
          <adm-slot
            adm-id="fav-game-mid3"
            adm-unit="/23197833490/alltools1/alltools1_module_3"
            ads-slot="4212731925"
          />
          <h2 class="title-h2"><i class="icon-hot" />Hot Games</h2>
          <ContentItemRow
            v-for="(item, index) in recGames"
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
      const [bestGamesResponse, recGamesResponse, allGamesResponse] = await Promise.all([
        $axios.$get("/api/game/menu", {
          params: {
            site_id: env.SITE_ID,
            mod_id: "fave-games",
            size: 30
          }
        }),
        $axios.$get("/api/game/rec", {
          params: {
            site_id: env.SITE_ID,
            type: 1,
            size: 10,
            page: 1
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
        bestGames: bestGamesResponse.list,
        recGames: recGamesResponse.list,
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
@media screen and (max-width: 1200px) {
  .main-left {
    width: 100%;
  }
}
@media screen and (max-width: 750px) {
  .page {
    background: unset;
  }
  .page-bg {
    width: 100%;
    height: 100%;
    background-color: $color1;
    position: fixed;
    top: 0;
    z-index: -2;
  }
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
    justify-content: center;
  }
  .ad-width {
    width: 87%;
    margin: 0 auto;
  }
}
</style>
