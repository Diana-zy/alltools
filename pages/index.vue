<template>
  <div class="page">
    <div class="fix-bg"></div>
    <div class="fix-bg1"></div>
    <Header current-path="home" />
    <main class="main">
      <section class="rec">
        <div class="rec-content">
          <transition
            v-for="(item, index) in bestGames.slice(0, 2)"
            :key="index"
            :item="item"
            :index="index"
            name="fade"
          >
            <div v-show="recIndex === index">
              <CustomLink :to="`/game/${item.path}/`" class="img-box">
                <NuxtImg
                  format="auto"
                  fit="cover"
                  width="592"
                  height="400"
                  :src="item.pc_img || item.icon"
                  :alt="item.name"
                  :preloader="index === 0"
                  class="img m-hidden"
                />
                <NuxtImg
                  format="auto"
                  fit="cover"
                  width="332"
                  height="416"
                  :src="item.mobile_img || item.icon"
                  :alt="item.name"
                  :preloader="index === 0"
                  class="img pc-hidden"
                />
              </CustomLink>
              <CustomLink :to="`/game/${item.path}/`" class="info">
                <p class="name">{{ item.name }}</p>
                <div class="rating">
                  <div class="rating-star">
                    <p :style="{ width: (((item.score || 4.6) / 5) * 100).toFixed(0) + '%' }"></p>
                  </div>
                  {{ item.score.length == 1 ? item.score + ".0" : item.score || 4.6 }}
                </div>
              </CustomLink>
              <CustomLink :to="`/game/${item.path}/`" class="item-icon">
                <NuxtImg
                  format="auto"
                  fit="cover"
                  width="120"
                  height="120"
                  :src="item.icon"
                  :alt="item.name"
                  :preloader="index === 0"
                  class="icon"
                />
              </CustomLink>
            </div>
          </transition>

          <div
            v-for="(item, index) in bestGames.slice(0, 2)"
            :key="index"
            :item="item"
            :index="index"
          >
            <CustomLink
              v-show="recIndex === index"
              :to="`/game/${item.path}/`"
              class="download-box"
            >
              <div class="download"><i class="icon-pc-pwa" /></div>
            </CustomLink>
          </div>

          <CustomLink to="/best/" class="module-name"> Best Games ></CustomLink>
          <div class="corner"></div>
        </div>
      </section>
      <section class="new">
        <div class="new-content">
          <div class="item-content">
            <transition
              v-for="(item, index) in newGames.slice(0, 6)"
              :key="index"
              :item="item"
              :index="index"
              name="fade"
            >
              <CustomLink v-show="newIndex === index" :to="`/game/${item.path}/`" class="item">
                <p class="name">{{ item.name }}</p>
                <div class="score"
                  ><i class="icon-star" />
                  <span>
                    {{ item.score.length == 1 ? item.score + ".0" : item.score || 4.6 }}</span
                  ></div
                >
              </CustomLink>
            </transition>

            <transition
              v-for="(item, index) in newGames.slice(0, 6)"
              :key="index"
              :item="item"
              :index="index"
              name="fade"
            >
              <CustomLink v-show="newIndex === index" :to="`/game/${item.path}/`" class="img-box">
                <NuxtImg
                  format="auto"
                  fit="cover"
                  width="448"
                  height="469"
                  :src="item.pc_img || item.icon"
                  :alt="item.name"
                  :preloader="index === 1"
                  class="img m-hidden"
                />
                <NuxtImg
                  format="auto"
                  fit="cover"
                  width="332"
                  height="438"
                  :src="item.mobile_img || item.icon"
                  :alt="item.name"
                  :preloader="index === 1"
                  class="img pc-hidden"
                />
              </CustomLink>
            </transition>

            <CustomLink to="/new/" class="new-name"> New Games > </CustomLink>

            <div v-once v-swiper:mySwiper="swiperOption" class="swiper-box">
              <div class="swiper-wrapper">
                <CustomLink
                  v-for="(item, i) in newGames.slice(0, 6)"
                  :key="i"
                  :to="`/game/${item.path}/`"
                  class="swiper-slide"
                >
                  <NuxtImg
                    format="auto"
                    fit="cover"
                    width="130"
                    height="130"
                    :src="item.icon"
                    :alt="item.name"
                    class="swiper-img"
                  />
                  <div class="rating">
                    <div class="rating-star"> </div>
                    {{ item.score.length == 1 ? item.score + ".0" : item.score || 4.6 }}
                  </div>
                </CustomLink>
              </div>
            </div>
            <div class="swiper-button">
              <div class="swiper-button-prev"></div>
              <div class="swiper-button-next"></div>
            </div>
          </div>
        </div>
      </section>
      <article class="article">
        <CustomLink to="/bestools/" class="title-h2"
          >Best Tools<div class="title-see-more"><span>More</span><i class="icon-arrow" /></div
        ></CustomLink>
        <section class="best-tools">
          <div class="box-row-scroll box-scroll-hidden">
            <ContentItemRow
              v-for="(item, index) in bestApps.slice(0, 12)"
              :key="index"
              :item="item"
              :index="index"
              :eager="2"
              :to="`/app/${item.path}/`"
            />
          </div>
          <div class="box-list-section">
            <ContentItemList
              v-for="(item, index) in bestApps.slice(0, 12)"
              :key="index"
              :index="index"
              :item="item"
              :to="`/${'app'}/${item.path}/`"
            />
          </div>
        </section>
        <CustomLink to="/newtools/" class="title-h2">
          New Tools <div class="title-see-more"><span>More</span><i class="icon-arrow" /></div
        ></CustomLink>
        <section class="new-tools">
          <div class="box-row-scroll box-scroll-hidden">
            <ContentItemRow
              v-for="(item, index) in newApps.slice(0, 12)"
              :key="index"
              :item="item"
              :index="index"
              :to="`/app/${item.path}/`"
            />
          </div>
          <div class="box-list-section">
            <ContentItemList
              v-for="(item, index) in newApps.slice(0, 12)"
              :key="index"
              :index="index"
              :item="item"
              :to="`/${'app'}/${item.path}/`"
            />
          </div>
        </section>

        <div class="title-h2">Recommend </div>
        <InfiniteScrollList2
          class="box-common module-background"
          api-endpoint="/api/game/all_app"
          :initial-page="2"
          :page-size="20"
          :initial-items="all"
        >
          <template #default="{ items }">
            <ContentItemCommon
              v-for="(item, index) in items"
              :key="index"
              :index="index"
              :item="item"
              :to="item.type === 1 ? `/game/${item.path}/` : `/app/${item.path}/`"
            />
          </template>
        </InfiniteScrollList2>
      </article>
    </main>
    <Footer />
    <BackTop />
    <!-- <AdLoading /> -->
  </div>
