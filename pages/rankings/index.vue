<template>
  <div class="page">
    <Header />
    <main class="main">
      <div class="main-left">
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
        </div>

        <template v-if="activeTab === 'apps'">
          <adm-slot
            adm-id="rankings-app-mid1"
            adm-unit="/23197833490/alltools1/alltools1_module_1"
            ads-slot="3074328547"
            class="ad1 ad-width"
          />
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

        <template v-else>
          <adm-slot
            adm-id="rankings-game-mid1"
            adm-unit="/23197833490/alltools1/alltools1_module_1"
            ads-slot="2858514230"
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
      </div>
    </main>
    <Footer />
    <BackTop />
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, env, query }) {
    try {
      const [
        bestAppsResponse,
        newAppsResponse,
        allAppsResponse,
        bestGamesResponse,
        newGamesResponse,
        allGamesResponse
      ] = await Promise.all([
        $axios.$get("/api/game/menu", {
          params: { site_id: env.SITE_ID, mod_id: "best-apps", size: 30 }
        }),
        $axios.$get("/api/game/menu", {
          params: { site_id: env.SITE_ID, mod_id: "new-apps", size: 12 }
        }),
        $axios.$get("/api/game/all_app", {
          params: { site_id: env.SITE_ID, page: 1, size: 30 }
        }),
        $axios.$get("/api/game/menu", {
          params: { site_id: env.SITE_ID, mod_id: "best-games", size: 30 }
        }),
        $axios.$get("/api/game/menu", {
          params: { site_id: env.SITE_ID, mod_id: "new-games", size: 10 }
        }),
        $axios.$get("/api/game/all_game", {
          params: { site_id: env.SITE_ID, page: 1, size: 30 }
        })
      ]);

      return {
        activeTab: query.tab === "games" ? "games" : "apps",
        bestApps: bestAppsResponse.list,
        newApps: newAppsResponse.list,
        allApps: allAppsResponse.list,
        bestGames: bestGamesResponse.list,
        newGames: newGamesResponse.list,
        allGames: allGamesResponse.list
      };
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
  methods: {
    setTab(tab) {
      if (this.activeTab === tab) return;
      this.activeTab = tab;
      this.$router.replace({ query: { ...this.$route.query, tab } }).catch(() => {});
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
}
</style>
