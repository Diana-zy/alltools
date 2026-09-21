<template>
  <div class="page">
    <div class="fix-bg"></div>
    <Header current-path="home" />
    <main class="main">
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
            <div v-show="recIndex === index">
              <CustomLink :to="heroLink(item)" class="img-box">
                <NuxtImg
                  format="auto"
                  fit="cover"
                  width="592"
                  height="400"
                  :src="item.pc_img || item.icon"
                  :alt="item.name"
                  :preloader="index === 0"
                  class="img m-hidden"
                />
                <NuxtImg
                  format="auto"
                  fit="cover"
                  width="332"
                  height="416"
                  :src="item.mobile_img || item.icon"
                  :alt="item.name"
                  :preloader="index === 0"
                  class="img pc-hidden"
                />
              </CustomLink>
              <CustomLink :to="heroLink(item)" class="info">
                <p class="name">{{ item.name }}</p>
                <div class="rating">
                  <div class="rating-star">
                    <p :style="{ width: (((item.score || 4.6) / 5) * 100).toFixed(0) + '%' }"></p>
                  </div>
                  {{ item.score && item.score.length == 1 ? item.score + ".0" : item.score || 4.6 }}
                </div>
              </CustomLink>
              <CustomLink :to="heroLink(item)" class="item-icon">
                <NuxtImg
                  format="auto"
                  fit="cover"
                  width="120"
                  height="120"
                  :src="item.icon"
                  :alt="item.name"
                  :preloader="index === 0"
                  class="icon"
                />
              </CustomLink>
            </div>
          </transition>

          <div v-for="(item, index) in heroShown" :key="index" :item="item" :index="index">
            <CustomLink v-show="recIndex === index" :to="heroLink(item)" class="download-box">
              <div class="download"><i class="icon-pc-pwa" /></div>
            </CustomLink>
          </div>

          <CustomLink to="/apps/" class="module-name"> Explore ></CustomLink>
          <div class="corner"></div>
        </div>
      </section>

      <article class="article">
        <CustomLink to="/bestools/" class="title-h2"
          >Top Apps<div class="title-see-more"><span>View All</span><i class="icon-arrow" /></div
        ></CustomLink>
        <section class="best-tools">
          <div class="box-row-scroll box-scroll-hidden">
            <ContentItemRow
              v-for="(item, index) in bestApps.slice(0, 12)"
              :key="index"
              :item="item"
              :index="index"
              :eager="2"
              :to="`/app/${item.path}/`"
            />
          </div>
          <div class="box-list-section">
            <ContentItemList
              v-for="(item, index) in bestApps.slice(0, 12)"
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

        <CustomLink to="/best/" class="title-h2"
          >Top Games<div class="title-see-more"><span>View All</span><i class="icon-arrow" /></div
        ></CustomLink>
        <section class="top-games">
          <div class="box-row-scroll box-scroll-hidden">
            <ContentItemRow
              v-for="(item, index) in bestGames.slice(0, 12)"
              :key="index"
              :item="item"
              :index="index"
              :to="`/game/${item.path}/`"
            />
          </div>
          <div class="box-list-section">
            <ContentItemList
              v-for="(item, index) in bestGames.slice(0, 12)"
              :key="index"
              :index="index"
              :item="item"
              :to="`/${'game'}/${item.path}/`"
            />
          </div>
        </section>

        <CustomLink to="/apps/" class="title-h2"
          >Recommended apks you must have<div class="title-see-more"
            ><span>View All</span><i class="icon-arrow"
          /></div
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
      </article>
    </main>
    <Footer />
    <BackTop />
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
      const [bestApps, bestGames, heroConfigured, recommendedApksConfigured] = await Promise.all([
        fetchModule($axios, env.SITE_ID, "best-apps", 30),
        fetchModule($axios, env.SITE_ID, "best-games", 30),
        // 以下两个模块由 BI 后台「站点管理/模块游戏推荐」运营配置（不分应用/游戏类型），
        // 未配置时为空数组，走 fallback
        fetchModule($axios, env.SITE_ID, "home-hero", 5),
        fetchModule($axios, env.SITE_ID, "home-recommended-apks", 10)
      ]);

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
      ).slice(0, 10);
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
}
.fix-bg {
  width: 100%;
  height: 400px;
  position: absolute;
  top: 64px;
  left: 0;
  background: $color3;
}
.main {
  max-width: 1440px;
  margin: 0 auto;
}

