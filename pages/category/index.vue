<template>
  <div class="page">
    <Header />
    <Navigation current-path="category" :nav-categories="navCategories" current-category="all" />
    <main>
      <h1 class="title-h2"><i class="icon-related"></i>CATEGORIES</h1>
      <section class="box-module-recommend box-module-category">
        <CustomLink
          v-for="(item, i) in allCategories"
          :key="i"
          :to="`/category/${item.path}/`"
          class="item"
          :class="{ recommend: item.rec }"
        >
          <NuxtImg
            format="auto"
            fit="cover"
            width="120"
            height="120"
            :src="item.bg_icon"
            :alt="item.name"
            loading="lazy"
            class="icon"
          />
          <div>
            <p class="name">{{ item.name }}</p>
            <p class="date">{{ item.total }} Games</p>
          </div>
        </CustomLink>
      </section>

      <h2 class="title-h2"><i class="icon-related"></i>ALL GAMES</h2>
      <section
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="0"
        class="box-module"
      >
        <CustomLink v-for="(item, i) in allGames" :key="i" :to="`/game/${item.path}/`" class="item">
          <NuxtImg
            format="auto"
            fit="cover"
            width="120"
            height="120"
            :src="item.icon"
            :alt="item.name"
            loading="lazy"
            class="icon"
          />
          <p class="name">{{ item.name }}</p>
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
      const [allCategoriesResponse, allGamesResponse] = await Promise.all([
        $axios.$get("/api/game/get_all_category", {
          params: {
            site_id: env.SITE_ID
          }
        }),
        $axios.$get("/api/game/all_game", {
          params: {
            site_id: env.SITE_ID,
            page: 1,
            size: 30
          }
        })
      ]);

      return {
        allCategories: allCategoriesResponse.list,
        allGames: allGamesResponse.list,
        navCategories: allCategoriesResponse.list.slice(0, 8)
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
      const newData = await this.$axios.$get("/api/game/all_game", {
        params: {
          site_id: process.env.SITE_ID,
          page: this.currentPage,
          size: 30
        }
      });

      this.allGames = this.allGames.concat(newData.list);

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
@import "@/assets/css/module.scss";
</style>
