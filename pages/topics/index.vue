<template>
  <div class="page topics-page">
    <Header />
    <main>
      <h2 class="title-h2">Topics</h2>
      <section class="topic-rec-box">
        <topic-item-rec
          v-for="(item, index) in allTopics.slice(0, 3)"
          :key="index"
          :item="item"
          :index="index"
          :eager="1"
          :to="`/topic/${item.path}/`"
        />
      </section>
      <!-- <GoogleAd ad-slot="1021540575" /> -->
      <adm-slot adm-id="topics-mid1" adm-unit="/23197833490/alltools1/alltools1_topics_1" />
      <InfiniteScrollList
        api-endpoint="/api/game/all_topic"
        :initial-page="2"
        :page-size="20"
        :initial-items="allTopics.slice(3)"
      >
        <template #default="{ items }">
          <!-- <GoogleAd ad-slot="9756896824" class="ad-2" /> -->
          <adm-slot adm-id="topics-mid2" adm-unit="/23197833490/alltools1/alltools1_topics_2" />
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
      const allTopicsResponse = await $axios.$get("/api/game/all_topic", {
        params: {
          site_id: env.SITE_ID,
          page: 1,
          size: 20
        }
      });

      return {
        allTopics: allTopicsResponse.list
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
.topics-page ::v-deep .box-common {
  grid-template-columns: repeat(1, minmax(700px, 1200px));
  margin-top: 32px;
  gap: 16px;
}
.ad-2 {
  grid-row: 6;
}
@media screen and (max-width: 750px) {
  .topic-rec-box {
    margin: 0 0 vw(48) vw(46);
    gap: vw(32);
  }
  .topics-page ::v-deep .box-common {
    grid-template-columns: repeat(1, 1fr);
    margin: vw(48) 0 0;
    gap: vw(28);
    .item {
      width: calc(100% - vw(92));
      margin: 0 vw(46);
    }
  }
}
</style>
