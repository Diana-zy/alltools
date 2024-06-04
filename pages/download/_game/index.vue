<template>
  <div class="page">
    <Header />
    <Navigation current-path="game" :nav-categories="navCategories" />
    <main>
      <!-- 面包屑导航 -->
      <nav class="breadcrumb">
        <i class="icon-breadcrumb"></i>
        <CustomLink to="/">Home</CustomLink>
        <span>></span>
        <CustomLink :to="`/category/${currentGame.category_path}/`">{{
          currentGame.category_name
        }}</CustomLink>
        <span>></span>
        <CustomLink to="/" class="active">{{ currentGame.name }}</CustomLink>
      </nav>

      <!-- 下载信息 -->
      <section class="download-info">
        <div class="base-info">
          <NuxtImg
            format="auto"
            fit="cover"
            width="210"
            height="210"
            class="icon"
            :src="currentGame.icon"
            :alt="currentGame.name"
          />
          <div class="base-info-content">
            <div class="name">
              {{ currentGame.name }}
            </div>
            <div class="version">
              <p><b>Version:</b> {{ currentGame.version }}</p>
              <p><b>Size:</b> {{ currentGame.apk_size }}</p>
              <p><b>Updated:</b> {{ currentGame.updated_time }}</p>
            </div>
            <div class="platform">
              <div v-if="currentGame.android" class="android">
                <i class="icon-android"></i>Android
                <div class="qrcode">
                  Android
                  <img :src="qrCodeGoogle" alt="qrcode" />
                </div>
                <a :href="currentGame.android_web_url"></a>
              </div>

              <div v-if="currentGame.ios" class="ios">
                <i class="icon-ios"></i>iOS
                <div class="qrcode">
                  iOS
                  <img :src="qrCodeIos" alt="qrcode" />
                </div>
                <a :href="currentGame.ios_web_url"></a>
              </div>
            </div>
          </div>
        </div>

        <p class="show-more-desc" :class="{ big: !collapsed }">
          {{ currentGame.desc }}
        </p>
        <div class="show-more" @click="collapsed = !collapsed">
          SHOW {{ collapsed ? "MORE" : "LESS"
          }}<i class="icon-show-more" :class="{ less: !collapsed }"></i>
        </div>
      </section>

      <!-- game-1: Google Ad 占位-->
      <GoogleAd ad-slot="4960785586" />

      <h2 class="title-h2"><i class="icon-related"></i>RELATED GAMES</h2>

      <!-- Related Games 模块 -->
      <section class="box-related-game">
        <CustomLink
          v-for="(item, i) in relatedGames"
          :key="i"
          :to="`/game/${item.path}/`"
          class="item"
        >
          <NuxtImg
            format="auto"
            fit="cover"
            width="166"
            height="166"
            :src="item.icon"
            :alt="item.name"
            loading="lazy"
            class="img"
          />
          <p class="name">{{ item.name }}</p>
          <p class="date">{{ item.pub_time }}</p>
        </CustomLink>
      </section>

      <!-- game-2: Google Ad 占位-->
      <div ref="targetElement">
        <GoogleAd ad-slot="5542405363" />
      </div>

      <h2 class="title-h2"><i class="icon-related"></i>RECOMMEND GAMES</h2>

      <!-- Recommend Games 模块 -->
      <section class="box-recommend-game">
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
            class="img"
          />
          <div class="info">
            <p class="name">{{ item.name }}</p>
            <p class="date">{{ item.pub_time }}</p>
          </div>
        </CustomLink>
      </section>

      <!-- aside - Best Games -->
      <aside class="aside">
        <!-- game-r1: Google Ad 占位 -->
        <GoogleAd ad-slot="2334622241" />

        <div class="a-title">BEST GAMES</div>

        <section class="box-aside">
          <CustomLink
            v-for="(item, i) in bestGames"
            :key="i"
            :to="`/game/${item.path}/`"
            class="item"
          >
            <NuxtImg
              format="auto"
              fit="cover"
              width="94"
              height="124"
              :src="item.icon"
              :alt="item.name"
              loading="lazy"
              class="img"
            />
            <div class="info">
              <p class="name">{{ item.name }}</p>
              <p class="category">{{ item.category_name }}</p>
              <p class="date">{{ item.pub_time }}</p>
            </div>
            <div class="download">Download</div>
          </CustomLink>
        </section>
      </aside>
    </main>
    <Footer />
    <BackTop />
    <AdLoading />
  </div>
</template>

<script>
import QRCode from "qrcode";

