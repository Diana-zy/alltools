<template>
  <div class="page">
    <div class="page-bg"></div>
    <Header ref="headerElem" />
    <main class="main">
      <div class="main-left">
        <div class="fixed-bg"></div>
        <div ref="shadowElem" class="bg-shadow"></div>
        <h2 class="title-h2"><i class="icon-recommend" />All Apps</h2>
        <GoogleAd ad-slot="2772721462" class="ad1 ad-width" />

        <InfiniteScrollList
          api-endpoint="/api/game/all_app"
          :initial-page="2"
          :page-size="30"
          :initial-items="allApps"
        >
          <template #default="{ items }">
            <GoogleAd ad-slot="1459639798" class="ad2" />
            <ContentItemCommon
              v-for="(item, index) in items"
              :key="index"
              :index="index"
              :item="item"
              :to="`/app/${item.path}/`"
            />
          </template>
        </InfiniteScrollList>

        <aside class="box-aside">
          <GoogleAd ad-slot="2896349709" />
          <h2 class="title-h2"><i class="icon-favorite-app" />Favorite Apps</h2>
          <ContentItemRow
            v-for="(item, index) in hotApps"
            :key="index"
            :item="item"
            :index="index"
            :to="`/app/${item.path}/`"
          />
        </aside>
      </div>
    </main>
    <Footer />
    <BackTop />
    <AdLoading />
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
      const [allAppsResponse, hotAppsResponse] = await Promise.all([
        $axios.$get("/api/game/all_app", {
          params: {
            site_id: env.SITE_ID,
            page: 1,
            size: 30
          }
        }),
        $axios.$get("/api/game/menu", {
          params: {
            site_id: env.SITE_ID,
            mod_id: "best-apps",
            size: 12
          }
        })
      ]);

      return {
        allApps: allAppsResponse.list,
        hotApps: hotAppsResponse.list
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
.ad2 {
  grid-row-end: 4;
  grid-column: 1/-1;
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
    // background: #f2f7fa;
    // border-radius: 24px 24px 0px 0px;
    // box-shadow: 0px 0px 10px 0px rgba(16, 5, 39, 0.2);
    // padding: vw(48) 0 0 0;
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
  .box-common {
    grid-template-columns: repeat(3, vw(200));
    margin: vw(36) 0 vw(48);
    justify-content: center;
  }
  .ad-width {
    width: 92%;
    margin: 0 auto;
  }
}
</style>
