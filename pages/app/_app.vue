<template>
  <div class="page">
    <Header />
    <main class="main">
      <Breadcrumb :name="currentApp.name" />
      <section class="application-info">
        <NuxtImg
          format="auto"
          fit="cover"
          width="120"
          height="120"
          :src="currentApp.icon"
          :alt="currentApp.name"
          loading="lazy"
          class="icon"
        ></NuxtImg>
        <div class="info">
          <div class="name">{{ currentApp.name }}</div>
          <div class="category">{{ currentApp.category_name }}</div>
          <div class="rating">
            <div class="rating-star">
              <p :style="{ width: (((currentApp.score || 4.6) / 5) * 100).toFixed(0) + '%' }"></p>
            </div>
            {{ currentApp.score || 4.6 }}
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
            <CustomLink :to="`/category/${currentApp.category_path}/`" class="link-category">{{
              currentApp.category_name
            }}</CustomLink>
          </div>
        </div>
        <div class="table-row">
          <div class="table-cell"><i class="icon-os"></i>OS</div>
          <div class="table-cell"
            ><i v-if="currentApp.android" class="icon-android"></i
            ><i v-if="currentApp.ios" class="icon-ios"></i
          ></div>
        </div>
        <div class="table-row">
          <div class="table-cell"><i class="icon-size"></i>Size</div>
          <div class="table-cell">{{ currentApp.apk_size }}</div>
        </div>
        <div class="table-row">
          <div class="table-cell"><i class="icon-version"></i>Version</div>
          <div class="table-cell">{{ currentApp.version }}</div>
        </div>
        <div class="table-row">
          <div class="table-cell"><i class="icon-updated"></i>Updated</div>
          <div class="table-cell">{{ currentApp.updated_time }}</div>
        </div>
      </section>

      <section class="application-desc">
        <div v-if="currentApp.banner_list.length > 0" class="swiper-bg">
          <div v-swiper:mySwiper="swiperOption" class="swiper-box">
            <div class="swiper-wrapper">
              <div v-for="(banner, i) in currentApp.banner_list" :key="i" class="swiper-slide">
                <NuxtImg
                  format="auto"
                  fit="cover"
                  height="288"
                  :src="banner"
                  :alt="currentApp.name"
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
        <ExpandableText class="expand" :text="currentApp.desc" />
      </section>

      <div ref="targetElement">
        <GoogleAd ad-slot="9948468514" />
      </div>

      <section class="get-the-game">
        <CustomLink class="download" :to="`/download/${currentApp.path}/`"
          ><i class="icon-download"></i>Download
        </CustomLink>
        <div class="tip">
          * For reference, The {{ currentApp.name }} game websites are all approved, there are no
          viruses and malware.
        </div>
      </section>

      <h2 class="title-h2">Related Apps</h2>

      <section class="box-small-bg">
        <ContentItemSmall
          v-for="(item, index) in relatedApps"
          :key="index"
          :index="index"
          :item="item"
          :to="`/app/${item.path}/`"
        />
      </section>

      <h2 class="title-h2">Recommend App</h2>

      <section class="box-common">
        <ContentItemCommon
          v-for="(item, index) in recommendApps"
          :key="index"
          :index="index"
          :item="item"
          :to="`/app/${item.path}/`"
        />
      </section>

      <aside class="box-aside">
        <GoogleAd ad-slot="8635386842" />
        <h2 class="title-h2">Hot Apps</h2>
        <ContentItemRow
          v-for="(item, index) in hotApps"
          :key="index"
          :item="item"
          :index="index"
          :to="`/app/${item.path}/`"
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
import { shuffleArray } from "~/utils/utils";

export default {
  directives: {
    swiper: directive
  },
  async asyncData({ $axios, params, env }) {
    try {
      const path = params.app;
      const lastDashIndex = path.lastIndexOf("-");
      const id = path.substring(lastDashIndex + 1, path.length);

      const [currentAppResponse, relatedAppsResponse, recommendAppsResponse, hotAppsResponse] =
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
              size: 14
            }
          }),
          $axios.$get("/api/game/rec", {
            params: {
              site_id: env.SITE_ID,
              size: 10,
              page: 1,
              type: 3
            }
          }),
          $axios.$get("/api/game/menu", {
            params: {
              site_id: env.SITE_ID,
              mod_id: "hot-apps",
              size: 10,
              page: 1
            }
          })
        ]);

      return {
        currentApp: currentAppResponse,
        relatedApps: relatedAppsResponse.list,
        recommendApps: recommendAppsResponse.list,
        hotApps: shuffleArray(hotAppsResponse.list)
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
      title: `Alltools1 － dedicated to the dreams and wonders of the young crowd, play with your own colors in the ${
        this.currentApp.name || "game"
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
  border: 2px solid $color1;
  background: #ffffff;
}
</style>