export default {
  async asyncData({ $axios, params, env }) {
    try {
      const path = params.game;
      const lastDashIndex = path.lastIndexOf("-");
      const id = path.substring(lastDashIndex + 1, path.length);

      const [
        currentGameResponse,
        relatedGamesResponse,
        recommendGamesResponse,
        bestGamesResponse,
        allCategoriesResponse
      ] = await Promise.all([
        $axios.$get("/api/game/detail", {
          params: {
            site_id: env.SITE_ID,
            game_id: id
          }
        }),
        $axios.$get("/api/game/get_related", {
          params: {
            site_id: env.SITE_ID,
            game_id: id,
            size: 24
          }
        }),
        $axios.$get("/api/game/rec", {
          params: {
            site_id: env.SITE_ID,
            size: 21,
            page: 1
          }
        }),
        $axios.$get("/api/game/menu", {
          params: {
            site_id: env.SITE_ID,
            mod_id: "best-games",
            size: 10,
            page: 1
          }
        }),
        $axios.$get("/api/game/get_all_category", {
          params: {
            site_id: env.SITE_ID
          }
        })
      ]);
      function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1)); // 生成一个随机索引，范围是 [0, i]
          [array[i], array[j]] = [array[j], array[i]]; // 交换当前位置和随机位置的元素
        }
        return array;
      }

      return {
        currentGame: currentGameResponse,
        relatedGames: relatedGamesResponse.list,
        recommendGames: recommendGamesResponse.list,
        bestGames: shuffleArray(bestGamesResponse.list),
        navCategories: allCategoriesResponse.list.slice(0, 8)
      };
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
  data() {
    return {
      collapsed: true,
      qrCodeGoogle: "",
      qrCodeIos: ""
    };
  },
  mounted() {
    if (this.currentGame.ios_web_url) {
      this.generateQRCode(this.currentGame.ios_web_url).then((data) => {
        this.qrCodeIos = data;
      });
    }

    if (this.currentGame.android_web_url) {
      this.generateQRCode(this.currentGame.android_web_url).then((data) => {
        this.qrCodeGoogle = data;
      });
    }
  },
  methods: {
    async generateQRCode(url) {
      try {
        const qrCodeDataURL = await QRCode.toDataURL(url);
        return qrCodeDataURL;
      } catch (error) {
        console.error("Error generating QR code:", error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/game.scss";

main {
  padding-right: 440px;
}
.download-info {
  background: #f5f6f7;
  border-radius: 18px;
  margin-bottom: 24px;
  padding: 32px;
  .icon {
    width: 160px;
    height: 160px;
    border-radius: 26px;
    float: left;
    margin-right: 34px;
  }
  .name {
    font-size: 26px;
    line-height: 32px;
    font-family: "Poppins-SemiBold";
    margin-bottom: 16px;
    padding-top: 6px;
  }
  .version {
    display: flex;
    flex-wrap: wrap;
    font-size: 16px;
    line-height: 28px;
    color: #898e97;
    font-family: "Poppins-SemiBold";
    p {
      display: flex;
      align-items: center;
      margin-right: 42px;
      margin-bottom: 8px;
      white-space: nowrap;
      b {
        margin-right: 10px;
        color: #000000;
      }
    }
  }
}
.platform {
  margin-top: 16px;
  display: flex;
  .android,
  .ios {
    position: relative;
    z-index: 2;
    width: 248px;
    height: 46px;
    border-radius: 23px;
    @include center;
    cursor: pointer;
    transition: 0.3s;
    color: #ffffff;
    padding-top: 0.2em;
    font-size: 18px;
    &:hover {
      .qrcode {
        opacity: 1;
        visibility: visible;
      }
    }
  }
  .android {
    background: #6acb33;
    margin-right: 24px;
  }
  .ios {
    background: #780dff;
  }
  .qrcode {
    position: absolute;
    width: 146px;
    height: 156px;
    background: #ffffff;
    border-radius: 16px;
    top: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-weight: 600;
    font-size: 14px;
    color: #000000;
    line-height: 18px;
    padding-top: 10px;
    opacity: 0;
    visibility: hidden;
    transition: 0.3s;
    img {
      width: 120px;
      height: 120px;
    }
  }
}
.show-more-desc {
  margin-top: 24px;
}
.icon-android {
  @include icon(22px, 24px, "icon_android2.png");
  margin-right: 10px;
  margin-top: -2px;
}
.icon-ios {
  @include icon(20px, 24px, "icon_ios2.png");
  margin-right: 10px;
  margin-top: -8px;
}
@media screen and (max-width: 879px) {
  main {
    padding-right: 0;
    padding-top: vw(146);
  }
  .download-info {
    border-radius: vw(36);
    margin: 0 vw(46) vw(16);
    padding: vw(34) vw(28) vw(24);
    .icon {
      width: vw(165);
      height: vw(165);
      border-radius: vw(32);
      float: unset;
      margin: 0 auto;
    }
    .name {
      font-size: vw(38);
      line-height: vw(46);
      margin-bottom: vw(26);
      padding-top: vw(24);
      text-align: center;
      @include ellipsis;
    }
    .version {
      display: none;
    }
  }
  .platform {
    margin-top: 0;
    justify-content: center;
    .android,
    .ios {
      width: vw(260);
      height: vw(70);
      border-radius: vw(35);
      font-size: vw(28);
      a {
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
      }
      &:hover {
        .qrcode {
          display: none;
        }
      }
    }
    .android {
      margin-right: vw(32);
    }
    .qrcode {
      position: absolute;
      width: 146px;
      height: 156px;
      background: #ffffff;
      border-radius: 16px;
      top: 60px;
      display: flex;
      flex-direction: column;
      align-items: center;
      font-weight: 600;
      font-size: 14px;
      color: #000000;
      line-height: 18px;
      padding-top: 10px;
      opacity: 0;
      visibility: hidden;
      transition: 0.3s;
      img {
        width: 120px;
        height: 120px;
      }
    }
  }
  .show-more-desc {
    margin-top: vw(24);
  }
  .icon-android {
    @include icon(vw(38), vw(40), "icon_android2.png");
    margin-right: vw(15);
    margin-top: vw(-2);
  }
  .icon-ios {
    @include icon(vw(34), vw(40), "icon_ios2.png");
    margin-right: vw(16);
    margin-top: vw(-8);
  }
}
@media screen and (min-width: 879px) and (max-width: 1174px) {
  main {
    padding-right: 50px;
  }
  .aside {
    display: none;
  }
  .platform {
    &:hover {
      .qrcode {
        display: none;
      }
    }
    a {
      display: block;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
    }
  }
}
</style>
