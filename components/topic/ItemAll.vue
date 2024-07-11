<template>
  <CustomLink class="item" :to="to">
    <NuxtImg
      format="auto"
      fit="cover"
      width="280"
      height="156"
      :src="item.icon"
      :alt="item.name"
      class="cover"
      :loading="index < eager ? 'eager' : 'lazy'"
    />
    <div>
      <div class="name">{{ item.name }}</div>
      <div class="info">
        <div>
          <i class="icon-clock"></i>
          <span>June 20, 2024</span>
        </div>
        <div>
          <i class="icon-eye"></i>
          <span>7798</span>
        </div>
      </div>
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

<style scoped lang="scss">
.item {
  display: flex;
  align-items: center;
  height: 156px;
  padding: 0 18px;
  background-color: $color3;
  border-radius: 16px;
  transition: background-color 0.3s;
}
.item:hover {
  background-color: $color4;
  .name {
    color: $color1;
  }
}
.cover {
  width: 214px;
  height: 120px;
  border-radius: 16px;
  margin-right: 30px;
}
.name {
  line-height: 21px;
  margin-bottom: 14px;
  color: $font1;
  font-size: 16px;
  font-family: "sesb";
  transition: color 0.3s;
  @include ellipsis(2);
}
.info {
  display: flex;
  align-items: center;
  div {
    @include center;
  }
  i {
    margin-right: 4px;
  }
  .icon-clock {
    @include icon(16px, 16px, "icon-clock.png");
  }
  .icon-eye {
    margin-left: 16px;
    @include icon(16px, 16px, "icon-eye.png");
  }
  span {
    display: inline-block;
    color: $font2;
    font-size: 12px;
    line-height: 22px;
  }
}
@media screen and (max-width: 750px) {
  .item {
    height: vw(180);
    padding: 0 vw(12);
    border-radius: vw(20);
  }
  .cover {
    width: vw(280);
    height: vw(156);
    border-radius: vw(16);
    margin-right: vw(24);
  }
  .name {
    display: block;
    width: vw(318);
    line-height: vw(32);
    margin-bottom: vw(12);
    font-size: vw(24);
    @include ellipsis(1);
  }
  .info {
    i {
      margin-right: vw(8);
    }
    .icon-clock,
    .icon-eye {
      width: vw(24);
      height: vw(24);
    }
    .icon-eye {
      margin-left: vw(12);
    }
    span {
      font-size: vw(24);
      line-height: vw(32);
    }
  }
}
</style>
