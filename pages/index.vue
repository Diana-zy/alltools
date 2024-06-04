<template>
  <div class="page">
    <Header />
    <Navigation current-path="home" :nav-categories="navCategories" />
    <main>
      <!-- 轮播图 -->
      <section v-swiper:mySwiper="swiperOption" class="swiper-box pc-rec">
        <div class="swiper-wrapper">
          <CustomLink
            v-for="(item, i) in recGames"
            :key="i"
            :to="`/game/${item.path}/`"
            class="swiper-slide"
          >
            <NuxtImg
              class="img"
              format="auto"
              fit="cover"
              width="1682"
              height="408"
              :src="item.pc_img"
              :alt="item.name"
              :loading="i === 0 ? 'eager' : 'lazy'"
            />
            <div class="name">{{ item.name }}</div>
            <div class="category">{{ item.category_name }}</div>
            <div class="btn-view">VIEW MORE</div>
          </CustomLink>
        </div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-pagination"></div>
        <div class="swiper-button-next"></div>
      </section>

      <section v-swiper:mySwiperM="swiperOption" class="swiper-box m-rec">
        <div class="swiper-wrapper">
          <CustomLink
            v-for="(item, i) in recGames"
            :key="i"
            :to="`/game/${item.path}/`"
            class="swiper-slide"
          >
            <NuxtImg
              class="img"
              format="auto"
              fit="cover"
              width="790"
              height="450"
              :src="item.mobile_img"
              :alt="item.name"
              loading="lazy'"
              :preload="i === 0"
            />
            <div class="name">{{ item.name }}</div>
            <div class="category">{{ item.category_name }}</div>
            <div class="btn-view">VIEW MORE</div>
          </CustomLink>
        </div>
        <div class="swiper-pagination"></div>
      </section>

      <h2 class="title-h2"
        ><i class="icon-best"></i>BEST GAMES
        <CustomLink to="/best/" class="see-more">
          SEE MORE<i class="icon-see-more"></i>
        </CustomLink>
      </h2>
      <section class="box-panel">
        <CustomLink
          v-for="(item, i) in bestGames"
          :key="i"
          :to="`/game/${item.path}/`"
          class="item"
        >
          <NuxtImg
            format="auto"
            fit="cover"
            width="314"
            height="182"
            :src="item.pc_img || item.icon"
            :alt="item.name"
            class="img"
            loading="lazy"
          />
          <NuxtImg
            format="auto"
            fit="cover"
            width="180"
            height="180"
            :src="item.icon"
            :alt="item.name"
            class="icon"
            :loading="i < 5 ? 'eager' : 'lazy'"
          />
          <p class="name">{{ item.name }}</p>
          <div class="btn-view">VIEW</div>
        </CustomLink>
      </section>
      <h2 class="title-h2"
        ><i class="icon-latest"></i>LATEST GAMES
        <CustomLink to="/new/" class="see-more"> SEE MORE<i class="icon-see-more"></i> </CustomLink
      ></h2>
      <section class="box-scroll">
        <CustomLink v-for="(item, i) in newGames" :key="i" :to="`/game/${item.path}/`" class="item">
          <NuxtImg
            format="auto"
            fit="cover"
            width="180"
            height="180"
            :src="item.icon"
            :alt="item.name"
            class="img"
            :loading="i < 5 ? 'eager' : 'lazy'"
          />
          <p class="name">{{ item.name }}</p>
        </CustomLink>
      </section>
      <h2 class="title-h2"
        ><i class="icon-popular"></i>POPULAR GAMES
        <CustomLink to="/hot/" class="see-more"> SEE MORE<i class="icon-see-more"></i> </CustomLink
      ></h2>
      <section
        v-infinite-scroll="loadMoreHotGames"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="0"
        class="box-grid"
      >
        <CustomLink v-for="(item, i) in hotGames" :key="i" :to="`/game/${item.path}/`" class="item">
          <NuxtImg
            format="auto"
            fit="cover"
            :width="i < 3 ? 260 : 120"
            :height="i < 3 ? 260 : 120"
            :src="item.icon"
            :alt="item.name"
            :loading="i < 3 ? 'eager' : 'lazy'"
            class="img"
          />
          <p class="name">{{ item.name }}</p>
        </CustomLink>
      </section>
      <Loading v-if="loading"></Loading>
    </main>
    <Footer />
    <BackTop />
    <AdLoading />
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
        recGamesResponse,
        bestGamesResponse,
        newGamesResponse,
        hotGamesResponse,
        allCategoriesResponse
      ] = await Promise.all([
        $axios.$get("/api/game/menu", {
          params: {
            site_id: env.SITE_ID,
            mod_id: "rec-games",
            size: 3
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
            mod_id: "new-games",
            size: 14
          }
        }),
        $axios.$get("/api/game/menu", {
          params: {
            site_id: env.SITE_ID,
            mod_id: "hot-games",
            size: 36
          }
        }),
        $axios.$get("/api/game/get_all_category", {
          params: {
            site_id: env.SITE_ID
          }
        })
      ]);

      // 返回多个接口的数据
      return {
        recGames: recGamesResponse.list,
        bestGames: bestGamesResponse.list,
        newGames: newGamesResponse.list,
        hotGames: hotGamesResponse.list,
        navCategories: allCategoriesResponse.list.slice(0, 8)
      };
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
  data() {
    return {
      loading: false,
      endOfList: false,
      currentPage: 2,
      swiperOption: {
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
  methods: {
    async loadMoreHotGames() {
      if (this.loading || this.endOfList) return;
      this.loading = true;
      const newData = await this.$axios.$get("/api/game/menu", {
        params: {
          site_id: process.env.SITE_ID,
          mod_id: "hot-games",
          size: 66,
          page: this.currentPage
        }
      });

      this.hotGames = this.hotGames.concat(newData.list);

      if (newData.list.length === 0 || newData.list.length < 66) {
        this.endOfList = true;
      }
      this.loading = false;
      this.currentPage++;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "swiper/css/swiper.min.css";

.m-rec {
  display: none;
}
.swiper-box {
  border-radius: 18px;
  height: 408px;
  overflow: hidden;
}
.swiper-slide {
  &::before {
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 65%);
  }
  .img {
    width: 100%;
    height: 408px;
    object-fit: cover;
  }
  .name,
  .category,
  .btn-view {
    position: absolute;
    color: #fff;
    z-index: 3;
  }
  .name,
  .category {
    top: 66px;
    left: 127px;
    font-size: 64px;
    font-family: "Poppins-SemiBold";
    font-style: italic;
    font-weight: bold;
  }
  .category {
    top: 146px;
  }
  .btn-view {
    top: 234px;
    left: 127px;
    @include btn-img(144px, 52px, "btn_view_more.png");
    font-size: 16px;
  }
}
.swiper-button-prev,
.swiper-button-next {
  top: 44%;
  width: 64px;
  height: 64px;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 32px;
  font-weight: bold;
  --swiper-navigation-size: 20px;
  --swiper-theme-color: #fff;
}
.swiper-button-prev {
  left: 24px;
  &::after {
    margin-left: -4px;
  }
}
.swiper-button-next {
  right: 24px;
  &::after {
    margin-left: 4px;
  }
}
.swiper-pagination {
  width: unset;
  left: 135px;
  bottom: 94px;
}
.box-panel {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(262px, 1fr));
  gap: 12px;
  overflow: hidden;
  padding-top: 12px;
  margin-top: -12px;
  height: 550px;
  .item {
    border-radius: 16px;
    overflow: hidden;
    position: relative;
    background: #f5f6f7;
    transition: 0.3s;
    height: 262px;
    &:hover {
      background: #ffffff;
      box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.08);
      transform: translateY(-12px);
      .btn-view {
        color: #fff;
        @include bg("btn_view_panel.png");
      }
    }
  }
  .img {
    width: 100%;
    height: 144px;
    object-fit: cover;
  }
  .icon {
    display: block;
    width: 52px;
    height: 52px;
    border-radius: 12px;
    border: 2px solid #ffffff;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -70%);
  }
  .name {
    font-size: 16px;
    color: #171e27;
    font-weight: 500;
    text-align: center;
    @include ellipsis;
    margin-top: 30px;
    line-height: 18px;
  }
  .btn-view {
    width: 190px;
    height: 40px;
    background: #eaeaea;
    border-radius: 20px;
    @include center;
    color: #171e27;
    font-size: 16px;
    margin: 16px auto;
  }
}
.box-scroll {
  display: flex;
  flex-wrap: nowrap;
  gap: 18px;
  overflow-x: auto;
  padding-top: 6px;
  padding-left: 6px;
  margin-left: -6px;
  margin-top: -6px;
  &::-webkit-scrollbar {
    display: none;
  }
  .item {
    position: relative;
    width: 112px;
    flex-shrink: 0;
    &:hover {
      .img {
        transform: scale(1.1);
      }
    }
    .img {
      width: 112px;
      height: 112px;
      border-radius: 16px;
      transition: transform 0.2s linear;
    }
    .name {
      font-size: 16px;
      color: #171e27;
      font-weight: 500;
      text-align: center;
      @include ellipsis;
      margin-top: 12px;
      line-height: 18px;
    }
  }
}
.box-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(94px, 1fr));
  gap: 18px;
  .info {
    display: none;
  }
  .name {
    display: none;
  }
  .item {
    &:hover {
      .img {
        transform: scale(1.1);
      }
    }
    .img {
      width: 94px;
      height: 94px;
      border-radius: 16px;
      transition: transform 0.2s linear;
    }
    &:nth-child(1) {
      grid-row: 1 / 3;
      grid-column: 5 / 7;
      .img {
        width: 206px;
        height: 206px;
      }
    }
    &:nth-child(2) {
      grid-row: 1 / 3;
      grid-column: -5 / -3;
      .img {
        width: 206px;
        height: 206px;
      }
    }
    &:nth-child(3) {
      grid-row: 2 / 4;
      grid-column: 1 / 3;
      .img {
        width: 206px;
        height: 206px;
      }
    }
  }
}
@media screen and (min-width: 879px) and (max-width: 1200px) {
  .category {
    display: none;
  }
}
@media screen and (min-width: 879px) and (max-width: 1340px) {
  .box-grid {
    .item {
      &:nth-child(1) {
        grid-row: span 1;
        grid-column: span 1;
        .img {
          width: 94px;
          height: 94px;
        }
      }
      &:nth-child(2) {
        grid-row: span 1;
        grid-column: span 1;
        .img {
          width: 94px;
          height: 94px;
        }
      }
      &:nth-child(3) {
        grid-row: span 1;
        grid-column: span 1;
        .img {
          width: 94px;
          height: 94px;
        }
      }
    }
  }
}
@media screen and (max-width: 879px) {
  .swiper-box {
    border-radius: vw(32);
    height: vw(385);
    overflow: hidden;
    margin: 0 vw(46);
  }
  .pc-rec {
    display: none;
  }
  .m-rec {
    display: block;
  }
  .swiper-slide {
    .img {
      height: vw(385);
    }
    .name,
    .category {
      top: vw(235);
      left: vw(38);
      font-size: vw(38);
    }
    .category {
      top: vw(285);
    }
    .btn-view {
      display: none;
    }
  }
  .swiper-button-prev,
  .swiper-button-next {
    display: none;
  }
  .swiper-pagination {
    width: unset;
    left: vw(38);
    bottom: vw(24);
  }
  .box-panel {
    display: flex;
    flex-wrap: nowrap;
    gap: vw(24);
    overflow-x: auto;
    padding-top: 0;
    margin-top: 0;
    height: vw(186);
    padding-left: vw(46);
    &::-webkit-scrollbar {
      display: none;
    }
    .item {
      width: vw(138);
      border-radius: 0;
      background: unset;
      height: vw(186);
      flex-shrink: 0;
      &:hover {
        background: #ffffff;
        box-shadow: unset;
        transform: none;
      }
    }
    .img {
      display: none;
    }
    .icon {
      width: vw(138);
      height: vw(138);
      border-radius: vw(24);
      border: none;
      position: relative;
      left: unset;
      transform: unset;
    }
    .name {
      font-size: vw(24);
      margin-top: vw(14);
      line-height: vw(32);
    }
    .btn-view {
      display: none;
    }
  }
  .box-scroll {
    gap: vw(24);
    padding-top: 0;
    margin-left: 0;
    margin-top: 0;
    padding-left: vw(46);
    .item {
      width: vw(138);
      &:hover {
        .img {
          transform: scale(1);
        }
      }
      .img {
        width: vw(138);
        height: vw(138);
        border-radius: vw(24);
      }
      .name {
        font-size: vw(24);
        margin-top: vw(14);
        line-height: vw(32);
      }
    }
  }
  .box-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, vw(204));
    gap: vw(23);
    padding: 0 vw(46);
    .item {
      position: relative;
      display: flex;
      justify-content: center;
      &:hover {
        .img {
          transform: scale(1);
        }
      }
      .img {
        width: vw(138);
        height: vw(138);
        border-radius: vw(24);
        position: absolute;
      }
      .name {
        display: block;
        text-align: center;
        width: vw(204);
        height: vw(154);
        border-radius: vw(38);
        margin-top: vw(46);
        font-size: vw(24);
        line-height: vw(32);
        background: #f5f6f7;
        padding: vw(108) vw(24) 0;
        @include ellipsis;
        color: #171e27;
      }
      &:nth-child(n-3) {
        grid-row: span 1;
        grid-column: span 1;
        .img {
          width: vw(138);
          height: vw(138);
        }
      }
    }
  }
}
</style>
<style lang="scss">
.swiper-pagination-bullet {
  width: 12px;
  height: 8px;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 4px;
  opacity: 1;
  transition: 0.4s;
}
.swiper-pagination-bullet-active {
  background: rgba(255, 255, 255, 1);
  width: 32px;
}
</style>
