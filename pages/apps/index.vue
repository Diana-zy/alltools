<template>
  <div class="page">
    <Header />
    <main class="main">
      <h2 class="title-h2">All Apps</h2>
      <GoogleAd ad-slot="4887713525" class="ad1" />
      <section
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="0"
        class="box-common"
      >
        <GoogleAd ad-slot="9948468514" class="ad2" />
        <ContentItemCommon
          v-for="(item, index) in allApps"
          :key="index"
          :index="index"
          :item="item"
          :to="`/game/${item.path}/`"
        />
      </section>

      <aside class="box-aside">
        <GoogleAd ad-slot="8635386842" />
        <h2 class="title-h2">Hot Apps</h2>
        <ContentItemRow
          v-for="(item, index) in hotApps"
          :key="index"
          :item="item"
          :index="index"
          :to="`/game/${item.path}/`"
        />
      </aside>
    </main>
    <Footer />
    <BackTop />
    <AdLoading />
  </div>
</template>
<script>
export default {
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
            mod_id: "hot-apps",
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
  },
  data() {
    return {
      loading: false,
      endOfList: false,
      currentPage: 2
    };
  },
  methods: {
    async loadMore() {
      if (this.loading || this.endOfList) return;
      this.loading = true;
      const newData = await this.$axios.$get("/api/game/all_app", {
        params: {
          site_id: process.env.SITE_ID,
          page: this.currentPage,
          size: 30
        }
      });
      this.allApps = this.allApps.concat(newData.list);
      if (newData.list.length === 0 || newData.list.length < 30) {
        this.endOfList = true;
      }
      this.loading = false;
      this.currentPage++;
    }
  }
};
</script>
<style lang="scss" scoped>
.main {
  width: 770px;
}
.ad2 {
  grid-row-end: 4;
  grid-column: 1/-1;
}
</style>
