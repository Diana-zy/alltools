<template>
  <div class="page" :class="{ 'page-bg': showBackground }">
    <Header ref="headerElem" current-path="home" />
    <main class="main">
      <div v-show="showBackground" class="fixed-bg"></div>
      <div ref="shadowElem" :class="{ 'bg-shadow': showBackground }"></div>
      <section class="rec">
        <div v-swiper:pcSwiperM="swiperOption" class="swiper-box">
          <div class="swiper-wrapper">
            <!-- pc推荐模块 -->

            <!-- <link-outside :item="linkOutside" /> -->

            <CustomLink
              v-for="(item, index) in recGames"
              :key="index"
              :to="`/game/${item.path}/`"
              :item="item"
              class="swiper-slide m-hidden"
            >
              <NuxtImg
                class="img"
                format="auto"
                fit="cover"
                width="1200"
                height="380"
                :src="item.pc_img"
                :alt="item.name"
                :loading="index === 0 ? 'eager' : 'lazy'"
                :preloader="index === 0"
              />
              <div class="download-btn m-button-hidden">Play Now<i class="icon-rocket" /></div>
            </CustomLink>

            <CustomLink
              v-for="(item, index) in recApps"
              :key="index"
              :to="item.type === 1 ? `/game/${item.path}/` : `/app/${item.path}/`"
              :item="item"
              class="swiper-slide m-hidden"
            >
              <NuxtImg
                class="img"
                format="auto"
                fit="cover"
                width="1200"
                height="380"
                :src="item.pc_img"
                :alt="item.name"
                loading="lazy"
              />
              <div class="download-btn m-button-hidden">Get Now<i class="icon-rocket" /></div>
            </CustomLink>
            <!-- m推荐模块 -->
            <!-- <link-outside1 :item="linkOutside" /> -->
            <CustomLink
              v-for="(item, index) in recGames"
              :key="index"
              :to="item.type === 1 ? `/game/${item.path}/` : `/app/${item.path}/`"
              :item="item"
              class="swiper-slide pc-hidden"
            >
              <NuxtImg
                class="img"
                format="auto"
                fit="cover"
                width="658"
                height="316"
                :src="item.mobile_img"
                :alt="item.name"
                :loading="index === 0 ? 'eager' : 'lazy'"
                :preloader="index === 0"
              />

              <div class="download-btn pc-button-hidden"
                ><i class="icon-play" /><i class="icon-rocket"
              /></div>
            </CustomLink>
          </div>
          <div class="swiper-pagination"> </div> </div
      ></section>
      <CustomLink to="/favoriteplay/" class="title-h2 title-shadow border-weak"
        ><i class="icon-favorite-game" />Favorite Games<i class="icon-arrow"
      /></CustomLink>
      <section class="box-row-scroll">
        <ContentItemRow
          v-for="(item, index) in bestGames"
          :key="index"
          :item="item"
          :index="index"
          :eager="2"
          :to="item.type === 1 ? `/game/${item.path}/` : `/app/${item.path}/`"
          :bg="1"
        />
      </section>

      <article
        ref="MobileElem"
        class="box-mobile"
        :class="{ 'box-mobile-background': !showBackground }"
      >
        <section class="rec rec-hidden">
          <div v-swiper:SwiperM="swiperOption" class="swiper-box">
            <div class="swiper-wrapper">
              <CustomLink
                v-for="(item, index) in recApps"
                :key="index"
                :to="item.type === 1 ? `/game/${item.path}/` : `/app/${item.path}/`"
                :item="item"
                class="swiper-slide"
              >
                <NuxtImg
                  class="img"
                  format="auto"
                  fit="cover"
                  width="658"
                  height="312"
                  :src="item.mobile_img"
                  :alt="item.name"
                  loading="lazy"
                />
                <div class="download-btn pc-button-hidden"
                  ><i class="icon-get" /><i class="icon-rocket"
                /></div>
              </CustomLink>
            </div>
            <div class="swiper-pagination"> </div> </div
        ></section>
        <CustomLink to="/favoritetool/" class="title-h2 title-shadow"
          ><i class="icon-favorite-app" />Favorite Tools<i class="icon-arrow"
        /></CustomLink>
        <section class="box-row-scroll">
          <ContentItemRow
            v-for="(item, index) in bestApps"
            :key="index"
            :item="item"
            :index="index"
            :eager="2"
            :to="item.type === 1 ? `/game/${item.path}/` : `/app/${item.path}/`"
          />
        </section>
        <CustomLink to="/freshtool/" class="title-h2 title-shadow title-hidden">
          <i class="icon-fresh" />Fresh Tools <i class="icon-arrow"
        /></CustomLink>
        <section class="box-row-scroll module-hidden">
          <ContentItemRow
            v-for="(item, index) in newApps"
            :key="index"
            :item="item"
            :index="index"
            :to="item.type === 1 ? `/game/${item.path}/` : `/app/${item.path}/`"
          />
        </section>

        <div class="title-h2"><i class="icon-recommend" />Recommend <i class="arrow" /></div>
        <InfiniteScrollList2
          class="box-common module-background"
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
      </article>
    </main>
    <Footer />
    <BackTop />
    <AdLoading />
  </div>
</template>

