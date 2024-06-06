<template>
  <div class="page">
    <Header />
    <main class="main">
      <!-- 面包屑导航 -->
      <nav class="breadcrumb">
        <i class="icon-breadcrumb"></i>
        <CustomLink to="/">Home</CustomLink>
        <span>></span>
        <CustomLink to="/" class="active">{{ currentGame.name }}</CustomLink>
      </nav>
      <section class="application-info">
        <NuxtImg
          format="auto"
          fit="cover"
          width="120"
          height="120"
          :src="currentGame.icon"
          :alt="currentGame.name"
          loading="lazy"
          class="icon"
        ></NuxtImg>
        <div class="info">
          <div class="name">{{ currentGame.name }}</div>
          <div class="category">{{ currentGame.category_name }}</div>
          <div class="rating">
            <div class="rating-star">
              <p :style="{ width: (((currentGame.rating || 4.6) / 5) * 100).toFixed(0) + '%' }"></p>
            </div>
            {{ currentGame.rating || 4.6 }}
          </div>
        </div>
        <div
          class="get-it-now"
          @click="
            $refs.targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            })
          "
        >
          <i class="icon-get-it-now"></i>Get Game</div
        >
      </section>

      <GoogleAd ad-slot="4887713525" />

      <section class="table-info">
        <div class="table-row">
          <div class="table-cell"><i class="icon-category"></i>Category</div>
          <div class="table-cell">
            <CustomLink :to="`/category/${currentGame.category_path}/`" class="link-category">{{
              currentGame.category_name
            }}</CustomLink>
          </div>
        </div>
        <div class="table-row">
          <div class="table-cell"><i class="icon-os"></i>OS</div>
          <div class="table-cell"
            ><i v-if="currentGame.android" class="icon-android"></i
            ><i v-if="currentGame.ios" class="icon-ios"></i
          ></div>
        </div>
        <div class="table-row">
          <div class="table-cell"><i class="icon-size"></i>Size</div>
          <div class="table-cell">{{ currentGame.apk_size }}</div>
        </div>
        <div class="table-row">
          <div class="table-cell"><i class="icon-version"></i>Version</div>
          <div class="table-cell">{{ currentGame.version }}</div>
        </div>
        <div class="table-row">
          <div class="table-cell"><i class="icon-updated"></i>Updated</div>
          <div class="table-cell">{{ currentGame.updated_time }}</div>
        </div>
      </section>

      <section class="application-desc">
        <div class="swiper-bg">
          <div v-swiper:mySwiper="swiperOption" class="swiper-box">
            <div class="swiper-wrapper">
              <div v-for="(banner, i) in currentGame.banner_list" :key="i" class="swiper-slide">
                <NuxtImg
                  format="auto"
                  fit="cover"
                  height="288"
                  :src="banner"
                  :alt="currentGame.name"
                  loading="lazy"
                  class="img"
                />
              </div>
            </div>
            <div class="swiper-tool">
              <div class="swiper-button-prev"></div>
              <div class="swiper-pagination"></div>
              <div class="swiper-button-next"></div>
            </div>
          </div>
        </div>
        <ExpandableText :text="currentGame.desc" />
      </section>

      <div ref="targetElement">
        <GoogleAd ad-slot="9948468514" />
      </div>

      <section class="get-the-game">
        <CustomLink class="download" :to="`/download/${currentGame.path}/`"
          ><i class="icon-download"></i>Download</CustomLink
        >
        <div class="tip">
          * For reference, The {{ currentGame.name }} game websites are all approved, there are no
          viruses and malware.
        </div>
      </section>

      <h2 class="title-h2"><i class="icon-related"></i>Related Games</h2>

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
        autoplay: {
          delay: 3000
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      }
    };
  },
  head() {
    return {
      title: `Letsgame9 － dedicated to the dreams and wonders of the young crowd, play with your own colors in the ${
        this.currentGame.name || "game"
      }!`
    };
  }
};
</script>
<style lang="scss" scoped>
@import "~/assets/css/game.scss";
.table-info {
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  border-collapse: collapse;
  width: 100%;
  margin: 20px 0;
  border: 1px solid #d9d9db;
  font-family: "sesb";
  color: $font1;
}

$categories: category, os, size, version, updated;
@each $category in $categories {
  .icon-#{$category} {
    @include icon(20px, 20px, "icon-#{$category}.png");
    margin-right: 8px;
  }
}
.icon-android {
  @include icon(16px, 16px, "icon-android.png");
  margin-right: 8px;
}
.icon-ios {
  @include icon(16px, 16px, "icon-ios.png");
}
.link-category {
  color: $color1;
  text-decoration-line: underline;
}
.table-row {
  display: flex;
  border-bottom: 1px solid #d9d9db;
}
.table-cell {
  display: flex;
  align-items: center;
  width: 184px;
  height: 32px;
  border-right: 1px solid #d9d9db;
  padding-left: 18px;
}
.table-cell:last-child {
  padding-left: 32px;
  border-right: none;
}
.table-row:last-child {
  border-bottom: none;
}
.application-desc {
  background: #f5f5f5;
  border-radius: 24px;
  padding: 24px;
  margin-bottom: 32px;
  .img {
    border-radius: 16px;
  }
}
.swiper-box {
  height: 352px;
}
.swiper-wrapper {
  height: 288px;
}
.swiper-slide {
  width: auto;
  height: 288px;
  margin-right: 16px;
}
.swiper-pagination {
  height: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 8px;
  position: unset;
}
.swiper-tool {
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
}
.swiper-button-prev,
.swiper-button-next {
  position: unset;
  width: 32px;
  height: 32px;
  background: $color1;
  border-radius: 0px 0px 0px 0px;
  border-radius: 50%;
  margin: 0;
  &::after {
    color: #fff;
    font-size: 14px;
    font-weight: bold;
  }
}
.get-the-game {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 32px;
  .download {
    @include center;
    width: 121px;
    height: 40px;
    background: $color1;
    border-radius: 8px;
    color: #fff;
    margin-bottom: 16px;
  }
  .icon-download {
    @include icon(24px, 24px, "icon-download.png");
    margin-right: 8px;
  }
  .tip {
    color: rgba($font1, 0.6);
  }
}
</style>
<style>
@import "swiper/css/swiper.min.css";

.swiper-pagination-bullet {
  width: 8px;
  height: 8px;
  background: #dadada;
  border-radius: 50%;
  opacity: 1;
  box-sizing: content-box;
  margin: 0 4px;
}
.swiper-pagination-bullet-active {
  border: 2px solid #5bad6d;
  background: #ffffff;
}
</style>
