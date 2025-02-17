<template>
  <div class="page">
    <Header ref="headerElem" current-path="home" />
    <main class="main">
      <section class="rec m-hidden">
        <div v-once v-swiper:pcSwiper="swiperOption" class="swiper-box">
          <div class="swiper-wrapper">
            <div
              v-for="(item, index) in best"
              :key="index"
              :item="item"
              class="swiper-slide m-hidden"
            >
              <CustomLink :to="item.type === 1 ? `/game/${item.path}/` : `/app/${item.path}/`">
                <NuxtImg
                  class="img"
                  format="auto"
                  fit="cover"
                  width="1200"
                  height="380"
                  :src="item.pc_img || item.icon"
                  :alt="item.name"
                  :preloader="index === 0"
                />
                <NuxtImg
                  class="rec-icon"
                  format="auto"
                  fit="cover"
                  width="80"
                  height="80"
                  :src="item.icon"
                  :alt="item.name"
                />
                <p class="name">{{ item.name }}</p>
                <div class="rating">
                  <div class="rating-star">
                    <p :style="{ width: (((item.score || 4.6) / 5) * 100).toFixed(0) + '%' }"></p>
                  </div>
                </div>
              </CustomLink>
              <CustomLink to="/best/" class="download-btn m-button-hidden"
                ><i class="icon-best" />Best Games</CustomLink
              >
              <CustomLink to="/best/" class="arrow"><i class="icon-arrow" /></CustomLink>
            </div>
          </div>
          <div class="swiper-pagination"> </div>
        </div>
      </section>
      <!-- <section class="m-rec pc-hidden">
        <div class="rec1" :class="{ rec1Active: currentModule === 1 }">
          <transition
            v-for="(item, index) in best"
            :key="index"
            :item="item"
            :index="index"
            name="fade"
          >
            <CustomLink
              v-show="currentIndex1 === index"
              :to="item.type === 1 ? `/game/${item.path}/` : `/app/${item.path}/`"
              class="item"
            >
              <NuxtImg
                format="auto"
                fit="cover"
                width="340"
                height="496"
                :src="item.mobile_img || item.icon"
                :alt="item.name"
                class="img"
              />
              <p class="name">{{ item.name }}</p>
              <div class="rating">
                <div class="rating-star">
                  <p :style="{ width: (((item.score || 4.6) / 5) * 100).toFixed(0) + '%' }"></p>
                </div>
              </div>
            </CustomLink>
          </transition>

          <CustomLink to="/best/" class="module-btn"><i class="icon-best" />Best</CustomLink>
          <CustomLink to="/best/" class="arrow"><i class="icon-arrow" /></CustomLink>

          <div ref="swiper1" v-once v-swiper:mySwiper1="swiperOption1" class="swiper-box">
            <div class="swiper-wrapper">
              <CustomLink
                v-for="(item, i) in best"
                :key="i"
                :to="item.type === 1 ? `/game/${item.path}/` : `/app/${item.path}/`"
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
              </CustomLink>
            </div>
          </div>
          <p class="background" v-show="currentModule != 1" @click="clickModule1"></p>
        </div>
        <div
          class="rec2"
          :class="{
            rec2Active: currentModule === 2 || currentModule === 3,
            rec2Active1: currentModule === 2
          }"
        >
          <transition
            v-for="(item, index) in hot"
            :key="index"
            :item="item"
            :index="index"
            name="fade"
          >
            <CustomLink
              v-show="currentIndex2 === index"
              :to="item.type === 1 ? `/game/${item.path}/` : `/app/${item.path}/`"
              class="item"
            >
              <NuxtImg
                format="auto"
                fit="cover"
                width="340"
                height="496"
                :src="item.mobile_img || item.icon"
                :alt="item.name"
                class="img"
              />
              <p class="name">{{ item.name }}</p>
              <div class="rating">
                <div class="rating-star">
                  <p :style="{ width: (((item.score || 4.6) / 5) * 100).toFixed(0) + '%' }"></p>
                </div>
              </div>
            </CustomLink>
          </transition>

          <CustomLink to="/hot/" class="module-btn"><i class="icon-hot" />Hot</CustomLink>
          <CustomLink to="/hot/" class="arrow"><i class="icon-arrow" /></CustomLink>

          <div ref="swiper2" v-once v-swiper:mySwiper2="swiperOption2" class="swiper-box">
            <div class="swiper-wrapper">
              <CustomLink
                v-for="(item, i) in hot"
                :key="i"
                :to="item.type === 1 ? `/game/${item.path}/` : `/app/${item.path}/`"
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
              </CustomLink>
            </div>
          </div>
          <p class="background" v-show="currentModule != 2" @click="clickModule2"></p>
        </div>

        <div class="rec3" :class="{ rec3Active: currentModule === 3 }">
          <transition
            v-for="(item, index) in news"
            :key="index"
            :item="item"
            :index="index"
            name="fade"
          >
            <CustomLink
              v-show="currentIndex3 === index"
              :to="item.type === 1 ? `/game/${item.path}/` : `/app/${item.path}/`"
              class="item"
            >
              <NuxtImg
                format="auto"
                fit="cover"
                width="340"
                height="496"
                :src="item.mobile_img || item.icon"
                :alt="item.name"
                class="img"
              />
              <p class="name">{{ item.name }}</p>
              <div class="rating">
                <div class="rating-star">
                  <p :style="{ width: (((item.score || 4.6) / 5) * 100).toFixed(0) + '%' }"></p>
                </div>
              </div>
            </CustomLink>
          </transition>

          <CustomLink to="/new/" class="module-btn"><i class="icon-latest" />Latest</CustomLink>
          <CustomLink to="/new/" class="arrow"><i class="icon-arrow" /></CustomLink>

          <div ref="swiper3" v-once v-swiper:mySwiper3="swiperOption3" class="swiper-box">
            <div class="swiper-wrapper">
              <CustomLink
                v-for="(item, i) in news"
                :key="i"
                :to="item.type === 1 ? `/game/${item.path}/` : `/app/${item.path}/`"
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
              </CustomLink>
            </div>
          </div>
          <p class="background" v-show="currentModule != 3" @click="clickModule3"></p>
        </div>
      </section> -->

      <!-- <section class="m-module1">
        <CustomLink to="/favoritetool/" class="title-h2 title-shadow title-shadow2 border-weak"
          ><i class="icon-favorite-app" />Favorite Tools<i class="icon-arrow"
        /></CustomLink>

        <div class="box-row-scroll">
          <ContentItemRow1
            v-for="(item, index) in faveApps"
            :key="index"
            :item="item"
            :index="index"
            :eager="2"
            :to="`/app/${item.path}/`"
            :bg="1"
          />
        </div>
      </section> -->
      <section class="m-module2">
        <CustomLink
          :to="rec[0].type === 1 ? `/game/${rec[0].path}/` : `/app/${rec[0].path}/`"
          class="rec-slide"
        >
          <NuxtImg
            class="img"
            format="auto"
            fit="cover"
            width="658"
            height="312"
            :src="rec[0].mobile_img || rec[0].icon"
            :alt="rec[0].name"
            loading="lazy"
          />
          <div class="download-btn pc-button-hidden">Play<i class="icon-rocket" /></div>
        </CustomLink>
        <div class="box-row-scroll2">
          <ContentItemRow2
            v-for="(item, index) in rec.slice(1, 4)"
            :key="index"
            :item="item"
            :index="index"
            :to="item.type === 1 ? `/game/${item.path}/` : `/app/${item.path}/`"
          />
        </div>
      </section>
      <section>
        <!-- <CustomLink to="/favoritetool/" class="title-h2 title-shadow"
          ><i class="icon-favorite-app" />Favorite Tools<i class="icon-arrow"
        /></CustomLink> -->
        <CustomLink to="/favoriteplay/" class="title-h2 title-shadow border-weak title-fav"
          ><i class="icon-favorite-game" />Favorite Games<i class="icon-arrow"
        /></CustomLink>
        <div class="box-row-scroll">
          <ContentItemRow3
            v-for="(item, index) in faveGames"
            :key="index"
            :item="item"
            :index="index"
            :eager="2"
            :to="`/game/${item.path}/`"
          />
        </div>
      </section>
      <!-- <CustomLink to="/freshtool/" class="title-h2 title-shadow title-hidden">
          <i class="icon-fresh" />Fresh Tools <i class="icon-arrow"
        /></CustomLink>
        <section class="box-row-scroll module-hidden">
          <ContentItemRow1
            v-for="(item, index) in newApps"
            :key="index"
            :item="item"
            :index="index"
            :to="`/app/${item.path}/`"
          />
        </section> -->

      <div class="title-h2"><i class="icon-recommend" />Recommend </div>
      <InfiniteScrollList2
        class="box-common"
        api-endpoint="/api/game/all_app"
        :initial-page="2"
        :page-size="40"
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
        recommendResponse,
        bestResponse,
        newResponse,
        hotResponse,
        faveAppResponse,
        faveGameResponse,
        allGamesResponse,
        allAppsResponse
      ] = await Promise.all([
        $axios.$get("/api/game/menu", {
          params: {
            site_id: env.SITE_ID,
            mod_id: "rec-games",
            size: 4
          }
        }),
        $axios.$get("/api/game/menu", {
          params: {
            site_id: env.SITE_ID,
            mod_id: "best",
            size: 3
          }
        }),
        $axios.$get("/api/game/menu", {
          params: {
            site_id: env.SITE_ID,
            mod_id: "new",
            size: 3
          }
        }),
        $axios.$get("/api/game/menu", {
          params: {
            site_id: env.SITE_ID,
            mod_id: "hot",
            size: 3
          }
        }),
        $axios.$get("/api/game/menu", {
          params: {
            site_id: env.SITE_ID,
            mod_id: "fave-apps",
            size: 12
          }
        }),
        $axios.$get("/api/game/menu", {
          params: {
            site_id: env.SITE_ID,
            mod_id: "fave-games",
            size: 12
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
        rec: recommendResponse.list,
        best: bestResponse.list,
        news: newResponse.list,
        hot: hotResponse.list,
        faveApps: faveAppResponse.list,
        faveGames: faveGameResponse.list
      };
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
  data() {
    return {
      timerId: null,
      currentIndex1: 0,
      currentIndex2: 0,
      currentIndex3: 0,
      currentModule: 1,
      hasDev: false,
      loading: false,
      endOfList: false,
      currentPage: 2,
      swiperOption: {
        autoplay: {
          delay: 5000,
          disableOnInteraction: false // 用户操作后恢复自动轮播
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
      },
      swiperOption1: {
        slidesPerView: "auto",
        loop: true,
        speed: 1000,
        grabCursor: true,
        direction: "horizontal",
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        },
        on: {
          slideChange: this.onSlideChange
        }
      },
      swiperOption1: {
        slidesPerView: "auto",
        loop: true,
        speed: 1000,
        grabCursor: true,
        direction: "horizontal",
        autoplay: {
          delay: 2000,
          disableOnInteraction: false
        },
        on: {
          slideChange: this.onSlideChange1
        }
      },
      swiperOption2: {
        slidesPerView: "auto",
        loop: true,
        speed: 1000,
        grabCursor: true,
        direction: "horizontal",
        autoplay: {
          delay: 2000,
          disableOnInteraction: false
        },
        on: {
          slideChange: this.onSlideChange2
        }
      },
      swiperOption3: {
        slidesPerView: "auto",
        loop: true,
        speed: 1000,
        grabCursor: true,
        direction: "horizontal",
        autoplay: {
          delay: 2000,
          disableOnInteraction: false
        },
        on: {
          slideChange: this.onSlideChange3
        }
      }
    };
  },
  mounted() {
    if (this.$refs.swiper2) {
      this.mySwiper2 = this.$refs.swiper2.swiper;
      this.mySwiper2.autoplay.stop();
    }
    if (this.$refs.swiper3) {
      this.mySwiper3 = this.$refs.swiper3.swiper;
      this.mySwiper3.autoplay.stop();
    }
    this.$nextTick(() => {
      this.scrollAnchor();
    });
  },
  methods: {
    onSlideChange1() {
      // if (this.currentModule === 1) {
      this.currentIndex1 = (this.mySwiper1 && this.mySwiper1.realIndex) || 0;
      console.log("currenrIndex1:" + this.currentIndex1);
      if (this.currentModule === 1) {
        if (this.currentIndex1 === 2) {
          const swiper1 = this.mySwiper1;
          if (swiper1.activeIndex > swiper1.previousIndex) {
            this.mySwiper1.autoplay.stop();
            console.log("stop");
            if (!this.hasDev) {
              this.hasDev = true;
              this.timerId = setTimeout(() => {
                this.currentModule = this.currentModule < 3 ? this.currentModule + 1 : 1;
                this.$refs.swiper2.swiper.slideTo(0);
                this.$refs.swiper2.swiper.autoplay.start();
                this.hasDev = false;
              }, 3000);
            }
          }
        }
      }
    },
    onSlideChange2() {
      // if (this.currentModule === 2) {
      this.currentIndex2 = (this.mySwiper2 && this.mySwiper2.realIndex) || 0;
      console.log("currenrIndex2:" + this.currentIndex2);
      if (this.currentModule === 2) {
        if (this.currentIndex2 === 2) {
          const swiper2 = this.mySwiper2;
          if (swiper2.activeIndex > swiper2.previousIndex) {
            this.mySwiper2.autoplay.stop();
            console.log("stop");
            if (!this.hasDev) {
              this.hasDev = true;
              this.timerId = setTimeout(() => {
                this.currentModule = this.currentModule < 3 ? this.currentModule + 1 : 1;
                this.$refs.swiper3.swiper.slideTo(0);
                this.$refs.swiper3.swiper.autoplay.start();
                this.hasDev = false;
              }, 3000);
            }
          }
        }
      }
    },
    onSlideChange3() {
      // if (this.currentModule === 3) {
      this.currentIndex3 = (this.mySwiper3 && this.mySwiper3.realIndex) || 0;
      console.log("currenrIndex3:" + this.currentIndex3);
      console.log("currenrModule:" + this.currentModule);
      if (this.currentModule === 3) {
        if (this.currentIndex3 === 2) {
          const swiper3 = this.mySwiper3;
          if (swiper3.activeIndex > swiper3.previousIndex) {
            this.mySwiper3.autoplay.stop();
            console.log("stop");
            if (!this.hasDev) {
              this.hasDev = true;
              this.timerId = setTimeout(() => {
                this.currentModule = this.currentModule < 3 ? this.currentModule + 1 : 1;
                this.$refs.swiper1.swiper.slideTo(0);
                this.$refs.swiper1.swiper.autoplay.start();
                this.hasDev = false;
              }, 3000);
            }
          }
        }
      }
    },
    clickModule1() {
      if (this.timerId) {
        clearTimeout(this.timerId);
        console.log("如果存在,执行后的状态:" + this.timerId);
      }
      this.currentModule = 1;
      this.$refs.swiper2.swiper.autoplay.stop();
      this.$refs.swiper3.swiper.autoplay.stop();
      this.$refs.swiper1.swiper.slideTo(0);
      this.$refs.swiper1.swiper.autoplay.start();
    },
    clickModule2() {
      if (this.timerId) {
        console.log("如果存在,执行前的状态:" + this.timerId);
        clearTimeout(this.timerId);
        console.log("如果存在,执行后的状态:" + this.timerId);
      }
      this.currentModule = 2;
      this.$refs.swiper1.swiper.autoplay.stop();
      this.$refs.swiper3.swiper.autoplay.stop();
      this.$refs.swiper2.swiper.slideTo(0);
      this.$refs.swiper2.swiper.autoplay.start();
    },
    clickModule3() {
      if (this.timerId) {
        console.log("如果存在,执行前的状态:" + this.timerId);
        clearTimeout(this.timerId);
        console.log("如果存在,执行后的状态:" + this.timerId);
      }
      this.currentModule = 3;
      this.$refs.swiper1.swiper.autoplay.stop();
      this.$refs.swiper2.swiper.autoplay.stop();
      this.$refs.swiper3.swiper.slideTo(0);
      this.$refs.swiper3.swiper.autoplay.start();
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
  },
  beforeDestroy() {
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
  }
};
</script>
<style lang="scss" scoped>
.main {
  max-width: 1200px;
  margin: 0 auto;
  z-index: 3;
}
.rec {
  width: 100%;
  height: 380px;
  margin-top: 32px;
  border-radius: 24px;
  overflow: hidden;

  .img {
    width: 100%;
    height: 100%;
    border-radius: 32px;
  }

  .name {
    width: 493px;
    height: 69px;
    font-family: fm;
    font-size: 52px;
    color: #ffffff;
    line-height: 69px;
    position: absolute;
    left: 40px;
    top: 150px;
    @include ellipsis;
  }
  .rating {
    display: flex;
    position: absolute;
    left: 40px;
    top: 231px;
  }
  .rating-star {
    width: 135px;
    height: 27px;
    @include bg("icon-rec-star1.png");
    background-size: 27px 27px;
    p {
      height: 27px;
      @include bg("icon-rec-star.png");
      background-size: 27px 27px;
    }
  }
}

.swiper-box {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  position: relative;
  border-radius: 32px;
}

.swiper-pagination {
  display: flex;
  align-items: center;
  left: unset;
  right: 24px;
  bottom: 16px;
  width: fit-content;
}

.rec-icon {
  width: 80px;
  height: 80px;
  border-radius: 16px;
  outline: 4px solid rgba(255, 255, 255, 0.4);
  position: absolute;
  left: 40px;
  top: 59px;
}

.download-btn {
  width: 182px;
  height: 50px;
  background: #f0ffff;
  border-radius: 100px 100px 100px 100px;
  position: absolute;
  bottom: 46px;
  left: 40px;
  z-index: 2;
  font-family: seb;
  color: #0f80f8;
  font-size: 22px;
  line-height: 26px;
  @include center;
}

.arrow {
  width: 50px;
  height: 50px;
  @include center;
  background: #f0ffff;
  box-shadow: 4px 4px 8px 0px rgba(11, 41, 69, 0.2), -4px -4px 8px 0px rgba(255, 255, 255, 0.52);
  border-radius: 50%;
  position: absolute;
  bottom: 46px;
  left: 242px;
  .icon-arrow {
    @include icon(26px, 26px, "icon-rec-arrow1.png");
  }
}
.m-module2 {
  display: none;
}

.box-row-scroll {
  padding: 4px 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
.title-h2 {
  display: flex;
  height: 36px;
  padding: 0 16px;
}
.title-shadow {
  margin: 32px 0 24px 0;
  box-shadow: 4px 4px 8px 0px #c7d2da, -4px -4px 8px 0px #ffffff, inset 0 0 0 0 #c7d2da,
    inset 0 0 0 0 #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.4);
  transition: all 0.1s;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    box-shadow: 0 0 0 0 rgba(40, 11, 69, 0.2), 0 0 0 0 rgba(255, 255, 255, 0.3),
      inset 4px 4px 8px 0px rgba(40, 11, 69, 0.2), inset -4px -4px 8px 0px rgba(255, 255, 255, 0.3);
  }
}

.rec-hidden {
  display: none;
}
.module-hidden {
  display: none;
}
.title-hidden {
  display: none;
}
.pc-hidden {
  display: none;
}
.m-hidden {
  display: block;
}
.pc-button-hidden {
  display: none;
}
.m-button-hidden {
  display: flex;
}
@media screen and (max-width: 1220px) {
  .box-row-scroll {
    padding: vw2(4) 0;
    gap: vw2(24);
  }
}
@media screen and (max-width: 879px) {
  .box-row-scroll {
    padding: vw3(4) 0;
    grid-template-columns: repeat(2, 1fr);
    gap: vw3(24);
  }
}
@media screen and (max-width: 750px) {
  .page {
    background: #f0f4f5;
  }

  .m-rec {
    height: vw(1114);
    overflow: hidden;
    position: relative;

    .img {
      width: vw(340);
      height: vw(496);
      position: absolute;
      left: 0;
      bottom: 0;
    }

    .name {
      width: vw(360);
      font-family: seb;
      font-size: vw(40);
      color: #ffffff;
      line-height: vw(56);
      position: absolute;
      left: vw(360);
      top: vw(32);
      @include ellipsis;
    }

    .rating {
      display: flex;
      position: absolute;
      left: vw(360);
      top: vw(104);
    }

    .rating-star {
      width: vw(160);
      height: vw(32);
      @include bg("icon-rec-star1.png");
      background-size: vw(32) vw(32);
      p {
        height: vw(32);
        @include bg("icon-rec-star.png");
        background-size: vw(32) vw(32);
      }
    }

    .module-btn {
      width: vw(158);
      height: vw(48);
      background: #f0ffff;
      box-shadow: 4px 4px 8px 0px rgba(11, 41, 69, 0.2), -4px -4px 8px 0px rgba(255, 255, 255, 0.52);
      border-radius: vw(32);
      position: absolute;
      left: vw(360);
      top: vw(161);
      @include center;
      font-family: sesb;
      font-size: vw(32);
      color: #0f80f8;
      line-height: vw(38);
      .icon-best {
        width: vw(40);
        height: vw(40);
      }
    }

    .arrow {
      width: vw(48);
      height: vw(48);
      border-radius: 50%;
      position: absolute;
      left: vw(546);
      top: vw(161);
      @include center;
      .icon-arrow {
        @include icon(vw(36), vw(36), "icon-rec-arrow1.png");
      }
    }
    .swiper-box {
      position: absolute;
      height: auto;
      left: vw(360);
      top: vw(238);
      width: vw(460);
      padding: 0;
      margin: 0;
      z-index: unset;
      opacity: 0;
    }
    .swiper-slide {
      background: #f0ffff;
      width: vw(116);
      height: vw(116);
      border-radius: vw(20);
      margin-right: vw(32);
      @include center;
      .swiper-img {
        width: vw(104);
        height: vw(104);
        border-radius: vw(16);
      }
    }

    .rec1 {
      background: #5fefec;
      position: absolute;
      width: 100%;
      height: vw(516);
    }
    .rec2 {
      background: #fdcf76;
      position: absolute;
      top: vw(394);
      width: 100%;
      height: vw(516);
      border-radius: vw(70) vw(70) 0px 0px;
      z-index: 1;
      transition: all 0.5s;
      .swiper-box {
        top: vw(256);
      }

      .img {
        top: vw(38);
      }

      .name {
        top: vw(48);
      }

      .rating {
        top: vw(120);
      }

      .module-btn {
        top: vw(180);
        color: #ff9845;
      }

      .arrow {
        top: vw(180);
      }

      .icon-hot {
        @include icon(vw(40), vw(40), "icon-hot.png");
      }

      .icon-arrow {
        @include icon(vw(36), vw(36), "icon-rec-arrow2.png");
      }

      .rating-star {
        @include bg("icon-star22.png");
        background-size: vw(32) vw(32);
        p {
          @include bg("icon-star2.png");
          background-size: vw(32) vw(32);
        }
      }
    }
    .rec3 {
      background: #a2f2c2;
      position: absolute;
      top: vw(670);
      width: 100%;
      height: vw(516);
      border-radius: vw(70) vw(70) 0px 0px;
      transition: all 0.5s;
      z-index: 1;

      .swiper-box {
        top: vw(256);
      }

      .img {
        top: vw(38);
      }

      .name {
        top: vw(48);
      }

      .rating {
        top: vw(120);
      }

      .module-btn {
        top: vw(180);
        color: #33bd78;
      }

      .arrow {
        top: vw(180);
      }

      .icon-latest {
        @include icon(vw(40), vw(40), "icon-latest.png");
      }

      .icon-arrow {
        @include icon(vw(36), vw(36), "icon-rec-arrow3.png");
      }

      .rating-star {
        @include bg("icon-star33.png");
        background-size: vw(32) vw(32);
        p {
          @include bg("icon-star3.png");
          background-size: vw(32) vw(32);
        }
      }
    }

    .rec1Active {
      .swiper-box {
        opacity: 1;
      }
    }

    .rec2Active {
      top: vw(258);
    }

    .rec2Active1 {
      .swiper-box {
        opacity: 1;
      }
    }

    .rec3Active {
      top: vw(534);
      .swiper-box {
        opacity: 1;
      }
    }
    .background {
      width: 100%;
      height: 100%;
      position: relative;
      z-index: 1;
    }
  }

  .m-module1 {
    margin-top: vw(-168);
    height: vw(766);
    background: #d2ffff;
    border-radius: vw(70) vw(70) 0px 0px;
    box-shadow: 0px -4px 19px 0px rgba(71, 208, 202, 0.61);
    position: relative;
    z-index: 1;
  }

  .m-module2 {
    display: block;
    // margin-top: vw(-64);
    margin-top: vw(-16);
    padding: vw(1) 0 0;
    // height: vw(600);
    background: #f0f4f5;
    border-radius: vw(70) vw(70) 0px 0px;
    // box-shadow: 0px -4px 19px 0px rgba(71, 208, 202, 0.61);
    // box-shadow: 0 vw(-20) vw(20) vw(-10) rgba(71, 208, 202, 0.61);

    position: relative;
    z-index: 1;
  }

  .rec-slide {
    position: relative;
    display: inline-block;
    width: vw(658);
    height: vw(340);
    margin: vw(48) vw(46) 0;

    .img {
      width: 100%;
      height: 100%;
      border-radius: vw(32);
    }
  }

  .box-row-scroll2 {
    margin-top: vw(28);
    display: grid;
    padding: vw(0) vw(46) vw(24);
    grid-template-columns: repeat(3, vw(288));
    gap: vw(36);
    @include scroll;
    z-index: 2;
    position: relative;
  }

  .box-mobile-background {
    background: $color1;
    border-radius: vw(48) vw(48) 0px 0px;
  }

  .box-row-scroll {
    padding: vw(0) vw(46) vw(24);
    grid-template-columns: repeat(4, vw(432));
    gap: vw(32);
    @include scroll;
    z-index: 2;
    position: relative;
  }

  .box-common {
    margin: 0;
    padding: 0 vw(46);
  }

  .title-h2 {
    position: relative;
    height: vw(72);
    z-index: 2;
  }

  .title-shadow {
    margin: vw(52) 0 vw(32) vw(46);
    padding: 0 vw(16);
    display: flex;
    align-items: center;
  }

  .title-shadow2 {
    box-shadow: -4px -4px 8px 0px rgba(255, 255, 255, 0.74), 4px 4px 8px 0px #9ee1df;
  }

  .border-weak {
    display: inline-flex;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .title-fav {
    margin-top: vw(28);
  }

  .download-btn {
    position: absolute;
    font-family: seb;
    font-size: vw(24);
    line-height: vw(32);
    width: vw(134);
    height: vw(48);
    border-radius: vw(80);
    bottom: vw(28);
    color: #ffffff;
    background: linear-gradient(86deg, #0f80f8 0%, #45fff6 100%);
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
    outline: 2px solid rgba(255, 255, 255, 0.6);
    .icon-rocket {
      @include icon(16px, 16px, "icon-rocket.png");
      margin-left: 6px;
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

  .rec-hidden {
    display: block;
  }
  .module-hidden {
    display: grid;
  }
  .title-hidden {
    display: flex;
  }
  .pc-hidden {
    display: block;
  }
  .m-hidden {
    display: none;
  }
  .pc-button-hidden {
    display: flex;
  }
  .m-button-hidden {
    display: none;
  }
}
</style>
