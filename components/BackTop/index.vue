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

<style lang="scss" scoped></style>
