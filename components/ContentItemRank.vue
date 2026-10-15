<template>
  <CustomLink :to="to" class="item" @click.native="trackCardClick">
    <div class="icon-box">
      <NuxtImg
        format="auto"
        fit="cover"
        width="96"
        height="96"
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
    <div class="info">
      <p class="name">{{ item.name }}</p>
      <p class="meta">
        <span v-if="item.category_name" class="category">{{ item.category_name }}</span>
        <span class="rating">
          <i class="icon-star"></i>
          {{ item.score && item.score.length == 1 ? item.score + ".0" : item.score || 4.6 }}
        </span>
      </p>
    </div>
    <span class="get-btn">GET</span>
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
    showRank: {
      type: Boolean,
      default: true
    },
    listName: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      rankColors: ["#fd6b21", "#3b82f6", "#22c55e", "#a855f7", "#ec4899", "#14b8a6"]
    };
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
  padding: 12px 0;
  scroll-snap-align: start;
}

.icon-box {
  position: relative;
  flex-shrink: 0;
  margin-right: 16px;
}

.icon {
  width: 72px;
  height: 72px;
  border-radius: 14px;
  border: 1px solid #eef0f3;
}

.rank-badge {
  position: absolute;
  top: 0;
  left: 0;
  min-width: 20px;
  height: 18px;
  padding: 0 5px;
  border-radius: 14px 0 10px 0;
  color: #ffffff;
  font-family: "seb";
  font-size: 11px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.info {
  flex: 1;
  min-width: 0;
}

.name {
  color: $font1;
  font-family: "seb";
  font-size: 15px;
  line-height: 22px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.meta {
  display: flex;
  align-items: center;
  margin-top: 4px;
  color: $font2;
  font-size: 12px;
}

.category {
  margin-right: 8px;
}

.rating {
  display: flex;
  align-items: center;
}

.icon-star {
  @include icon(14px, 14px, "icon-star-rec.png");
  margin-right: 2px;
}

.get-btn {
  flex-shrink: 0;
  min-width: 64px;
  height: 32px;
  padding: 0 16px;
  margin-left: 8px;
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

.item:hover .get-btn {
  background: #fd6b21;
  color: #ffffff;
}

@media screen and (max-width: 879px) {
  .item {
    padding: vw(20) 0;
  }
  .icon-box {
    margin-right: vw(20);
  }
  .icon {
    width: vw(120);
    height: vw(120);
    border-radius: vw(24);
  }
  .rank-badge {
    top: 0;
    left: 0;
    min-width: vw(36);
    height: vw(32);
    padding: 0 vw(10);
    border-radius: vw(24) 0 vw(18) 0;
    font-size: vw(20);
  }
  .name {
    font-size: vw(28);
    line-height: vw(40);
  }
  .meta {
    margin-top: vw(8);
    font-size: vw(22);
  }
  .icon-star {
    @include icon(vw(24), vw(24), "icon-star-rec.png");
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
