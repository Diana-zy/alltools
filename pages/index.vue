<template>
  <div class="page">
    <div class="fix-bg"></div>
    <Header current-path="home" />
    <main class="main">
      <div class="wrapper">
        <adm-slot
          adm-id="home-1"
          adm-unit="/23197833490/alltools1/alltools1_home_1"
          ads-slot="6667048681"
          class="ad-1 ad-top"
        />

        <!-- 两个合集的封面图（标题/文案/按钮都是直接画在图里的，不需要前端再叠一层文字），
        PC端 Puzzle Games / AI Apps 两张并排一样大；移动端 Puzzle Games 占一整行，AI Apps 缩小跟
        Editor's Picks（封面图复用 home-recommended-apks 模块第1条数据的 mobile_img）拼一行，
        省垂直空间 -->
        <section class="collections">
          <div class="collections-top">
            <CustomLink
              to="/puzzle-games/"
              class="collection-card"
              @click.native="trackBannerClick('home_puzzle_banner')"
            >
              <NuxtImg
                v-if="puzzleBanner"
                format="auto"
                fit="cover"
                width="1200"
                height="560"
                :src="puzzleBanner.pc_img || puzzleBanner.icon"
                alt="Best Free Puzzle Games"
                fetchpriority="high"
                class="collection-img m-hidden"
              />
              <NuxtImg
                v-if="puzzleBanner"
                format="auto"
                fit="cover"
                width="690"
                height="300"
                :src="puzzleBanner.mobile_img || puzzleBanner.icon"
                alt="Best Free Puzzle Games"
                fetchpriority="high"
                class="collection-img pc-hidden"
              />
            </CustomLink>
            <CustomLink
              to="/ai-apps/"
              class="collection-card m-hidden"
              @click.native="trackBannerClick('home_ai_apps_banner')"
            >
              <NuxtImg
                v-if="aiBanner"
                format="auto"
                fit="cover"
                width="1200"
                height="560"
                :src="aiBanner.pc_img || aiBanner.icon"
                alt="Most Popular AI Apps"
                class="collection-img"
              />
            </CustomLink>
          </div>
          <div class="collections-bottom pc-hidden">
            <CustomLink
              to="/ai-apps/"
              class="collection-card collection-ai-small"
              @click.native="trackBannerClick('home_ai_apps_banner')"
            >
              <NuxtImg
                v-if="aiBanner"
                format="auto"
                fit="cover"
                width="446"
                height="230"
                :src="aiBanner.mobile_img || aiBanner.icon"
                alt="Most Popular AI Apps"
                class="collection-img"
              />
            </CustomLink>
            <CustomLink
              to="/rankings/?tab=picks"
              class="collection-card editor-picks-card"
              @click.native="trackBannerClick('home_editors_picks_banner')"
            >
              <NuxtImg
                v-if="editorPicksBanner"
                format="auto"
                fit="cover"
                width="230"
                height="240"
                :src="editorPicksBanner.mobile_img || editorPicksBanner.icon"
                alt="Editor's Picks"
                class="collection-img"
              />
            </CustomLink>
          </div>
        </section>

        <article class="article">
          <CustomLink to="/rankings/?tab=picks" class="title-h2 title-h2-first"
            ><span class="title-text">Top Picks in Last 24 Hours<span class="emoji-fire">🔥</span></span
            ><div class="title-see-more"><span>View All</span><i class="icon-arrow" /></div
          ></CustomLink>
          <section class="top-picks">
            <div class="box-row-scroll box-scroll-hidden">
              <ContentItemRow
                v-for="(item, index) in recommendedApksShown"
                :key="index"
                :item="item"
                :index="index"
                :eager="2"
                list-name="top_picks"
                :to="`/${item.type === 1 ? 'game' : 'app'}/${item.path}/`"
              />
            </div>
            <div class="recommended-apks">
              <ContentItemRank
                v-for="(item, index) in recommendedApksShown"
                :key="index"
                :item="item"
                :index="index"
                list-name="top_picks"
                :to="`/${item.type === 1 ? 'game' : 'app'}/${item.path}/`"
              />
            </div>
          </section>

          <!-- 页内广告位（第2个，轮播+Top Picks之后） -->
          <adm-slot
            adm-id="home-2"
            adm-unit="/23197833490/alltools1/alltools1_home_2"
            ads-slot="4080715115"
            class="ad-2"
          />

          <template v-if="newReleases.length > 0">
            <CustomLink to="/new-release/" class="title-h2"
              ><span class="title-text">Update in last 24 hours<span class="badge-new">NEW</span></span
              ><div class="title-see-more"><span>View All</span><i class="icon-arrow" /></div
            ></CustomLink>
            <section class="new-release">
              <div class="box-row-scroll box-scroll-hidden">
                <ContentItemRow
                  v-for="(item, index) in newReleases.slice(0, 9)"
                  :key="index"
                  :item="item"
                  :index="index"
                  list-name="new_release"
                  :to="`/${item.type === 1 ? 'game' : 'app'}/${item.path}/`"
                />
              </div>
              <div class="recommended-apks">
                <ContentItemRank
                  v-for="(item, index) in newReleases.slice(0, 9)"
                  :key="index"
                  :item="item"
                  :index="index"
                  :show-rank="false"
                  list-name="new_release"
                  :to="`/${item.type === 1 ? 'game' : 'app'}/${item.path}/`"
                />
              </div>
            </section>
          </template>

          <template v-if="editorsPick.length > 0">
            <CustomLink to="/picks/" class="title-h2 easy-use-title"
              ><span class="title-text">Easy Use and Happy Life<span class="emoji-smile">🤩</span></span
              ><div class="title-see-more"><span>View All</span><i class="icon-arrow" /></div
            ></CustomLink>
            <section class="editors-pick">
              <div class="box-row-scroll box-scroll-hidden">
                <ContentItemRow
                  v-for="(item, index) in editorsPick.slice(0, 9)"
                  :key="index"
                  :item="item"
                  :index="index"
                  list-name="editors_pick"
                  :to="`/${item.type === 1 ? 'game' : 'app'}/${item.path}/`"
                />
              </div>
              <div class="recommended-apks">
                <ContentItemRank
                  v-for="(item, index) in editorsPick.slice(0, 9)"
                  :key="index"
                  :item="item"
                  :index="index"
                  :show-rank="false"
                  list-name="editors_pick"
                  :to="`/${item.type === 1 ? 'game' : 'app'}/${item.path}/`"
                />
              </div>
            </section>
          </template>

          <!-- 页内广告位（第3个，Update+Easy Use之后） -->
          <adm-slot
            adm-id="home-3"
            adm-unit="/23197833490/alltools1/alltools1_home_3"
            ads-slot="23384133665"
            class="ad-2"
          />

          <CustomLink to="/rankings/?tab=apps" class="title-h2"
            ><span class="title-text">Top Apps</span
            ><div class="title-see-more"><span>View All</span><i class="icon-arrow" /></div
          ></CustomLink>
          <section class="best-tools">
            <div class="box-row-scroll box-scroll-hidden">
              <ContentItemRow
                v-for="(item, index) in bestApps.slice(0, 9)"
                :key="index"
                :item="item"
                :index="index"
                :eager="2"
                list-name="top_apps"
                :to="`/app/${item.path}/`"
              />
            </div>
            <div class="box-list-section">
              <ContentItemList
                v-for="(item, index) in bestApps.slice(0, 9)"
                :key="index"
                :index="index"
                :item="item"
                list-name="top_apps"
                :to="`/${'app'}/${item.path}/`"
              />
            </div>
          </section>

          <!-- 页内广告位（第4个，Top Apps之后） -->
          <adm-slot
            adm-id="home-4"
            adm-unit="/23197833490/alltools1/alltools1_home_4"
            ads-slot="23379573501"
            class="ad-4"
          />

          <CustomLink to="/rankings/?tab=games" class="title-h2"
            ><span class="title-text">Top Games</span
            ><div class="title-see-more"><span>View All</span><i class="icon-arrow" /></div
          ></CustomLink>
          <section class="top-games">
            <div class="box-row-scroll box-scroll-hidden">
              <ContentItemRow
                v-for="(item, index) in bestGames.slice(0, 9)"
                :key="index"
                :item="item"
                :index="index"
                list-name="top_games"
                :to="`/${item.type === 1 ? 'game' : 'app'}/${item.path}/`"
              />
            </div>
            <div class="box-list-section">
              <ContentItemList
                v-for="(item, index) in bestGames.slice(0, 9)"
                :key="index"
                :index="index"
                :item="item"
                list-name="top_games"
                :to="`/${item.type === 1 ? 'game' : 'app'}/${item.path}/`"
              />
            </div>
          </section>
        </article>
      </div>
    </main>
    <Footer />
    <QuickNav />
    <!-- <AdLoading /> -->
  </div>
