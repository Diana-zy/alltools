<template>
  <CustomLink :to="to" class="item">
    <NuxtImg
      format="auto"
      fit="cover"
      width="192"
      height="192"
      :src="item.icon"
      :alt="item.name"
      class="icon"
      :loading="index < eager ? 'eager' : 'lazy'"
    />

    <div class="info">
      <p class="name">{{ item.name }}</p>
      <div class="btn-play">Try it</div>
    </div>
  </CustomLink>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    eager: {
      type: Number,
      default: 0
    },
    to: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
@media screen and (max-width: 879px) {
  .item {
    height: vw(198);
    height: 100%;
    padding: vw(16);
    box-shadow: 6px 6px 12px 0px rgba(114, 35, 10, 0.21), 0 0 0 0 #ffffff,
      inset 0 0 0 0 rgba(114, 35, 10, 0.21), inset 0 0 0 0 #ffffff;
    border-radius: vw(32);
    position: relative;
    &:nth-child(2) {
      grid-row: 1 / 3;
      grid-column: 2 / 4;

      .info {
        width: calc(100% - vw(32));
        height: vw(136);
      }

      .name {
        margin-top: vw(8);
        font-size: vw(32);
        line-height: vw(40);
      }
      .btn-play {
        display: flex;
        margin-top: vw(12);
      }
    }
  }
  .icon {
    width: 100%;
    height: 100%;
    border-radius: vw(24);
  }

  .info {
    position: absolute;
    left: vw(16);
    bottom: vw(16);
    width: vw(166);
    height: vw(56);
    border-radius: 0 0 vw(24) vw(24);
    background: linear-gradient(to top, #000000 0%, rgba(0, 0, 0, 0) 100%);
    // background: linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .name {
    width: 70%;
    margin-top: vw(12);
    color: #ffffff;
    font-family: "sesb";
    font-size: vw(24);
    line-height: vw(32);
    @include ellipsis;
    text-align: center;
  }

  .btn-play {
    display: none;
    width: vw(132);
    height: vw(48);
    background: linear-gradient(86deg, #1887fe 0%, #d458ff 100%);
    border-radius: vw(80);
    align-items: center;
    justify-content: center;
    font-family: sesb;
    font-size: vw(24);
    color: #f2f7fa;
    line-height: vw(32);
  }
}
</style>