</template>

<script>
import { directive } from "vue-awesome-swiper";
export default {
  directives: {
    swiper: directive
  },
  async asyncData({ $axios, env }) {
    try {
      // 并行处理多个异步请求
      const [
        bestGamesResponse,
        bestAppsResponse,
        newAppsResponse,
        newGamesResponse,
        allGamesResponse,
        allAppsResponse
      ] = await Promise.all([
        $axios.$get("/api/game/menu", {
          params: {
            site_id: env.SITE_ID,
            mod_id: "best-games",
            size: 15
          }
        }),
        $axios.$get("/api/game/menu", {
          params: {
            site_id: env.SITE_ID,
            mod_id: "best-apps",
            size: 15
          }
        }),
        $axios.$get("/api/game/menu", {
          params: {
            site_id: env.SITE_ID,
            mod_id: "new-apps",
            size: 15
          }
        }),
        $axios.$get("/api/game/menu", {
          params: {
            site_id: env.SITE_ID,
            mod_id: "new-games",
            size: 15
          }
        }),
        $axios.$get("/api/game/all_game", {
          params: {
            site_id: env.SITE_ID,
            page: 1,
            size: 20
          }
        }),
        $axios.$get("/api/game/all_app", {
          params: {
            site_id: env.SITE_ID,
            page: 1,
            size: 20
          }
        })
      ]);

      const result = [];
      for (let i = 0; i < Math.max(allAppsResponse.list.length, allAppsResponse.list.length); i++) {
        if (i < allAppsResponse.list.length) {
          result.push(allAppsResponse.list[i]);
        }
        if (i < allGamesResponse.list.length) {
          result.push(allGamesResponse.list[i]);
        }
      }

      // 返回多个接口的数据
      return {
        all: result,
        bestGames: bestGamesResponse.list,
        bestApps: bestAppsResponse.list,
        newApps: newAppsResponse.list,
        newGames: newGamesResponse.list,
        allGames: allGamesResponse.list
      };
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
  data() {
    return {
      recIndex: 0,
      newIndex: 0,
      bannerApps: [],
      deferredPrompt: null,
      showInstallButton: false,
      input: "",
      loading: false,
      endOfList: false,
      currentPage: 2,
      swiperOption: {
        slidesPerView: "auto",
        loop: true,
        speed: 1000,
        grabCursor: true,
        direction: "horizontal",
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        on: {
          slideChange: this.onSlideChange
        }
      }
    };
  },
  mounted() {
    this.nextSlide();
    this.$nextTick(() => {
      this.scrollAnchor();
    });
  },
  methods: {
    nextSlide() {
      this.currentChangeTimer = setInterval(() => {
        this.recIndex = (this.recIndex + 1) % 2;
        console.log("recIndex" + this.recIndex);
      }, 4000);
    },
    onSlideChange() {
      this.newIndex = (this.mySwiper && this.mySwiper.realIndex) || 0;
      console.log(this.newIndex);
    },
    scrollAnchor() {
      const scrollDistance = 200; // 滚动距离，单位：像素
      const duration = 2000; // 滚动持续时间，单位：毫秒

      const startPosition = window.pageYOffset;
      const targetPosition = startPosition + scrollDistance;
      const startTime = performance.now();
      let animationFrameId;

      function scrollStep(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1); // 进度值，范围在 0 到 1 之间
        const ease = easeInOutQuad(progress); // 使用缓动函数计算当前进度
        const currentScroll = startPosition + (targetPosition - startPosition) * ease;

        window.scrollTo(0, currentScroll);

        if (elapsed < duration) {
          animationFrameId = requestAnimationFrame(scrollStep);
        }
      }

      function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      }

      function stopScrolling() {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }
      }

      // 监听用户交互事件
      window.addEventListener("mousemove", stopScrolling);
      window.addEventListener("mousedown", stopScrolling);
      window.addEventListener("touchstart", stopScrolling);
      window.addEventListener("touchmove", stopScrolling);

      requestAnimationFrame(scrollStep);
    }
  }
};
</script>
<style lang="scss" scoped>
.page {
  position: relative;
}
.fix-bg {
  width: 100%;
  height: 400px;
  position: absolute;
  top: 64px;
  left: 0;
  background: $color3;
}
.fix-bg1 {
  width: 100%;
  height: 400px;
  position: absolute;
  top: 464px;
  left: 0;
  background: #fffcf0;
}
.main {
  max-width: 1440px;
  margin: 0 auto;
}

