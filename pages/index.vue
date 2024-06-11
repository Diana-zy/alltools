<template>
  <div class="page">
    <Header />
    <main class="main">
      <nav class="nav">
        <CustomLink to="/apps/" class="nav-item nav-app">
          <h3 class="title">Popular Apps</h3>
          <div class="btn">Download Now</div>
        </CustomLink>
        <CustomLink to="/games/" class="nav-item nav-game">
          <h3 class="title">Popular Games</h3>
          <div class="btn">Download Now</div>
        </CustomLink>
      </nav>
      <h2 class="title-h2">Best Apps</h2>
      <section class="box-row-scroll">
        <ContentItemRow
          v-for="(item, index) in bestApps"
          :key="index"
          :item="item"
          :index="index"
          :eager="3"
          :to="`/app/${item.path}/`"
        />
      </section>
      <h2 class="title-h2">Best Games</h2>
      <section class="box-row-scroll">
        <ContentItemRow
          v-for="(item, index) in bestGames"
          :key="index"
          :item="item"
          :index="index"
          :to="`/game/${item.path}/`"
        />
      </section>
      <h2 class="title-h2">Hot Apps</h2>
      <section class="box-row-scroll">
        <ContentItemRow
          v-for="(item, index) in bestGames"
          :key="index"
          :item="item"
          :index="index"
          :to="`/app/${item.path}/`"
        />
      </section>
      <h2 class="title-h2">Hot Games</h2>
      <section class="box-row-scroll">
        <ContentItemRow
          v-for="(item, index) in bestGames"
          :key="index"
          :item="item"
          :index="index"
          :to="`/game/${item.path}/`"
        />
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
      const [bestAppsResponse, bestGamesResponse, hotAppsResponse, hotGamesResponse] =
        await Promise.all([
          $axios.$get("/api/game/menu", {
            params: {
              site_id: env.SITE_ID,
              mod_id: "best-apps",
              size: 12
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
              mod_id: "hot-apps",
              size: 12
            }
          }),
          $axios.$get("/api/game/menu", {
            params: {
              site_id: env.SITE_ID,
              mod_id: "hot-games",
              size: 12
            }
          })
        ]);

      // 返回多个接口的数据
      return {
        bestApps: bestAppsResponse.list,
        bestGames: bestGamesResponse.list,
        hotApps: hotAppsResponse.list,
        hotGames: hotGamesResponse.list
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

.box-row-scroll {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-bottom: -16px;
}
</style>
