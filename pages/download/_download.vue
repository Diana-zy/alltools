<template>
  <div class="page">
    <Header />
    <main class="main">
      <div class="main-left">
        <Breadcrumb :name="currentSoftware.name" />

        <section class="app-header">
          <NuxtImg
            format="auto"
            fit="cover"
            width="100"
            height="100"
            class="icon"
            :src="currentSoftware.icon"
            :alt="currentSoftware.name"
          />
          <div class="header-main">
            <div class="name">{{ currentSoftware.name }}</div>
            <CustomLink
              v-if="currentSoftware.category_name"
              class="category-badge"
              :to="`/category/${currentSoftware.category_path}/`"
              >{{ currentSoftware.category_name }}</CustomLink
            >
          </div>
        </section>

        <div class="stats-row">
          <div class="stat">
            <i class="icon-stat-star"></i>
            <div class="stat-text"
              ><b>{{ currentSoftware.score || 4.6 }}</b><span>RATINGS</span></div
            >
          </div>
          <div v-if="currentSoftware.downloads" class="stat">
            <i class="icon-stat-download"></i>
            <div class="stat-text"
              ><b>{{ currentSoftware.downloads }}</b><span>DOWNLOADS</span></div
            >
          </div>
          <div v-if="currentSoftware.content_rating" class="stat">
            <div class="stat-text"
              ><b>{{ currentSoftware.content_rating }}</b><span>AGE</span></div
            >
          </div>
          <div v-if="currentSoftware.is_verified" class="verified-box"
            ><i class="icon-verified"></i
          ></div>
        </div>

        <div
          class="primary-download"
          @click="
            $refs.storeButtons.scrollIntoView({ behavior: 'smooth', block: 'center' })
          "
        >
          <i class="icon-download-cta"></i>Download Latest APK
        </div>

        <adm-slot
          adm-id="download-mid1"
          adm-unit="/23197833490/alltools1/alltools1_detail_1"
          ads-slot="3297497936"
          class="ad-width"
        />

        <section class="table-content">
          <div class="table-info">
            <div class="table-row">
              <div class="table-cell"><i class="icon-category"></i>Category</div>
              <div class="table-cell">
                <CustomLink :to="`/category/${currentSoftware.category_path}/`" class="link-category">{{
                  currentSoftware.category_name
                }}</CustomLink>
              </div>
            </div>
            <div class="table-row">
              <div class="table-cell"><i class="icon-os"></i>OS</div>
              <div class="table-cell"
                ><i v-if="currentSoftware.android" class="icon-android"></i
                ><i v-if="currentSoftware.ios" class="icon-ios"></i
              ></div>
            </div>
            <div class="table-row">
              <div class="table-cell"><i class="icon-size"></i>Size</div>
              <div class="table-cell">{{ currentSoftware.apk_size || "--" }}</div>
            </div>
            <div class="table-row">
              <div class="table-cell"><i class="icon-version"></i>Version</div>
              <div class="table-cell">{{ currentSoftware.version }}</div>
            </div>
            <div class="table-row">
              <div class="table-cell"><i class="icon-updated"></i>Updated</div>
              <div class="table-cell">{{ currentSoftware.updated_time }}</div>
            </div>
            <div v-if="currentSoftware.downloads" class="table-row">
              <div class="table-cell"><i class="icon-downloads"></i>Downloads</div>
              <div class="table-cell">{{ currentSoftware.downloads }}</div>
            </div>
            <div v-if="currentSoftware.developer" class="table-row">
              <div class="table-cell"><i class="icon-developer"></i>Developer</div>
              <div class="table-cell">{{ currentSoftware.developer }}</div>
            </div>
            <div v-if="currentSoftware.content_rating" class="table-row">
              <div class="table-cell"><i class="icon-content-rating"></i>Content Rating</div>
              <div class="table-cell">{{ currentSoftware.content_rating }}</div>
            </div>
            <div v-if="currentSoftware.price" class="table-row">
              <div class="table-cell"><i class="icon-price"></i>Price</div>
              <div class="table-cell">{{ currentSoftware.price }}</div>
            </div>
          </div>
        </section>

        <section v-if="currentSoftware.banner_list.length > 0" class="screenshots">
          <h2 class="title-h2">Screenshots</h2>
          <div class="swiper-bg">
            <div v-swiper:Swiper="swiperOption" class="swiper-box">
              <div class="swiper-wrapper">
                <div v-for="(banner, i) in currentSoftware.banner_list" :key="i" class="swiper-slide">
                  <NuxtImg
                    format="auto"
                    fit="contain"
                    height="288"
                    :src="banner"
                    :alt="currentSoftware.name"
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
        </section>

        <a
          v-if="currentSoftware.apkpure_url"
          class="download-now-btn"
          :href="currentSoftware.apkpure_url"
          rel="nofollow noopener"
        >
          <i class="icon-download-cta"></i>Download APK Now
        </a>

        <div ref="storeButtons" class="platform">
          <div class="android" :class="{ 'is-disabled': !currentSoftware.android_web_url }">
            <i class="icon-android"></i>Google Play
            <div v-if="currentSoftware.android_web_url" class="qrcode">
              Android
              <img :src="qrCodeGoogle" alt="qrcode" />
            </div>
            <a
              v-if="currentSoftware.android_web_url"
              :href="currentSoftware.android_web_url"
              rel="noopener"
            ></a>
          </div>

          <div class="ios" :class="{ 'is-disabled': !currentSoftware.ios_web_url }">
            <i class="icon-ios"></i>App Store
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
        <!-- <GoogleAd ad-slot="2955836717" class="ad-width" /> -->
        <adm-slot
          adm-id="download-mid2"
          adm-unit="/23197833490/alltools1/alltools1_detail_2"
          ads-slot="2955836717"
          class="ad-width"
        />

        <h2 class="title-h2">Related {{ isApp ? "Apps" : "Games" }}</h2>
        <section class="box-common">
          <ContentItemDetail
            v-for="(item, index) in relatedSoftwares"
            :key="index"
            :index="index"
            :item="item"
            :to="item.type === 1 ? `/game/${item.path}/` : `/app/${item.path}/`"
          />
        </section>

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
          <h2 class="title-h2">Top Downloads</h2>
          <ContentItemRank
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
import { directive } from "vue-awesome-swiper";
import { shuffleArray } from "~/utils/utils";
import "swiper/css/swiper.min.css";

