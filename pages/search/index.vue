<template>
  <div class="page">
    <Header />
    <Navigation current-path="search" :nav-categories="navCategories" />
    <main>
      <!-- 面包屑导航 -->
      <nav class="breadcrumb">
        <i class="icon-breadcrumb"></i>
        <CustomLink to="/">Home</CustomLink>
        <span>></span>
        <CustomLink to="/search/" class="active">Search</CustomLink>
      </nav>

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

      <section v-if="!searchLoading && matchGameData.count > 0" class="search-result">
        <div class="number">
          <span>"{{ matchGameData.name }}"</span>, {{ matchGameData.count }} results found
        </div>
        <CustomLink
          v-for="(item, i) in matchGameData.list"
          :key="i"
          :to="`/game/${item.path}/`"
          class="item"
        >
          <NuxtImg
            format="auto"
            fit="cover"
            width="176"
            height="176"
            :src="item.icon"
            :alt="item.name"
            loading="lazy"
            class="icon"
          />
          <p class="name">{{ item.name }}</p>
          <p class="date">{{ item.pub_time }}</p>
        </CustomLink>
      </section>

      <!-- More Games 模块 -->
      <h2 class="title-h2"><i class="icon-related"></i>MORE GAMES</h2>
      <section
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="0"
        class="box-recommend-game"
      >
        <CustomLink
          v-for="(item, i) in moreGames"
          :key="i"
          :to="`/game/${item.path}/`"
          class="item"
        >
          <NuxtImg
            format="auto"
            fit="cover"
            width="120"
            height="120"
            :src="item.icon"
            :alt="item.name"
            loading="lazy"
            class="img"
          />

          <div class="info">
            <p class="name">{{ item.name }}</p>
          </div>
        </CustomLink>
      </section>
      <Loading v-if="loading"></Loading>
    </main>
    <Footer />
    <BackTop />
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, env }) {
    try {
      const [moreGameResponse, allCategoriesResponse] = await Promise.all([
        $axios.$get("/api/game/all_game", {
          params: {
            site_id: env.SITE_ID,
            page: 1,
            size: 30
          }
        }),
        $axios.$get("/api/game/get_all_category", {
          params: {
            site_id: env.SITE_ID
          }
        })
      ]);
      return {
        moreGames: moreGameResponse.list,
        navCategories: allCategoriesResponse.list.slice(0, 8)
      };
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
  data() {
    return {
      searchLoading: false,
      loading: false,
      endOfList: false,
      currentPage: 2,
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
    async loadMore() {
      if (this.loading || this.endOfList) return;
      this.loading = true;
      const newData = await this.$axios.$get("/api/game/all_game", {
        params: {
          site_id: process.env.SITE_ID,
          page: this.currentPage,
          size: 36
        }
      });

      this.moreGames = this.moreGames.concat(newData.list);

      if (newData.list.length === 0 || newData.list.length < 12) {
        this.endOfList = true;
      }
      this.loading = false;
      this.currentPage++;
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
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/game.scss";
.search-result {
  background: #f5f6f7;
  border-radius: 18px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(106px, 1fr));
  gap: 26px;
  padding: 40px;
  .number {
    grid-column: 1 / -1;
    font-family: "Poppins-SemiBold";
    font-size: 24px;
    line-height: 26px;
    margin-bottom: 20px;
    color: #171e27;
    text-align: center;
    span {
      color: #780dff;
    }
  }
  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    .icon {
      border-radius: 14px;
    }
    .name {
      margin-top: 10px;
      font-size: 14px;
      line-height: 18px;
      color: #171e27;
      font-family: "Poppins-SemiBold";
      text-align: center;
      max-width: 106px;
      @include ellipsis;
    }
    .date {
      margin-top: 2px;
      font-size: 12px;
      line-height: 18px;
      color: #898e97;
    }
  }
  .icon {
    width: 74px;
    height: 74px;
    border-radius: 14px;
  }
}
.search-null,
.searching {
  height: 255px;
  background: #f5f6f7;
  border-radius: 18px;
  @include center;
  font-size: 24px;
  font-family: "Poppins-SemiBold";
  color: #171e27;
  span {
    color: #780dff;
  }
}
@media screen and (max-width: 879px) {
  .pc-hidden {
    display: block;
  }
  .m-search-box {
    display: flex;
    margin: 0 vw(46);
    height: vw(92);
    background: #e5e9ed;
    border-radius: vw(46);
    font-size: vw(32);
    padding: 0 vw(5) 0 vw(32);
    display: flex;
    justify-content: space-between;
    align-items: center;
    .text {
      width: vw(428);
    }
    .m-search {
      width: vw(128);
      height: vw(78);
      background: #780dff;
      border-radius: vw(38);
      @include center;
    }
    .icon-search {
      @include icon(vw(42), vw(42), "icon_search_m.png");
    }
  }
  .search-null,
  .searching {
    height: 255px;
    background: #fff;
    border-radius: 18px;
    @include center;
    font-size: 24px;
    font-family: "Poppins-SemiBold";
    color: #171e27;
    span {
      color: #780dff;
    }
  }
  .search-result {
    background: #f5f6f7;
    border-radius: vw(32);
    display: grid;
    grid-template-columns: repeat(auto-fit, vw(182));
    gap: vw(56) vw(38);
    padding: vw(32) vw(18);
    margin: 0 vw(46);
    .number {
      display: none;
    }
    .item {
      .icon {
        border-radius: vw(24);
      }
      .name {
        margin-top: vw(24);
        font-size: vw(28);
        line-height: vw(32);
        color: #171e27;
        font-family: "Poppins-SemiBold";
        text-align: center;
        max-width: 100%;
        @include ellipsis;
      }
      .date {
        margin-top: vw(16);
        font-size: vw(26);
        line-height: vw(30);
        color: #898e97;
      }
    }
    .icon {
      width: vw(154);
      height: vw(154);
      border-radius: vw(24);
    }
  }
}
</style>
