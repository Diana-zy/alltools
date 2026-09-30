<template>
  <CustomLink :to="to" class="item" @click.native="trackCardClick">
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
    <div class="info">
      <p class="name">{{ item.name }}</p>
      <p class="rating">{{ item.score || 4.6 }}<i class="icon-rating"></i></p>
    </div>
  </CustomLink>
</template>

<script>
import { trackEvent, getPageType, trackFacebookStandardEvent } from "~/utils/track";

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
    listName: {
      type: String,
      default: ""
    }
  },
  methods: {
    trackCardClick() {
      const pageType = getPageType();
      const params = {
        list_name: this.listName,
        item_id: this.item.path,
        item_type: this.item.type === 1 ? "game" : "app",
        position: this.index
      };
      trackEvent("card_click", { page_type: pageType, ...params });
      // 首页单独打一个专用事件，用来算首页的有效点击率（able_home_content_click / able_home_page）
      if (pageType === "home") {
        trackEvent("home_content_click", params);
        trackFacebookStandardEvent("AddToWishlist", params);
      }
    }
  }

};
</script>

<style lang="scss" scoped>
@media screen and (max-width: 879px) {
  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #ffffff;
    border: 1px solid #eef0f3;
    height: vw(262);
    border-radius: vw(32);
    transition: all 0.2s;
  }
  .info {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .icon {
    width: vw(144);
    height: vw(144);
    border-radius: vw(24);
    margin: vw(20) auto vw(12);
    transition: transform 0.2s;
  }
  .name {
    width: 86%;
    color: $font1;
    font-family: "sesb";
    font-size: vw(24);
    line-height: vw(32);
    @include ellipsis;
    text-align: center;
  }
  .rating {
    margin-left: vw(8);
    width: fit-content;
    margin-top: vw(8);
    font-size: vw(24);
    @include center;
    color: $font2;
  }
  .item:hover {
    border-color: $color2;
    .name {
      color: $color3;
    }
  }
}
</style>
