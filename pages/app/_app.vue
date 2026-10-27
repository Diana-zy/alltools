<template>
  <div class="page">
    <Header />
    <main class="main">
      <div class="main-left">
        <Breadcrumb :name="currentApp.name" />

        <section class="app-header">
          <NuxtImg
            format="auto"
            fit="cover"
            width="100"
            height="100"
            :src="currentApp.icon"
            :alt="currentApp.name"
            fetchpriority="high"
            class="icon"
          ></NuxtImg>
          <div class="header-main">
            <div class="name">{{ currentApp.name }}</div>
            <!-- 原来这里是分类标签（点了跳分类页），统一换成下载按钮，点了直接跳
            下载页，不管有没有加 Featured Effects 卡片都这样；分类信息不再在这里
            展示 -->
            <CustomLink
              class="header-download-badge"
              :to="`/download/${currentApp.path}/`"
              @pointerdown.native="trackDownloadClick('header')"
              >Download</CustomLink
            >
          </div>
        </section>

        <div class="stats-row">
          <div class="stat">
            <i class="icon-stat-star"></i>
            <div class="stat-text"
              ><b>{{ currentApp.score || 4.6 }}</b><span>RATINGS</span></div
            >
          </div>
          <div v-if="currentApp.downloads" class="stat">
            <i class="icon-stat-download"></i>
            <div class="stat-text"
              ><b>{{ currentApp.downloads }}</b><span>DOWNLOADS</span></div
            >
          </div>
          <div v-if="currentApp.content_rating" class="stat">
            <div class="stat-text"
              ><b>{{ currentApp.content_rating }}</b><span>AGE</span></div
            >
          </div>
          <div v-if="currentApp.is_verified" class="verified-box"
            ><i class="icon-verified"></i
          ></div>
        </div>

        <!-- <GoogleAd ad-slot="7534582229" /> -->
        <adm-slot
          adm-id="app-mid1"
          adm-unit="/23197833490/alltools1/alltools1_detail_1"
          ads-slot="7534582229"
        />

        <!-- 只在测试子域名 apk1.alltools1.com + 配置过图的产品上显示，其他域名/产品完全
        看不到这个区块，不影响现有跑量数据，见 utils/featuredEffects.js。放在第一个页内
        广告下面，保证广告展示率，用户滑到这里才看到卡片 -->
        <section v-if="featuredEffect" class="featured-effects">
          <h2 class="title-h2">What's New</h2>
          <CustomLink
            class="featured-effects-card"
            :to="`/download/${currentApp.path}/`"
            :style="{ backgroundImage: `url(${featuredEffect.image})` }"
            @pointerdown.native="trackDownloadClick('featured_effect')"
          >
            <div class="featured-effects-scrim">
              <div class="featured-effects-title">{{ featuredEffect.title }}</div>
              <div class="featured-effects-subtitle">{{ featuredEffect.subtitle }}</div>
            </div>
            <div class="featured-effects-arrow"><i class="icon-chevron-right"></i></div>
          </CustomLink>
        </section>

        <!-- Download 按钮放在第一个广告位下面：顶部如果有锚定广告，展开/折叠会把按钮遮住，
        放在广告下面能避免被挡住 -->
        <CustomLink
          class="primary-download"
          :to="`/download/${currentApp.path}/`"
          @pointerdown.native="trackDownloadClick('primary')"
        >
          <i class="icon-download-cta"></i>Download Now
        </CustomLink>

        <!-- <section>
          <div v-if="currentApp.banner_list.length > 0" class="m-swiper">
            <div v-swiper:mySwiper="swiperOption" class="m-swiper-box">
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
              <div class="m-swiper-tool">
                <div class="swiper-button-prev shadow-hidden"></div>
                <div class="swiper-pagination"></div>
                <div class="swiper-button-next shadow-hidden"></div>
              </div>
            </div>
          </div>
        </section> -->

        <section v-if="currentApp.banner_list.length > 0" class="screenshots">
          <h2 class="title-h2">Screenshots</h2>
          <div class="swiper-bg">
            <div v-swiper:Swiper="swiperOption" class="swiper-box">
              <div class="swiper-wrapper">
                <div v-for="(banner, i) in currentApp.banner_list" :key="i" class="swiper-slide">
                  <NuxtImg
                    format="auto"
                    fit="contain"
                    width="500"
                    height="250"
                    :src="banner"
                    :alt="currentApp.name"
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
              <div class="table-cell">{{ currentApp.apk_size || "--" }}</div>
            </div>
            <div class="table-row">
              <div class="table-cell"><i class="icon-version"></i>Version</div>
              <div class="table-cell">{{ currentApp.version }}</div>
            </div>
            <div class="table-row">
              <div class="table-cell"><i class="icon-updated"></i>Updated</div>
              <div class="table-cell">{{ currentApp.updated_time }}</div>
            </div>
            <div v-if="currentApp.downloads" class="table-row">
              <div class="table-cell"><i class="icon-downloads"></i>Downloads</div>
              <div class="table-cell">{{ currentApp.downloads }}</div>
            </div>
            <div v-if="currentApp.developer" class="table-row">
              <div class="table-cell"><i class="icon-developer"></i>Developer</div>
              <div class="table-cell">{{ currentApp.developer }}</div>
            </div>
            <div v-if="currentApp.content_rating" class="table-row">
              <div class="table-cell"><i class="icon-content-rating"></i>Content Rating</div>
              <div class="table-cell">{{ currentApp.content_rating }}</div>
            </div>
            <div v-if="currentApp.price" class="table-row">
              <div class="table-cell"><i class="icon-price"></i>Price</div>
              <div class="table-cell">{{ currentApp.price }}</div>
            </div>
          </div>
        </section>

        <!-- 页内广告位，跟应用/游戏详情页共用同一个 alltools1_detail_1b 广告单元 -->
        <adm-slot
          adm-id="app-mid1b"
          adm-unit="/23197833490/alltools1/alltools1_detail_1b"
          ads-slot="23380269898"
          class="ad-width"
        />

        <DescriptionText :text="currentApp.desc" />

        <!-- <GoogleAd ad-slot="8029406241" class="ad-width" /> -->
        <adm-slot
          adm-id="app-mid2"
          adm-unit="/23197833490/alltools1/alltools1_detail_2"
          ads-slot="8029406241"
          class="ad-width"
        />

        <h2 class="title-h2">Related Apps</h2>

        <section class="box-common">
          <ContentItemDetail
            v-for="(item, index) in relatedApps"
            :key="index"
            :index="index"
            :item="item"
            list-name="app_detail_related"
            :to="`/app/${item.path}/`"
          />
        </section>

        <h2 class="title-h2">Recommend</h2>

        <InfiniteScrollList
          class="box-common"
          api-endpoint="/api/game/all_app"
          :initial-page="2"
          :page-size="21"
          :initial-items="allApps"
        >
          <template #default="{ items }">
            <ContentItemDetail
              v-for="(item, index) in items"
              :key="index"
              :index="index"
              :item="item"
              list-name="app_detail_recommend"
              :to="`/app/${item.path}/`"
            />
          </template>
        </InfiniteScrollList>

        <aside class="box-aside">
          <!-- <GoogleAd ad-slot="3595337216" /> -->
          <adm-slot
            adm-id="app-mid3"
            adm-unit="/23197833490/alltools1/alltools1_detail_3"
            ads-slot="3595337216"
          />
          <h2 class="title-h2">Hot Tools</h2>
          <ContentItemRow
            v-for="(item, index) in hotApps"
            :key="index"
            :item="item"
            :index="index"
            list-name="app_detail_hot"
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
import { getFeaturedEffect } from "~/utils/featuredEffects";
import "swiper/css/swiper.min.css";

