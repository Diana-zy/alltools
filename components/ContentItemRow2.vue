<template>
  <CustomLink :to="to" class="item">
    <NuxtImg
      format="auto"
      fit="cover"
      width="288"
      height="340"
      :src="item.mobile_img || item.icon"
      :alt="item.name"
      class="icon"
      :loading="index < eager ? 'eager' : 'lazy'"
    />
    <div class="item-bottom">
      <p class="name">{{ item.name }}</p>
      <p class="rating"
        ><i class="icon-rating4"></i><span>{{ item.score || 4.6 }}</span></p
      >
      <div class="arrow"><i class="icon-arrow" /></div>
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
.item {
  height: vw(340);
  position: relative;

  border-radius: vw(40);
  &::after {
    content: "";
    width: 90%;
    height: 90%;
    position: absolute;
    right: 0;
    bottom: 0;
    border-radius: vw(40);
    box-shadow: 4px 4px 8px 0px #c7d2da, -4px -4px 8px 0px #f0f4f5;
    z-index: -1;
  }
}
.icon {
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border-radius: vw(40);
}
.item-bottom {
  width: 100%;
  height: vw(152);
  background: linear-gradient(180deg, #d8ffff 0%, #8cf5f0 100%);
  position: absolute;
  left: 0;
  bottom: 0;
  @include bg("icon-rec-bottom.png");
  &::after {
    content: "";
    width: 100%;
    height: 60%;
    position: absolute;
    right: 0;
    bottom: 0;
    border-radius: vw(40);
    box-shadow: 4px 4px 8px 0px #c7d2da, -4px -4px 8px 0px #f0f4f5;
    z-index: -1;
  }
}
.info {
  width: vw(288);
  height: vw(152);
}
.name {
  margin: vw(38) auto 0;
  width: vw(230);
  color: $font1;
  font-family: "seb";
  height: vw(38);
  font-size: vw(28);
  line-height: vw(38);
  @include ellipsis;
  text-align: center;
}
.rating {
  margin: vw(16) 0 0 vw(24);
  width: fit-content;
  display: flex;
  align-items: center;
  font-family: se;
  font-weight: 400;
  font-size: vw(24);
  color: rgba(40, 57, 75, 0.6);
  line-height: vw(30);
  .icon-rating4 {
    width: vw(32);
    height: vw(32);
  }

  span {
    margin-top: vw(2);
  }
}

.arrow {
  width: vw(48);
  height: vw(48);
  border-radius: 50%;
  background: #f0ffff;
  box-shadow: -4px -4px 8px 0px rgba(255, 255, 255, 0.55), 4px 4px 8px 0px #69cac6;
  @include center;
  position: absolute;
  bottom: vw(20);
  right: vw(28);
}

.icon-arrow {
  @include icon(vw(36), vw(36), "icon-rec-arrow4.png");
}
.item:hover {
  .item-bottom {
    @include bg("icon-rec-bottom-hover.png");
  }
}
</style>
