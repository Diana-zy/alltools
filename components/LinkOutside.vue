<template>
  <a id="link-outside" class="item" :href="item.target_url || ''">
    <NuxtImg
      format="auto"
      fit="cover"
      width="148"
      height="148"
      :src="item.icon"
      :alt="item.name"
      class="icon"
    />
    <div class="info">
      <p class="name">{{ item.name }}</p>
      <p class="category">{{ item.category_name }}</p>
      <p class="rating">{{ item.score || 4.6 }}<i class="icon-rating"></i></p>
    </div>
    <p class="arrow"></p>
  </a>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.item {
  height: 80px;
  display: flex;
  align-items: center;
  padding-left: 6px;
  padding-right: 8px;
  border-radius: 16px;
  transition: background 0.2s;
}
.info {
  flex-grow: 1;
}
.icon {
  width: 68px;
  height: 68px;
  border-radius: 17px;
  border: 1px solid rgba(65, 65, 76, 0.1);
  padding: 2px;
  margin-right: 6px;
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
  display: flex;
  align-items: center;
  font-size: 12px;
  color: rgba($font1, 0.6);
}
.arrow {
  @include icon(24px, 24px, "icon-arrow-right.png");
}
.item:hover {
  background: rgba(91, 173, 109, 0.1);
  .name {
    color: $color1;
  }
}
@media screen and (max-width: 750px) {
  .item {
    height: vw(148);
    padding-left: vw(18);
    padding-right: vw(18);
    border-radius: vw(16);
  }
  .icon {
    width: vw(116);
    height: vw(116);
    border-radius: vw(18);
    border: vw(2) solid rgba(65, 65, 76, 0.1);
    padding: vw(2);
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
  .arrow {
    display: none;
  }
}
</style>
