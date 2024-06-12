<template>
  <div class="page">
    <Header />
    <main>
      <Breadcrumb name="Search" />

      <!-- 移动端独占 -->
      <section class="m-search-box pc-hidden">
        <input v-model="input" class="text" type="text" placeholder="Search" />
        <p class="m-search" @click="searchGame"><i class="icon-search"></i></p>
      </section>

      <!-- 搜索中 -->
      <section v-if="searchLoading" class="searching">
        <Loading />
      </section>

      <!-- 搜索无结果 -->
      <section v-if="!searchLoading && matchGameData.count == 0" class="search-null">
        Sorry, No <span>&nbsp;"{{ matchGameData.name }}"&nbsp;</span> found
      </section>

      <!-- 搜索有结果 -->
      <h2 v-if="!searchLoading && matchGameData.count > 0" class="title-h2 pc-hidden">
        {{ matchGameData.count }} Search Results
      </h2>

      <section
        v-if="!searchLoading && matchGameData.count > 0"
        class="search-result box-small-bg box-small-bg-search"
      >
        <div class="number">
          <span>"{{ matchGameData.name }}"</span>, {{ matchGameData.totalCount }} results found
        </div>
        <h3 v-if="matchGameData.app_list.length > 0">Apps</h3>
        <ContentItemSmall
          v-for="(item, index) in matchGameData.app_list"
          :key="index"
          :index="index"
          :item="item"
          :to="`/app/${item.path}/`"
        />
        <h3 v-if="matchGameData.list.length > 0">Games</h3>
        <ContentItemSmall
          v-for="(item, index) in matchGameData.list"
          :key="index"
          :index="index"
          :item="item"
          :to="`/game/${item.path}/`"
        />
      </section>

      <h2 class="title-h2">More Apps</h2>
      <InfiniteScrollList
        class="box-common-search"
        api-endpoint="/api/game/all_app"
        :initial-page="2"
        :page-size="21"
        :initial-items="moreApps"
      >
        <template #default="{ items }">
          <ContentItemCommon
            v-for="(item, index) in items"
            :key="index"
            :index="index"
            :item="item"
            :to="`/app/${item.path}/`"
          />
        </template>
      </InfiniteScrollList>
    </main>
    <Footer />
    <BackTop />
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, env }) {
    try {
      const [moreAppsResponse] = await Promise.all([
        $axios.$get("/api/game/all_app", {
          params: {
            site_id: env.SITE_ID,
            page: 1,
            size: 21
          }
        })
      ]);
      return {
        moreApps: moreAppsResponse.list
      };
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
  data() {
    return {
      searchLoading: false,
      collapsed: true,
      matchGameData: {},
      input: ""
    };
  },
  mounted() {
    this.input = this.$route.query.text || "";
    this.input && this.searchGame();
  },
  methods: {
    async searchGame() {
      if (this.input.length < 2) {
        this.$globalMethod.showNotification({
          message: "Please enter at least 2 characters",
          type: "warning"
        });
        return;
      }
      this.searchLoading = true;

      const matchGamesResponse = await this.$axios.$post("/api/game/search", {
        site_id: process.env.SITE_ID,
        name: this.input
      });

      this.searchLoading = false;
      this.matchGameData = matchGamesResponse;
      this.matchGameData.totalCount = matchGamesResponse.count + matchGamesResponse.app_count;
    }
  }
};
</script>

<style lang="scss" scoped>
.searching,
.search-null {
  width: 100%;
  height: 120px;
  background: #f5f5f5;
  border-radius: 24px 24px 24px 24px;
  @include center;
}
.search-null,
.search-result .number {
  font-size: 20px;
  font-family: "sesb";
  color: rgba($font1, 0.6);
  span {
    color: $color1;
  }
}
.search-result {
  .number {
    grid-column: 1 / -1;
    text-align: center;
  }
  h3 {
    grid-column: 1 / -1;
    color: $font1;
    font-size: 24px;
    font-family: "sesb";
    &:last-of-type {
      margin-top: 12px;
    }
  }
}
.box-small-bg-search {
  grid-template-columns: repeat(auto-fit, 122px);
  grid-gap: 24px;
}
.box-common-search {
  grid-template-columns: repeat(auto-fit, 157px);
}
</style>
