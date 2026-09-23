<template>
  <div class="description-text">
    <h2 class="title-h2">Description</h2>
    <div class="text-content">
      {{ cleanText }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    }
  },
  computed: {
    // 部分应用（比如 Google Play）的描述原文里混了 HTML 标签（<h2>/<br> 这种），
    // 抓取时没有做清洗，直接展示会把标签符号也显示出来，这里统一剥掉
    cleanText() {
      return (this.text || "").replace(/<[^>]*>/g, "");
    }
  }
};
</script>

<style lang="scss" scoped>
.text-content {
  line-height: 1.5;
  color: rgba($font1, 0.6);
  text-align: left;
  word-break: break-word;
  white-space: pre-line;
}

@media screen and (max-width: 879px) {
  .description-text {
    padding: 0 vw(46);
    font-size: vw(24);
  }
}
</style>
