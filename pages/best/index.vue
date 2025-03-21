<template>
  <div class="page">
    <div class="page-bg"></div>
    <Header ref="headerElem" />
    <main class="main">
      <div class="main-left">
        <h2 class="title-h2"><i class="icon-best" />Best</h2>
        <!-- <GoogleAd ad-slot="2858514230" class="ad1 ad-width" /> -->
        <adm-slot
          class="ad1 ad-width"
          adm-id="best-mid1"
          adm-unit="/23197833490/alltools1/alltools1_module_1"
          ads-slot="3074328547"
        />
        <section class="box-module box-category">
          <ContentItemCommon2
            v-for="(item, index) in bestGames"
            :key="index"
            :index="index"
            :item="item"
            :to="item.type === 1 ? `/game/${item.path}/` : `/app/${item.path}/`"
          />
        </section>

        <!-- <GoogleAd ad-slot="8110840910" class="ad2 ad-width" /> -->
        <adm-slot
          class="ad2 ad-width"
          adm-id="best-mid2"
          adm-unit="/23197833490/alltools1/alltools1_module_2"
          ads-slot="3091877513"
        />
        <h2 class="title-h2"><i class="icon-recommend" />All </h2>

        <InfiniteScrollList
          :api-endpoint="`/api/game/all_app`"
          :initial-page="2"
          :page-size="30"
          :initial-items="allApps"
          class="box-module-common"
        >
          <template #default="{ items }">
            <ContentItemCommon1
              v-for="(item, index) in items"
              :key="index"
              :index="index"
              :item="item"
              :to="item.type === 1 ? `/game/${item.path}/` : `/app/${item.path}/`"
            />
          </template>
        </InfiniteScrollList>

        <aside class="box-aside">
          <!-- <GoogleAd ad-slot="8135083535" /> -->
          <adm-slot
            adm-id="best-mid3"
            adm-unit="/23197833490/alltools1/alltools1_module_3"
            ads-slot="9448165209"
          />
          <h2 class="title-h2"><i class="icon-hot" />Hot</h2>
          <ContentItemRow
            v-for="(item, index) in recGames"
            :key="index"
            :item="item"
            :index="index"
            :to="item.type === 1 ? `/game/${item.path}/` : `/app/${item.path}/`"
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
      const [bestGamesResponse, recGamesResponse, allAppsResponse] = await Promise.all([
        $axios.$get("/api/game/menu", {
          params: {
            site_id: env.SITE_ID,
            mod_id: "best",
            size: 30
          }
        }),
        $axios.$get("/api/game/menu", {
          params: {
            site_id: env.SITE_ID,
            mod_id: "new",
            size: 10
          }
        }),
        $axios.$get("/api/game/all_app", {
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
        allApps: allAppsResponse.list
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