export default {
  directives: {
    swiper: directive
  },
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
      qrCodeIos: "",
      swiperOption: {
        slidesPerView: "auto",
        loop: true,
        autoplay: {
          delay: 3000
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      }
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
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~/assets/css/download.scss";

.ad1 {
  margin-bottom: 32px;
}

.ad-width {
  margin-bottom: 32px;
}

.app-header {
  display: flex;
  align-items: center;
  margin-top: 24px;
}
.app-header .header-main {
  padding: 0;
}
.app-header .icon {
  width: 100px;
  height: 100px;
  border-radius: 20px;
  margin-right: 16px;
  flex-shrink: 0;
  border: 1px solid #eef0f3;
}
.header-main .name {
  font-family: "sesb";
  font-size: 22px;
  color: $font1;
  margin-bottom: 8px;
}
.category-badge {
  display: inline-flex;
  padding: 2px 12px;
  border: 1px solid $color2;
  border-radius: 12px;
  color: $color2;
  font-size: 13px;
  font-family: "sesb";
}

.stats-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0;
  padding: 16px 0;
  border-top: 1px solid rgba($font1, 0.08);
  border-bottom: 1px solid rgba($font1, 0.08);
}
.stat {
  display: flex;
  align-items: center;
}
.stat-text {
  display: flex;
  flex-direction: column;
  b {
    font-family: "sesb";
    color: $font1;
    font-size: 15px;
    line-height: 18px;
  }
  span {
    font-size: 11px;
    color: rgba($font1, 0.5);
    letter-spacing: 0.5px;
  }
}
.icon-stat-star,
.icon-stat-download {
  width: 20px;
  height: 20px;
  margin-right: 8px;
}
.icon-stat-star {
  @include icon(20px, 20px, "icon-star-rec.png");
}
.icon-stat-download {
  @include icon(20px, 20px, "icon-download.png");
}
.verified-box {
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: #ffffff;
  border: 1px solid rgba($font1, 0.12);
  @include center;
}
.icon-verified {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #2bb673;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    top: 3px;
    left: 3px;
    width: 8px;
    height: 5px;
    border-left: 2px solid #ffffff;
    border-bottom: 2px solid #ffffff;
    transform: rotate(-45deg);
  }
}

.primary-download,
.download-now-btn {
  width: 100%;
  height: 56px;
  border-radius: 32px;
  background: $color2;
  color: #ffffff;
  font-family: "sesb";
  font-size: 17px;
  @include center;
  cursor: pointer;
  margin-bottom: 24px;
}
.primary-download,
.download-now-btn {
  animation: breathe 1.8s ease-in-out infinite;
}

@keyframes breathe {
  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(253, 107, 33, 0.45);
  }
  50% {
    box-shadow: 0 0 0 10px rgba(253, 107, 33, 0);
  }
}
// .primary-download 只是滚动到下面的商店按钮，.download-now-btn 直接链到真实下载地址，
// 是这个页面上第一个"点了就是真下载"的按钮
.download-now-btn {
  margin-top: 24px;
}
.icon-download-cta {
  @include icon(22px, 22px, "icon-download.png");
  margin-right: 10px;
  filter: brightness(0) invert(1);
}

// game.scss 里的表格样式，这个页面没有 import game.scss（走的是 download.scss），
// 直接抄一份放在自己的 scoped style 里，靠 scoped 属性选择器天然盖过 download.scss
// 里同名的 .icon-android/.icon-ios/.main 等全局定义，不用改 download.scss
.table-content {
  box-shadow: none;
  background: #f5f6f8;
  border-radius: 24px;
  padding: 24px 24px 24px 6px;
  margin: 32px 0;
}
.table-info {
  display: flex;
  flex-direction: column;
  border-collapse: collapse;
  width: 100%;
  font-family: "sesb";
  color: $font1;
}
$table-icon-categories: category, os, size, version, updated, downloads, developer,
  content-rating, price;
