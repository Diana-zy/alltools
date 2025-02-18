<template>
  <a id="link-outside" :href="item.target_url" class="swiper-slide pc-hidden">
    <NuxtImg
      class="img"
      format="auto"
      fit="cover"
      width="658"
      height="316"
      :src="item.mobile_img"
      :alt="item.name"
      loading="eager "
      preloader
    />

    <div class="download-btn pc-button-hidden"
      ><i class="icon-play" /><i class="icon-rocket"
    /></div>
  </a>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.download-btn {
  width: 130px;
  height: 36px;
  background: linear-gradient(45deg, #d14fff 0%, #44d2ff 100%);
  border-radius: 40px;
  position: absolute;
  bottom: 26px;
  right: 50%;
  transform: translateX(50%);
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Segoe bold";
  color: #ffffff;
  outline: 4px solid rgba(#ffffff, 0.4);
  .icon-rocket {
    @include icon(16px, 16px, "icon-rocket.png");
    margin-left: 6px;
  }
}

.m-button-hidden {
  display: flex;
}
.pc-hidden {
  display: none;
}
.m-hidden {
  display: none;
}

@media screen and (max-width: 879px) {
  .download-btn {
    font-family: seb;
    width: vw(134);
    height: vw(48);
    border-radius: vw(80);
    bottom: vw(24);
    background: linear-gradient(86deg, #d000ff 0%, #5b75ff 100%);
    // right: vw(24);
    // transform: translateX(0);
    z-index: 2;
    outline: 2px solid rgba(255, 255, 255, 0.6);
    .icon-rocket {
      @include icon(16px, 16px, "icon-rocket.png");
      margin-left: 6px;
    }
  }
  .swiper-slide {
    width: auto;
    height: vw(320);
    // margin: 0 vw(16) 0 0;
    img {
      width: 100%;
      height: 100%;
      border-radius: vw(32);
    }
    &:last-child {
      margin: 0;
    }
  }
  .pc-hidden {
    display: block;
  }
  .m-hidden {
    display: none;
  }
  .pc-button-hidden {
    display: flex;
  }
  .m-button-hidden {
    display: none;
  }
}
</style>
