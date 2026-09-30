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
    this.lockHeight();
  },
  beforeDestroy() {
    if (this.heightObserver) this.heightObserver.disconnect();
  },
  methods: {
    // 广告脚本(fluid 渲染 / 兜底的经典 AdSense 自适应广告)有时会用带 !important 的内联样式
    // 把容器高度改高，CSS 层面的 !important 拦不住内联 !important，只能用 JS 实时把它纠正回来。
    lockHeight() {
      const el = this.$refs.admSlot;
      const fixedHeight = el.getBoundingClientRect().height;
      if (!fixedHeight) return;
      const enforce = () => {
        if (Math.round(el.getBoundingClientRect().height) !== Math.round(fixedHeight)) {
          el.style.setProperty("height", `${fixedHeight}px`, "important");
          el.style.setProperty("max-height", `${fixedHeight}px`, "important");
          el.style.setProperty("overflow", "hidden", "important");
        }
      };
      enforce();
      this.heightObserver = new MutationObserver(enforce);
      this.heightObserver.observe(el, {
        attributes: true,
        attributeFilter: ["style"],
        childList: true,
        subtree: true
      });
    },
    handleIntersection(entries) {
      if (entries[0].isIntersecting) {
        const width = this.$refs.admSlot.clientWidth;
        const height = this.$refs.admSlot.clientHeight - this.$refs.title.clientHeight;
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
  height: 200px !important;
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
    height: vw(560) !important;
    max-height: vw(560) !important;
    overflow: hidden;
  }
  .title {
    font-size: vw(24);
    line-height: vw(35);
  }
}
</style>
