<template>
  <CustomLink :to="to" class="item">
    <div class="left">
      <NuxtImg
        format="auto"
        fit="cover"
        width="148"
        height="148"
        :src="item.icon"
        :alt="item.name"
        class="icon"
        :loading="index < eager ? 'eager' : 'lazy'"
    /></div>
    <div class="right">
      <div class="info">
        <p class="name">{{ item.name }}</p>
        <div class="rating">
          <div class="rating-star">
            <p :style="{ width: (((item.score || 4.6) / 5) * 100).toFixed(0) + '%' }"></p>
          </div>
          <i class="icon-rating" />
          <span>
            {{ item.score || 4.6 }}
          </span>
        </div>
      </div>
      <p class="arrow"></p>
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
    },
    bg: {
      type: Number
    }
  }
};
</script>

<style lang="scss" scoped>
.item {
  height: 82px;
  background: #f0f2f5;
  position: relative;
  transition: all 0.2s;
}

.left {
  width: 166px;
  height: 78px;
  background: linear-gradient(180deg, #d8ffff 0%, #8cf5f0 100%);
  box-shadow: 4px 4px 8px 0px #c7d2da, -4px -4px 8px 0px #ffffff;
  border-radius: 20px 20px 20px 20px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
}

.icon {
  width: 64px;
  height: 64px;
  border-radius: 12px;
  margin: 0 0 0 8px;
}

.right {
  width: 278px;
  height: 100%;
  padding-left: 16px;
  background: #f0f2f5;
  box-shadow: 4px 4px 8px 0px #c7d2da, 1px -4px 8px 0px #ffffff;
  border-radius: 0 20px 20px 0;
  border: 1px solid rgba(255, 255, 255, 0.4);
  position: absolute;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  &::after {
    content: "";
    width: 47px;
    height: 106px;
    @include bg("icon-corner1.png");
    position: absolute;
    top: -13px;
    right: 264px;
  }
}

.info {
  flex-grow: 1;
  height: 46px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.name {
  width: 70%;
  color: $font1;
  font-family: "sesb";
  overflow: hidden;
  word-break: break-all;
  height: 18px;
  line-height: 18px;
  transition: color 0.2s;
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
  position: absolute;
  right: 12px;
}
.icon-rating {
  display: none;
}
.item:hover {
  .left {
    background: #f0f2f5;
  }
  .right {
    background: #88f4ef;
    box-shadow: 4px 4px 8px 0px #c7d2da, -4px -4px 8px 0px #ffffff, inset 4px 4px 8px 0px #47d0ca,
      inset -4px -4px 8px 0px rgba(255, 255, 255, 0.56);
    &::after {
      height: 105px;
      top: -12px;
      @include bg("icon-corner2.png");
    }
  }
  .arrow {
    @include icon(24px, 24px, "icon-arrow-right2.png");
  }
}
@media screen and (min-width: 879px) and (max-width: 1220px) {
  .item {
    height: vw2(82);
  }
  .left {
    width: vw2(166);
    height: vw2(78);
    box-shadow: vw2(4) vw2(4) vw2(8) 0 #c7d2da, vw2(-4) vw2(-4) vw2(8) 0 #ffffff;
    border-radius: vw2(20);
    border: vw2(1) solid rgba(255, 255, 255, 0.4);
  }
  .icon {
    width: vw2(64);
    height: vw2(64);
    border-radius: vw2(12);
    margin: 0 0 0 vw2(8);
  }
  .right {
    width: vw2(262);
    padding-left: vw2(16);
    box-shadow: vw2(4) vw2(4) vw2(8) 0px #c7d2da, vw2(1) vw2(-4) vw2(8) 0 #ffffff;
    border-radius: 0 vw2(20) vw2(20) 0;
    border: vw2(1) solid rgba(255, 255, 255, 0.4);
    &::after {
      width: vw2(47);
      height: vw2(106);
      top: vw2(-13.2);
      right: vw2(250);
    }
  }

  .info {
    height: vw2(46);
  }

  .name {
    height: vw2(18);
    line-height: vw2(18);
  }

  .rating {
    span {
      margin-top: vw2(2);
    }
  }

  .rating-star {
    width: vw2(80);
    height: vw2(16);
    background-size: vw2(16) vw2(16);
    p {
      height: vw2(16);
      background-size: vw2(16) vw2(16);
    }

    margin-right: vw2(4);
  }

  .arrow {
    width: vw2(24);
    height: vw2(24);
    right: vw2(12);
  }
  .item:hover {
    .right {
      box-shadow: vw2(4) vw2(4) vw2(8) 0 #c7d2da, vw2(-4) vw2(-4) vw2(8) 0 #ffffff,
        inset vw2(4) vw2(4) vw2(8) 0 #47d0ca,
        inset vw2(-4) vw2(-4) vw2(8) 0 rgba(255, 255, 255, 0.56);
      &::after {
        height: vw2(105);
        top: vw2(-12);
      }
    }
    .arrow {
      width: vw2(24);
      height: vw2(24);
    }
  }
}

@media screen and (min-width: 750px) and (max-width: 879px) {
  .item {
    height: vw3(82);
  }
  .left {
    width: vw3(166);
    height: vw3(78);
    box-shadow: vw3(4) vw3(4) vw3(8) 0 #c7d2da, vw3(-4) vw3(-4) vw3(8) 0 #ffffff;
    border-radius: vw3(20);
    border: vw3(1) solid rgba(255, 255, 255, 0.4);
  }
  .icon {
    width: vw3(64);
    height: vw3(64);
    border-radius: vw3(12);
    margin: 0 0 0 vw3(8);
  }
  .right {
    width: vw3(282);
    padding-left: vw3(16);
    box-shadow: vw3(4) vw3(4) vw3(8) 0px #c7d2da, vw3(1) vw3(-4) vw3(8) 0 #ffffff;
    border-radius: 0 vw3(20) vw3(20) 0;
    border: vw3(1) solid rgba(255, 255, 255, 0.4);
    &::after {
      width: vw3(47);
      height: vw3(106);
      top: vw3(-13.2);
      right: vw3(268);
    }
  }

  .info {
    height: vw3(46);
  }

  .name {
    height: vw3(18);
    line-height: vw3(18);
  }

  .rating {
    span {
      margin-top: vw3(2);
    }
  }

  .rating-star {
    width: vw3(80);
    height: vw3(16);
    background-size: vw3(16) vw3(16);
    p {
      height: vw3(16);
      background-size: vw3(16) vw3(16);
    }

    margin-right: vw3(4);
  }

  .arrow {
    width: vw3(24);
    height: vw3(24);
    right: vw3(12);
  }
  .item:hover {
    .right {
      box-shadow: vw3(4) vw3(4) vw3(8) 0 #c7d2da, vw3(-4) vw3(-4) vw3(8) 0 #ffffff,
        inset vw3(4) vw3(4) vw3(8) 0 #47d0ca,
        inset vw3(-4) vw3(-4) vw3(8) 0 rgba(255, 255, 255, 0.56);
      &::after {
        height: vw3(105);
        top: vw3(-12);
      }
    }
    .arrow {
      width: vw3(24);
      height: vw3(24);
    }
  }
}

@media screen and (max-width: 750px) {
  .item {
    height: vw(144);
    background: none;
  }

  .left {
    width: vw(332);
    width: 100%;
    height: vw(136);
    background: #adf9f9;
    box-shadow: vw(-8) vw(-8) vw(16) 0 rgba(255, 255, 255, 0.74), vw(8) vw(8) vw(16) 0 #9ee1df;
    border-radius: vw(40);
    border: 1px solid rgba(239, 255, 254, 0.4);
  }
  .icon {
    width: vw(104);
    height: vw(104);
    border-radius: vw(28);
    margin: 0 0 0 vw(16);
  }

  .right {
    width: vw(334);
    height: vw(170);
    padding-left: vw(28);
    background: none;
    @include bg("icon-corner-m1.png");
    // box-shadow: vw(10) vw(-8) vw(16) 0 rgba(255, 255, 255, 0.74), vw(8) vw(8) vw(16) 0 #9ee1df;
    // box-shadow: 10px -8px 16px 0px rgba(255, 255, 255, 0.74), 8px 8px 16px 0px #9ee1df;
    box-shadow: none;
    border-radius: 0 vw(40) vw(40) 0;
    top: vw(-13);
    right: vw(-20);
    border: none;
    &::after {
      display: none;
      width: vw(88);
      height: vw(194);
      @include bg("icon-corner.png");
      top: vw(-28);
      right: vw(236);
    }
  }

  .info {
    flex-grow: 0;
    width: vw(250);
    height: vw(90);
    position: absolute;
    top: vw(44);
    right: vw(30);
  }

  .name {
    width: vw(246);
    font-size: vw(28);
    height: vw(36);
    line-height: vw(36);
    @include ellipsis;
  }

  .rating {
    font-size: vw(24);
    height: vw(36);
    line-height: vw(36);
    span {
      margin: 0;
    }
  }

  .rating-star {
    display: none;
  }

  .arrow {
    display: none;
  }

  .item:hover {
    .left {
      background: #daffff;
    }

    .right {
      width: vw(342);
      background: none;
      box-shadow: none;
      @include bg("icon-corner-m2.png");
      &::after {
        display: none;
        height: vw(192);
        top: vw(-26);
        right: vw(236);
        @include bg("icon-corner-m2.png");
      }
    }
    .arrow {
      display: none;
    }
  }
  .icon-rating {
    display: block;
    @include icon(vw(32), vw(32), "icon-rating3.png");
  }
}
</style>
