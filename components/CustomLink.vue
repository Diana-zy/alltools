<template>
  <a :href="customLink || to" @pointerdown="handleClick">
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
    // 用 pointerdown（按下的瞬间）而不是 click 来触发埋点：插页广告库很可能在捕获阶段
    // 抢在我们自己的 click 处理函数之前拦截点击、阻止事件继续传播，导致"用户到底点没点"
    // 这个事实被广告拦截结果绑死——用户如果直接点了广告跳走，我们的 click 处理函数根本
    // 没机会执行，内容点击就彻底漏报。pointerdown 和 click 是完全独立的事件类型，广告库
    // 拦截 click 不会影响已经先一步跑完的 pointerdown；同时 pointerdown 在桌面/移动端
    // （鼠标/触摸/触控笔）都是统一标准事件，不用额外处理触屏兼容
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
