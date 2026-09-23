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
    <span class="get-btn">GET</span>
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
  background: #ffffff;
  border: 1px solid #eef0f3;
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

.get-btn {
  flex-shrink: 0;
  min-width: 64px;
  height: 32px;
  padding: 0 16px;
  border: 1px solid #fd6b21;
  border-radius: 16px;
  color: #fd6b21;
  font-family: "seb";
  font-size: 13px;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.item:hover {
  border-color: $color2;
  .name {
    color: $color2;
  }
  .get-btn {
    background: #fd6b21;
    color: #ffffff;
  }
}
@media screen and (max-width: 879px) {
  .item {
    height: vw(160);
    padding-left: vw(20);
    padding-right: vw(20);
    border-radius: vw(32);
    background: #ffffff;
    border: 1px solid #eef0f3;
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
    color: $font1;
    @include ellipsis;
  }

  .rating {
    font-size: vw(24);
    line-height: vw(30);
    color: $font2;
  }

  .rating-star {
    margin-right: vw(8);
    width: vw(120);
    height: vw(24);
    background-size: vw(24) vw(24);

    p {
      height: vw(24);
      background-size: vw(24) vw(24);
    }
  }

  .background-purple {
    background: $color2;
  }

  .get-btn {
    min-width: vw(112);
    height: vw(56);
    padding: 0 vw(24);
    border-radius: vw(28);
    font-size: vw(22);
  }
}
</style>