<script>
import { directive } from "vue-awesome-swiper";
export default {
  mounted() {
    window.addEventListener("scroll", this.getScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.getScroll);
  },
  methods: {
    getScroll() {
      const backgroundElement = this.$refs.MobileElem;
      const headerElement = this.$refs.headerElem.$el;

      if (headerElement && headerElement.getBoundingClientRect().height !== 0) {
        this.headerHeight = headerElement.getBoundingClientRect().height;
      }
      if (this.$refs.shadowElem) {
        this.$refs.shadowElem.style.top = this.headerHeight + "px";
      }
      if (backgroundElement && backgroundElement.getBoundingClientRect().height !== 0) {
        this.lastButtonRect = backgroundElement.getBoundingClientRect();
      }
      this.windowWidth = window.innerWidth;

      if (this.lastButtonRect && this.windowWidth < 750) {
        this.showBackground = this.lastButtonRect.top < this.headerHeight;
        return;
      }
    }
  },
  directives: {
    swiper: directive
  },
  async asyncData({ $axios, env }) {
    try {
      // 并行处理多个异步请求
      const [
        recommendResponse,
        bestGamesResponse,
        bestAppsResponse,
        newAppsResponse,
        allGamesResponse,
        allAppsResponse
      ] = await Promise.all([
        $axios.$get("/api/game/menu", {
          params: {
            site_id: env.SITE_ID,
            mod_id: "rec",
            size: 4
          }
        }),
        $axios.$get("/api/game/menu", {
          params: {
            site_id: env.SITE_ID,
            mod_id: "best-games",
            size: 12
          }
        }),
        $axios.$get("/api/game/menu", {
          params: {
            site_id: env.SITE_ID,
            mod_id: "best-apps",
            size: 12
          }
        }),
        $axios.$get("/api/game/menu", {
          params: {
            site_id: env.SITE_ID,
            mod_id: "new-apps",
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

      // todo: [game, app, gamem, app]
      // console.log(allAppsResponse.list);
      // const maxLength = Math.max(allAppsResponse.list.length, allAppsResponse.list.length);
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
        allGames: allGamesResponse.list,
        recGames: recommendResponse.list.slice(0, 2),
        recApps: recommendResponse.list.slice(2, 4)
      };
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
  data() {
    return {
      lastButtonRect: null,
      headerHeight: 0,
      windowWidth: 0,
      showBackground: false,
      loading: false,
      endOfList: false,
      currentPage: 2,
      swiperOption: {
        autoplay: {
          delay: 20000,
          disableOnInteraction: false // 用户操作后恢复自动轮播
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
      }
    };
  }
};
</script>
<style lang="scss" scoped>
.bg {
  width: 100%;
  height: 100%;
  z-index: -1;
}
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
}

.swiper-box {
  width: 100%;
  height: 100%;
  position: relative;
}
.swiper-pagination {
  display: flex;
  align-items: center;
  left: unset;
  right: 24px;
  bottom: 16px;
  width: fit-content;
}
.img {
  width: 100%;
  height: 100%;
  border-radius: 24px;
}
.download-btn {
  width: 130px;
  height: 36px;
  background: linear-gradient(45deg, #d14fff 0%, #44d2ff 100%);
  border-radius: 40px;
  position: absolute;
  bottom: 26px;
  right: 50%;
  transform: translateX(50%);
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Segoe bold";
  color: #ffffff;
  outline: 4px solid rgba(#ffffff, 0.4);
  .icon-rocket {
    @include icon(16px, 16px, "icon-rocket.png");
    margin-left: 6px;
  }
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
  box-shadow: 4px 4px 8px 0px rgba(40, 11, 69, 0.2), -4px -4px 8px 0px rgba(255, 255, 255, 0.3),
    inset 0 0 0 0 rgba(40, 11, 69, 0.2), inset 0 0 0 0 rgba(255, 255, 255, 0.3);
  border: 1px solid #ffffff;
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
@media screen and (max-width: 750px) {
  .page {
    background: $color2;
    // &::before {
    //   content: "";
    // }
  }
  .page-bg {
    background: $color1;
  }
  .fixed-bg {
    background: $color2;
    width: 100%;
    height: vw(200);
    position: fixed;
    top: 0;
    z-index: 0;
  }
  .bg-shadow {
    width: 100%;
    height: 100vh;
    position: fixed;
    background: $color1;
    border-radius: vw(48) vw(48) 0 0;
    // box-shadow: 0px 0px 10px 0px rgba(16, 5, 39, 0.2);
    top: 0;
    pointer-events: none;
  }

  .module-background {
    background: $color1;
    // background: red;
  }
  .rec {
    width: vw(658);
    height: vw(316);
    margin: vw(32) auto 0;
    border-radius: vw(32);
    box-shadow: 4px 4px 8px 0px rgba(40, 11, 69, 0.2), -4px -4px 8px 0px rgba(255, 255, 255, 0.3);
  }
  .img {
    border-radius: vw(32);
  }

  .swiper-pagination {
    margin-bottom: vw(24);
    display: none;
  }

  .swiper-box {
    box-shadow: 4px 4px 8px 0px rgba(40, 11, 69, 0.2), -4px -4px 8px 0px rgba(255, 255, 255, 0.3);
  }
  .box-mobile {
    display: inline-block;
    width: 100%;
  }
  .box-mobile-background {
    background: $color1;
    border-radius: vw(48) vw(48) 0px 0px;
  }

  .box-row-scroll {
    padding: vw(24) vw(46);
    grid-template-columns: repeat(4, vw(510));
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
  .border-weak {
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  .download-btn {
    font-family: seb;
    width: vw(134);
    height: vw(48);
    border-radius: vw(80);
    bottom: vw(24);
    background: linear-gradient(86deg, #d000ff 0%, #5b75ff 100%);
    // right: vw(24);
    // transform: translateX(0);
    z-index: 2;
    outline: 2px solid rgba(255, 255, 255, 0.6);
    .icon-rocket {
      @include icon(16px, 16px, "icon-rocket.png");
      margin-left: 6px;
    }
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
