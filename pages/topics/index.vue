<template>
  <div class="page">
    <Header />
    <main>
      <h2 class="title-h2">Topics</h2>
      <section class="topic-rec-box">
        <topic-item-rec
          v-for="(item, index) in recApps"
          :key="index"
          :item="item"
          :index="index"
          :eager="1"
          :to="`/topic/${item.path}/`"
        />
      </section>
      <GoogleAd ad-slot="2896349709" />

      <InfiniteScrollList
        api-endpoint="/api/game/all_app"
        :initial-page="2"
        :page-size="20"
        :initial-items="allApps"
      >
        <template #default="{ items }">
          <topic-item-all
            v-for="(item, index) in items"
            :key="index"
            :item="item"
            :index="index"
            :eager="6"
            :to="`/topic/${item.path}/`"
          />
        </template>
      </InfiniteScrollList>
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
      const [allAppsResponse, recAppsResponse] = await Promise.all([
        $axios.$get("/api/game/all_app", {
          params: {
            site_id: env.SITE_ID,
            page: 1,
            size: 20
          }
        }),
        $axios.$get("/api/game/menu", {
          params: {
            site_id: env.SITE_ID,
            mod_id: "rec-apps",
            size: 3
          }
        })
      ]);

      return {
        allApps: allAppsResponse.list,
        recApps: recAppsResponse.list
      };
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
};
</script>

<style scoped lang="scss">
.topic-rec-box {
  display: flex;
  flex-wrap: nowrap;
  gap: 16px;
  @include scroll;
  margin-top: 16px;
  margin-bottom: 32px;
  ::v-deep .item {
    flex-shrink: 0;
  }
}
::v-deep .box-common {
  grid-template-columns: repeat(1, minmax(700px, 1200px));
  margin-top: 32px;
  gap: 16px;
}
@media screen and (max-width: 750px) {
  .topic-rec-box {
    margin: 0 0 vw(48) vw(46);
    gap: vw(32);
  }
  ::v-deep .box-common {
    grid-template-columns: vw(658);
    margin-top: vw(48);
    gap: vw(28);
  }
}
</style>
