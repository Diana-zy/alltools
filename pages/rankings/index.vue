<template>
  <div class="page">
    <Header />
    <main class="main">
      <div class="main-left">
        <adm-slot
          :adm-id="topAd.admId"
          :adm-unit="topAd.admUnit"
          :ads-slot="topAd.adsSlot"
          class="ad1 ad-width"
        />

        <h2 class="title-h2">Top Rankings</h2>

        <div class="tabs">
          <div
            class="tab"
            :class="{ active: activeTab === 'apps' }"
            @click="setTab('apps')"
            >Apps</div
          >
          <div
            class="tab"
            :class="{ active: activeTab === 'games' }"
            @click="setTab('games')"
            >Games</div
          >
          <div
            class="tab"
            :class="{ active: activeTab === 'picks' }"
            @click="setTab('picks')"
            >Top Picks</div
          >
        </div>

        <template v-if="activeTab === 'apps'">
          <section class="box-list-section box-category">
            <ContentItemList
              v-for="(item, index) in bestApps"
              :key="index"
              :index="index"
              :item="item"
              :to="`/app/${item.path}/`"
            />
          </section>

          <adm-slot
            adm-id="rankings-app-mid2"
            adm-unit="/23197833490/alltools1/alltools1_module_2"
            ads-slot="8110840910"
            class="ad2 ad-width"
          />
          <h2 class="title-h2">All Apps</h2>

          <InfiniteScrollList
            :api-endpoint="`/api/game/all_app`"
            :initial-page="2"
            :page-size="30"
            :initial-items="allApps"
            class="box-common1"
          >
            <template #default="{ items }">
              <ContentItemDetail
                v-for="(item, index) in items"
                :key="index"
                :index="index"
                :item="item"
                :to="`/app/${item.path}/`"
              />
            </template>
          </InfiniteScrollList>

          <aside class="box-aside">
            <adm-slot
              adm-id="rankings-app-mid3"
              adm-unit="/23197833490/alltools1/alltools1_module_3"
              ads-slot="9448165209"
            />
            <h2 class="title-h2">Hot Apps</h2>
            <ContentItemRow
              v-for="(item, index) in newApps"
              :key="index"
              :item="item"
              :index="index"
              :to="`/app/${item.path}/`"
            />
          </aside>
        </template>

        <template v-else-if="activeTab === 'games'">
          <section class="box-common box-category">
            <ContentItemSmall
              v-for="(item, index) in bestGames"
              :key="index"
              :index="index"
              :item="item"
              :to="`/game/${item.path}/`"
            />
          </section>

          <adm-slot
            adm-id="rankings-game-mid2"
            adm-unit="/23197833490/alltools1/alltools1_module_2"
            ads-slot="8110840910"
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
            <adm-slot
              adm-id="rankings-game-mid3"
              adm-unit="/23197833490/alltools1/alltools1_module_3"
              ads-slot="8135083535"
            />
            <h2 class="title-h2">Hot Games</h2>
            <ContentItemRow
              v-for="(item, index) in newGames.slice(0, 10)"
              :key="index"
              :item="item"
              :index="index"
              :to="`/game/${item.path}/`"
            />
          </aside>
        </template>

        <template v-else>
          <section class="picks-list">
            <ContentItemRank
              v-for="(item, index) in recommendedApksShown"
              :key="index"
              :item="item"
              :index="index"
              :to="`/${item.type === 1 ? 'game' : 'app'}/${item.path}/`"
            />
          </section>

          <div v-if="recommendedApksHasMore" class="show-more" @click="showMoreApks">
            {{ showMoreLoading ? "Loading..." : "Show More" }}
          </div>

          <h2 class="title-h2">Recommend</h2>
          <section class="picks-list">
            <ContentItemRank
              v-for="(item, index) in bottomRecommend"
              :key="index"
              :item="item"
              :index="index"
              :show-rank="false"
              :to="`/${item.type === 1 ? 'game' : 'app'}/${item.path}/`"
            />
          </section>
        </template>
      </div>
    </main>
    <Footer />
    <BackTop />
  </div>
</template>

<script>
// 后端在多个并发请求下会502（实测单条请求正常，多条并发就炸），所以这里依次请求而不是
// Promise.all并发，排队请求虽然多花几百毫秒，但不会把Rankings页拖挂；单条请求失败时兜底
// 成空列表，不让整页因为某一个模块出错就白屏。
async function fetchList($axios, url, params) {
  try {
    const res = await $axios.$get(url, { params });
    return res.list || [];
  } catch (error) {
    console.error(`[rankings] 请求失败 ${url}:`, params, error && error.message);
    return [];
  }
}

