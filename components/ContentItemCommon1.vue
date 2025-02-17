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
  height: 131px;
  border-radius: 16px;
  box-shadow: 4px 4px 8px 0px rgba(99, 82, 101, 0.16), -4px -4px 8px 0px #ffffff,
    inset 0 0 0 0 rgba(99, 82, 101, 0.16), inset 0 0 0 0 #ffffff;
  border: 1px solid #ffffff;
  position: relative;
  transition: all 0.2s;
}
.icon {
  width: 76px;
  height: 76px;
  border-radius: 12px;
  margin: 16px auto 8px;
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
  width: 47px;
  height: 20px;
  @include center;
  color: rgba($font1, 0.6);
  background: rgba(255, 255, 255, 0.4);
  border-radius: 16px 0px 12px 0px;
  backdrop-filter: blur(4px);
  position: absolute;
  padding: 0 4px;
  bottom: 37px;
  right: 15.8px;
  .icon-rating4 {
    width: 16px;
    height: 16px;
  }
}
.item:hover {
  box-shadow: 0 0 0 0 #47d0ca, 0 0 0 0 rgba(255, 255, 255, 0.56), inset 4px 4px 8px 0px #47d0ca,
    inset -4px -4px 8px 0px rgba(255, 255, 255, 0.56);
  background: #88f4ef;
  border: 1px solid rgba(255, 255, 255, 0.1);
}
@media screen and (max-width: 750px) {
  .item {
    width: 100%;
    height: vw(244);
    background: $color1;
    border-radius: vw(32);
  }
  .icon {
    width: vw(158);
    height: vw(158);
    border-radius: vw(24);
    margin: vw(20) auto vw(10);
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
    width: vw(92);
    height: vw(32);
    backdrop-filter: blur(4px);
    font-size: vw(24);
    bottom: vw(64);
    right: vw(19.5);
    border-radius: vw(20) 0px vw(24) 0px;
    padding: vw(4) vw(8);
    color: $font1;
    transition: all 0.2s;
    .icon-rating4 {
      width: vw(28);
      height: vw(28);
    }
  }
  .item:hover {
    .rating {
      background: #ffffff;
    }
  }
}
</style>