.ad-top {
  max-width: 1200px;
  margin: 16px auto 0;
}

.article {
  max-width: 1200px;
  margin: 0 auto;
}

.rec {
  position: relative;
  width: 100%;
  height: 400px;

  .rec-content {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: $color3;
  }

  .item {
    display: inline-block;
    width: 100%;
    height: 100%;
  }

  .img-box {
    position: absolute;
    width: 592px;
    height: 400px;
    bottom: 0;
    left: 120px;
    z-index: 2;
  }

  .img {
    width: 100%;
    height: 100%;
  }

  .corner {
    width: 182px;
    height: 66px;
    position: absolute;
    bottom: -65px;
    right: 50%;
    transform: translateX(50%);
    @include bg("~/assets/images/icon-corner.png");
    z-index: 1;
  }

  .download-box {
    width: 106px;
    height: 106px;
    background: rgba(242, 242, 242, 0.4);
    box-shadow: inset -4px -4px 5px 0px rgba(255, 255, 255, 0.97),
      inset 4px 4px 5px 0px rgba(183, 102, 118, 0.32), -4px -4px 4px 0px rgba(255, 255, 255, 0.4),
      4px 4px 4px 0px rgba(183, 102, 118, 0.25);
    border-radius: 50%;
    border: 2px solid #f2f2f2;
    @include center;
    position: absolute;
    bottom: -53px;
    right: 49.9%;
    transform: translateX(50%);
    z-index: 3;
  }

  .download {
    width: 82px;
    height: 82px;
    background: #fff9e3;
    box-shadow: -4px -4px 5px 0px rgba(255, 255, 255, 0.4),
      4px 4px 5px 0px rgba(183, 102, 118, 0.25);
    border-radius: 50%;
    @include center;
    .icon-pc-pwa {
      @include icon(40px, 40px, "icon-pc-download.png");
    }
  }

  .module-name {
    width: 340px;
    height: 64px;
    font-family: sebi;
    font-size: 48px;
    color: #fd6b21;
    line-height: 56px;
    position: absolute;
    top: 64px;
    right: 360px;
  }

  .item-icon {
    width: 120px;
    height: 120px;
    border-radius: 20px;
    position: absolute;
    bottom: 120px;
    right: 580px;
    border: 4px solid #ffffff;
    .icon {
      width: 100%;
      height: 100%;
      border-radius: 20px;
    }
  }

  .info {
    width: 378px;
    height: 84px;
    position: absolute;
    bottom: 138px;
    right: 190px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 2;
  }

  .name {
    width: 100%;
    font-family: seb;
    font-size: 32px;
    color: #fd6b21;
    line-height: 44px;
    text-align: left;
    @include ellipsis;
  }

  .rating {
    margin: 10px 0 0;
    color: #fd6b21;
    font-size: 18px;
    line-height: 21px;
    display: flex;
    align-items: center;
  }

  .rating-star {
    margin-right: 4px;
    width: 120px;
    height: 24px;
    @include bg("icon-star-rec1.png");
    background-size: 24px 24px;
    p {
      height: 24px;
      @include bg("icon-star-rec.png");
      background-size: 24px 24px;
    }
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
}

.pc-hidden {
  display: none;
}

.m-hidden {
  display: block;
}

.ad-1,
.ad-2 {
  margin-top: 32px;
}

@media screen and (min-width: 1200px) and (max-width: 1450px) {
  .main {
    max-width: 1210px;
  }
  .rec {
    .img-box {
      left: 10px;
    }
    .module-name {
      right: 240px;
    }
    .item-icon {
      right: 460px;
    }
    .info {
      right: 64px;
    }
  }
}
@media screen and (min-width: 879px) and (max-width: 1240px) {
  .fix-bg {
    height: vw2(400);
  }
  .rec {
    height: vw2(400);

    .img-box {
      width: vw2(592);
      height: vw2(400);
      left: vw2(10);
    }
    .corner {
      width: vw2(182);
      height: vw2(66);
      bottom: vw2(-65);
    }
    .download-box {
      width: vw2(106);
      height: vw2(106);
      box-shadow: inset vw2(-4) vw2(-4) vw2(5) 0px rgba(255, 255, 255, 0.97),
        inset vw2(4) vw2(4) vw2(5) 0px rgba(183, 102, 118, 0.32),
        vw2(-4) vw2(-4) vw2(4) 0px rgba(255, 255, 255, 0.4),
        vw2(4) vw2(4) vw2(4) 0px rgba(183, 102, 118, 0.25);
      border: vw2(2) solid #f2f2f2;
      bottom: vw2(-53);
    }
    .download {
      width: vw2(82);
      height: vw2(82);
      background: #fff9e3;
      box-shadow: vw2(-4) vw2(-4) vw2(5) 0px rgba(255, 255, 255, 0.4),
        vw2(4) vw2(4) vw2(5) 0px rgba(183, 102, 118, 0.25);
      .icon-pc-pwa {
        width: vw2(40);
        height: vw2(40);
      }
    }
    .module-name {
      width: vw2(340);
      height: vw2(64);
      font-size: vw2(48);
      line-height: vw2(56);
      top: vw2(64);
      right: vw2(240);
    }
    .item-icon {
      width: vw2(120);
      height: vw2(120);
      border-radius: vw2(20);
      bottom: vw2(120);
      right: vw2(460);
      border: vw2(4) solid #ffffff;
      .icon {
        border-radius: vw2(40);
      }
    }
    .info {
      width: vw2(378);
      height: vw2(84);
      bottom: vw2(138);
      right: vw2(64);
    }
    .name {
      font-size: vw2(32);
      line-height: vw2(44);
    }
    .rating {
      margin: vw2(10) 0 0;
      font-size: vw2(18);
      line-height: vw2(21);
    }
    .rating-star {
      margin-right: vw2(4);
      width: vw2(120);
      height: vw2(24);
      background-size: vw2(24) vw2(24);
      p {
        height: vw2(24);
        background-size: vw2(24) vw2(24);
      }
    }
  }
}
@media screen and (max-width: 879px) {
  .page {
    background: $color1;
  }
  .fix-bg {
    display: none;
  }
  .main {
    padding: 0;
  }

  .rec {
    height: vw(416);

    .img-box {
      width: vw(332);
      height: 100%;
      bottom: 0;
      left: 0;
    }

    .corner {
      width: vw(246);
      height: vw(72);
      bottom: vw(-72);
      right: 50%;
      transform: translateX(50%);
      @include bg("~/assets/images/icon-corner-m.png");
    }
    .download-box {
      width: vw(126);
      height: vw(126);
      background: #ffd89d;
      box-shadow: 3px 3px 6px 0px rgba(104, 28, 28, 0.35),
        -3px -3px 6px 0px rgba(255, 255, 255, 0.4), inset 3px 3px 6px 0px rgba(104, 28, 28, 0.35),
        inset -3px -3px 6px 0px rgba(255, 255, 255, 0.45);
      border-radius: 50%;
      border: 2px solid #fff9e3;
      @include center;
      bottom: vw(-63);
      right: 50%;
      transform: translateX(50%);
    }
    .download {
      width: vw(98);
      height: vw(98);
      background: #fff9e3;
      box-shadow: 3px 3px 6px 0px rgba(104, 28, 28, 0.35),
        -3px -3px 6px 0px rgba(255, 255, 255, 0.4);
      border-radius: 50%;
      @include center;
      .icon-pc-pwa {
        @include icon(vw(48), vw(48), "icon-m-download.png");
      }
    }
    .module-name {
      width: vw(300);
      height: vw(58);
      font-size: vw(44);
      line-height: vw(52);
      top: vw(32);
      right: vw(74);
    }

    .item-icon {
      width: vw(96);
      height: vw(96);
      border-radius: vw(20);
      top: vw(114);
      right: vw(280);
      border: vw(2) solid #ffffff;
      .icon {
        border-radius: vw(20);
      }
    }
    .info {
      width: vw(340);
      height: vw(88);
      bottom: vw(106);
      right: vw(36);
    }

    .name {
      font-size: vw(36);
      line-height: vw(46);
    }
    .rating {
      margin: 0;
      font-size: vw(24);
      line-height: vw(30);
    }
    .rating-star {
      margin-right: vw(2);
      width: vw(160);
      height: vw(32);
      @include bg("icon-star-rec1.png");
      background-size: vw(32) vw(32);
      p {
        height: vw(32);
        @include bg("icon-star-rec.png");
        background-size: vw(32) vw(32);
      }
    }
  }

  .box-row-scroll {
    display: none;
  }

  .box-common {
    margin: 0;
    padding: 0 vw(46);
  }

  .box-list-section {
    display: grid;
  }

  .title-h2 {
    position: relative;
    height: vw(72);
    z-index: 2;
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
  .ad-2 {
    margin-top: vw(48);
  }
}
</style>
