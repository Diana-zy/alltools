<template>
  <CustomLink :to="to" class="item" :class="{ 'background-purple': bg === 1 }">
    <NuxtImg
      format="auto"
      fit="cover"
      width="148"
      height="148"
      :src="item.icon"
      :alt="item.name"
      class="icon"
      :loading="index < eager ? 'eager' : 'lazy'"
    />
    <div class="info">
      <p class="name">{{ item.name }}</p>

      <div class="rating">
        <div class="rating-star">
          <p :style="{ width: (((item.score || 4.6) / 5) * 100).toFixed(0) + '%' }"></p>
        </div>
        <span>
          {{ item.score || 4.6 }}
        </span>
      </div>
    </div>
    <p class="arrow"></p>
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
    },
    bg: {
      type: Number
    }
  }
};
</script>

<style lang="scss" scoped>
.item {
  height: 80px;
  display: flex;
  align-items: center;
  background: #f0f2f5;
  box-shadow: 4px 4px 8px 0px #c7d2da, -4px -4px 8px 0px #ffffff, inset 0 0 0 0 #c7d2da,
    inset 0 0 0 0 #ffffff;
  border: 1px solid #ffffff;
  padding-left: 8px;
  padding-right: 8px;
  border-radius: 16px;
  transition: all 0.2s;
}
.info {
  flex-grow: 1;
  height: 42px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.icon {
  width: 64px;
  height: 64px;
  border-radius: 12px;
  // border: 1px solid rgba(65, 65, 76, 0.1);
  margin-right: 8px;
}
.name {
  color: $font1;
  font-family: "sesb";
  overflow: hidden;
  word-break: break-all;
  height: 18px;
  line-height: 18px;
  transition: color 0.2s;
}
.category {
  font-size: 12px;
  color: rgba($font1, 0.6);
  margin-top: 6px;
  margin-bottom: 8px;
}
.rating {
  color: rgba($font1, 0.6);
  display: flex;
  span {
    margin-top: 2px;
  }
}
.rating-star {
  width: 80px;
  height: 16px;
  @include bg("icon-rating2.png");
  background-size: 16px 16px;
  p {
    height: 16px;
    @include bg("icon-rating.png");
    background-size: 16px 16px;
  }

  margin-right: 4px;
}
.arrow {
  @include icon(24px, 24px, "icon-arrow-right.png");
}
.item:hover {
  box-shadow: 0 0 0 0 #c7d2da, 0 0 0 0 #ffffff, inset 4px 4px 8px 0px #47d0ca,
    inset -4px -4px 8px 0px rgba(255, 255, 255, 0.56);

  background: #88f4ef;

  .arrow {
    @include icon(24px, 24px, "icon-arrow-right2.png");
  }
}
@media screen and (max-width: 750px) {
  .item {
    height: vw(160);
    padding-left: vw(20);
    padding-right: vw(20);
    border-radius: vw(32);
    box-shadow: vw(8) vw(8) vw(16) 0px rgba(40, 11, 69, 0.2),
      vw(-8) vw(-8) vw(16) 0px rgba(255, 255, 255, 0.3), inset 0 0 0 0 rgba(40, 11, 69, 0.2),
      inset 0 0 0 0 rgba(255, 255, 255, 0.3);
    background: $color1;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  .icon {
    width: vw(120);
    height: vw(120);
    border-radius: vw(21);
    margin-right: vw(12);
  }
  .name {
    width: vw(210);
    font-size: vw(24);
    height: vw(36);
    line-height: vw(36);
    @include ellipsis;
  }
  .category {
    width: vw(210);
    font-size: vw(24);
    height: vw(36);
    line-height: vw(36);
    margin-top: 0;
    margin-bottom: 0;
    @include ellipsis;
  }
  .rating {
    font-size: vw(24);
    height: vw(36);
    line-height: vw(36);
  }
  .background-purple {
    background: $color2;
  }
  .arrow {
    display: none;
  }
  .item:hover {
    box-shadow: 0 0 0 0 rgba(40, 11, 69, 0.2), 0 0 0 0 rgba(255, 255, 255, 0.3),
      inset vw(8) vw(8) vw(16) 0px rgba(40, 11, 69, 0.2),
      inset vw(-8) vw(-8) vw(16) 0px rgba(255, 255, 255, 0.3);
    .arrow {
      display: none;
    }
  }
  .icon-rating3 {
    @include icon(vw(24), vw(24), "icon-rating3.png");
  }
}
</style>
