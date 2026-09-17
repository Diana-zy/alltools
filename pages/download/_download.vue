<template>
  <div class="page">
    <Header />
    <main class="main">
      <div class="main-left">
        <Breadcrumb :name="currentSoftware.name" />

        <!-- <GoogleAd ad-slot="3297497936" class="ad1 ad-width" /> -->
        <adm-slot
          adm-id="download-mid1"
          adm-unit="/23197833490/alltools1/alltools1_detail_1"
          ads-slot="3297497936"
          class="ad1 ad-width"
        />

        <section class="download-info">
          <div class="base-info">
            <NuxtImg
              format="auto"
              fit="cover"
              width="210"
              height="210"
              class="icon"
              :src="currentSoftware.icon"
              :alt="currentSoftware.name"
            />
            <div class="base-info-content">
              <div class="name">
                {{ currentSoftware.name }}
              </div>
              <div class="version">
                <p><b>Version:</b> {{ currentSoftware.version }}</p>
                <p><b>Size:</b> {{ currentSoftware.apk_size }}</p>
                <p><b>Updated:</b> {{ currentSoftware.updated_time }}</p>
              </div>
              <div class="platform">
                <div
                  v-if="currentSoftware.android"
                  class="android"
                  :class="{
                    'direct-download': isDirectDownload(currentSoftware.android_download_source),
                    'is-disabled': !currentSoftware.android_web_url
                  }"
                >
                  <i class="icon-android"></i
                  >{{
                    isDirectDownload(currentSoftware.android_download_source)
                      ? "Download APK"
                      : "Android"
                  }}
                  <div v-if="currentSoftware.android_web_url" class="qrcode">
                    Android
                    <img :src="qrCodeGoogle" alt="qrcode" />
                  </div>
                  <a
                    v-if="currentSoftware.android_web_url"
                    :href="currentSoftware.android_web_url"
                    :rel="
                      isDirectDownload(currentSoftware.android_download_source)
                        ? 'nofollow noopener'
                        : 'noopener'
                    "
                  ></a>
                </div>

                <div
                  v-if="currentSoftware.ios"
                  class="ios"
                  :class="{ 'is-disabled': !currentSoftware.ios_web_url }"
                >
                  <i class="icon-ios"></i>iOS
                  <div v-if="currentSoftware.ios_web_url" class="qrcode">
                    iOS
                    <img :src="qrCodeIos" alt="qrcode" />
                  </div>
                  <a
                    v-if="currentSoftware.ios_web_url"
                    :href="currentSoftware.ios_web_url"
                    rel="noopener"
                  ></a>
                </div>
              </div>
              <div v-if="isDirectDownload(currentSoftware.android_download_source)" class="tip">
                * Download provided by APKPure.
              </div>
            </div>
          </div>

          <ExpandableText :text="currentSoftware.desc" current-path="download" />
        </section>

        <h2 class="title-h2">Related {{ isApp ? "Apps" : "Games" }}</h2>
        <section class="box-small-bg">
          <ContentItemSmall
            v-for="(item, index) in relatedSoftwares"
            :key="index"
            :index="index"
            :item="item"
            :to="item.type === 1 ? `/game/${item.path}/` : `/app/${item.path}/`"
          />
        </section>

        <!-- <GoogleAd ad-slot="2955836717" class="ad-width" /> -->
        <adm-slot
          adm-id="download-mid2"
          adm-unit="/23197833490/alltools1/alltools1_detail_2"
          ads-slot="2955836717"
          class="ad-width"
        />

        <h2 class="title-h2"> Recommend</h2>
        <section class="box-common">
          <ContentItemDetail
            v-for="(item, index) in allSoftwares"
            :key="index"
            :index="index"
            :item="item"
            :to="item.type === 1 ? `/game/${item.path}/` : `/app/${item.path}/`"
          />
        </section>

        <aside class="box-aside">
          <!-- <GoogleAd ad-slot="3489069628" /> -->
          <adm-slot
            adm-id="download-mid3"
            adm-unit="/23197833490/alltools1/alltools1_detail_3"
            ads-slot="3489069628"
          />
          <h2 class="title-h2">Favorite {{ isApp ? "Tools" : "Games" }}</h2>
          <ContentItemRow
            v-for="(item, index) in hotSoftwares"
            :key="index"
            :item="item"
            :index="index"
            :to="item.type === 1 ? `/game/${item.path}/` : `/app/${item.path}/`"
          />
        </aside>
      </div>
    </main>
    <Footer />
    <BackTop />
    <!-- <AdLoading /> -->
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

      const [currentSoftwareResponse, relatedSoftwaresResponse] = await Promise.all([
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
        })
      ]);
      const isApp = currentSoftwareResponse.type === 3;

      const [allSoftwaresResponse, hotSoftwaresResponse] = await Promise.all([
        $axios.$get(`/api/game/${isApp ? "all_app" : "all_game"}`, {
          params: {
            site_id: env.SITE_ID,
            page: 1,
            size: 30
          }
        }),
        $axios.$get("/api/game/menu", {
          params: {
            site_id: env.SITE_ID,
            mod_id: isApp ? "best-apps" : "best-games",
            size: 12
          }
        })
      ]);
      return {
        isApp,
        currentSoftware: currentSoftwareResponse,
        relatedSoftwares: relatedSoftwaresResponse.list,
        allSoftwares: allSoftwaresResponse.list,
        hotSoftwares: shuffleArray(hotSoftwaresResponse.list)
      };
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
  data() {
    return {
      qrCodeGoogle: "",
      qrCodeIos: ""
    };
  },
  mounted() {
    if (this.currentSoftware.ios_web_url) {
      this.generateQRCode(this.currentSoftware.ios_web_url).then((data) => {
        this.qrCodeIos = data;
      });
    }
    if (this.currentSoftware.android_web_url) {
      this.generateQRCode(this.currentSoftware.android_web_url).then((data) => {
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
    },
    // download_source 为空时按旧逻辑处理（跳转商店），只有明确是 apkpure_direct 才展示"直接下载"样式
    isDirectDownload(downloadSource) {
      return downloadSource === "apkpure_direct";
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~/assets/css/download.scss";

.ad1 {
  margin-bottom: 32px;
}
@media screen and (max-width: 879px) {
  .ad1 {
    margin-bottom: vw(48);
  }
  .box-small-bg {
    margin-bottom: vw(36);
  }
}
</style>