</template>

<script>
import { trackEvent, trackFacebookStandardEvent } from "~/utils/track";

// 站点管理 / 模块游戏推荐（site_module 表）里还没配置这个 mod_id 时，/api/game/menu 会报错，
// 这里统一兜底成空列表，不让首页因为运营还没配好某个模块就直接挂掉。
async function fetchModule($axios, siteId, modId, size) {
  try {
    const res = await $axios.$get("/api/game/menu", {
      params: { site_id: siteId, mod_id: modId, size }
    });
    return res.list || [];
  } catch (error) {
    console.error(
      `[home] fetchModule 失败 mod_id=${modId} site_id=${siteId}:`,
      error && error.message,
      error && error.response && error.response.status,
      error && error.response && error.response.data
    );
    return [];
  }
}

export default {
  async asyncData({ $axios, env }) {
    try {
      // 依次请求而不是 Promise.all 并发——后端在多个并发请求下会 502（实测单条请求正常，
      // 4 条并发就炸），排队请求虽然多花几百毫秒，但不会把首页拖挂。
      const bestApps = await fetchModule($axios, env.SITE_ID, "best-apps", 30);
      const bestGames = await fetchModule($axios, env.SITE_ID, "best-games", 30);
      // 以下模块由 BI 后台「站点管理/模块游戏推荐」运营配置，未配置时为空数组，走 fallback
      const recommendedApksConfigured = await fetchModule(
        $axios,
        env.SITE_ID,
        "home-recommended-apks",
        10
      );
      const newReleases = await fetchModule($axios, env.SITE_ID, "new-games", 9);
      const editorsPick = await fetchModule($axios, env.SITE_ID, "home-editors-pick", 9);
      // 轮播位换成的两个合集入口卡片：复用 puzzle-games-banner/ai-apps-banner 这两个模块
      // （落地页 /puzzle-games/ /ai-apps/ 的主列表内容也是这两个模块），只取第1条数据的
      // pc_img/mobile_img 当首页封面图，标题/文案直接画在图里，前端不叠字
      const puzzleGamesBannerConfigured = await fetchModule(
        $axios,
        env.SITE_ID,
        "puzzle-games-banner",
        1
      );
      const aiAppsBannerConfigured = await fetchModule($axios, env.SITE_ID, "ai-apps-banner", 1);

      return {
        bestApps,
        bestGames,
        recommendedApksConfigured,
        newReleases,
        editorsPick,
        puzzleGamesBannerConfigured,
        aiAppsBannerConfigured
      };
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
  data() {
    return {
      bestApps: [],
      bestGames: [],
      recommendedApksConfigured: [],
      newReleases: [],
      editorsPick: [],
      puzzleGamesBannerConfigured: [],
      aiAppsBannerConfigured: []
    };
  },
  mounted() {
    // 首页浏览来源：站内其他页面跳转过来 referrer 是本站域名，否则算落地页（直接访问/外部来源）
    let viewSource = "landing";
    if (document.referrer) {
      try {
        viewSource =
          new URL(document.referrer).origin === window.location.origin ? "internal" : "landing";
      } catch (e) {
        viewSource = "landing";
      }
    }
    trackEvent("home_page", { view_source: viewSource });
    // ViewContent 不再给首页浏览用，让给详情页第一个banner广告点击/详情页下载按钮点击/
    // 下载页下载按钮点击这三个动作共用，这里只留 GA4/GTM 这条
  },
  computed: {
    // 推荐位：BI 后台「站点管理/模块游戏推荐」配置了 mod_id 就用配置的，没配就 fallback 到 ranking 数据
    recommendedApksShown() {
      return (
        this.recommendedApksConfigured.length ? this.recommendedApksConfigured : this.bestApps
      ).slice(0, 9);
    },
    // 几个封面图：运营还没在 BI 后台配置对应模块时为 null，卡片走纯色背景兜底（不渲染图片），
    // 不会因为没图挂掉或者显示 broken image
    puzzleBanner() {
      return this.puzzleGamesBannerConfigured[0] || null;
    },
    aiBanner() {
      return this.aiAppsBannerConfigured[0] || null;
    },
    // Editor's Picks 直接复用首页「Top Picks in Last 24 Hours」那个模块（home-recommended-apks）
    // 第一条数据的封面图，不用额外建模块
    editorPicksBanner() {
      return this.recommendedApksConfigured[0] || null;
    }
  },
  methods: {
    // 轮播位换成的三张入口大图直接写在模板里，没有走 ContentItemRow 这类带 home_content_click
    // 打点的公用组件，之前漏了。这三张图只会出现在首页，page_type 不用再判断，直接写死 home
    trackBannerClick(listName) {
      const params = { list_name: listName };
      trackEvent("card_click", { page_type: "home", ...params });
      trackEvent("home_content_click", params);
    }
  }
};
</script>
<style lang="scss" scoped>
.page {
  position: relative;
  overflow-x: hidden;
}
.fix-bg {
  width: 100%;
  height: 280px;
  position: absolute;
  top: 64px;
  left: 0;
  background: #ffffff;
}
.main {
  max-width: 1440px;
  margin: 0 auto;
}

.wrapper {
  max-width: 1230px;
  margin: 0 auto;
  padding: 0 15px;
  box-sizing: border-box;
}

.ad-top {
  margin-top: 16px;
}

.article {
  width: 100%;
}

.title-h2-first {
  margin-top: 24px;
}

.emoji-fire {
  margin-left: 6px;
  font-size: 18px;
}

.badge-new {
  display: inline-block;
  margin-left: 6px;
  padding: 2px 6px;
  border-radius: 4px;
  background: $color2;
  font-family: seb;
  font-size: 11px;
  line-height: 1.3;
  color: #ffffff;
  vertical-align: 2px;
}

.emoji-smile {
  margin-left: 6px;
  font-size: 18px;
}

// Update in last 24 hours 和 Easy Use and Happy Life 这两个模块紧挨着，全局 .title-h2 的
// margin-top:10px 视觉上太挤，这里单独给 Easy Use 标题加 15px 间距，不改全站公用的 .title-h2
.easy-use-title {
  margin-top: 25px;
}

// 轮播图实测点击率不行，换成固定的合集入口卡片，不走swiper——纯静态展示，不存在轮播场景下
// "异步加载布局闪一下"的问题。封面图本身就带了标题/文案/按钮（运营直接出成品图上传），
// 前端不用再叠一层文字
.collections {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}

.collections-top {
  display: flex;
  gap: 16px;
  width: 100%;
}

.collection-card {
  position: relative;
  flex: 1;
  min-width: 0;
  height: 280px;
  border-radius: 24px;
  overflow: hidden;
  transition: transform 0.2s;
  // 运营还没在 BI 后台传封面图之前，走这个纯灰背景兜底，不会显示 broken image
  background: #f5f6f8;

  &:hover {
    transform: translateY(-2px);
  }
}

.collection-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
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

.recommended-apks {
  display: none;
}

.pc-hidden {
  display: none;
}

.m-hidden {
  display: block;
}

.ad-1,
.ad-2,
.ad-4 {
  margin-top: 32px;
}

@media screen and (min-width: 879px) and (max-width: 1240px) {
  .fix-bg {
    height: vw2(280);
  }
  .collection-card {
    height: vw2(280);
    border-radius: vw2(24);
  }
}
@media screen and (max-width: 879px) {
  .page {
    background: #ffffff;
  }
  .fix-bg {
    display: none;
  }
  .main {
    padding: 0;
  }

  .collections {
    gap: vw(24);
  }

  .collections-top {
    gap: vw(24);
  }

  // Puzzle Games 占一整行通栏banner，AI Apps 在下面跟 Editor's Picks 拼一行、缩小展示
  .collection-card {
    height: vw(300);
    border-radius: vw(24);
  }

  // 移动端 AI Apps + Editor's Picks 拼一行，省一整张banner的垂直空间。
  // 这里必须写 .collections-bottom.pc-hidden（两个class）而不是单独写 .collections-bottom，
  // 否则跟后面 .pc-hidden{display:block} 选择器优先级相同、按源码顺序后者会覆盖掉
  // display:flex，导致这一整行（里面都是<a>标签，默认display:inline）高度塌陷成0看不见
  .collections-bottom.pc-hidden {
    display: flex;
    gap: vw(20);
  }

  // AI Apps 占约2/3宽度，Editor's Picks占约1/3，跟PC端AI Apps整行通栏比例呼应
  .collection-ai-small {
    flex: 2;
    height: vw(230);
  }

  .editor-picks-card {
    flex: 1;
    height: vw(230);
  }

  .box-row-scroll {
    display: none;
  }

  .box-common {
    margin: 0;
    padding: 0;
  }

  .box-list-section {
    display: grid;
    margin: 0;
    grid-template-columns: repeat(3, 1fr);
  }

  .recommended-apks {
    width: 100%;
    max-width: 100vw;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    display: grid;
    grid-auto-flow: column;
    grid-template-rows: repeat(3, auto);
    grid-auto-columns: 88%;
    column-gap: vw(24);
    row-gap: vw(24);
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
      width: 0;
      height: 0;
    }
  }

  .title-h2 {
    position: relative;
    width: 100%;
    height: vw(72);
    z-index: 2;
    margin: 10px 0 5px;
  }

  .title-h2-first {
    margin-top: 24px;
  }

  .easy-use-title {
    margin-top: vw(30);
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
  .ad-1,
  .ad-2,
  .ad-4 {
    margin-top: vw(48);
  }
}
</style>