export default {
  async asyncData({ $axios, env, query }) {
    const bestApps = await fetchList($axios, "/api/game/menu", {
      site_id: env.SITE_ID,
      mod_id: "best-apps",
      size: 30
    });
    const newApps = await fetchList($axios, "/api/game/menu", {
      site_id: env.SITE_ID,
      mod_id: "new-apps",
      size: 12
    });
    const allApps = await fetchList($axios, "/api/game/all_app", {
      site_id: env.SITE_ID,
      page: 1,
      size: 30
    });
    const bestGames = await fetchList($axios, "/api/game/menu", {
      site_id: env.SITE_ID,
      mod_id: "best-games",
      size: 30
    });
    const newGames = await fetchList($axios, "/api/game/menu", {
      site_id: env.SITE_ID,
      mod_id: "new-games",
      size: 10
    });
    const allGames = await fetchList($axios, "/api/game/all_game", {
      site_id: env.SITE_ID,
      page: 1,
      size: 30
    });
    // Top Picks tab：跟首页 Top Picks 用同一个 BI 模块(home-recommended-apks)，未配置时
    // fallback 到 bestApps，跟首页保持一致
    const recommendedApksConfigured = await fetchList($axios, "/api/game/menu", {
      site_id: env.SITE_ID,
      mod_id: "home-recommended-apks",
      size: 27
    });

    return {
      activeTab: ["games", "picks"].includes(query.tab) ? query.tab : "apps",
      bestApps,
      newApps,
      allApps,
      bestGames,
      newGames,
      allGames,
      recommendedApksConfigured,
      // Top Picks 一次展示9个，点 Show More 再展示下9个，最多27个（3批）
      revealedApksCount: 9,
      showMoreLoading: false
    };
  },
  computed: {
    topAd() {
      if (this.activeTab === "apps") {
        return {
          admId: "rankings-app-mid1",
          admUnit: "/23197833490/alltools1/alltools1_module_1",
          adsSlot: "3074328547"
        };
      }
      if (this.activeTab === "games") {
        return {
          admId: "rankings-game-mid1",
          admUnit: "/23197833490/alltools1/alltools1_module_1",
          adsSlot: "2858514230"
        };
      }
      // Top Picks tab 的广告位是占位值，需要在 Google Ad Manager 后台新建正式广告位后再替换
      return {
        admId: "rankings-picks-mid1",
        admUnit: "/23197833490/alltools1/alltools1_module_1",
        adsSlot: "0000000007"
      };
    },
    recommendedApksAll() {
      return (
        this.recommendedApksConfigured.length ? this.recommendedApksConfigured : this.bestApps
      ).slice(0, 27);
    },
    recommendedApksShown() {
      return this.recommendedApksAll.slice(0, this.revealedApksCount);
    },
    recommendedApksHasMore() {
      return this.revealedApksCount < this.recommendedApksAll.length;
    },
    // Recommend：应用+游戏各取前3个，混着展示，不做无限加载
    bottomRecommend() {
      return [...this.bestApps.slice(0, 3), ...this.bestGames.slice(0, 3)];
    }
  },
  methods: {
    setTab(tab) {
      if (this.activeTab === tab) return;
      this.activeTab = tab;
      this.$router.replace({ query: { ...this.$route.query, tab } }).catch(() => {});
    },
    showMoreApks() {
      if (this.showMoreLoading || !this.recommendedApksHasMore) return;
      this.showMoreLoading = true;
      const reveal = () => {
        this.revealedApksCount = Math.min(
          this.revealedApksCount + 9,
          this.recommendedApksAll.length
        );
        this.showMoreLoading = false;
      };
      // 激励广告由 app.html 里的 window.showRewardedAd 触发；没有广告可用/加载失败/关闭
      // 都会调用回调直接展示下一批，不会卡住用户
      if (typeof window !== "undefined" && typeof window.showRewardedAd === "function") {
        window.showRewardedAd(reveal);
      } else {
        reveal();
      }
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
  width: 770px;
}
.ad1,
.ad2 {
  width: 100%;
}
.tabs {
  display: flex;
  margin: 16px 0 8px;
}
.tab {
  padding: 8px 24px;
  margin-right: 12px;
  border-radius: 20px;
  font-family: "sesb";
  font-size: 15px;
  color: rgba($font1, 0.6);
  background: $color4;
  cursor: pointer;
  &.active {
    color: #ffffff;
    background: $color2;
  }
}
.box-category {
  margin-bottom: 32px;
  margin-top: 24px;
}
.picks-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 24px;
}
.show-more {
  width: 100%;
  height: 48px;
  margin-top: 16px;
  border: 1px solid #fd6b21;
  border-radius: 24px;
  color: #fd6b21;
  font-family: "seb";
  font-size: 14px;
  @include center;
  cursor: pointer;
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
  .tabs {
    padding: 0 vw(24);
    margin: vw(24) 0 vw(8);
  }
  .tab {
    padding: vw(14) vw(40);
    margin-right: vw(20);
    border-radius: vw(40);
    font-size: vw(26);
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
  .picks-list {
    padding: 0 vw(24);
    margin-top: vw(36);
  }
  .show-more {
    height: vw(80);
    margin-top: vw(24);
    border-radius: vw(40);
    font-size: vw(26);
  }
}
</style>
