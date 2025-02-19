<template>
  <nav class="breadcrumb">
    <i class="icon-breadcrumb"></i>
    <CustomLink to="/">Home</CustomLink>
    <span>></span>
    <b class="active">{{ name }}</b>
  </nav>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: "Page"
    }
  }
};
</script>

<style lang="scss" scoped>
.icon-breadcrumb {
  @include icon(24px, 24px, "icon-breadcrumb.png");
  margin-right: 8px;
}
.breadcrumb {
  display: flex;
  align-items: center;
  color: rgba($font1, 0.6);
  margin-top: 32px;
  margin-bottom: 32px;
  span {
    margin-left: 8px;
    margin-right: 8px;
  }
  .active {
    color: $font1;
    font-family: "sesb";
  }
}
@media screen and (max-width: 879px) {
  .breadcrumb {
    display: none;
  }
}
</style>
