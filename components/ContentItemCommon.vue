<template>
  <CustomLink :to="to" class="item">
    <NuxtImg
      format="auto"
      fit="cover"
      width="100"
      height="100"
      :src="item.icon"
      :alt="item.name"
      class="icon"
      :loading="index < eager ? 'eager' : 'lazy'"
    />
    <p class="name">{{ item.name }}</p>
    <p class="rating">{{ item.score || 4.6 }}<i class="icon-rating"></i></p>
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
  display: block;
  height: 173px;
  border-radius: 24px;
}
.icon {
  width: 109px;
  height: 109px;
  border-radius: 8px;
  margin: 16px auto 6px;
}
.name {
  width: 109px;
  color: $font1;
  font-family: "sesb";
  height: 18px;
  line-height: 18px;
  @include ellipsis;
  text-align: center;
  transition: color 0.2s;
  margin-bottom: 2px;
  margin: 0 auto;
}
.rating {
  @include center;
  color: rgba($font1, 0.6);
}
.item:hover {
  background: rgba(91, 173, 109, 0.1);
  .name {
    color: $color1;
  }
}
@media screen and (max-width: 750px) {
  .item {
    width: vw(200);
    height: vw(272);
    border-radius: vw(32);
  }
  .icon {
    width: vw(168);
    height: vw(168);
    border-radius: vw(24);
    margin: vw(16) auto vw(12);
  }
  .name {
    width: vw(200);
    font-size: vw(24);
    height: vw(32);
    line-height: vw(32);
    margin-bottom: vw(4);
  }
  .rating {
    font-size: vw(24);
  }
}
</style>
