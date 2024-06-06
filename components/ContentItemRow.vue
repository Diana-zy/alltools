<template>
  <CustomLink :to="to" class="item">
    <NuxtImg
      format="auto"
      fit="cover"
      width="100"
      height="100"
      :src="item.icon"
      :alt="item.name"
      class="icon"
      :loading="index < eager ? 'eager' : 'lazy'"
    />
    <div class="info">
      <p class="name">{{ item.name }}</p>
      <p class="category">{{ item.category_name }}</p>
      <p class="rating">{{ item.rating || 4.6 }}<i class="icon-rating"></i></p>
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
    }
  }
};
</script>

<style lang="scss" scoped>
.item {
  height: 80px;
  display: flex;
  align-items: center;
  margin-right: 16px;
  margin-bottom: 16px;
  padding-left: 6px;
  padding-right: 8px;
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
.icon-rating {
  @include icon(12px, 12px, "icon-rating.png");
}
.arrow {
  @include icon(24px, 24px, "icon-arrow-right.png");
}
.item:hover {
  background: rgba(91, 173, 109, 0.1);
  border-radius: 16px;
  .name {
    color: $color1;
  }
}
</style>
