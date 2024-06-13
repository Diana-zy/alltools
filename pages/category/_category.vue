<template>
  <div class="page">
    <Header />
    <main class="main">
      <h2 class="title-h2">
        <NuxtImg
          v-if="currentCategoryInfo.icon_dark"
          format="auto"
          fit="cover"
          width="62"
          height="62"
          :src="currentCategoryInfo.icon_dark || ''"
          :alt="currentCategoryName"
          class="icon"
        />{{ currentCategoryName }}</h2
      >
      <GoogleAd ad-slot="4887713525" class="ad1" />
      <section class="box-common box-category">
        <ContentItemCommon
          v-for="(item, index) in currentCategory"
          :key="index"
          :index="index"
          :item="item"
          :to="`/${isApp ? 'app' : 'game'}/${item.path}/`"
        />
      </section>

      <GoogleAd ad-slot="9948468514" class="ad2" />
      <h2 class="title-h2">All {{ isApp ? "Apps" : "Games" }}</h2>

      <InfiniteScrollList
        :api-endpoint="`/api/game/${isApp ? 'all_app' : 'all_game'}`"
        :initial-page="2"
        :page-size="30"
        :initial-items="allSoftwares"
      >
        <template #default="{ items }">
          <ContentItemCommon
            v-for="(item, index) in items"
            :key="index"
            :index="index"
            :item="item"
            :to="`/${isApp ? 'app' : 'game'}/${item.path}/`"
          />
        </template>
      </InfiniteScrollList>

      <aside class="box-aside">
        <GoogleAd ad-slot="8635386842" />
        <h2 class="title-h2">Hot {{ isApp ? "Apps" : "Games" }}</h2>
        <ContentItemRow
          v-for="(item, index) in hotSoftwares"
          :key="index"
          :item="item"
          :index="index"
          :to="`/${isApp ? 'app' : 'game'}/${item.path}/`"
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
  async asyncData({ $axios, params, env }) {
    try {
      const path = params.category;
      const lastDashIndex = path.lastIndexOf("-");
      const id = path.substring(lastDashIndex + 1, path.length);
      const currentCategoryResponse = await $axios.$get("/api/game/get_category_game", {
        params: {
          site_id: env.SITE_ID,
          category_id: id
        }
      });
      const isApp = currentCategoryResponse.category.kind === 2;

      const [allSoftwaresResponse, hotSoftwaresResponse] = await Promise.all([
        $axios.$get(`/api/game/${isApp ? "all_app" : "all_game"}`, {
          params: {
            site_id: env.SITE_ID,
            page: 1,
            size: 30
          }
        }),
        $axios.$get("/api/game/menu", {
          params: {
            site_id: env.SITE_ID,
            mod_id: isApp ? "hot-apps" : "hot-games",
            size: 12
          }
        })
      ]);
      return {
        isApp,
        currentCategory: currentCategoryResponse.list,
        currentCategoryName: currentCategoryResponse.category_name,
        currentCategoryInfo: currentCategoryResponse.category,
        allSoftwares: allSoftwaresResponse.list,
        hotSoftwares: hotSoftwaresResponse.list
      };
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
};
</script>

<style lang="scss" scoped>
.main {
  width: 770px;
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
@media screen and (max-width: 1235px) {
  .main {
    width: 100%;
  }
}
@media screen and (max-width: 750px) {
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
