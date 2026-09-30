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
    // 广告没准备好之前，整个广告位（连"Advertisement"标题都不露）保持高度为 0、
    // 不可见，避免用户看到一个框先出现、再长大的过程。内部内容（标题、ad-slot、
    // 兜底的经典 AdSense）照常渲染测量，只是被 overflow:hidden 裁掉不可见。等
    // ResizeObserver 量到真实内容高度后，一步到位直接显示成最终高度（不做动画过渡），
    // 上限还是原来定的 max-height（200px / vw(560)），防止异常情况撑到很高；广告
    // 请求本身仍然按这个上限申请，让广告有机会用满。
    setupSizing() {
      const el = this.$refs.admSlot;
      const computedMaxHeight = parseFloat(window.getComputedStyle(el).maxHeight);
      this.maxHeight = Number.isFinite(computedMaxHeight) ? computedMaxHeight : 200;
      this.titleHeight = this.$refs.title.getBoundingClientRect().height;

      const adsEl = document.getElementById(`${this.admId}-ads`);
      this.resizeObserver = new ResizeObserver(() => {
        const adHeight = this.$refs.googleAdmSlot.scrollHeight;
        const fallbackHeight = adsEl ? adsEl.scrollHeight : 0;
        const contentHeight = Math.max(adHeight, fallbackHeight);
        if (contentHeight > 0) {
          const target = Math.min(this.titleHeight + contentHeight, this.maxHeight);
          el.style.setProperty("height", `${target}px`, "important");
        } else {
          el.style.setProperty("height", "0px", "important");
        }
        el.style.setProperty("overflow", "hidden", "important");
      });
      this.resizeObserver.observe(this.$refs.googleAdmSlot);
      if (adsEl) this.resizeObserver.observe(adsEl);
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
  height: 0;
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
    height: 0;
    max-height: vw(560);
    overflow: hidden;
  }
  .title {
    font-size: vw(24);
    line-height: vw(35);
  }
}
</style>
