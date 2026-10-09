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
  watch: {
    // 不能用 mounted 一次性算好就完事：像 Rankings 页切 Tab 这种场景，不同 Tab 渲染的是
    // 同一个组件、相同的 :key，Vue 会直接复用组件实例而不是销毁重建，mounted 就不会再触发，
    // 导致 customLink 停在第一次挂载时的旧值，点击永远跳到错的详情页。改成 watch 这个 prop，
    // 每次 to 变化都重新计算；immediate: true 兼容原来 mounted 里"首次挂载也要算一次"的效果。
    to: {
      immediate: true,
      handler(newTo) {
        if (process.client) {
          this.customLink = generateCustomLink(newTo);
        }
      }
    }
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
