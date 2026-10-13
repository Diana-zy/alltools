<template>
  <div class="page">
    <Header />
    <main class="main">
      <div class="main-left">
        <!-- <GoogleAd ad-slot="3617086157" class="ad1 ad-width" /> -->
        <adm-slot
          adm-id="picks-mid1"
          adm-unit="/23197833490/alltools1/alltools1_module_1"
          ads-slot="3617086157"
          class="ad1 ad-width"
        />
        <h2 class="title-h2">Easy Use and Happy Life</h2>
        <section class="box-list-section box-category">
          <ContentItemList
            v-for="(item, index) in editorsPick"
            :key="index"
            :index="index"
            :item="item"
            list-name="picks_all"
            :to="`/${item.type === 1 ? 'game' : 'app'}/${item.path}/`"
          />
        </section>

        <!-- <GoogleAd ad-slot="5790255714" class="ad2 ad-width" /> -->
        <adm-slot
          adm-id="picks-mid2"
          adm-unit="/23197833490/alltools1/alltools1_module_2"
          ads-slot="5790255714"
          class="ad2 ad-width"
        />

        <h2 class="title-h2">All apks recommend to you</h2>

        <InfiniteScrollList2
          api-endpoint="/api/game/all_app"
          :initial-items="allApks"
          class="box-common1"
        >
          <template #default="{ items }">
            <ContentItemDetail
              v-for="(item, index) in items"
              :key="index"
              :index="index"
              :item="item"
              list-name="picks_recommend"
              :to="`/${item.type === 1 ? 'game' : 'app'}/${item.path}/`"
            />
          </template>
        </InfiniteScrollList2>

        <aside class="box-aside">
          <!-- <GoogleAd ad-slot="2851633541" /> -->
          <adm-slot
            adm-id="picks-mid3"
            adm-unit="/23197833490/alltools1/alltools1_module_3"
            ads-slot="2851633541"
          />
          <h2 class="title-h2">Hot Picks</h2>
          <ContentItemRow
            v-for="(item, index) in bestApps.slice(0, 10)"
            :key="index"
            :item="item"
            :index="index"
            list-name="picks_hot"
            :to="`/app/${item.path}/`"
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
import { shuffleArray } from "~/utils/utils";

// 站点管理里没配置对应 mod_id 时，/api/game/menu 会返回 null，直接读 .list 会报错
// 把整个页面渲染搞挂——这里给每个请求单独兜底成空列表。
async function fetchModule($axios, siteId, modId, size) {
  try {
    const res = await $axios.$get("/api/game/menu", { params: { site_id: siteId, mod_id: modId, size } });
    return res.list || [];
  } catch (error) {
    console.error(`[picks] fetchModule 失败 mod_id=${modId}:`, error && error.message);
    return [];
  }
}

// "All apks recommend to you"不区分游戏/应用类型、随机排序，不走单独的后端接口，直接复用现成
// 的 all_app/all_game 接口取第 1 页数据、混合后打乱顺序，后续翻页由 InfiniteScrollList2 接管
// （它内部就是用同一套"各取一页、交叉拼接"的逻辑，这里额外做了 shuffle）。
async function fetchAllApksPage1($axios, siteId) {
  try {
    const [allAppsResponse, allGamesResponse] = await Promise.all([
      $axios.$get("/api/game/all_app", { params: { site_id: siteId, page: 1, size: 20 } }),
      $axios.$get("/api/game/all_game", { params: { site_id: siteId, page: 1, size: 20 } })
    ]);
    return shuffleArray([...(allAppsResponse.list || []), ...(allGamesResponse.list || [])]);
  } catch (error) {
    console.error("[picks] fetchAllApksPage1 失败:", error && error.message);
    return [];
  }
}

export default {
  async asyncData({ $axios, env }) {
    try {
      // home-editors-pick 是运营在 BI 后台「站点管理/模块游戏推荐」手动挑选的内容，不是全量
      // 目录，没有对应的 all_xxx 分页接口可接，所以这里一次性按模块配置的数量全部展示，不做
      // InfiniteScrollList 翻页（这点跟 category 页的"All Apps/Games"翻页区块不同）。
      const editorsPick = await fetchModule($axios, env.SITE_ID, "home-editors-pick", 60);
      const bestApps = await fetchModule($axios, env.SITE_ID, "best-apps", 10);
      const allApks = await fetchAllApksPage1($axios, env.SITE_ID);
      return { editorsPick, bestApps, allApks };
    } catch (error) {
      console.error("Error fetching data:", error);
      return { editorsPick: [], bestApps: [], allApks: [] };
    }
  },
  data() {
    return {
      editorsPick: [],
      bestApps: [],
      allApks: []
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
.box-aside {
  top: 63px;
}
@media screen and (max-width: 1235px) {
  .main {
    width: 100%;
    box-sizing: border-box;
  }
  .main-left {
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
  .box-category {
    margin-bottom: vw(48);
    margin-top: vw(36);
  }
}
</style>
