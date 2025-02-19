<template>
  <CustomLink :to="to" class="item">
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
        {{ item.score.length == 1 ? item.score + ".0" : item.score || 4.6 }}
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
  box-shadow: 6px 6px 12px 0px rgba(114, 35, 10, 0.21), 0 0 0 0 #ffffff,
    inset 0 0 0 0 rgba(114, 35, 10, 0.21), inset 0 0 0 0 #ffffff;
  border: 2px solid #ffffff;
  padding-left: 8px;
  padding-right: 8px;
  border-radius: 16px;
  transition: all 0.2s;
}

.info {
  width: calc(100% - 16px - 8px - 64px);
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
  width: 100%;
  color: $font1;
  font-family: "seb";
  overflow: hidden;
  word-break: break-all;
  height: 18px;
  line-height: 18px;
  transition: color 0.2s;
}

.rating {
  color: $font2;
  font-size: 12px;
  line-height: 16px;
  display: flex;
  align-items: center;
}

.rating-star {
  margin-right: 4px;
  width: 80px;
  height: 16px;
  @include bg("icon-rating2.png");
  background-size: 16px 16px;
  p {
    height: 16px;
    @include bg("icon-rating.png");
    background-size: 16px 16px;
  }
}

.arrow {
  @include icon(24px, 24px, "icon-arrow-right.png");
}

.item:hover {
  box-shadow: 0 0 0 0 rgba(114, 35, 10, 0.21), 0 0 0 0 #ffffff,
    inset 6px 6px 12px 0px rgba(114, 35, 10, 0.21), inset -6px -6px 12px 0px #ffffff;
  .name {
    color: $color2;
  }
  .arrow {
    @include icon(24px, 24px, "icon-arrow-right2.png");
  }
}
@media screen and (max-width: 879px) {
  .item {
    height: vw(160);
    padding-left: vw(20);
    padding-right: vw(20);
    border-radius: vw(32);
    box-shadow: vw(8) vw(8) vw(16) 0px rgba(40, 11, 69, 0.2),
      vw(-8) vw(-8) vw(16) 0px rgba(255, 255, 255, 0.3), inset 0 0 0 0 rgba(40, 11, 69, 0.2),
      inset 0 0 0 0 rgba(255, 255, 255, 0.3);
    background: $color3;
    border: 2px solid rgba(255, 255, 255, 0.1);
  }

  .icon {
    width: vw(120);
    height: vw(120);
    border-radius: vw(24);
    margin-right: vw(18);
  }

  .info {
    width: calc(100% - vw(18) - vw(120));
    height: vw(88);
  }

  .name {
    width: 96%;
    font-size: vw(28);
    height: vw(36);
    line-height: vw(36);
    color: #ffffff;
    @include ellipsis;
  }

  .rating {
    font-size: vw(24);
    line-height: vw(30);
    color: #ffffff;
  }

  .rating-star {
    margin-right: vw(8);
    width: vw(120);
    height: vw(24);
    @include bg("icon-star3.png");
    background-size: vw(24) vw(24);

    p {
      height: vw(24);
      background-size: vw(24) vw(24);
    }
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
    .name {
      color: #ffffff;
    }
  }
}
</style>
