<template>
  <div class="page">
    <div class="fix-bg"></div>
    <Header current-path="home" />
    <main class="main">
      <div class="wrapper">
        <adm-slot
          adm-id="home-1"
          adm-unit="/23197833490/alltools1/alltools1_home_1"
          ads-slot="6667048681"
          class="ad-1 ad-top"
        />

        <section class="rec">
          <div class="rec-content">
            <transition
              v-for="(item, index) in heroShown"
              :key="index"
              :item="item"
              :index="index"
              name="fade"
            >
              <CustomLink v-show="recIndex === index" :to="heroLink(item)" class="hero-card">
                <NuxtImg
                  format="auto"
                  fit="cover"
                  width="1200"
                  height="400"
                  :src="item.pc_img || item.icon"
                  :alt="item.name"
                  :preloader="index === 0"
                  class="hero-img m-hidden"
                />
                <NuxtImg
                  format="auto"
                  fit="cover"
                  width="686"
                  height="416"
                  :src="item.mobile_img || item.icon"
                  :alt="item.name"
                  :preloader="index === 0"
                  class="hero-img pc-hidden"
                />
                <div class="hero-overlay"></div>
                <p class="hero-name">{{ item.name }}</p>
              </CustomLink>
            </transition>
          </div>
        </section>

        <article class="article">
          <CustomLink to="/rankings/?tab=apps" class="title-h2 title-h2-first"
            ><span class="title-text">Top Picks in Last 24 Hours</span
            ><div class="title-see-more"><span>View All</span><i class="icon-arrow" /></div
          ></CustomLink>
          <section class="recommended-apks">
            <ContentItemRank
              v-for="(item, index) in recommendedApksShown"
              :key="index"
              :item="item"
              :index="index"
              :to="`/${item.type === 1 ? 'game' : 'app'}/${item.path}/`"
            />
          </section>

          <!-- 页内广告位：跟其他 adm-slot 一样走 BI 广告投放系统，ad-unit/ads-slot 需要在 Google Ad
          Manager/AdSense 后台新建一个真实广告位后再替换成正式 ID，现在这个是占位值。 -->
          <adm-slot
            adm-id="home-4"
            adm-unit="/23197833490/alltools1/alltools1_home_4"
            ads-slot="0000000005"
            class="ad-4"
          />

          <CustomLink to="/rankings/?tab=apps" class="title-h2"
            ><span class="title-text">Top Apps</span
            ><div class="title-see-more"><span>View All</span><i class="icon-arrow" /></div
          ></CustomLink>
          <section class="best-tools">
            <div class="box-row-scroll box-scroll-hidden">
              <ContentItemRow
                v-for="(item, index) in bestApps.slice(0, 9)"
                :key="index"
                :item="item"
                :index="index"
                :eager="2"
                :to="`/app/${item.path}/`"
              />
            </div>
            <div class="box-list-section">
              <ContentItemList
                v-for="(item, index) in bestApps.slice(0, 9)"
                :key="index"
                :index="index"
                :item="item"
                :to="`/${'app'}/${item.path}/`"
              />
            </div>
          </section>

          <adm-slot
            adm-id="home-2"
            adm-unit="/23197833490/alltools1/alltools1_home_2"
            ads-slot="4080715115"
            class="ad-2"
          />

          <CustomLink to="/rankings/?tab=games" class="title-h2"
            ><span class="title-text">Top Games</span
            ><div class="title-see-more"><span>View All</span><i class="icon-arrow" /></div
          ></CustomLink>
          <section class="top-games">
            <div class="box-row-scroll box-scroll-hidden">
              <ContentItemRow
                v-for="(item, index) in bestGames.slice(0, 9)"
                :key="index"
                :item="item"
                :index="index"
                :to="`/game/${item.path}/`"
              />
            </div>
            <div class="box-list-section">
              <ContentItemList
                v-for="(item, index) in bestGames.slice(0, 9)"
                :key="index"
                :index="index"
                :item="item"
                :to="`/${'game'}/${item.path}/`"
              />
            </div>
          </section>
        </article>
      </div>
    </main>
    <Footer />
    <!-- <AdLoading /> -->
  </div>
</template>

<script>
// 站点管理 / 模块游戏推荐（site_module 表）里还没配置这个 mod_id 时，/api/game/menu 会报错，
// 这里统一兜底成空列表，不让首页因为运营还没配好某个模块就直接挂掉。
async function fetchModule($axios, siteId, modId, size) {
  try {
    const res = await $axios.$get("/api/game/menu", {
      params: { site_id: siteId, mod_id: modId, size }
    });
    return res.list || [];
  } catch (error) {
    console.error(
      `[home] fetchModule 失败 mod_id=${modId} site_id=${siteId}:`,
      error && error.message,
      error && error.response && error.response.status,
      error && error.response && error.response.data
    );
    return [];
  }
}

