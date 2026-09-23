<template>
  <div class="page">
    <Header />
    <main class="main">
      <div class="main-left">
        <h2 class="title-h2">Top Rankings</h2>
        <adm-slot
          adm-id="rankings-mid1"
          adm-unit="/23197833490/alltools1/alltools1_module_1"
          ads-slot="2858514230"
          class="ad1 ad-width"
        />
        <section class="box-rank">
          <ContentItemRank
            v-for="(item, index) in rankedItems"
            :key="index"
            :item="item"
            :index="index"
            :eager="10"
            :to="`/${item.type === 1 ? 'game' : 'app'}/${item.path}/`"
          />
        </section>
      </div>
    </main>
    <Footer />
    <BackTop />
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, env }) {
    try {
      const [bestGamesResponse, bestAppsResponse] = await Promise.all([
        $axios.$get("/api/game/menu", {
          params: {
            site_id: env.SITE_ID,
            mod_id: "best-games",
            size: 30,
            page: 1
          }
        }),
        $axios.$get("/api/game/menu", {
          params: {
            site_id: env.SITE_ID,
            mod_id: "best-apps",
            size: 30,
            page: 1
          }
        })
      ]);

      // 两个推荐位模块各自内部的顺序是后台人工排好的排名，这里按顺序交替合并成一个混合榜单，
      // 而不是简单拼接（拼接会导致后半段清一色是同一种类型，不像"综合榜单"）。
      const games = bestGamesResponse.list || [];
      const apps = bestAppsResponse.list || [];
      const rankedItems = [];
      const maxLen = Math.max(games.length, apps.length);
      for (let i = 0; i < maxLen; i++) {
        if (apps[i]) rankedItems.push(apps[i]);
        if (games[i]) rankedItems.push(games[i]);
      }

      return { rankedItems };
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
  head() {
    return {
      title: "Top Rankings | AllTools1 APK Download"
    };
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
  width: 100%;
}
.ad1 {
  width: 100%;
}
.box-rank {
  margin-top: 24px;
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
    margin-top: vw(14);
  }
  .box-rank {
    margin-top: vw(36);
    padding: 0 vw(24);
  }
}
</style>
