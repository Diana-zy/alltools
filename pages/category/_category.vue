<template>
  <div class="page">
    <div class="page-bg"></div>
    <Header ref="headerElem" />
    <main class="main">
      <div class="main-left">
        <div class="fixed-bg"></div>
        <div ref="shadowElem" class="bg-shadow"></div>
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
        <GoogleAd ad-slot="4504570149" class="ad1 ad-width" />
        <section class="box-common box-category">
          <ContentItemCommon
            v-for="(item, index) in currentCategory"
            :key="index"
            :index="index"
            :item="item"
            :to="`/${isApp ? 'app' : 'game'}/${item.path}/`"
          />
        </section>

        <GoogleAd ad-slot="1268068106" class="ad2 ad-width" />
        <h2 class="title-h2"><i class="icon-recommend" />All {{ isApp ? "Apps" : "Games" }}</h2>

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
          <GoogleAd ad-slot="1391696348" />
          <h2 class="title-h2"
            ><i :class="isApp ? 'icon-favorite-app' : 'icon-favorite-game'" />Favorite
            {{ isApp ? "Apps" : "Games" }}</h2
          >
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
