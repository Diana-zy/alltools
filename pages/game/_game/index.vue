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
      <section class="swiper-bg">
        <div v-swiper:mySwiper="swiperOption" class="swiper-box">
          <div class="swiper-wrapper">
            <div v-for="(banner, i) in currentGame.banner_list" :key="i" class="swiper-slide">
              <NuxtImg
                format="auto"
                fit="cover"
                width="624"
                height="350"
                :src="banner"
                :alt="currentGame.name"
                loading="lazy"
              />
            </div>
          </div>
          <div class="swiper-pagination"></div>
        </div>
      </section>

      <!-- 游戏详情 -->
      <section class="game-detail">
        <div class="info">
          <span class="name">{{ currentGame.name }}</span>
          <div
            class="get-it-now"
            @click="
              $refs.targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              })
            "
          >
            <i class="icon-get-it-now"></i>Get it Now
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
      <GoogleAd ad-slot="4887713525" />

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
        <GoogleAd ad-slot="9948468514" />
      </div>

      <!-- Get The Game 模块 -->
      <section class="get-the-game">
        <div class="g-title">Get The Game</div>
        <div class="g-info">
          <p>
            <b>OS:</b><i v-if="currentGame.android" class="icon-android"></i
            ><i v-if="currentGame.ios" class="icon-ios"></i>
          </p>
          <p><b>Version:</b>{{ currentGame.version }}</p>
          <p><b>Size:</b>{{ currentGame.apk_size }}</p>
          <p><b>Updated:</b>{{ currentGame.updated_time }}</p>
        </div>
        <CustomLink class="download" :to="`/download/${currentGame.path}/`"
          ><i class="icon-download"></i>Download</CustomLink
        >
        <div class="tip">
          * For reference, The {{ currentGame.name }} game websites are all approved, there are no
          viruses and malware.
        </div>
      </section>

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
        <GoogleAd ad-slot="8635386842" />

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
import { directive } from "vue-awesome-swiper";

export default {
  directives: {
    swiper: directive
  },
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
      swiperOption: {
        slidesPerView: "auto",
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
      },
      collapsed: true
    };
  },
  head() {
    return {
      title: `Alltools1 － dedicated to the dreams and wonders of the young crowd, play with your own colors in the ${
        this.currentGame.name || "game"
      }!` // 使用 asyncData 中获取的数据设置页面标题
    };
  }
};
</script>
<style lang="scss" scoped>
@import "swiper/css/swiper.min.css";
@import "@/assets/css/game.scss";