.article {
  max-width: 1200px;
  margin: 0 auto;
}

.rec {
  position: relative;
  width: 100%;
  height: 400px;

  .rec-content {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: $color3;
  }

  .item {
    display: inline-block;
    width: 100%;
    height: 100%;
  }

  .img-box {
    position: absolute;
    width: 592px;
    height: 400px;
    bottom: 0;
    left: 120px;
    z-index: 2;
    // &::after {
    //   content: "";
    //   width: 100%;
    //   height: 100%;
    //   backdrop-filter: blur(7px);
    //   border-left: 4px solid #ffffff;
    //   display: flex;
    //   float: right;
    //   position: relative;
    //   bottom: 400px;
    //   animation: scan 3.2s;
    //   animation-delay: 0.6s;
    //   animation-fill-mode: forwards;
    //   right: 0;
    //   z-index: 2;
    // }
  }

  .img {
    width: 100%;
    height: 100%;
  }

  @keyframes scan {
    0% {
      width: 100%;
    }
    50% {
      width: 0;
    }
    51% {
      opacity: 1;
    }
    52% {
      opacity: 0;
    }
    100% {
      width: 0;
      opacity: 0;
    }
  }

  .corner {
    width: 182px;
    height: 66px;
    position: absolute;
    bottom: -65px;
    right: 50%;
    transform: translateX(50%);
    @include bg("~/assets/images/icon-corner.png");
    z-index: 1;
  }

  .download-box {
    width: 106px;
    height: 106px;
    background: rgba(242, 242, 242, 0.4);
    box-shadow: inset -4px -4px 5px 0px rgba(255, 255, 255, 0.97),
      inset 4px 4px 5px 0px rgba(183, 102, 118, 0.32), -4px -4px 4px 0px rgba(255, 255, 255, 0.4),
      4px 4px 4px 0px rgba(183, 102, 118, 0.25);
    border-radius: 50%;
    border: 2px solid #f2f2f2;
    @include center;
    position: absolute;
    bottom: -53px;
    right: 49.9%;
    transform: translateX(50%);
    z-index: 3;
  }

  .download {
    width: 82px;
    height: 82px;
    background: #fff9e3;
    box-shadow: -4px -4px 5px 0px rgba(255, 255, 255, 0.4),
      4px 4px 5px 0px rgba(183, 102, 118, 0.25);
    border-radius: 50%;
    @include center;
    .icon-pc-pwa {
      @include icon(40px, 40px, "icon-pc-download.png");
    }
  }

  .module-name {
    width: 340px;
    height: 64px;
    font-family: sebi;
    font-size: 48px;
    color: #fd6b21;
    line-height: 56px;
    position: absolute;
    top: 64px;
    right: 360px;
  }

  .item-icon {
    width: 120px;
    height: 120px;
    border-radius: 20px;
    position: absolute;
    bottom: 120px;
    right: 580px;
    border: 4px solid #ffffff;
    .icon {
      width: 100%;
      height: 100%;
      border-radius: 20px;
    }
  }

  .info {
    width: 378px;
    height: 84px;
    position: absolute;
    bottom: 138px;
    right: 190px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 2;
  }

  .name {
    width: 100%;
    font-family: seb;
    font-size: 32px;
    color: #fd6b21;
    line-height: 44px;
    text-align: left;
    @include ellipsis;
  }

  .rating {
    margin: 10px 0 0;
    color: #fd6b21;
    font-size: 18px;
    line-height: 21px;
    display: flex;
    align-items: center;
  }

  .rating-star {
    margin-right: 4px;
    width: 120px;
    height: 24px;
    @include bg("icon-star-rec1.png");
    background-size: 24px 24px;
    p {
      height: 24px;
      @include bg("icon-star-rec.png");
      background-size: 24px 24px;
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 1s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
  .fade-enter-to,
  .fade-leave {
    opacity: 1;
  }
}
.new {
  width: 100%;
  height: 400px;

  .new-content {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .item-content {
    width: 100%;
    height: 100%;
    background: #fffcf0;
  }

  .item {
    position: absolute;
    display: inline-block;
    width: 100%;
    height: 100%;
  }

  .img-box {
    position: absolute;
    width: 448px;
    height: 469px;
    bottom: 0;
    right: 120px;
    z-index: 3;
  }

  .img {
    width: 100%;
    height: 100%;
  }

  .name {
    width: 500px;
    height: 44px;
    font-family: seb;
    font-size: 32px;
    color: #fd6b21;
    line-height: 44px;
    text-align: left;
    position: absolute;
    bottom: 52px;
    left: 186px;
    @include ellipsis;
  }

  .new-name {
    width: 340px;
    height: 64px;
    font-family: sebi;
    font-size: 48px;
    color: #fd6b21;
    line-height: 56px;
    position: absolute;
    top: 64px;
    left: 182px;
  }

  .rating {
    width: 48px;
    height: 20px;
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    color: #fd6b21;
    line-height: 14px;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 20px 20px 20px 20px;
  }

  .rating-star {
    width: 16px;
    height: 16px;
    @include bg("icon-star-rec.png");
  }

  .score {
    display: none;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 1s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
  .fade-enter-to,
  .fade-leave {
    opacity: 1;
  }
}

.swiper-box {
  width: 640px;
  height: 150px;
  position: absolute;
  bottom: 108px;
  left: 176px;
  z-index: 1;
}

.swiper-slide {
  width: 140px;
  height: 140px;
  background: #fff9e3;
  box-shadow: inset 6px 6px 12px 0px rgba(114, 35, 10, 0.21), inset -6px -6px 12px 0px #ffffff;
  border-radius: 24px 24px 24px 24px;
  border: 2px solid #ffffff;
  margin: 0 10px 0;
  @include center;
  .swiper-img {
    width: 120px;
    height: 120px;
    border-radius: 12px;
  }
}
.swiper-slide-active {
  border: 2px solid #fd6b21;
}
.swiper-button {
  width: 752px;
  height: 46px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  bottom: 164px;
  left: 8%;
}
.swiper-button-prev,
.swiper-button-next {
  position: unset;
  top: unset;
  width: 46px;
  height: 46px;
  margin: 0;
  &::after {
    display: none;
  }
}
.swiper-button-prev {
  @include bg("icon-prev.png");
}
.swiper-button-next {
  @include bg("icon-next.png");
}
.box-row-scroll {
  padding: 4px 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.box-list-section {
  display: none;
}

.box-scroll-hidden {
  display: grid;
}

.pc-hidden {
  display: none;
}

.m-hidden {
  display: block;
}

@media screen and (min-width: 1200px) and (max-width: 1450px) {
  .main {
    max-width: 1210px;
  }
  .rec {
    .img-box {
      left: 10px;
    }
    .module-name {
      right: 240px;
    }
    .item-icon {
      right: 460px;
    }
    .info {
      right: 64px;
    }
  }
  .new {
    .img-box {
      right: 0;
    }
    .name {
      left: 80px;
    }
    .new-name {
      left: 80px;
    }
    .swiper-box {
      left: 70px;
    }
    .swiper-button {
      left: 1%;
    }
  }
}
@media screen and (min-width: 879px) and (max-width: 1240px) {
  .fix-bg {
    height: vw2(400);
  }
  .fix-bg1 {
    height: vw2(400);
    top: calc(64px + vw2(400));
  }
  .rec {
    height: vw2(400);

    .img-box {
      width: vw2(592);
      height: vw2(400);
      left: vw2(10);
    }
    .corner {
      width: vw2(182);
      height: vw2(66);
      bottom: vw2(-65);
    }
    .download-box {
      width: vw2(106);
      height: vw2(106);
      box-shadow: inset vw2(-4) vw2(-4) vw2(5) 0px rgba(255, 255, 255, 0.97),
        inset vw2(4) vw2(4) vw2(5) 0px rgba(183, 102, 118, 0.32),
        vw2(-4) vw2(-4) vw2(4) 0px rgba(255, 255, 255, 0.4),
        vw2(4) vw2(4) vw2(4) 0px rgba(183, 102, 118, 0.25);
      border: vw2(2) solid #f2f2f2;
      bottom: vw2(-53);
    }
    .download {
      width: vw2(82);
      height: vw2(82);
      background: #fff9e3;
      box-shadow: vw2(-4) vw2(-4) vw2(5) 0px rgba(255, 255, 255, 0.4),
        vw2(4) vw2(4) vw2(5) 0px rgba(183, 102, 118, 0.25);
      .icon-pc-pwa {
        width: vw2(40);
        height: vw2(40);
      }
    }
    .module-name {
      width: vw2(340);
      height: vw2(64);
      font-size: vw2(48);
      line-height: vw2(56);
      top: vw2(64);
      right: vw2(240);
    }
    .item-icon {
      width: vw2(120);
      height: vw2(120);
      border-radius: vw2(20);
      bottom: vw2(120);
      right: vw2(460);
      border: vw2(4) solid #ffffff;
      .icon {
        border-radius: vw2(40);
      }
    }
    .info {
      width: vw2(378);
      height: vw2(84);
      bottom: vw2(138);
      right: vw2(64);
    }
    .name {
      font-size: vw2(32);
      line-height: vw2(44);
    }
    .rating {
      margin: vw2(10) 0 0;
      font-size: vw2(18);
      line-height: vw2(21);
    }
    .rating-star {
      margin-right: vw2(4);
      width: vw2(120);
      height: vw2(24);
      background-size: vw2(24) vw2(24);
      p {
        height: vw2(24);
        background-size: vw2(24) vw2(24);
      }
    }
  }
  .new {
    height: vw2(400);

    .img-box {
      width: vw2(448);
      height: vw2(469);
      right: vw2(0);
    }
    .name {
      width: vw2(185);
      height: vw2(44);
      bottom: vw2(52);
      left: vw2(80);
      font-size: vw2(32);
      line-height: vw2(44);
    }
    .new-name {
      width: vw2(340);
      height: vw2(64);
      font-size: vw2(48);
      line-height: vw2(56);
      top: vw2(64);
      left: vw2(80);
    }
    .rating {
      width: vw2(48);
      height: vw2(20);
      bottom: vw2(10);
      font-size: vw2(12);
      line-height: vw2(14);
      border-radius: vw2(20);
    }
    .rating-star {
      width: vw2(16);
      height: vw2(16);
    }
  }
  .swiper-box {
    width: vw2(640);
    height: vw2(150);
    bottom: vw2(108);
    left: vw2(70);
  }
  .swiper-slide {
    width: vw2(140);
    height: vw2(140);
    box-shadow: inset vw2(6) vw2(6) vw2(12) 0px rgba(114, 35, 10, 0.21),
      inset vw2(-6) vw2(-6) vw2(12) 0px #ffffff;
    border-radius: vw2(24);
    border: vw2(2) solid #ffffff;
    margin: 0 vw2(10) 0;
    .swiper-img {
      width: vw2(120);
      height: vw2(120);
      border-radius: vw2(12);
    }
  }
  .swiper-slide-active {
    border: vw2(2) solid #fd6b21;
  }
  .swiper-button {
    display: none;
    width: vw2(752);
    height: vw2(46);
    bottom: vw2(164);
    left: 1%;
  }
  .swiper-button-prev,
  .swiper-button-next {
    width: vw2(46);
    height: vw2(46);
  }
}
@media screen and (max-width: 879px) {
  .page {
    background: $color1;
  }
  .fix-bg {
    display: none;
  }
  .fix-bg1 {
    display: none;
  }
  .main {
    padding: 0;
  }

  .rec {
    height: vw(416);

    .img-box {
      width: vw(332);
      height: 100%;
      bottom: 0;
      left: 0;
    }

    .corner {
      width: vw(246);
      height: vw(72);
      bottom: vw(-72);
      right: 50%;
      transform: translateX(50%);
      @include bg("~/assets/images/icon-corner-m.png");
    }
    .download-box {
      width: vw(126);
      height: vw(126);
      background: #ffd89d;
      box-shadow: 3px 3px 6px 0px rgba(104, 28, 28, 0.35),
        -3px -3px 6px 0px rgba(255, 255, 255, 0.4), inset 3px 3px 6px 0px rgba(104, 28, 28, 0.35),
        inset -3px -3px 6px 0px rgba(255, 255, 255, 0.45);
      border-radius: 50%;
      border: 2px solid #fff9e3;
      @include center;
      bottom: vw(-63);
      right: 50%;
      transform: translateX(50%);
    }
    .download {
      width: vw(98);
      height: vw(98);
      background: #fff9e3;
      box-shadow: 3px 3px 6px 0px rgba(104, 28, 28, 0.35),
        -3px -3px 6px 0px rgba(255, 255, 255, 0.4);
      border-radius: 50%;
      @include center;
      .icon-pc-pwa {
        @include icon(vw(48), vw(48), "icon-m-download.png");
      }
    }
    .module-name {
      width: vw(300);
      height: vw(58);
      font-size: vw(44);
      line-height: vw(52);
      top: vw(32);
      right: vw(74);
    }

    .item-icon {
      width: vw(96);
      height: vw(96);
      border-radius: vw(20);
      top: vw(114);
      right: vw(280);
      border: vw(2) solid #ffffff;
      .icon {
        border-radius: vw(20);
      }
    }
    .info {
      width: vw(340);
      height: vw(88);
      bottom: vw(106);
      right: vw(36);
    }

    .name {
      font-size: vw(36);
      line-height: vw(46);
    }
    .rating {
      margin: 0;
      font-size: vw(24);
      line-height: vw(30);
    }
    .rating-star {
      margin-right: vw(2);
      width: vw(160);
      height: vw(32);
      @include bg("icon-star-rec1.png");
      background-size: vw(32) vw(32);
      p {
        height: vw(32);
        @include bg("icon-star-rec.png");
        background-size: vw(32) vw(32);
      }
    }
  }

  .new {
    height: vw(416);

    .img-box {
      position: absolute;
      width: vw(320);
      height: vw(438);
      bottom: 0;
      right: 0;
    }

    .name {
      width: vw(362);
      height: vw(48);
      font-size: vw(36);
      line-height: vw(44);
      bottom: vw(95);
      left: vw(46);
    }

    .new-name {
      width: vw(380);
      height: vw(58);
      font-size: vw(44);
      line-height: vw(56);
      top: vw(64);
      left: vw(46);
    }
    .rating {
      width: vw(68);
      height: vw(24);
      bottom: vw(8);
      left: 50%;
      transform: translateX(-50%);
      font-size: vw(20);
      color: $font1;
      line-height: vw(28);
      background: rgba(255, 255, 255, 0.6);
      border-radius: vw(32);
    }

    .rating-star {
      width: vw(20);
      height: vw(20);
      @include bg("icon-star-rec.png");
    }

    .score {
      width: vw(200);
      display: flex;
      position: absolute;
      bottom: vw(56);
      left: vw(46);

      .icon-star {
        @include icon(vw(32), vw(32), "icon-star-rec.png");
      }

      span {
        margin: vw(2) 0 0 vw(4);
        font-size: vw(24);
        color: #fd6b21;
        line-height: vw(30);
      }
    }
  }
  .swiper-box {
    width: vw(390);
    height: vw(130);
    position: absolute;
    bottom: vw(146);
    left: vw(26);
    z-index: 1;
  }

  .swiper-slide {
    width: vw(112);
    height: vw(112);
    box-shadow: 4px 4px 8px 0px rgba(94, 58, 3, 0.16), -4px -4px 8px 0px #ffffff,
      inset 0 0 0 0 rgba(94, 3, 3, 0.18), inset 0 0 0 0 rgba(255, 255, 255, 0.5);

    border-radius: vw(24);
    border: 1px solid #ffffff;
    margin: 0 vw(8) 0;
    @include center;
    .swiper-img {
      width: vw(96);
      height: vw(96);
      border-radius: vw(16);
    }
  }
  .swiper-slide-active {
    box-shadow: inset 4px 4px 8px 0px rgba(94, 3, 3, 0.18),
      inset -4px -4px 8px 0px rgba(255, 255, 255, 0.5);
    border: 1px solid #fd6b21;
  }

  .swiper-button {
    display: none;
  }

  .box-row-scroll {
    display: none;
    // padding: vw(24) vw(46);
    // grid-template-columns: repeat(4, vw(510));
    // gap: vw(32);
    // @include scroll;
    // z-index: 2;
    // position: relative;
  }

  .box-common {
    margin: 0;
    padding: 0 vw(46);
  }

  .box-list-section {
    display: grid;
  }

  .title-h2 {
    position: relative;
    height: vw(72);
    z-index: 2;
  }

  .box-scroll-hidden {
    display: none;
  }

  .pc-hidden {
    display: block;
  }

  .m-hidden {
    display: none;
  }
}
</style>