export default {
  async asyncData({ $axios, env }) {
    try {
      // 依次请求而不是 Promise.all 并发——后端在多个并发请求下会 502（实测单条请求正常，
      // 4 条并发就炸），排队请求虽然多花几百毫秒，但不会把首页拖挂。
      const bestApps = await fetchModule($axios, env.SITE_ID, "best-apps", 30);
      const bestGames = await fetchModule($axios, env.SITE_ID, "best-games", 30);
      // 以下两个模块由 BI 后台「站点管理/模块游戏推荐」运营配置（不分应用/游戏类型），
      // 未配置时为空数组，走 fallback
      const heroConfigured = await fetchModule($axios, env.SITE_ID, "home-hero", 5);
      const recommendedApksConfigured = await fetchModule(
        $axios,
        env.SITE_ID,
        "home-recommended-apks",
        10
      );

      return {
        bestApps,
        bestGames,
        heroConfigured,
        recommendedApksConfigured
      };
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
  data() {
    return {
      recIndex: 0,
      bestApps: [],
      bestGames: [],
      heroConfigured: [],
      recommendedApksConfigured: []
    };
  },
  computed: {
    // 轮播/推荐位：BI 后台「站点管理/模块游戏推荐」配置了 mod_id 就用配置的，没配就 fallback 到 ranking 数据
    heroShown() {
      if (this.heroConfigured.length) return this.heroConfigured.slice(0, 5);
      return [...this.bestGames.slice(0, 3), ...this.bestApps.slice(0, 2)].slice(0, 5);
    },
    recommendedApksShown() {
      return (
        this.recommendedApksConfigured.length ? this.recommendedApksConfigured : this.bestApps
      ).slice(0, 9);
    }
  },
  mounted() {
    this.nextSlide();
  },
  methods: {
    heroLink(item) {
      return `/${item.type === 1 ? "game" : "app"}/${item.path}/`;
    },
    nextSlide() {
      this.currentChangeTimer = setInterval(() => {
        this.recIndex = (this.recIndex + 1) % Math.max(this.heroShown.length, 1);
      }, 4000);
    }
  }
};
</script>
<style lang="scss" scoped>
.page {
  position: relative;
  overflow-x: hidden;
}
.fix-bg {
  width: 100%;
  height: 400px;
  position: absolute;
  top: 64px;
  left: 0;
  background: #ffffff;
}
.main {
  max-width: 1440px;
  margin: 0 auto;
}

.wrapper {
  max-width: 1230px;
  margin: 0 auto;
  padding: 0 15px;
  box-sizing: border-box;
}

.ad-top {
  margin-top: 16px;
}

.article {
  width: 100%;
}

.title-h2-first {
  margin-top: 24px;
}

.rec {
  position: relative;
  width: 100%;

  .rec-content {
    position: relative;
    width: 100%;
    height: 400px;
    border-radius: 24px;
    overflow: hidden;
    background-color: #ffffff;
  }

  .hero-card {
    position: absolute;
    inset: 0;
    display: block;
  }

  .hero-img {
    width: 100%;
    height: 100%;
  }

  .hero-overlay {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 40%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0));
  }

  .hero-name {
    position: absolute;
    left: 32px;
    bottom: 24px;
    right: 32px;
    font-family: seb;
    font-size: 28px;
    color: #ffffff;
    text-align: left;
    @include ellipsis;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 1s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
  .fade-enter-to,
  .fade-leave {
    opacity: 1;
  }
}
.box-row-scroll {
  padding: 4px 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.box-list-section {
  display: none;
}

.box-scroll-hidden {
  display: grid;
}

.recommended-apks {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.pc-hidden {
  display: none;
}

.m-hidden {
  display: block;
}

.ad-1,
.ad-2,
.ad-4 {
  margin-top: 32px;
}

@media screen and (min-width: 879px) and (max-width: 1240px) {
  .fix-bg {
    height: vw2(400);
  }
  .rec {
    .rec-content {
      height: vw2(400);
      border-radius: vw2(24);
    }
    .hero-name {
      left: vw2(32);
      bottom: vw2(24);
      right: vw2(32);
      font-size: vw2(28);
    }
  }
}
@media screen and (max-width: 879px) {
  .page {
    background: #ffffff;
  }
  .fix-bg {
    display: none;
  }
  .main {
    padding: 0;
  }

  .rec {
    .rec-content {
      height: vw(416);
      border-radius: vw(32);
    }
    .hero-name {
      left: vw(32);
      bottom: vw(24);
      right: vw(32);
      font-size: vw(32);
    }
  }

  .box-row-scroll {
    display: none;
  }

  .box-common {
    margin: 0;
    padding: 0;
  }

  .box-list-section {
    display: grid;
    margin: 0;
    grid-template-columns: repeat(3, 1fr);
  }

  .recommended-apks {
    width: 100%;
    max-width: 100vw;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    display: grid;
    grid-auto-flow: column;
    grid-template-rows: repeat(3, auto);
    grid-auto-columns: 88%;
    column-gap: vw(24);
    row-gap: vw(24);
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  .title-h2 {
    position: relative;
    height: vw(72);
    z-index: 2;
    margin: 10px 0 5px;
  }

  .title-h2-first {
    margin-top: 24px;
  }

  .box-scroll-hidden {
    display: none;
  }

  .pc-hidden {
    display: block;
  }

  .m-hidden {
    display: none;
  }
  .ad-1,
  .ad-2,
  .ad-4 {
    margin-top: vw(48);
  }
}
</style>
