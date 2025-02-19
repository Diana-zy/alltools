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
    <p class="name">{{ item.name }}</p>
    <p class="rating"> <i class="icon-rating" />{{ item.score || 4.6 }}</p>
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
.item {
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 6px 6px 12px 0px rgba(114, 35, 10, 0.21), 0 0 0 0 #ffffff,
    inset 0 0 0 0 rgba(114, 35, 10, 0.21), inset 0 0 0 0 #ffffff;
  border-radius: 24px;
  border: 2px solid #ffffff;
  height: 176px;
  transition: all 0.2s;
}
.icon {
  width: 109px;
  height: 109px;
  border-radius: 12px;
  margin: 16px auto 6px;
  transition: transform 0.2s;
}
.name {
  width: 90%;
  color: $font1;
  font-family: "sesb";
  height: 18px;
  line-height: 18px;
  @include ellipsis;
  text-align: center;
  transition: color 0.2s;
  margin-bottom: 2px;
}
.rating {
  @include center;
  color: rgba($font1, 0.6);
}
.item:hover {
  box-shadow: 0 0 0 0 rgba(114, 35, 10, 0.21), 0 0 0 0 #ffffff,
    inset 6px 6px 12px 0px rgba(114, 35, 10, 0.21), inset -6px -6px 12px 0px #ffffff;
  .name {
    color: $color2;
  }
}
@media screen and (max-width: 879px) {
  .item {
    height: vw(262);
    border-radius: vw(32);
  }
  .icon {
    width: vw(144);
    height: vw(144);
    border-radius: vw(24);
    margin: vw(20) auto vw(10);
  }
  .name {
    width: vw(156);
    margin: 0 auto;
    text-align: center;
    font-size: vw(24);
    height: vw(32);
    line-height: vw(32);
    @include ellipsis;
    text-align: center;
    transition: color 0.2s;
    margin-bottom: vw(4);
  }
  .rating {
    margin-top: vw(4);
    font-size: vw(24);
    width: fit-content;
  }
}
</style>
