<template>
  <div>
    <div ref="admSlot" class="adm-slot">
      <p ref="title" class="title">Advertisement</p>
      <div :id="admId" ref="googleAdmSlot" class="ad-slot" :data-slot="adsSlot"></div>
      <div :id="`${admId}-ads`"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    admId: {
      type: String,
      required: true
    },
    admUnit: {
      type: String,
      required: true
    },
    adsSlot: {
      type: String,
      required: true
    }
  },
  mounted() {
    this.observer = new IntersectionObserver(this.handleIntersection);
    this.observer.observe(this.$refs.googleAdmSlot);
    this.setupSizing();
  },
  beforeDestroy() {
    if (this.resizeObserver) this.resizeObserver.disconnect();
  },
  methods: {
    // CSS 默认是 height:auto，页面刚渲染时容器天然贴合标题高度（没有内容可撑开），
    // 不需要 JS 介入就已经是"矮"的状态。等广告(fluid 渲染或兜底的经典 AdSense)真正
    // 渲染出内容后，用 ResizeObserver 量出实际内容高度再把容器长上去，但不超过 CSS
    // 里定义的上限（max-height，即之前的 200px / vw(560)），防止异常情况撑到很高；
    // 没有内容时把高度还给 CSS 的 auto，容器自动收回去。
    setupSizing() {
      const el = this.$refs.admSlot;
      const computedMaxHeight = parseFloat(window.getComputedStyle(el).maxHeight);
      this.maxHeight = Number.isFinite(computedMaxHeight)
        ? computedMaxHeight
        : el.getBoundingClientRect().height;
      this.titleHeight = this.$refs.title.getBoundingClientRect().height;

      const adsEl = document.getElementById(`${this.admId}-ads`);
      this.resizeObserver = new ResizeObserver(() => {
        const adHeight = this.$refs.googleAdmSlot.scrollHeight;
        const fallbackHeight = adsEl ? adsEl.scrollHeight : 0;
        const contentHeight = Math.max(adHeight, fallbackHeight);
        if (contentHeight > 0) {
          this.applyHeight(Math.min(this.titleHeight + contentHeight, this.maxHeight));
        } else {
          el.style.removeProperty("height");
          el.style.setProperty("overflow", "hidden", "important");
        }
      });
      this.resizeObserver.observe(this.$refs.googleAdmSlot);
      if (adsEl) this.resizeObserver.observe(adsEl);
    },
    applyHeight(height) {
      const el = this.$refs.admSlot;
      el.style.setProperty("height", `${height}px`, "important");
      el.style.setProperty("overflow", "hidden", "important");
    },
    handleIntersection(entries) {
      if (entries[0].isIntersecting) {
        const width = this.$refs.admSlot.clientWidth;
        const height = this.maxHeight - this.titleHeight;
        console.log(width, height);
        const adScript = document.createElement("script");
        adScript.innerHTML = `googletag.cmd.push(function () {
              googletag.defineSlot('${this.admUnit}', ['fluid', [${width},${height}]], '${this.admId}').addService(googletag.pubads());
              googletag.enableServices();
              googletag.display('${this.admId}');
            });`;
        this.$refs.googleAdmSlot.appendChild(adScript);
        this.observer.unobserve(this.$refs.googleAdmSlot);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.adm-slot {
  margin: 0 auto;
  width: 100%;
  height: auto;
  max-height: 200px;
  overflow: hidden;
}
.title {
  background: #ffffff;
  line-height: 24px;
  color: $font2;
  text-align: center;
}

@media screen and (max-width: 879px) {
  .adm-slot {
    height: auto;
    max-height: vw(560);
    overflow: hidden;
  }
  .title {
    font-size: vw(24);
    line-height: vw(35);
  }
}
</style>
