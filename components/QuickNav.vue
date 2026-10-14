<template>
  <div class="quick-nav">
    <transition name="quick-nav-panel-fade">
      <div v-if="open" class="quick-nav-panel">
        <CustomLink to="/rankings/" class="quick-nav-item" @click.native="handleItemClick('rankings')">
          <i class="icon-rank"></i>
          <span class="quick-nav-label">Top Rankings</span>
          <i class="icon-chevron"></i>
        </CustomLink>
        <CustomLink
          to="/new-release/"
          class="quick-nav-item"
          @click.native="handleItemClick('new_release')"
        >
          <i class="icon-new"></i>
          <span class="quick-nav-label">Update in last 24 hours</span>
          <i class="icon-chevron"></i>
        </CustomLink>
        <CustomLink to="/picks/" class="quick-nav-item" @click.native="handleItemClick('picks')">
          <i class="icon-picks"></i>
          <span class="quick-nav-label">Easy Use and Happy Life</span>
          <i class="icon-chevron"></i>
        </CustomLink>
        <CustomLink
          to="/puzzle-games/"
          class="quick-nav-item"
          @click.native="handleItemClick('puzzle_games')"
        >
          <i class="icon-puzzle"></i>
          <span class="quick-nav-label">Best Free Puzzle Games</span>
          <i class="icon-chevron"></i>
        </CustomLink>
        <CustomLink
          to="/ai-apps/"
          class="quick-nav-item quick-nav-item-last"
          @click.native="handleItemClick('ai_apps')"
        >
          <i class="icon-ai"></i>
          <span class="quick-nav-label">Most Popular AI Apps</span>
          <i class="icon-chevron"></i>
        </CustomLink>
      </div>
    </transition>
    <div
      ref="quickNavBtn"
      class="quick-nav-btn"
      :class="{ 'quick-nav-btn-open': open }"
      @click="handleBtnClick"
    >
      <div class="quick-nav-icon">
        <span class="quick-nav-icon-bar bar1"></span>
        <span class="quick-nav-icon-bar bar2"></span>
        <span class="quick-nav-icon-bar bar3"></span>
      </div>
      <span class="quick-nav-btn-label">{{ open ? "Close" : "Explore" }}</span>
    </div>
  </div>
</template>

<script>
import { trackEvent, getPageType } from "~/utils/track";