main {
  padding-right: 440px;
}
.swiper-bg {
  width: 100%;
  height: 345px;
  background: #f5f6f7;
  border-radius: 18px;
  padding: 20px 18px 55px;
  overflow: hidden;
}
.swiper-box {
  position: relative;
  height: 325px;
}
.swiper-slide {
  width: 480px;
  height: 270px;
  margin-right: 20px;
  img {
    width: 480px;
    height: 270px;
    border-radius: 18px;
  }
}
.swiper-pagination {
  width: 100%;
  bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.game-detail {
  border-radius: 18px;
  background: #f5f6f7;
  padding: 20px;
  margin-top: 24px;
  margin-bottom: 24px;
  .info {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .name {
    color: #171e27;
    font-family: "Poppins-SemiBold";
    font-size: 20px;
    line-height: 34px;
    @include ellipsis;
  }
}
.get-it-now {
  width: 168px;
  min-width: 168px;
  height: 42px;
  background: #ffffff;
  border-radius: 21px;
  font-family: "Poppins-SemiBold";
  border: 3px solid #780dff;
  font-size: 18px;
  color: #780dff;
  @include center;
  padding-top: 0.1em;
  cursor: pointer;
  transition: 0.1s;
  &:hover {
    background: #780dff;
    color: #ffffff;
    .icon-get-it-now {
      @include bg("icon_get_it_now2.png");
    }
  }
}
.icon-get-it-now {
  @include icon(16px, 18px, "icon_get_it_now.png");
  margin-right: 12px;
  margin-top: -3px;
  animation: bounce 2s infinite;
}
@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-5px);
  }
  60% {
    transform: translateY(-2px);
  }
}
.get-the-game {
  background: #f5f6f7;
  border-radius: 18px;
  padding: 36px;
  color: #898e97;
  font-size: 18px;
  line-height: 20px;
  .g-title {
    color: #171e27;
    font-size: 26px;
    font-weight: bold;
    line-height: 28px;
    margin-bottom: 20px;
  }
  .g-info {
    display: flex;
    flex-wrap: wrap;
    font-size: 22px;
    line-height: 28px;
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
  .download {
    display: flex;
    width: 270px;
    height: 80px;
    @include bg("btn_download.png");
    margin: 36px auto;
    font-weight: 600;
    font-size: 23px;
    color: #ffffff;
    @include center;
  }
}
.icon-download {
  @include icon(20px, 14px, "icon_download.png");
  margin-right: 8px;
}
.icon-android {
  @include icon(24px, 28px, "icon_android.png");
  margin-right: 18px;
}
.icon-ios {
  @include icon(24px, 28px, "icon_ios.png");
}
@media screen and (max-width: 879px) {
  main {
    padding-right: 0;
    padding-top: vw(146);
  }
  .swiper-bg {
    width: vw(658);
    height: vw(317);
    background: #f5f6f7;
    border-radius: vw(32);
    padding: 0;
    margin: 0 auto;
  }
  .swiper-box {
    height: vw(317);
  }
  .swiper-slide {
    width: vw(658);
    height: vw(317);
    margin-right: 0;
    img {
      width: vw(658);
      height: vw(317);
      border-radius: vw(32);
    }
  }
  .swiper-pagination {
    bottom: vw(20);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .game-detail {
    border-radius: vw(32);
    padding: vw(30);
    margin: vw(48) vw(46) vw(16);
    .name {
      color: #171e27;
      font-family: "Poppins-SemiBold";
      font-size: vw(38);
      line-height: vw(58);
    }
  }

  .get-it-now {
    width: vw(227);
    min-width: vw(227);
    height: vw(58);
    border-radius: vw(28);
    border: vw(4) solid #780dff;
    font-size: vw(26);
  }
  .icon-get-it-now {
    @include icon(vw(20), vw(24), "icon_get_it_now.png");
    margin-right: vw(14);
    margin-top: vw(-6);
  }
  .get-the-game {
    background: rgba(120, 13, 255, 0.1);
    border-radius: vw(32);
    padding: vw(46);
    font-size: vw(24);
    line-height: vw(36);
    margin: 0 vw(46);
    .g-title {
      font-size: vw(38);
      line-height: vw(38);
      margin-bottom: vw(32);
    }
    .g-info {
      flex-direction: column;
      font-size: vw(28);
      line-height: vw(36);
      p {
        white-space: wrap;
        align-items: center;
        margin-right: 0;
        margin-bottom: vw(24);
        b {
          margin-right: 10px;
          color: #000000;
        }
      }
    }
    .download {
      display: flex;
      width: vw(565);
      height: vw(92);
      @include bg("btn_submit2.png");
      margin: vw(8) auto vw(30);
      font-weight: 600;
      font-size: 23px;
      color: #ffffff;
      @include center;
    }
  }
  .icon-download {
    display: none;
  }
  .icon-android {
    @include icon(vw(32), vw(36), "icon_android.png");
    margin-right: vw(18);
  }
  .icon-ios {
    @include icon(vw(32), vw(36), "icon_ios.png");
  }
}
@media screen and (min-width: 879px) and (max-width: 1174px) {
  main {
    padding-right: 50px;
  }
  .aside {
    display: none;
  }
}
</style>

<style lang="scss">
.swiper-pagination-bullet {
  width: 12px;
  height: 12px;
  background: #b0b2b5;
  border-radius: 50%;
  margin: 0 10px !important;
}
.swiper-pagination-bullet-active {
  width: 16px;
  height: 16px;
  background: linear-gradient(0deg, #d762ff, #790eff);
}
</style>
