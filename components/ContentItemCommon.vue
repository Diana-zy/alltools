<template>
  <CustomLink :to="to" class="item">
    <NuxtImg
      format="auto"
      fit="cover"
      width="218"
      height="218"
      :src="item.icon"
      :alt="item.name"
      class="icon"
      :loading="index < eager ? 'eager' : 'lazy'"
    />
    <p class="name">{{ item.name }}</p>
    <p class="rating"><i class="icon-rating4"></i>{{ item.score || 4.6 }}</p>
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
  height: 151px;
  border-radius: 24px;
  box-shadow: 4px 4px 8px 0px rgba(99, 82, 101, 0.16), -4px -4px 8px 0px #ffffff,
    inset 0 0 0 0 rgba(99, 82, 101, 0.16), inset 0 0 0 0 #ffffff;
  border: 1px solid #ffffff;
  position: relative;
  transition: all 0.2s;
}
.icon {
  width: 96px;
  height: 96px;
  border-radius: 16px;
  margin: 16px auto 6px;
}
.name {
  width: 80%;
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
  background: rgba(255, 255, 255, 0.4);
  border-radius: 100px;
  position: absolute;
  padding: 0 4px;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
}
.item:hover {
  box-shadow: 0 0 0 0 rgba(99, 82, 101, 0.16), 0 0 0 0 #ffffff,
    inset 4px 4px 8px 0px rgba(99, 82, 101, 0.16), inset -4px -4px 8px 0px #ffffff;
  .name {
    color: $color3;
  }
}
@media screen and (max-width: 750px) {
  .item {
    width: 100%;
    height: vw(218);
    background: $color1;
    border-radius: vw(32);
  }
  .icon {
    width: vw(128);
    height: vw(128);
    border-radius: vw(24);
    margin: vw(24) auto vw(10);
  }
  .name {
    width: vw(200);

    font-size: vw(24);
    height: vw(32);
    line-height: vw(32);
    margin-bottom: vw(4);
    padding: 0 vw(16);
  }
  .rating {
    backdrop-filter: blur(4px);
    font-size: vw(24);
    bottom: vw(63);
    border-radius: vw(32);
    padding: vw(4) vw(8);
    color: $font1;
  }
}
</style>
