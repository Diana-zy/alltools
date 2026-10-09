<template>
  <div class="page">
    <Header />
    <main class="main">
      <div class="main-left">
        <h2 class="title-h2">Latest Games</h2>
        <!-- <GoogleAd ad-slot="3610867204" class="ad1 ad-width" /> -->
        <adm-slot
          adm-id="new-mid1"
          adm-unit="/23197833490/alltools1/alltools1_module_1"
          ads-slot="4363167594"
          class="ad1 ad-width"
        />
        <section class="box-common box-category">
          <ContentItemSmall
            v-for="(item, index) in newGames"
            :key="index"
            :index="index"
            :item="item"
            :to="`/${item.type === 1 ? 'game' : 'app'}/${item.path}/`"
          />
        </section>

        <!-- <GoogleAd ad-slot="6838895260" class="ad2 ad-width" /> -->
        <adm-slot
          adm-id="new-mid2"
          adm-unit="/23197833490/alltools1/alltools1_module_2"
          ads-slot="5676249263"
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
          <!-- <GoogleAd ad-slot="4212731925" /> -->
          <adm-slot
            adm-id="new-mid3"
            adm-unit="/23197833490/alltools1/alltools1_module_3"
            ads-slot="4746502868"
          />
          <h2 class="title-h2">Hot Games</h2>
          <ContentItemRow
            v-for="(item, index) in bestGames.slice(0, 10)"
            :key="index"
            :item="item"
            :index="index"
            :to="`/${item.type === 1 ? 'game' : 'app'}/${item.path}/`"
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
// 站点管理里没配置对应 mod_id 时，/api/game/menu 会返回 null，直接读 .list 会报错
// 把整个页面渲染搞挂——这里给每个请求单独兜底成空列表。
async function fetchModule($axios, siteId, modId, size) {
  try {
    const res = await $axios.$get("/api/game/menu", { params: { site_id: siteId, mod_id: modId, size } });
    return res.list || [];
  } catch (error) {
    console.error(`[new] fetchModule 失败 mod_id=${modId}:`, error && error.message);
    return [];
  }
}

export default {
  async asyncData({ $axios, env }) {
    try {
      const newGames = await fetchModule($axios, env.SITE_ID, "new-games", 10);
      const bestGames = await fetchModule($axios, env.SITE_ID, "best-games", 30);
      const allGamesResponse = await $axios.$get("/api/game/all_game", {
        params: { site_id: env.SITE_ID, page: 1, size: 30 }
      });
      return {
        newGames,
        bestGames,
        allGames: (allGamesResponse && allGamesResponse.list) || []
      };
    } catch (error) {
      console.error("Error fetching data:", error);
      return { newGames: [], bestGames: [], allGames: [] };
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
