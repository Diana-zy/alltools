<template>
  <div class="page">
    <div class="page-bg"></div>
    <Header ref="headerElem" />
    <main class="main">
      <div class="main-left">
        <div class="fixed-bg"></div>
        <div ref="shadowElem" class="bg-shadow"></div>
        <h2 class="title-h2"><i class="icon-favorite-game" />Favorite Games</h2>
        <GoogleAd ad-slot="2708272746" class="ad1 ad-width" />
        <section class="box-common box-category">
          <ContentItemSmall
            v-for="(item, index) in bestGames"
            :key="index"
            :index="index"
            :item="item"
            :to="`/game/${item.path}/`"
          />
        </section>

        <GoogleAd ad-slot="1395191079" class="ad2 ad-width" />
        <h2 class="title-h2"><i class="icon-recommend" />All Games</h2>

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
          <GoogleAd ad-slot="4960842399" />
          <h2 class="title-h2"><i class="icon-relate" />Hot Games</h2>
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
  mounted() {
    this.getScroll();
  },
  methods: {
    getScroll() {
      const headerElement = this.$refs.headerElem.$el;

      if (headerElement && headerElement.getBoundingClientRect().height !== 0) {
        this.headerHeight = headerElement.getBoundingClientRect().height;
      }
      if (this.$refs.shadowElem) {
        this.$refs.shadowElem.style.top = this.headerHeight + "px";
      }
    }
  },
  async asyncData({ $axios, env }) {
    try {
      const [bestGamesResponse, recGamesResponse, allGamesResponse] = await Promise.all([
        $axios.$get("/api/game/menu", {
          params: {
            site_id: env.SITE_ID,
            mod_id: "best-games",
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
@media screen and (max-width: 1235px) {
  .main {
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
  .fixed-bg {
    background: $color2;
    width: 100%;
    height: vw(200);
    position: fixed;
    top: 0;
    z-index: -1;
  }
  .bg-shadow {
    width: 100%;
    height: 100vh;
    position: fixed;
    background: $color1;
    border-radius: vw(48) vw(48) 0 0;
    top: 0;
    z-index: -1;
    pointer-events: none;
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
  .ad-width {
    width: 87%;
    margin: 0 auto;
  }
}
</style>
