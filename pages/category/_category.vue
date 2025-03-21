<template>
  <div class="page">
    <Header />
    <main class="main">
      <div class="main-left">
        <h2 class="title-h2">
          <!-- <NuxtImg
            v-if="currentCategoryInfo.icon_dark"
            format="auto"
            fit="cover"
            width="62"
            height="62"
            :src="currentCategoryInfo.icon_dark || ''"
            :alt="currentCategoryName"
            class="icon"
          /> -->
          {{ currentCategoryName }}</h2
        >
        <!-- <GoogleAd ad-slot="2540903743" class="ad1 ad-width" /> -->
        <adm-slot
          adm-id="category-mid1"
          adm-unit="/23197833490/alltools1/alltools1_module_1"
          ads-slot="2540903743"
          class="ad1 ad-width"
        />
        <section class="box-list-section box-category">
          <ContentItemList
            v-for="(item, index) in currentCategory"
            :key="index"
            :index="index"
            :item="item"
            :to="`/${isApp ? 'app' : 'game'}/${item.path}/`"
          />
        </section>

        <!-- <GoogleAd ad-slot="5790255714" class="ad2 ad-width" /> -->
        <adm-slot
          adm-id="category-mid2"
          adm-unit="/23197833490/alltools1/alltools1_module_2"
          ads-slot="5790255714"
          class="ad2 ad-width"
        />

        <h2 class="title-h2">All {{ isApp ? "Apps" : "Games" }}</h2>

        <InfiniteScrollList
          :api-endpoint="`/api/game/${isApp ? 'all_app' : 'all_game'}`"
          :initial-page="2"
          :page-size="30"
          :initial-items="allSoftwares"
          class="box-common1"
        >
          <template #default="{ items }">
            <ContentItemDetail
              v-for="(item, index) in items"
              :key="index"
              :index="index"
              :item="item"
              :to="`/${isApp ? 'app' : 'game'}/${item.path}/`"
            />
          </template>
        </InfiniteScrollList>

        <aside class="box-aside">
          <!-- <GoogleAd ad-slot="1851010709" /> -->
          <adm-slot
            adm-id="category-mid3"
            adm-unit="/23197833490/alltools1/alltools1_module_3"
            ads-slot="1851010709"
          />
          <h2 class="title-h2">Favorite {{ isApp ? "Tools" : "Games" }}</h2>
          <ContentItemRow
            v-for="(item, index) in hotSoftwares"
            :key="index"
            :item="item"
            :index="index"
            :to="`/${isApp ? 'app' : 'game'}/${item.path}/`"
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
            mod_id: isApp ? "best-apps" : "best-games",
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
