<template>
  <div>
    <div ref="admSlot" class="adm-slot">
      <div ref="title" class="title">Advertisement</div>
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
  },
  methods: {
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
  height: 250px;
  
}
.title {
  line-height: 24px;
  font-size: 12px;
  color: $font2;
  background: $color4;
  text-align: center;
}

@media screen and (max-width: 879px) {
  .adm-slot {
    height: vw(673);
    max-height: vw(673);
    // height: 280px;
    // max-height: 280px;
    overflow-y: clip;
  }
  .title {
    padding-left: vw(30);
    font-size: vw(24);
    line-height: vw(36);
  }
}
</style>
