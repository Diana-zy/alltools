<template>
  <div class="page">
    <Header />
    <article class="article">
      <h1 class="title">{{ articleData.name }}</h1>
      <NuxtImg
        format="auto"
        fit="cover"
        width="1136"
        :src="articleData.cover"
        :alt="articleData.name"
        class="banner"
        loading="lazy"
      />
      <GoogleAd ad-slot="2896349709" />
      <!-- eslint-disable vue/no-v-html -->
      <div class="article-content" v-html="articleData.content"></div>
      <!--eslint-enable-->
    </article>
    <Footer />
    <BackTop />
    <AdLoading />
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, params, env }) {
    const path = params.topic;
    const lastDashIndex = path.lastIndexOf("-");
    const id = path.substring(lastDashIndex + 1, path.length);

    const data = await $axios.$get("/api/game/topic_detail", {
      params: {
        site_id: env.SITE_ID,
        article_id: id
      }
    });
    data.content = data.content.replace(/<\/h4><p><br><br>|<br><br><\/p><h4>/g, (match) => {
      return match.includes("</h4><p>") ? "</h4><p>" : "</p><h4>";
    });
    return {
      articleData: data
    };
  }
};
</script>

<style scoped lang="scss">
.article {
  margin-top: 16px;
  background-color: $color3;
  border-radius: 16px;
}
.title {
  padding: 16px 32px 60px;
  font-size: 26px;
  font-family: "seb";
  color: $font1;
}
.banner {
  width: calc(100% - 64px);
  margin: 0 32px 32px;
  border-radius: 32px;
}
@media screen and (max-width: 750px) {
  .article {
    margin: 0;
    border-radius: 0;
    background: none;
  }
  .title {
    font-size: vw(36);
    padding: vw(54) vw(46);
  }
  .banner {
    width: vw(658);
    margin: 0 auto vw(48);
    border-radius: vw(20);
  }
}
</style>

<style lang="scss">
.article-content {
  padding: 32px;
  font-size: 14px;
  line-height: 26px;
  * {
    font-family: "sesb" !important;
    color: rgba($font1, 0.6) !important;
    background: none !important;
  }
  img {
    width: 70% !important;
    height: auto !important;
    border-radius: 30px;
    margin: 1em auto;
  }
  br {
    height: 0 !important;
  }
  p {
    min-height: 1em;
    margin-bottom: 4px;
  }
  strong {
    font-family: "seb" !important;
    font-weight: bold;
  }
  #relatedsearches1 {
    margin-top: 1em;
  }
  h1,
  h2,
  h3,
  h4 {
    font-size: 1.02em;
    margin: 1em 0;
    font-weight: bold;
  }
}
@media screen and (max-width: 750px) {
  .article-content {
    margin: vw(48) vw(46) 0;
    padding: vw(40) vw(28);
    font-size: vw(26) !important;
    line-height: vw(36) !important;
    background-color: $color3;
    border-radius: vw(20);
    img {
      width: 100% !important;
      border-radius: vw(20);
    }
    p {
      margin-bottom: vw(10);
    }
  }
}
</style>
