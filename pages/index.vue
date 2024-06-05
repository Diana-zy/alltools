<template>
  <div class="page">
    <Header />
    <main class="main">
      <nav class="nav">
        <CustomLink to="/app/" class="nav-item nav-app">
          <h3 class="title">Popular Apps</h3>
          <div class="btn">Download Now</div>
        </CustomLink>
        <CustomLink to="/game/" class="nav-item nav-game">
          <h3 class="title">Popular Games</h3>
          <div class="btn">Download Now</div>
        </CustomLink>
      </nav>
      <h2 class="title-h2">Best Apps</h2>
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
            width="100"
            height="100"
            :src="item.icon"
            :alt="item.name"
            class="icon"
            :loading="i < 5 ? 'eager' : 'lazy'"
          />
          <div class="info">
            <p class="name">{{ item.name }}</p>
            <p class="category">{{ item.category_name }}</p>
            <p class="rating">{{ item.rating || 4.6 }}<i class="icon-rating"></i></p>
          </div>
          <p class="arrow"></p>
        </CustomLink>
      </section>
      <h2 class="title-h2">Best Games</h2>
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
            width="100"
            height="100"
            :src="item.icon"
            :alt="item.name"
            class="icon"
            loading="lazy"
          />
          <div class="info">
            <p class="name">{{ item.name }}</p>
            <p class="category">{{ item.category_name }}</p>
            <p class="rating">{{ item.rating || 4.6 }}<i class="icon-rating"></i></p>
          </div>
          <p class="arrow"></p>
        </CustomLink>
      </section>
      <h2 class="title-h2">Hot Apps</h2>
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
            width="100"
            height="100"
            :src="item.icon"
            :alt="item.name"
            class="icon"
            loading="lazy"
          />
          <div class="info">
            <p class="name">{{ item.name }}</p>
            <p class="category">{{ item.category_name }}</p>
            <p class="rating">{{ item.rating || 4.6 }}<i class="icon-rating"></i></p>
          </div>
          <p class="arrow"></p>
        </CustomLink>
      </section>
      <h2 class="title-h2">Hot Games</h2>
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
            width="100"
            height="100"
            :src="item.icon"
            :alt="item.name"
            class="icon"
            loading="lazy"
          />
          <div class="info">
            <p class="name">{{ item.name }}</p>
            <p class="category">{{ item.category_name }}</p>
            <p class="rating">{{ item.rating || 4.6 }}<i class="icon-rating"></i></p>
          </div>
          <p class="arrow"></p>
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
<style lang="scss" scoped>
.main {
  max-width: 1200px;
  margin: 0 auto;
}
.nav {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  .nav-item {
    width: 592px;
    height: 187px;
    border-radius: 16px;
    color: #fff;
    padding-left: 34px;
  }
  .nav-app {
    @include bg("app.webp");
    .btn {
      color: #008055;
    }
  }
  .nav-game {
    @include bg("game.webp");
    .btn {
      color: #5e0c98;
    }
  }
  .title {
    font-size: 28px;
    font-family: "seb";
    margin-top: 46px;
    margin-bottom: 18px;
  }
  .btn {
    width: 147px;
    height: 40px;
    background: #ffffff;
    border-radius: 8px;
    font-family: "sesb";
    @include center;
  }
}
</style>
