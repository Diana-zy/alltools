<template>
  <div class="page">
    <Header />
    <main class="main">
      <div class="main-left">
        <Breadcrumb :name="currentApp.name" />
        <section class="application-info">
          <NuxtImg
            format="auto"
            fit="cover"
            width="156"
            height="156"
            :src="currentApp.icon"
            :alt="currentApp.name"
            loading="lazy"
            class="icon"
          ></NuxtImg>
          <div class="info">
            <div class="name"
              >{{ currentApp.name }}<i v-if="currentApp.is_verified" class="icon-verified"></i
            ></div>
            <div v-if="currentApp.developer" class="developer">{{ currentApp.developer }}</div>
            <div class="rating">
              <div class="rating-star">
                <p :style="{ width: (((currentApp.score || 4.6) / 5) * 100).toFixed(0) + '%' }"></p>
              </div>
              {{ currentApp.score || 4.6 }}
            </div>
          </div>
          <CustomLink class="get-it-now" :to="`/download/${currentApp.path}/`">
            <i class="icon-get-it-now"></i>Get App
          </CustomLink>
        </section>

        <!-- <GoogleAd ad-slot="7534582229" /> -->
        <adm-slot
          adm-id="app-mid1"
          adm-unit="/23197833490/alltools1/alltools1_detail_1"
          ads-slot="7534582229"
        />

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
            <div v-if="currentApp.downloads" class="table-row">
              <div class="table-cell">Downloads</div>
              <div class="table-cell">{{ currentApp.downloads }}</div>
            </div>
            <div v-if="currentApp.developer" class="table-row">
              <div class="table-cell">Developer</div>
              <div class="table-cell">{{ currentApp.developer }}</div>
            </div>
            <div v-if="currentApp.content_rating" class="table-row">
              <div class="table-cell">Content Rating</div>
              <div class="table-cell">{{ currentApp.content_rating }}</div>
            </div>
            <div v-if="currentApp.price" class="table-row">
              <div class="table-cell">Price</div>
              <div class="table-cell">{{ currentApp.price }}</div>
            </div>
          </div>
        </section>

        <section class="application-desc">
          <div v-if="currentApp.banner_list.length > 0" class="swiper-bg">
            <div v-swiper:Swiper="swiperOption" class="swiper-box">
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

        <!-- <GoogleAd ad-slot="8029406241" class="ad-width" /> -->
        <adm-slot
          adm-id="app-mid2"
          adm-unit="/23197833490/alltools1/alltools1_detail_2"
          ads-slot="8029406241"
          class="ad-width"
        />

        <section class="get-the-game">
          <CustomLink class="download" :to="`/download/${currentApp.path}/`"
            ><i class="icon-download"></i>Download
          </CustomLink>
          <div class="tip">
            * For reference, the {{ currentApp.name }} download sources are all verified, there are
            no viruses and malware.
          </div>
        </section>

        <!-- <section class="download-info">
          <div class="base-info">
            <NuxtImg
              format="auto"
              fit="cover"
              width="210"
              height="210"
              class="icon"
              :src="currentApp.icon"
              :alt="currentApp.name"
            />
            <div class="base-info-content">
              <div class="name">
                {{ currentApp.name }}
              </div>

              <div class="platform">
                <div v-if="currentApp.android" class="android">
                  <i class="icon-android1"></i>Android
                  <div class="qrcode">
                    Android
                    <img :src="qrCodeGoogle" alt="qrcode" />
                  </div>
                  <a :href="currentApp.android_web_url"></a>
                </div>

                <div v-if="currentApp.ios" class="ios">
                  <i class="icon-ios1"></i>iOS
                  <div class="qrcode">
                    iOS
                    <img :src="qrCodeIos" alt="qrcode" />
                  </div>
                  <a :href="currentApp.ios_web_url"></a>
                </div>
              </div>
            </div>
          </div>
          <div class="tip">
            * For reference, the {{ currentApp.name }} download sources are all verified, there are
            no viruses and malware.
          </div>
        </section> -->

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
// import QRCode from "qrcode";
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
      // qrCodeGoogle: "",
      // qrCodeIos: "",
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
  // mounted() {
  //   if (this.currentApp.ios_web_url) {
  //     this.generateQRCode(this.currentApp.ios_web_url).then((data) => {
  //       this.qrCodeIos = data;
  //     });
  //   }
  //   if (this.currentApp.android_web_url) {
  //     this.generateQRCode(this.currentApp.android_web_url).then((data) => {
  //       this.qrCodeGoogle = data;
  //     });
  //   }
  // },
  // methods: {
  //   async generateQRCode(url) {
  //     try {
  //       const qrCodeDataURL = await QRCode.toDataURL(url);
  //       return qrCodeDataURL;
  //     } catch (error) {
  //       console.error("Error generating QR code:", error);
  //     }
  //   }
  // },
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
.application-info {
  height: auto;
  min-height: 112px;
}
.application-info .info {
  height: auto;
  justify-content: center;
}
.application-info .name {
  display: flex;
  align-items: center;
}
.icon-verified {
  width: 16px;
  height: 16px;
  margin-left: 6px;
  border-radius: 50%;
  background: #2bb673;
  position: relative;
  flex-shrink: 0;
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
.application-info .developer {
  color: rgba($font1, 0.6);
  font-size: 14px;
  margin-top: 4px;
}
.application-info .rating {
  margin-top: 6px;
}
@media screen and (max-width: 879px) {
  .application-info {
    height: auto;
    min-height: vw(160);
  }
  .application-info .info {
    height: auto;
    justify-content: center;
  }
  .application-info .rating {
    margin-top: vw(8);
  }
  .icon-verified {
    width: vw(28);
    height: vw(28);
    margin-left: vw(8);
    &::after {
      top: vw(6);
      left: vw(6);
      width: vw(14);
      height: vw(8);
    }
  }
  .application-info .developer {
    font-size: vw(24);
    margin-top: vw(6);
    width: vw(320);
    @include ellipsis;
  }
}
</style>
