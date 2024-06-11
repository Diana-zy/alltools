<template>
  <div class="page">
    <Header />
    <main class="main">
      <Breadcrumb :name="currentGame.name" />

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

        <ExpandableText :text="currentGame.desc" />
      </section>

      <GoogleAd ad-slot="4960785586" />

      <h2 class="title-h2">Related Games</h2>
      <section class="box-small-bg">
        <ContentItemSmall
          v-for="(item, index) in relatedGames"
          :key="index"
          :index="index"
          :item="item"
          :to="`/game/${item.path}/`"
        />
      </section>

      <GoogleAd ad-slot="5542405363" />

      <h2 class="title-h2">Recommend Games</h2>
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
import QRCode from "qrcode";
import { shuffleArray } from "~/utils/utils";

export default {
  async asyncData({ $axios, params, env }) {
    try {
      const path = params.download;
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
@import "~/assets/css/download.scss";
</style>
