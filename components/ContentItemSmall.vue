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
}
.icon {
  width: 68px;
  height: 68px;
  border-radius: 8px;
  margin: 3px auto 8px;
  transition: transform 0.2s;
}
.name {
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
  .icon {
    transform: scale(1.1);
  }
  .name {
    color: $color1;
  }
}
@media screen and (max-width: 750px) {
  .icon {
    width: vw(156);
    height: vw(156);
    border-radius: vw(24);
    margin: 0 auto vw(8);
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
    font-size: vw(24);
  }
}
</style>
