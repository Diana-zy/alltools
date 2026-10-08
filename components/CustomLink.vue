<template>
  <a :href="customLink || to" @click="handleClick">
    <slot></slot>
  </a>
</template>

<script>
import { generateCustomLink } from "~/utils/utils";
import { trackEvent, getPageType, trackFacebookStandardEvent } from "~/utils/track";

export default {
  props: {
    to: {
      type: String || Number,
      required: true
    }
  },
  data() {
    return {
      customLink: ""
    };
  },
  mounted() {
    this.customLink = generateCustomLink(this.to);
  },
  methods: {
    handleClick() {
      const pageType = getPageType();
      trackEvent("content_click", { page_type: pageType });
      trackFacebookStandardEvent("AddToCart", { page_type: pageType });
      // 详情页的内容点击（含下载按钮，下载按钮单独在 _app.vue/_game.vue 里调用）额外叠加映射
      // CompleteRegistration，不替换上面的 AddToCart，两个事件都会上报
      if (pageType === "app_detail" || pageType === "game_detail") {
        trackFacebookStandardEvent("CompleteRegistration", { page_type: pageType });
      }
      // 给 app.html 里的 able_3s_exit 用：站内跳转不算"离开网站"
      if (typeof window !== "undefined") {
        window.__internalNavClick = true;
      }
    }
  }
};
</script>
