<template>
  <a :href="customLink || to" @click="handleClick">
    <slot></slot>
  </a>
</template>

<script>
import { generateCustomLink } from "~/utils/utils";
import { trackEvent, getPageType } from "~/utils/track";

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
      trackEvent("content_click", { page_type: getPageType() });
      // 给 app.html 里的 able_3s_exit 用：站内跳转不算"离开网站"
      if (typeof window !== "undefined") {
        window.__internalNavClick = true;
      }
    }
  }
};
</script>
