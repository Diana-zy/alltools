<template>
  <div class="page">
    <Header />
    <main class="main">
      <Breadcrumb :name="currentGame.name" />
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
              <p :style="{ width: (((currentGame.score || 4.6) / 5) * 100).toFixed(0) + '%' }"></p>
            </div>
            {{ currentGame.score || 4.6 }}
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
          <i class="icon-get-it-now"></i>Get Game
        </div>
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
        <div v-if="currentGame.banner_list.length > 0" class="swiper-bg">
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
          ><i class="icon-download"></i>Download
        </CustomLink>
        <div class="tip">
          * For reference, The {{ currentGame.name }} game websites are all approved, there are no
          viruses and malware.
        </div>
      </section>

      <h2 class="title-h2">Related Games</h2>

      <!-- Related Games 模块 -->
      <section class="box-small-bg">
        <ContentItemSmall
          v-for="(item, index) in relatedGames"
          :key="index"
          :index="index"
          :item="item"
          :to="`/game/${item.path}/`"
        />
      </section>

      <h2 class="title-h2">Recommend Games</h2>

      <!-- Recommend Games 模块 -->
      <section class="box-common">
        <ContentItemCommon
          v-for="(item, index) in recommendGames"
          :key="index"
          :index="index"
          :item="item"
          :to="`/game/${item.path}/`"
        />
      </section>

      <aside class="box-aside">
        <GoogleAd ad-slot="8635386842" />
        <h2 class="title-h2">Hot Games</h2>
        <ContentItemRow
          v-for="(item, index) in bestGames"
          :key="index"
          :item="item"
          :index="index"
          :to="`/game/${item.path}/`"
        />
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
      const path = params.app;
      const lastDashIndex = path.lastIndexOf("-");
      const id = path.substring(lastDashIndex + 1, path.length);

      const [currentGameResponse, relatedGamesResponse, recommendGamesResponse, bestGamesResponse] =
        await Promise.all([
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
        bestGames: shuffleArray(bestGamesResponse.list)
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
</style>
<style lang="scss">
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
