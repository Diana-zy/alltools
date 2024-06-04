<template>
  <div class="page">
    <Header />
    <Navigation current-path="best" :nav-categories="navCategories" />
    <main>
      <ModuleTabs current-path="best" />
      <h1 class="title-h2 module-page-title"><i class="icon-best"></i>BEST GAMES</h1>
      <!-- 当前分类游戏列表 -->
      <section class="box-module box-module-tabs-margin">
        <CustomLink
          v-for="(item, i) in moduleGames"
          :key="i"
          :to="`/game/${item.path}/`"
          class="item"
        >
          <NuxtImg
            format="auto"
            fit="cover"
            width="168"
            height="168"
            :src="item.icon"
            :alt="item.name"
            loading="lazy"
            class="icon"
          />
          <p class="name">{{ item.name }}</p>
        </CustomLink>

        <!-- best-1: Google Ad 占位 1 -->
        <GoogleAd ad-slot="2708272746" class="ad1" />
        <!-- best-2: Google Ad 占位 2 -->
        <GoogleAd ad-slot="1395191079" class="ad2" />
      </section>

      <!-- 推荐游戏列表 -->
      <h2 class="title-h2"><i class="icon-related"></i>RECOMMEND GAMES</h2>
      <section class="box-module-recommend">
        <CustomLink
          v-for="(item, i) in recommendGames"
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
            class="icon"
          />
          <div>
            <p class="name">{{ item.name }}</p>
            <p class="date">{{ item.pub_time }}</p>
          </div>
        </CustomLink>
      </section>
    </main>
    <Footer />
    <BackTop />
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, env }) {
    try {
      const [moduleGamesResponse, recommendGamesResponse, allCategoriesResponse] =
        await Promise.all([
          $axios.$get("/api/game/menu", {
            params: {
              site_id: env.SITE_ID,
              mod_id: "best-games"
            }
          }),
          $axios.$get("/api/game/menu", {
            params: {
              site_id: env.SITE_ID,
              mod_id: "subrec-games",
              size: 12
            }
          }),
          $axios.$get("/api/game/get_all_category", {
            params: {
              site_id: env.SITE_ID
            }
          })
        ]);

      return {
        moduleGames: moduleGamesResponse.list,
        recommendGames: recommendGamesResponse.list,
        navCategories: allCategoriesResponse.list.slice(0, 8)
      };
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/module.scss";
</style>
