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
            loading="lazy"
            class="icon"
          ></NuxtImg>
          <div class="header-main">
            <div class="name">{{ currentApp.name }}</div>
            <CustomLink
              v-if="currentApp.category_name"
              class="category-badge"
              :to="`/category/${currentApp.category_path}/`"
              >{{ currentApp.category_name }}</CustomLink
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

        <!-- Download 按钮放在第一个广告位下面：顶部如果有锚定广告，展开/折叠会把按钮遮住，
        放在广告下面能避免被挡住 -->
        <CustomLink class="primary-download" :to="`/download/${currentApp.path}/`">
          <i class="icon-download-cta"></i>Download Latest APK
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
                    height="250"
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
        </section>

        <!-- 页内广告位：跟其他 adm-slot 一样走 BI 广告投放系统，ad-unit/ads-slot 需要在 Google Ad
        Manager/AdSense 后台新建一个真实广告位后再替换成正式 ID，现在这个是占位值。 -->
        <adm-slot
          adm-id="app-mid1b"
          adm-unit="/23197833490/alltools1/alltools1_detail_1b"
          ads-slot="0000000003"
          class="ad-width"
        />

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
import { directive } from "vue-awesome-swiper";
import { shuffleArray } from "~/utils/utils";
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
      title: `${this.currentApp.name || "App"} - Download APK | AllTools1 APK Download`
    };
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
  margin-bottom: 24px;
  animation: breathe 1.8s ease-in-out infinite;
}

@keyframes breathe {
  0%,
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(253, 107, 33, 0.45);
  }
  50% {
    transform: scale(1.03);
    box-shadow: 0 0 0 10px rgba(253, 107, 33, 0);
  }
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

// 截图挪到包信息卡片上面，加个 Screenshots 标题，高度固定 250px（不用 game.scss 里
// .application-desc 那套自带描述文字的截图轮播样式）
.screenshots {
  margin: 24px 0;
}
.screenshots .title-h2 {
  margin: 10px 0 5px;
  padding: 0;
  height: auto;
  font-size: 18px;
  font-weight: bold;
  text-align: left;
}
.screenshots .swiper-bg {
  margin-top: 16px;
  overflow: hidden;
  position: relative;
}
.screenshots .swiper-box {
  width: 100%;
}
.screenshots .swiper-slide {
  width: auto;
  margin-right: 16px;
  .img {
    height: 250px;
    width: auto;
    object-fit: contain;
    border-radius: 16px;
    border: 1px solid #eef0f3;
  }
}
.screenshots .swiper-tool {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 12px;
  .swiper-pagination {
    position: static;
    width: auto;
  }
}
.screenshots .swiper-button-prev,
.screenshots .swiper-button-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 32px;
  height: 32px;
  margin: 0;
  background: $color2;
  border-radius: 50%;
  z-index: 2;
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
  .table-cell:last-child {
    padding-left: vw(24);
  }
  .screenshots {
    padding: 0 vw(46);
    margin: vw(36) 0;
  }
  .screenshots .swiper-slide .img {
    height: 250px;
    border-radius: vw(24);
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
  .primary-download {
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
}
</style>