export default {
  data() {
    return {
      open: false
    };
  },
  mounted() {
    document.addEventListener("click", this.handleOutsideClick);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleOutsideClick);
  },
  methods: {
    // 点击悬浮按钮本身：根据点之前面板是开是关，分别算成"展开"还是"收起"。
    // target 在这两种触发里没有具体值，但 GA4 同一个事件的不同触发如果参数字段不一致
    // （有的带 target 有的不带），按 target 统计这个事件整体会把没带的那部分显示成
    // (not set)、没法看整体用户数，所以这里也显式传个空字符串占位，跟 click_item 那次
    // 字段对齐
    handleBtnClick() {
      trackEvent("quick_nav_click", {
        page_type: getPageType(),
        click_type: this.open ? "click_close" : "click_expand",
        target: ""
      });
      this.open = !this.open;
    },
    // 点击面板里的某个入口：导航+收起面板之外，单独再打一条"点了具体哪一项"
    handleItemClick(target) {
      trackEvent("quick_nav_click", {
        page_type: getPageType(),
        click_type: "click_item",
        target
      });
      this.open = false;
    },
    // 点击按钮和弹出面板以外的地方，自动收起面板（不算按钮本身的点击，不打点）
    handleOutsideClick(event) {
      if (this.open && !this.$el.contains(event.target)) {
        this.open = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.quick-nav {
  position: fixed;
  // 不做挡广告隐藏判断了，按钮必须任何时候都能点到，用接近最大值的 z-index 保证它始终在
  // 最上层，不会被广告的 iframe（不管加载到哪个阶段）盖住拦截点击
  z-index: 2147483000;
  bottom: 180px;
  right: 158px;
}

.quick-nav-btn {
  width: 76px;
  height: 76px;
  background: linear-gradient(135deg, #ff7a1a, #ff4d00);
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.6);
  box-shadow: 0 0 0 3px rgba(255, 77, 0, 0.2), 0 6px 18px rgba(255, 77, 0, 0.55);
  cursor: pointer;
  transition: transform 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // 这是个 div 不是 a 标签，站内给链接统一去点击高亮的全局样式套不到它身上，
  // 移动端点击会出现默认的方形高亮/聚焦框，这里单独去掉
  -webkit-tap-highlight-color: transparent;
  outline: none;

  &.quick-nav-btn-open {
    transform: scale(0.94);
  }
}

// 三条横线用真实DOM元素画，不用图片，这样展开面板时能让上下两条转45度拼成X、
// 中间一条淡出，做出经典的"汉堡图标变关闭图标"效果，比单纯缩小按钮更直观——
// 尤其对中老年用户，"变成叉号"比"按钮变小了"更容易理解"这是关闭"的意思
.quick-nav-icon {
  position: relative;
  width: 24px;
  height: 18px;
}

.quick-nav-icon-bar {
  position: absolute;
  left: 0;
  width: 100%;
  height: 3px;
  border-radius: 2px;
  background: #ffffff;
  transition: transform 0.25s ease, opacity 0.2s ease, top 0.25s ease;

  &.bar1 {
    top: 0;
  }
  &.bar2 {
    top: 7.5px;
  }
  &.bar3 {
    top: 15px;
  }
}

.quick-nav-btn-open .quick-nav-icon-bar {
  &.bar1 {
    top: 7.5px;
    transform: rotate(45deg);
  }
  &.bar2 {
    opacity: 0;
  }
  &.bar3 {
    top: 7.5px;
    transform: rotate(-45deg);
  }
}

.quick-nav-btn-label {
  margin-top: 3px;
  font-family: seb;
  font-size: 14px;
  color: #ffffff;
}

.quick-nav-panel {
  position: absolute;
  bottom: 88px;
  right: 0;
  width: 260px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  padding: 4px 0;
  overflow: hidden;
}

.quick-nav-item {
  display: flex;
  align-items: center;
  height: 52px;
  padding: 0 16px;
  font-size: 14px;
  font-family: "sesb";
  color: $font1;
  cursor: pointer;
  border-bottom: 1px solid #eef0f3;

  &:hover {
    background: #f5f6f8;
  }
}

.quick-nav-item-last {
  border-bottom: none;
}

.quick-nav-label {
  flex: 1;
  min-width: 0;
}

.icon-chevron {
  @include icon(14px, 14px, "icon-arrow-right.png");
  flex-shrink: 0;
  margin-left: 8px;
}

.icon-rank,
.icon-new,
.icon-picks,
.icon-puzzle,
.icon-ai {
  width: 22px;
  height: 22px;
  margin-right: 10px;
  flex-shrink: 0;
}
.icon-rank {
  @include icon(22px, 22px, "icon-rank.png");
}
.icon-new {
  @include icon(22px, 22px, "icon-new.png");
}
.icon-picks {
  @include icon(22px, 22px, "icon-picks.png");
}
.icon-puzzle {
  @include icon(22px, 22px, "icon-puzzle.png");
}
.icon-ai {
  @include icon(22px, 22px, "icon-ai.png");
}

.quick-nav-panel-fade-enter-active,
.quick-nav-panel-fade-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.quick-nav-panel-fade-enter,
.quick-nav-panel-fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

@media screen and (max-width: 879px) {
  .quick-nav {
    bottom: vw(160);
    right: vw(66);
  }
  .quick-nav-btn {
    width: vw(128);
    height: vw(128);
  }
  .quick-nav-icon {
    width: vw(42);
    height: vw(32);
  }
  .quick-nav-icon-bar {
    height: vw(5.5);

    &.bar1 {
      top: 0;
    }
    &.bar2 {
      top: vw(13);
    }
    &.bar3 {
      top: vw(26);
    }
  }
  .quick-nav-btn-open .quick-nav-icon-bar {
    &.bar1,
    &.bar3 {
      top: vw(13);
    }
  }
  .quick-nav-btn-label {
    font-size: vw(22);
  }
  .quick-nav-panel {
    bottom: vw(146);
    width: vw(440);
    border-radius: vw(24);
  }
  .quick-nav-item {
    height: vw(88);
    padding: 0 vw(28);
    font-size: vw(26);
  }
  .icon-chevron {
    width: vw(22);
    height: vw(22);
    margin-left: vw(12);
  }
  .icon-rank,
  .icon-new,
  .icon-picks,
  .icon-puzzle,
  .icon-ai {
    width: vw(36);
    height: vw(36);
    margin-right: vw(16);
  }
}
</style>
