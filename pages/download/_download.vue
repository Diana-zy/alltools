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
            fetchpriority="high"
          />
          <div class="header-main">
            <div class="name">{{ currentSoftware.name }}</div>
            <!-- 跟详情页统一，原来这里是分类标签，也换成下载按钮；这里已经是下载页本身，
            点了不跳转/不直接下载，滚动到下面真实下载按钮区域，让用户自己选平台 -->
            <div
              class="header-download-badge"
              @click="
                $refs.storeButtons.scrollIntoView({ behavior: 'smooth', block: 'center' });
                trackDownloadClick('header');
              "
              >Download</div
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

        <!-- 有 apkpure_url 就直链下载，真实跳转，能多一次插页广告触发机会；没有配置
        apkpure_url 的产品兜底滑动到下面的下载模块，保证按钮始终有响应 -->
        <a
          class="primary-download"
          :href="currentSoftware.apkpure_url"
          rel="nofollow noopener"
          @pointerdown="trackDownloadClick('primary')"
          @click="
            if (!currentSoftware.apkpure_url) {
              $event.preventDefault();
              $refs.storeButtons.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          "
        >
          <i class="icon-download-cta"></i>Download APK<span v-if="currentSoftware.version"> (v{{ currentSoftware.version }})</span>
        </a>

        <!-- Google Play / App Store 入口从页面下方挪到这里，跟上面的 APK 直链按钮放在一起，
        三个下载入口在首屏就能一次性看完，不用划到页面下半部分才看到；下面不再重复一份 -->
        <div ref="storeButtons" class="platform">
          <div class="android" :class="{ 'is-disabled': !currentSoftware.android_web_url }">
            <i class="icon-android"></i>Get it on Google Play
            <a
              v-if="currentSoftware.android_web_url"
              :href="currentSoftware.android_web_url"
              rel="noopener"
              @pointerdown="trackDownloadClick('google_play')"
            ></a>
          </div>

          <div class="ios" :class="{ 'is-disabled': !currentSoftware.ios_web_url }">
            <i class="icon-ios"></i>App Store
            <a
              v-if="currentSoftware.ios_web_url"
              :href="currentSoftware.ios_web_url"
              rel="noopener"
              @pointerdown="trackDownloadClick('app_store')"
            ></a>
          </div>
        </div>

        <div class="verified-tip"><i class="icon-verified"></i>Verified safe by Google Play Protect</div>

        <adm-slot
          adm-id="download-mid1"
          adm-unit="/23197833490/alltools1/alltools1_detail_1"
          ads-slot="3297497936"
          class="ad-width"
        />

        <!-- 截图和参数表格合并成一块，紧跟在第一个广告位后面 -->
        <section v-if="currentSoftware.banner_list.length > 0" class="screenshots">
          <h2 class="title-h2">Screenshots</h2>
          <div class="swiper-bg">
            <div v-swiper:Swiper="swiperOption" class="swiper-box">
              <div class="swiper-wrapper">
                <div v-for="(banner, i) in currentSoftware.banner_list" :key="i" class="swiper-slide">
                  <NuxtImg
                    format="auto"
                    fit="contain"
                    width="500"
                    height="250"
                    :src="banner"
                    :alt="currentSoftware.name"
                    :loading="i === 0 ? 'eager' : 'lazy'"
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

        <!-- <GoogleAd ad-slot="2955836717" class="ad-width" /> -->
        <adm-slot
          adm-id="download-mid2"
          adm-unit="/23197833490/alltools1/alltools1_detail_2"
          ads-slot="2955836717"
          class="ad-width"
        />

        <section class="faq">
          <h2 class="title-h2">Frequently asked questions</h2>
          <details v-for="(item, index) in faqList" :key="index" class="faq-item">
            <summary class="faq-question">
              <span class="faq-number">{{ String(index + 1).padStart(2, "0") }}</span>
              <span class="faq-text">{{ item.q }}</span>
              <i class="faq-toggle"></i>
            </summary>
            <div class="faq-answer">{{ item.a }}</div>
          </details>
        </section>

        <h2 class="title-h2">Related {{ isApp ? "Apps" : "Games" }}</h2>
        <section class="box-common">
          <ContentItemDetail
            v-for="(item, index) in relatedSoftwares"
            :key="index"
            :index="index"
            :item="item"
            list-name="download_related"
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
            list-name="download_recommend"
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
            list-name="download_top"
            :to="item.type === 1 ? `/game/${item.path}/` : `/app/${item.path}/`"
          />
        </aside>
      </div>
    </main>
    <Footer />
    <QuickNav />
    <!-- <AdLoading /> -->
  </div>
</template>

<script>
import { directive } from "vue-awesome-swiper";
import { shuffleArray } from "~/utils/utils";
import { trackEvent, trackFacebookStandardEvent } from "~/utils/track";
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
      },
      // 这次进入下载页，StartTrial 有没有已经报过——衡量的是"这次下载页访问有没有导致
      // 一次下载意图"，不是"点了几次按钮"，所以同一次页面访问里，不管用户点了几个不同的
      // 下载按钮，StartTrial 只报一次。整页跳转架构下，每次重新进入这个页面（哪怕是同一个
      // 下载页）都是全新加载，这个变量自然会重置，不用额外处理
      startTrialReported: false,
      // 通用文案，不区分具体产品，放在第二个页内广告后面、Related 前面
      faqList: [
        {
          q: "How do I install this app after downloading it?",
          a: "After the APK file finishes downloading, open it from your notification bar or file manager. If this is your first time installing an app from outside Google Play, your phone will ask you to allow installs from this source — turn that on once, then tap Install and follow the on-screen steps."
        },
        {
          q: "Is this app safe to use?",
          a: "Yes. Every APK on this page is sourced from the official developer or Google Play and checked before being published here. We don't repackage or modify app files."
        },
        {
          q: "Is this app free to download?",
          a: "Yes, downloading from this page is completely free and doesn't require creating an account."
        }
      ]
    };
  },
  mounted() {
    // 跟详情页的 able_detail_page 对应，衡量"真正打开了下载页"的人数（不像
    // able_download_page_3s 那样要停留满3秒才算），方便跟详情页人数对比，看每一步
    // 掉了多少人。自定义事件，trackEvent 本身就会直推给 FB（自定义事件，不映射标准
    // 事件，只是给后台看数据用）
    trackEvent("download_page", {
      page_type: "download",
      item_id: this.currentSoftware.path,
      item_name: this.currentSoftware.name
    });
  },
  methods: {
    trackDownloadClick(buttonType) {
      const params = {
        page_type: "download",
        button_type: buttonType,
        item_id: this.currentSoftware.path,
        item_name: this.currentSoftware.name
      };
      trackEvent("download_click", params);
      // 下载页这五个按钮（header + primary + apkpure/google_play/app_store）统一算
      // "下载意图点击"，
      // 推专门的 StartTrial，不复用全站通用的 AddToCart（那个在 CustomLink 里全站
      // 任意内容点击都会触发，用来买下载页转化会混进大量普通浏览点击，不够干净）；也不能
      // 复用 InitiateCheckout，那个已经专门用来投首页、对应详情页下载按钮点击这条路径了。
      // 原本用的是 SubmitApplication，但广告账户的购物（Sales）目标下不支持选这个转化事件
      // （只支持潜在客户/互动目标），改成购物目标下可选、且站内其他地方没占用的 StartTrial
      if (!this.startTrialReported) {
        this.startTrialReported = true;
        trackFacebookStandardEvent("StartTrial", params);
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
.header-download-badge {
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  background: $color2;
  border-radius: 10px;
  color: #ffffff;
  font-size: 12px;
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

// 下边距改成 12px，跟下面紧跟着的 Google Play/App Store 按钮之间的间距一致，三个
// 下载入口现在挨在一起，统一成相同的 12px 间隔
.primary-download {
  width: 100%;
  height: 56px;
  border-radius: 32px;
  background: $color2;
  color: #ffffff;
  font-family: "sesb";
  font-size: 17px;
  @include center;
  cursor: pointer;
  margin-bottom: 12px;
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
// Related Apps 卡片网格和下面的 Recommend 标题靠得太近，title-h2 自己的 margin-top
// 只有 10px，加大一点间距
.box-common + .title-h2 {
  margin-top: 32px;
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
  @include icon(16px, 16px, "icon-android.png");
  margin-right: 8px;
}
.table-cell .icon-ios {
  @include icon(16px, 16px, "icon-ios.png");
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
  height: 250px !important;
  overflow: hidden;
  margin-right: 16px;
  .img {
    display: block;
    height: 250px !important;
    width: auto !important;
    max-width: 80vw !important;
    max-height: 250px !important;
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
// 白底描边，跟上面实心橙色的 .primary-download 拉开视觉权重差异，一眼能看出
// 哪个是首选下载方式、哪个是备选入口
.platform .android:not(.is-disabled) {
  background: #ffffff;
  color: $font1;
  border: 1px solid rgba($font1, 0.16);
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

// 点击下载前最后一眼的信任背书，顺带也让下面广告位跟上面三个按钮之间多一点间距
.verified-tip {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 4px 0 20px;
  font-size: 12px;
  color: rgba($font1, 0.6);
  .icon-verified {
    margin-right: 6px;
    flex-shrink: 0;
  }
}

.faq {
  margin: 32px 0;
}
.faq-item {
  background: #f5f6f8;
  border-radius: 12px;
  padding: 16px 44px 16px 16px;
  margin-bottom: 10px;
  position: relative;
  // details/summary 原生的展开箭头去掉，用自己画的加号代替
  summary {
    list-style: none;
    cursor: pointer;
    &::-webkit-details-marker {
      display: none;
    }
  }
}
.faq-question {
  display: flex;
  align-items: baseline;
}
.faq-number {
  color: $color2;
  font-family: "sesb";
  font-size: 13px;
  margin-right: 14px;
  flex-shrink: 0;
}
.faq-text {
  color: $color2;
  font-family: "sesb";
  font-size: 14px;
  line-height: 1.4;
}
.faq-toggle {
  position: absolute;
  top: 18px;
  right: 16px;
  width: 14px;
  height: 14px;
  &::before,
  &::after {
    content: "";
    position: absolute;
    background: $color2;
    border-radius: 1px;
  }
  // 加号的横竖两条杠
  &::before {
    top: 6px;
    left: 0;
    width: 14px;
    height: 2px;
  }
  &::after {
    top: 0;
    left: 6px;
    width: 2px;
    height: 14px;
    // 展开时竖杠收起来，加号变减号，不用额外画一个叉号图标
    transition: transform 0.15s ease;
  }
}
.faq-item[open] .faq-toggle::after {
  transform: scaleY(0);
}
.faq-answer {
  margin-top: 10px;
  color: rgba($font1, 0.65);
  font-size: 13px;
  line-height: 1.6;
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
  .header-download-badge {
    font-size: vw(22);
    padding: vw(12) vw(22);
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
  .primary-download {
    width: calc(100% - vw(92));
    height: vw(96);
    border-radius: vw(48);
    font-size: vw(28);
  }
  // 下边距改成跟 Google Play/App Store 之间一样的固定 12px（那两个用的是没有 vw() 换算
  // 的固定值，这里也用固定值，不用 vw()，才能在任意屏宽下都保持跟它们相等），三个下载
  // 入口现在挨在一起，间距统一
  .primary-download {
    margin: 0 vw(46) 12px;
  }
  .icon-download-cta {
    width: vw(36);
    height: vw(36);
  }
  .box-common + .title-h2 {
    margin-top: vw(48);
  }
  .table-content {
    margin: vw(48) vw(46) vw(6);
    padding: vw(32) 0 vw(4) 0;
    border: 1px solid #ffffff;
  }
  .table-info {
    border: none;
    font-size: vw(24);
  }
  @each $category in $table-icon-categories {
    .table-cell .icon-#{$category} {
      width: vw(40);
      height: vw(40);
      margin-right: vw(16);
    }
  }
  .table-cell .icon-android {
    @include icon(vw(32), vw(32), "icon-android.png");
    margin-right: vw(16);
  }
  .table-cell .icon-ios {
    @include icon(vw(32), vw(32), "icon-ios.png");
  }
  .link-category {
    font-size: vw(24);
  }
  .table-row {
    border-bottom: none;
    margin-bottom: vw(24);
  }
  .table-cell {
    width: vw(298);
    height: vw(40);
    border-right: none;
    padding-left: vw(24);
  }
  .table-cell:last-child {
    width: vw(390);
    padding-left: vw(24);
    @include ellipsis;
  }
  .screenshots {
    margin: vw(36) 0;
  }
  .swiper-bg {
    padding: 0 vw(46);
  }
  // 基础规则给 .swiper-slide 和 .img 的高度都加了 !important，覆盖也必须带 !important
  // 才能生效
  .swiper-slide {
    height: 210px !important;
    margin-right: 8px;
  }
  .swiper-slide .img {
    height: 210px !important;
    max-height: 210px !important;
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
