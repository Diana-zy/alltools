<template>
  <div class="page">
    <Header />
    <main class="main">
      <nav class="nav">
        <CustomLink to="/apps/" class="nav-item nav-app">
          <h3 class="title">Popular Apps</h3>
          <div class="btn">Download Now</div>
          <img src="/images/app.webp" alt="Popular Apps" />
        </CustomLink>
        <CustomLink to="/games/" class="nav-item nav-game">
          <h3 class="title">Popular Games</h3>
          <div class="btn">Download Now</div>
          <img src="/images/game.webp" alt="Popular Games" />
        </CustomLink>
      </nav>
      <h2 class="title-h2">Best Apps</h2>
      <section class="box-row-scroll">
        <ContentItemRow
          v-for="(item, index) in bestApps"
          :key="index"
          :item="item"
          :index="index"
          :eager="2"
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
          :eager="2"
          :to="`/game/${item.path}/`"
        />
      </section>
      <h2 class="title-h2">Hot Apps</h2>
      <section class="box-row-scroll">
        <ContentItemRow
          v-for="(item, index) in hotApps"
          :key="index"
          :item="item"
          :index="index"
          :to="`/app/${item.path}/`"
        />
      </section>
      <h2 class="title-h2">Hot Games</h2>
      <section class="box-row-scroll">
        <ContentItemRow
          v-for="(item, index) in hotGames"
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
@media screen and (max-width: 879px) {
  .page .mask-loading {
    height: 100% !important;
  }
}
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
    background-position: right;
  }
  .nav-app {
    margin-right: 16px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      border-radius: 24px;
    }
    .btn {
      color: #008055;
    }
  }
  .nav-game {
    position: relative;
    img {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      border-radius: 24px;
    }
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
  gap: 16px;
}
@media screen and (max-width: 750px) {
  .nav {
    padding: 0 vw(46);
    margin-top: vw(48);
    @include scroll;
    .nav-item {
      width: vw(658);
      height: vw(208);
      border-radius: vw(16);
      padding-left: vw(32);
      flex-shrink: 0;
      img {
        border-radius: vw(16);
      }
    }
    .nav-app {
      margin-right: vw(16);
    }
    .title {
      font-size: vw(36);
      margin-top: vw(54);
      margin-bottom: vw(22);
    }
    .btn {
      width: vw(202);
      height: vw(40);
      border-radius: vw(8);
      font-size: vw(24);
    }
  }
  .box-row-scroll {
    padding: 0 vw(46);
    grid-template-columns: repeat(4, vw(374));
    gap: vw(32);
    @include scroll;
  }
}
</style>
