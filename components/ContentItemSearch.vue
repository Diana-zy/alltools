<template>
  <CustomLink :to="to" class="item" @click.native="trackCardClick">
    <NuxtImg
      format="auto"
      fit="cover"
      width="218"
      height="218"
      :src="item.icon"
      :alt="item.name"
      class="icon"
      :loading="index < eager ? 'eager' : 'lazy'"
    />
    <div class="info">
      <p class="name">{{ item.name }}</p>
      <div class="rating">
        <div class="rating-star"> </div>
        {{ item.score.length == 1 ? item.score + ".0" : item.score || 4.6 }}
      </div>
    </div>
  </CustomLink>
</template>

<script>
import { trackEvent, getPageType } from "~/utils/track";

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
      }
    }
  }

};
</script>

<style lang="scss" scoped>
.item {
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 197px;
  border-radius: 16px;
  background: #ffffff;
  border: 1px solid #eef0f3;
  transition: 0.1s;
}
.icon {
  width: 124px;
  height: 124px;
  border-radius: 12px;
  border: 1px solid #eef0f3;
  margin: 16px 0 10px;
}
.info {
  width: calc(100% - 26px);
}
.name {
  width: 100%;
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
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: $font2;
  margin-top: 3px;
}
.rating-star {
  margin-right: 2px;
  width: 16px;
  height: 16px;
  @include bg("icon-rating.png");
}
.item:hover {
  border-color: $color2;
  .name {
    color: $color2;
  }
}
.pc-hidden {
  display: none;
}
.m-hidden {
  display: flex;
}
@media screen and (max-width: 879px) {
  .item {
    display: flex;
    align-items: center;
    width: 100%;
    height: vw(254);
    border-radius: vw(32);
  }
  .icon {
    width: vw(142);
    height: vw(142);
    border-radius: vw(24);
    margin: vw(16) 0 0 0;
  }
  .info {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 0 0 0 vw(16);
  }
  .name {
    width: 94%;
    font-size: vw(28);
    height: vw(38);
    line-height: vw(38);
    padding: 0;
    text-align: center;
    margin: vw(7) 0 0 0;
  }

  .rating {
    margin-top: vw(0);
    width: 98%;
    height: vw(34);
  }
  .rating-star {
    margin-right: vw(4);
    width: vw(32);
    height: vw(32);
  }
  // .item:hover {
  //   box-shadow: none;
  // }
  .m-hidden {
    display: none;
  }
  .pc-hidden {
    display: flex;
  }
}
</style>
