<template>
  <CustomLink class="item" :to="to">
    <NuxtImg
      format="auto"
      fit="cover"
      width="536"
      height="240"
      :src="item.cover"
      :alt="item.name"
      class="cover"
      :loading="index < eager ? 'eager' : 'lazy'"
    />
    <NuxtImg
      format="auto"
      fit="cover"
      width="112"
      height="112"
      :src="item.cover"
      :alt="item.name"
      class="icon"
      :loading="index < eager ? 'eager' : 'lazy'"
    />
    <div class="info">
      <div>
        <i class="icon-clock"></i>
        <span>{{ item.publish_time }}</span>
      </div>
      <div>
        <i class="icon-eye"></i>
        <span>{{ formatNumber(item.view) }}</span>
      </div>
    </div>
    <div class="name"> {{ item.name }} </div>
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
  },
  methods: {
    formatNumber(value) {
      // 将数字转换为字符串并使用正则表达式添加逗号
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
};
</script>

<style scoped lang="scss">
.item {
  display: block;
  position: relative;
  width: 389px;
  height: 258px;
  background-color: $color3;
  border-radius: 16px;
  overflow: hidden;
  transition: background-color 0.3s;
}
.item:hover {
  background-color: $color4;
  .name {
    color: $color1;
  }
}
.cover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 158px;
}
.icon {
  position: absolute;
  top: 130px;
  left: 24px;
  width: 62px;
  height: 62px;
  border: 2px solid #fff;
  border-radius: 12px;
}
.info {
  position: absolute;
  top: 168px;
  left: 86px;
  @include center;
  div {
    @include center;
  }
  i {
    margin-left: 16px;
    margin-right: 4px;
  }
  .icon-clock {
    @include icon(16px, 16px, "icon-clock.png");
  }
  .icon-eye {
    @include icon(16px, 16px, "icon-eye.png");
  }
  span {
    display: inline-block;
    color: $font2;
    font-size: 12px;
    line-height: 22px;
  }
}
.name {
  position: absolute;
  bottom: 14px;
  left: 24px;
  width: 341px;
  line-height: 21px;
  padding-top: 14px;
  border-top: 1px solid #d9d9db;
  color: $font1;
  font-size: 16px;
  font-family: "sesb";
  transition: color 0.3s;
  @include ellipsis;
}
@media screen and (max-width: 750px) {
  .item {
    width: vw(536);
    height: vw(388);
    border-radius: vw(20);
  }
  .item:last-child {
    margin-right: vw(46);
  }
  .cover {
    height: vw(240);
  }
  .icon {
    width: vw(112);
    height: vw(112);
    top: vw(184);
    left: vw(28);
    border-radius: vw(24);
  }
  .info {
    top: vw(252);
    left: vw(140);
    i {
      margin-left: vw(20);
      margin-right: vw(8);
      width: vw(24);
      height: vw(24);
    }
    .icon-clock,
    .icon-eye {
      width: vw(24);
      height: vw(24);
    }
    span {
      font-size: vw(24);
      line-height: vw(44);
    }
  }
  .name {
    position: absolute;
    bottom: vw(18);
    left: vw(28);
    width: vw(480);
    line-height: vw(38);
    padding-top: vw(16);
    font-size: vw(28);
  }
}
</style>
