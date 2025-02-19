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
      <p class="rating">{{ item.score || 4.6 }}<i class="icon-rating"></i></p>
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
    display: flex;
    flex-direction: column;
    align-items: center;
    background: $color1;
    box-shadow: 6px 6px 12px 0px rgba(114, 35, 10, 0.21), 0 0 0 0 #ffffff,
      inset 0 0 0 0 rgba(114, 35, 10, 0.21), inset 0 0 0 0 #ffffff;
    border: 2px solid #ffffff;
    height: vw(262);
    border-radius: vw(32);
    transition: all 0.2s;
  }
  .info {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .icon {
    width: vw(144);
    height: vw(144);
    border-radius: vw(24);
    margin: vw(20) auto vw(12);
    transition: transform 0.2s;
  }
  .name {
    width: 86%;
    color: $font1;
    font-family: "sesb";
    font-size: vw(24);
    line-height: vw(32);
    @include ellipsis;
    text-align: center;
  }
  .rating {
    margin-left: vw(8);
    width: fit-content;
    margin-top: vw(8);
    font-size: vw(24);
    @include center;
    color: $font2;
  }
  .item:hover {
    box-shadow: 0 0 0 0 rgba(114, 35, 10, 0.21), 0 0 0 0 #ffffff,
      inset 6px 6px 12px 0px rgba(114, 35, 10, 0.21), inset -6px -6px 12px 0px #ffffff;
    .name {
      color: $color3;
    }
  }
}
</style>
