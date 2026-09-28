<template>
  <CustomLink :to="to" class="item">
    <div class="icon-box">
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
      <span
        v-if="showRank && index < 6"
        class="rank-badge"
        :style="{ background: rankColors[index] }"
        >{{ index + 1 }}</span
      >
    </div>
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
    },
    showRank: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      rankColors: ["#fd6b21", "#3b82f6", "#22c55e", "#a855f7", "#ec4899", "#14b8a6"]
    };
  }
};
</script>

<style lang="scss" scoped>
.item {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #ffffff;
  border-radius: 24px;
  border: 1px solid #eef0f3;
  height: 176px;
  transition: all 0.2s;
}
.icon-box {
  position: relative;
  width: 109px;
  margin: 16px auto 6px;
}

.icon {
  width: 109px;
  height: 109px;
  border-radius: 12px;
  border: 1px solid #eef0f3;
  transition: transform 0.2s;
}

.rank-badge {
  position: absolute;
  top: 0;
  left: 0;
  min-width: 20px;
  height: 18px;
  padding: 0 5px;
  border-radius: 12px 0 10px 0;
  color: #ffffff;
  font-family: "seb";
  font-size: 11px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
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
  border-color: $color2;
  .name {
    color: $color2;
  }
}
@media screen and (max-width: 879px) {
  .item {
    height: vw(262);
    border-radius: vw(32);
  }
  .icon-box {
    width: vw(144);
    margin: vw(20) auto vw(10);
  }
  .icon {
    width: vw(144);
    height: vw(144);
    border-radius: vw(24);
  }
  .rank-badge {
    min-width: vw(36);
    height: vw(32);
    padding: 0 vw(10);
    border-radius: vw(24) 0 vw(18) 0;
    font-size: vw(20);
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