export default {
  directives: {
    swiper: directive
  },

  async asyncData({ $axios, params, env }) {
    try {
      const path = params.app;
      const lastDashIndex = path.lastIndexOf("-");
      const id = path.substring(lastDashIndex + 1, path.length);

      const [currentAppResponse, relatedAppsResponse, allAppsResponse, hotAppsResponse] =
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
          $axios.$get("/api/game/all_app", {
            params: {
              site_id: env.SITE_ID,
              page: 1,
              size: 21
            }
          }),
          $axios.$get("/api/game/menu", {
            params: {
              site_id: env.SITE_ID,
              mod_id: "best-apps",
              size: 10,
              page: 1
            }
          })
        ]);

      return {
        currentApp: currentAppResponse,
        relatedApps: relatedAppsResponse.list,
        allApps: allAppsResponse.list,
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
        loop: true,
        autoplay: {
          delay: 3000
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      },
      // 放在 data + mounted 里赋值，不用 computed 直接读 window.location——computed 在
      // 服务端/预渲染阶段跟客户端首次渲染都会先跑一遍，这时候拿不到真实域名，容易导致
      // 服务端渲染的 HTML 和客户端 hydrate 之后的 HTML 不一致（hydration mismatch）。
      // 用 mounted（只在客户端执行）赋值，首次渲染统一是 null（不显示），hydrate 完成后
      // 再按真实域名决定要不要显示，服务端和客户端首次渲染结果能对上
      featuredEffect: null
    };
  },
  head() {
    return {
      title: `${this.currentApp.name || "App"} - Download APK | AllTools1 APK Download`
    };
  },
  mounted() {
    trackEvent("detail_page", {
      page_type: "app_detail",
      item_id: this.currentApp.path,
      item_name: this.currentApp.name
    });
    trackFacebookStandardEvent("Lead", {
      content_type: "app_detail",
      content_name: this.currentApp.name
    });
    this.featuredEffect = getFeaturedEffect(this.currentApp.path);
  },
  methods: {
    trackDownloadClick(buttonType) {
      const params = {
        page_type: "app_detail",
        button_type: buttonType,
        item_id: this.currentApp.path,
        item_name: this.currentApp.name
      };
      trackEvent("download_click", params);
      trackFacebookStandardEvent("InitiateCheckout", params);
      // 不在这里重复打 CompleteRegistration：这个按钮本身是个 CustomLink（见上面模板），
      // CustomLink.vue 自己的 handleClick 已经会在 page_type 为 app_detail 时打一次
      // CompleteRegistration 了——@pointerdown.native 和 CustomLink 内部的 @pointerdown
      // 是绑在同一个元素同一个事件上的两个独立监听器，点一次两个都会触发，这里再打一次
      // 会导致同一次点击 CompleteRegistration 上报两次（曾经的真实 bug，已修正）
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~/assets/css/game.scss";
.shadow-hidden {
  box-shadow: none;
}

// 参照 apkuick 的样式：白色平面背景，不用站内其他地方那套立体阴影配色
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

.primary-download {
  display: flex;
  width: 100%;
  height: 56px;
  border-radius: 32px;
  background: $color2;
  color: #ffffff;
  font-family: "sesb";
  font-size: 17px;
  @include center;
  cursor: pointer;
  // 上面紧挨着的是第一个页内广告位，原来没设上边距，两者贴在一起，容易在想点广告/
  // 想点下载按钮的时候互相误触，加一点间距分开
  margin-top: 24px;
  margin-bottom: 24px;
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

.featured-effects {
  // 不设上边距，只靠上面 stats-row 自己的 20px 下边距留间距——之前这里也加了 24px
  // 上边距，两个margin叠在一起导致间距显得太大
  margin: 0 0 24px;
}
.featured-effects-card {
  display: block;
  position: relative;
  width: 100%;
  // .title-h2 自己的下边距只有 5px，标题和图片贴得太近，单独再加一点
  margin-top: 10px;
  aspect-ratio: 312 / 181;
  background-size: cover;
  background-position: center;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
}
.featured-effects-scrim {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 32px 16px 14px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.72), rgba(0, 0, 0, 0));
}
.featured-effects-title {
  color: #ffffff;
  font-family: "sesb";
  font-size: 15px;
  line-height: 1.3;
}
.featured-effects-subtitle {
  margin-top: 2px;
  color: rgba(230, 230, 230, 0.75);
  font-family: "se";
  font-size: 11px;
  line-height: 1.3;
}
.featured-effects-arrow {
  position: absolute;
  right: 14px;
  bottom: 14px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  // 箭头落在底部渐变遮罩（.featured-effects-scrim）范围内，这片区域本身就已经被
  // 一层黑色半透明遮罩压暗了，不受原图明暗影响，所以圆圈用白色半透明、箭头用纯白
  // 就够清楚，不用再跟着原图调整颜色
  background: rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}
.icon-chevron-right {
  // 原来用图片素材缩小到这么小的尺寸，浏览器缩放会让边缘发虚，看起来不是纯白——
  // 改成纯 CSS 画的箭头（跟 .icon-verified 那个对勾是同一个手法：两条边框拼成形状再
  // 旋转），不管多小都是清晰的纯白色，不依赖图片缩放
  width: 7px;
  height: 7px;
  border-top: 2px solid #ffffff;
  border-right: 2px solid #ffffff;
  transform: rotate(45deg);
  margin-left: -2px;
}

.icon-download-cta {
  @include icon(22px, 22px, "icon-download.png");
  margin-right: 10px;
  filter: brightness(0) invert(1);
}

// game.scss 里 .table-content 默认是立体阴影配色，这个页面改成跟上面 header 一样的
// 白色/浅灰平面风格，不用阴影
.table-content {
  box-shadow: none;
  background: #f5f6f8;
}
// Related Apps 卡片网格和下面的 Recommend 标题靠得太近，title-h2 自己的 margin-top
// 只有 10px，加大一点间距
.box-common + .title-h2 {
  margin-top: 32px;
}
// game.scss 全局的 .icon-android/.icon-ios 用的是纯橙色图标(icon-android3/ios3)，
// 跟 Category/Size 这些"深灰+橙色小点"风格的图标不搭，OS这一行单独换成同色系的版本
.table-cell .icon-android {
  @include icon(16px, 16px, "icon-android.png");
  margin-right: 8px;
}
.table-cell .icon-ios {
  @include icon(16px, 16px, "icon-ios.png");
  margin-right: 8px;
}

// 截图挪到包信息卡片上面，加个 Screenshots 标题，高度固定 250px（不用 game.scss 里
// .application-desc 那套自带描述文字的截图轮播样式）
.screenshots {
  margin: 24px 0;
}
.screenshots .swiper-bg {
  margin: 16px 0 0 !important;
  padding: 0;
  height: auto !important;
  border-radius: 0 !important;
  display: block !important;
}
.screenshots .swiper-box {
  width: 100%;
  height: auto !important;
  overflow: hidden;
  position: relative;
}
.screenshots .swiper-wrapper {
  height: auto !important;
}
.screenshots .swiper-slide {
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
.screenshots .swiper-tool {
  position: static !important;
  top: auto !important;
  left: auto !important;
  width: auto !important;
  height: 0 !important;
  margin: 0 !important;
  display: block !important;
}
.screenshots .swiper-tool .swiper-pagination {
  display: none !important;
}
.screenshots .swiper-button-prev,
.screenshots .swiper-button-next {
  position: absolute !important;
  top: 50% !important;
  bottom: auto !important;
  transform: translateY(-50%) !important;
  width: 32px !important;
  height: 32px !important;
  margin: 0 !important;
  background: $color2;
  border-radius: 50%;
  z-index: 2;
  display: flex !important;
  &::after {
    color: #fff;
    font-size: 14px;
    font-weight: bold;
  }
}
.screenshots .swiper-button-prev {
  left: 8px;
}
.screenshots .swiper-button-next {
  right: 8px;
}

@media screen and (max-width: 879px) {
  .box-common + .title-h2 {
    margin-top: vw(48);
  }
  .table-cell:last-child {
    padding-left: vw(24);
  }
  .screenshots {
    margin: vw(36) 0;
  }
  .screenshots .swiper-bg {
    padding: 0 vw(46);
  }
  // 基础规则（非移动端那份）给 .swiper-slide 和 .img 的高度都加了 !important，
  // 这里的覆盖也必须带 !important 才能真正生效，不然会被忽略（之前这里写的是跟基础
  // 规则一样的 250px，没加 !important 也"生效"了，只是因为数值刚好相同、其实从没真正
  // 覆盖过，现在要改小就必须带上）
  .screenshots .swiper-slide {
    height: 210px !important;
    margin-right: 8px;
  }
  .screenshots .swiper-slide .img {
    height: 210px !important;
    max-height: 210px !important;
    border-radius: vw(24);
  }
  .app-header {
    padding: 0 vw(46);
    margin-top: vw(36);
  }
  // 这个页面的其他区块（app-header、stats-row 等）都是各自在移动端单独加左右
  // padding，不是靠外层容器统一留边距，这里也要照样加，不然卡片会贴着屏幕两边、
  // 跟页面其他内容的左右边距不一致
  .featured-effects-card {
    margin: 10px vw(46) 0;
    width: calc(100% - vw(92));
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
    margin: vw(36) vw(46);
    width: calc(100% - vw(92));
    height: vw(96);
    border-radius: vw(48);
    font-size: vw(28);
  }
  .icon-download-cta {
    width: vw(36);
    height: vw(36);
  }
}
</style>
