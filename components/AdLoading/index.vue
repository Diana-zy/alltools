<template>
  <div v-show="loading" id="ad-loading" class="mask-loading">
    <Loading />
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: true,
      timer: null
    };
  },
  mounted() {
    const _this = this;

    _this.timer = setTimeout(() => {
      _this.loading = false;
      mutationObserver.disconnect();
    }, 2600);

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes") {
          if (
            mutation.target.matches("ins.adsbygoogle") &&
            mutation.attributeName === "data-vignette-loaded"
          ) {
            const value = mutation.target.getAttribute("data-vignette-loaded");
            if (value === "true") {
              _this.loading = false;
              mutationObserver.disconnect();
              clearTimeout(_this.timer);
            }
          }
        }
      });
    });

    mutationObserver.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["data-vignette-loaded"]
    });
  }
};
</script>
<style lang="scss" scoped>
.mask-loading {
  width: 100%;
  height: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100001;
}
</style>
