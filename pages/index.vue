<template>
  <div class="page">
    <Header />
    <main>
      <section></section>
      <h2 class="title-h2">Best Apps </h2>
      <section class="box-scroll">
        <CustomLink
          v-for="(item, i) in bestGames"
          :key="i"
          :to="`/game/${item.path}/`"
          class="item"
        >
          <NuxtImg
            format="auto"
            fit="cover"
            width="314"
            height="182"
            :src="item.pc_img || item.icon"
            :alt="item.name"
            class="img"
            loading="lazy"
          />
          <NuxtImg
            format="auto"
            fit="cover"
            width="180"
            height="180"
            :src="item.icon"
            :alt="item.name"
            class="icon"
            :loading="i < 5 ? 'eager' : 'lazy'"
          />
          <p class="name">{{ item.name }}</p>
          <div class="btn-view">VIEW</div>
        </CustomLink>
      </section>
      <h2 class="title-h2">Best Games</h2>
      <section class="box-scroll">
        <CustomLink v-for="(item, i) in newGames" :key="i" :to="`/game/${item.path}/`" class="item">
          <NuxtImg
            format="auto"
            fit="cover"
            width="180"
            height="180"
            :src="item.icon"
            :alt="item.name"
            class="img"
            :loading="i < 5 ? 'eager' : 'lazy'"
          />
          <p class="name">{{ item.name }}</p>
        </CustomLink>
      </section>
      <h2 class="title-h2">Hot Apps</h2>
      <section class="box-scroll">
        <CustomLink v-for="(item, i) in newGames" :key="i" :to="`/game/${item.path}/`" class="item">
          <NuxtImg
            format="auto"
            fit="cover"
            width="180"
            height="180"
            :src="item.icon"
            :alt="item.name"
            class="img"
            :loading="i < 5 ? 'eager' : 'lazy'"
          />
          <p class="name">{{ item.name }}</p>
        </CustomLink>
      </section>
      <h2 class="title-h2">Hot Games</h2>
      <section class="box-scroll">
        <CustomLink v-for="(item, i) in newGames" :key="i" :to="`/game/${item.path}/`" class="item">
          <NuxtImg
            format="auto"
            fit="cover"
            width="180"
            height="180"
            :src="item.icon"
            :alt="item.name"
            class="img"
            :loading="i < 5 ? 'eager' : 'lazy'"
          />
          <p class="name">{{ item.name }}</p>
        </CustomLink>
      </section>
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
      // 并行处理多个异步请求
      const [
        recGamesResponse,
        bestGamesResponse,
        newGamesResponse,
        hotGamesResponse,
        allCategoriesResponse
      ] = await Promise.all([
        $axios.$get("/api/game/menu", {
          params: {
            site_id: env.SITE_ID,
            mod_id: "rec-games",
            size: 3
          }
        }),
        $axios.$get("/api/game/menu", {
          params: {
            site_id: env.SITE_ID,
            mod_id: "best-games",
            size: 12
          }
        }),
        $axios.$get("/api/game/menu", {
          params: {
            site_id: env.SITE_ID,
            mod_id: "new-games",
            size: 14
          }
        }),
        $axios.$get("/api/game/menu", {
          params: {
            site_id: env.SITE_ID,
            mod_id: "hot-games",
            size: 36
          }
        }),
        $axios.$get("/api/game/get_all_category", {
          params: {
            site_id: env.SITE_ID
          }
        })
      ]);

      // 返回多个接口的数据
      return {
        recGames: recGamesResponse.list,
        bestGames: bestGamesResponse.list,
        newGames: newGamesResponse.list,
        hotGames: hotGamesResponse.list,
        navCategories: allCategoriesResponse.list.slice(0, 8)
      };
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
};
</script>
<style lang="scss" scoped></style>