@each $category in $table-icon-categories {
  .table-cell .icon-#{$category} {
    @include icon(20px, 20px, "icon-#{$category}.png");
    margin-right: 8px;
  }
}
.table-cell .icon-android {
  @include icon(16px, 16px, "icon-android3.png");
  margin-right: 8px;
}
.table-cell .icon-ios {
  @include icon(16px, 16px, "icon-ios3.png");
  margin-right: 8px;
}
.link-category {
  color: $color2;
  text-decoration-line: underline;
}
.table-row {
  display: flex;
}
.table-cell {
  display: flex;
  align-items: center;
  width: 184px;
  height: 32px;
  padding-left: 18px;
  color: rgba($font1, 0.6);
}
.table-cell:last-child {
  width: auto;
  padding-left: 32px;
  border-right: none;
  color: $font1;
}
.table-row:last-child {
  border-bottom: none;
}

.screenshots {
  margin: 24px 0;
}
.swiper-bg {
  margin-top: 16px;
}
.swiper-box {
  width: 100%;
  height: auto !important;
  overflow: hidden;
  position: relative;
}
.swiper-wrapper {
  height: auto !important;
}
.swiper-slide {
  width: auto !important;
  max-width: 80vw !important;
  height: 288px !important;
  overflow: hidden;
  margin-right: 16px;
  .img {
    display: block;
    height: 288px !important;
    width: auto !important;
    max-width: 80vw !important;
    max-height: 288px !important;
    object-fit: contain;
    border-radius: 16px;
    border: 1px solid #eef0f3;
  }
}
.swiper-tool .swiper-pagination {
  display: none;
}
.swiper-button-prev,
.swiper-button-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 32px;
  height: 32px;
  margin: 0;
  background: $color2;
  border-radius: 50%;
  z-index: 2;
  display: flex;
  &::after {
    color: #fff;
    font-size: 14px;
    font-weight: bold;
  }
}
.swiper-button-prev {
  left: 8px;
}
.swiper-button-next {
  right: 8px;
}

// 参照 apkuick 的样式改成上下堆叠的整行按钮（Google Play 蓝色 / App Store 黑色）
.platform {
  flex-direction: column;
  .android,
  .ios {
    width: 100%;
    height: 56px;
    margin: 0 0 12px;
  }
}
.platform .android:not(.is-disabled) {
  background: #4b9df6;
  box-shadow: none;
}
.platform .ios:not(.is-disabled) {
  background: #000000;
  color: #ffffff;
  border: none;
  box-shadow: none;
}
.platform .icon-android {
  @include icon(28px, 28px, "icon-play-color.png");
  margin-right: 8px;
}
.platform .icon-ios {
  @include icon(28px, 28px, "icon-ios-color.png");
  margin-right: 8px;
}
.platform .is-disabled .icon-android,
.platform .is-disabled .icon-ios {
  filter: grayscale(1) opacity(0.5);
}

@media screen and (max-width: 879px) {
  .ad1 {
    margin-bottom: vw(48);
  }
  .ad-width {
    margin-bottom: vw(48);
  }
  .box-small-bg {
    margin-bottom: vw(36);
  }
  .app-header {
    padding: 0 vw(46);
    margin-top: vw(36);
  }
  .app-header .icon {
    width: 100px;
    height: 100px;
    border-radius: vw(28);
    margin-right: vw(24);
  }
  .header-main .name {
    font-size: 22px;
  }
  .category-badge {
    font-size: vw(22);
    padding: vw(4) vw(20);
    border-radius: vw(20);
  }
  .stats-row {
    margin: vw(32) vw(46);
    padding: vw(24) 0;
  }
  .stat-text b {
    font-size: vw(26);
  }
  .stat-text span {
    font-size: vw(20);
  }
  .icon-stat-star,
  .icon-stat-download {
    width: vw(36);
    height: vw(36);
    margin-right: vw(12);
  }
  .verified-box {
    width: vw(56);
    height: vw(56);
    border-radius: vw(16);
  }
  .icon-verified {
    width: vw(28);
    height: vw(28);
    &::after {
      top: vw(6);
      left: vw(6);
      width: vw(14);
      height: vw(8);
    }
  }
  .primary-download,
  .download-now-btn {
    margin: 0 vw(46) vw(36);
    width: calc(100% - vw(92));
    height: vw(96);
    border-radius: vw(48);
    font-size: vw(28);
  }
  .icon-download-cta {
    width: vw(36);
    height: vw(36);
  }
  .table-cell:last-child {
    padding-left: vw(24);
  }
  .screenshots {
    margin: vw(36) 0;
  }
  .swiper-bg {
    padding: 0 vw(46);
  }
  .swiper-slide .img {
    border-radius: vw(24);
  }
  .platform {
    padding: 0 vw(46);
    .android,
    .ios {
      height: vw(96);
      border-radius: vw(48);
    }
  }
  .platform .icon-android,
  .platform .icon-ios {
    width: vw(44);
    height: vw(44);
    margin-right: vw(16);
  }
}
</style>
