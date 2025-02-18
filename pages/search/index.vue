<template>
  <div class="page">
    <div class="page-bg"></div>
    <Header ref="headerElem" />
    <main class="main">
      <div class="fixed-bg"></div>
      <div ref="shadowElem" class="bg-shadow"></div>
      <Breadcrumb name="Search" />
      <GoogleAd ad-slot="8298185356" class="ad-width" />
      <!-- 移动端独占 -->
      <section class="m-search-box pc-hidden">
        <input
          v-model="input"
          class="text"
          type="text"
          placeholder="Search"
          @keyup.enter="searchGame"
        />
        <p class="m-search" @click="searchGame"><i class="icon-search"></i></p>
      </section>

      <!-- 搜索中 -->
      <section v-if="searchLoading" class="searching">
        <Loading />
      </section>

      <!-- 搜索无结果 -->
      <section v-if="!searchLoading && matchGameData.totalCount == 0" class="search-null">
        Sorry, No <span>&nbsp;"{{ matchGameData.name }}"&nbsp;</span> found
      </section>

      <section
        v-if="!searchLoading && matchGameData.totalCount > 0"
        class="search-result box-small-bg box-small-bg-search"
      >
        <div class="number">
          <span>"{{ matchGameData.name }}"</span>, {{ matchGameData.totalCount }} results found
        </div>
        <h3 class="title-padding" v-if="matchGameData.app_list.length > 0">Tools</h3>
        <ContentItemSmall
          v-for="(item, index) in matchGameData.app_list"
          :key="index"
          :index="index"
          :item="item"
          :to="`/app/${item.path}/`"
        />
        <h3 class="title-padding" v-if="matchGameData.list.length > 0">Games</h3>
        <ContentItemSmall
          v-for="(item, index) in matchGameData.list"
          :key="index + 10000"
          :index="index"
          :item="item"
          :to="`/game/${item.path}/`"
        />
      </section>

      <h2 class="title-h2"><i class="icon-recommend" />Recommend</h2>
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
      lastButtonRect: null,
      headerHeight: 0,
      windowWidth: 0,
      searchLoading: false,
      collapsed: true,
      matchGameData: {},
      input: ""
    };
  },
  mounted() {
    this.getScroll();
    this.input = this.$route.query.text || "";
    this.input && this.searchGame();
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
    },
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
.main {
  max-width: 1200px;
  margin: 0 auto;
}
.searching,
.search-null {
  width: 100%;
  height: 120px;
  box-shadow: inset 4px 4px 8px 0px rgba(99, 82, 101, 0.16), inset -4px -4px 8px 0px #ffffff;
  border-radius: 24px;
  @include center;
}
.search-null,
.search-result .number {
  font-size: 20px;
  font-family: "sesb";
  color: rgba($font1, 0.6);
  span {
    color: $color3;
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
  grid-template-columns: repeat(auto-fit, 129px);
}
@media screen and (max-width: 1235px) {
  .box-small-bg-search {
    grid-template-columns: repeat(auto-fit, minmax(122px, 1fr));
  }
  .box-common-search {
    grid-template-columns: repeat(auto-fit, minmax(157px, 1fr));
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
    padding: vw(48) 0 0 0;
    margin-top: vw(8);
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
  .m-search-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: inset 4px 4px 8px 0px rgba(99, 82, 101, 0.16), inset -4px -4px 8px 0px #ffffff;
    margin: vw(48) vw(94);
    height: vw(96);
    border-radius: vw(60);
    padding-right: vw(6);
    .text {
      width: vw(420);
      padding-left: vw(32);
      font-size: vw(32);
      color: $font1;
      &::placeholder {
        color: rgba($font1, 0.6);
      }
    }
    .m-search {
      width: vw(144);
      height: vw(84);
      background: $color3;
      border-radius: vw(120);
      @include center;
    }
    .icon-search {
      @include icon(vw(48), vw(48), "icon-search2.png");
    }
  }
  .searching,
  .search-null {
    width: auto;
    height: vw(240);
    border-radius: vw(48);
    margin: 0 vw(46);
  }
  .search-null,
  .search-result .number {
    font-size: vw(28);
  }
  .search-result {
    border-radius: vw(48);
    h3 {
      font-size: vw(36);
      // padding-left: vw(32);
      &:last-of-type {
        margin-top: vw(22);
      }
    }
  }

  .box-small-bg-search {
    grid-template-columns: repeat(3, vw(178));
    gap: vw(32) vw(30);
  }
  .box-common-search {
    grid-template-columns: repeat(3, vw(200));
    gap: vw(32) vw(30);
  }
  .ad-width {
    width: 87%;
    margin: 0 auto;
  }
}
</style>
