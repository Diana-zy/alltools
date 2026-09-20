<template>
  <div class="page">
    <Header />
    <main class="main">
      <div class="main-left">
        <div class="tab-switch">
          <span class="tab-item active">Top Free Apps</span>
          <CustomLink to="/games/" class="tab-item">Top Free Games</CustomLink>
        </div>
        <!-- <GoogleAd ad-slot="3617086157" class="ad1 ad-width" /> -->
        <adm-slot
          adm-id="apps-mid1"
          adm-unit="/23197833490/alltools1/alltools1_module_1"
          ads-slot="3617086157"
          class="box-common"
        />

        <InfiniteScrollList
          api-endpoint="/api/game/all_app"
          :initial-page="2"
          :page-size="30"
          :initial-items="allApps"
        >
          <template #default="{ items }">
            <!-- <GoogleAd ad-slot="1653435668" class="ad2" /> -->
            <adm-slot
              adm-id="apps-mid2"
              adm-unit="/23197833490/alltools1/alltools1_module_2"
              ads-slot="1653435668"
              class="ad2"
            />
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
          <!-- <GoogleAd ad-slot="2851633541" /> -->
          <adm-slot
            adm-id="apps-mid3"
            adm-unit="/23197833490/alltools1/alltools1_module_3"
            ads-slot="2851633541"
          />
          <h2 class="title-h2">Favorite Tools</h2>
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
    <!-- <AdLoading /> -->
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
.tab-switch {
  display: flex;
  gap: 32px;
  padding: 16px 0;
  margin-bottom: 8px;
}
.tab-item {
  color: $font2;
  font-family: "seb";
  font-size: 16px;
  padding-bottom: 8px;
  border-bottom: 2px solid transparent;
  cursor: pointer;
}
.tab-item.active {
  color: #fd6b21;
  border-bottom-color: #fd6b21;
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
@media screen and (max-width: 879px) {
  .main {
    padding: 0;
  }
  .main-left {
    margin-top: vw(14);
  }
  .box-common {
    grid-template-columns: repeat(3, vw(200));
    margin: vw(36) 0 vw(48);
    justify-content: center;
  }
}
</style>
