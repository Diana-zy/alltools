<template>
  <div v-show="showBackToTop" class="btn-back-top" @click="scrollToTop"
    ><i class="icon-back-top"></i
  ></div>
</template>

<script>
export default {
  data() {
    return {
      showBackToTop: false
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.showBackToTop = window.scrollY > 300;
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.btn-back-top {
  position: fixed;
  z-index: 500;
  bottom: 120px;
  right: 158px;
  cursor: pointer;
  @include btn-img(80px, 66px, "btn_back_top.png");
}
.icon-back-top {
  @include icon(28px, 24px, "icon_back_top.png");
}
@media screen and (max-width: 879px) {
  .btn-back-top {
    bottom: vw(160);
    right: vw(38);
    cursor: pointer;
    @include btn-img(vw(92), vw(92), "icon_back_top2.png");
  }
  .icon-back-top {
    display: none;
  }
}
</style>
