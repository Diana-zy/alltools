<template>
  <div v-show="!isOverlappingAd" class="quick-nav">
    <transition name="quick-nav-panel-fade">
      <div v-if="open" class="quick-nav-panel">
        <CustomLink to="/rankings/" class="quick-nav-item" @click.native="open = false">
          <i class="icon-rank"></i>
          <span class="quick-nav-label">Top Rankings</span>
          <i class="icon-chevron"></i>
        </CustomLink>
        <CustomLink to="/new-release/" class="quick-nav-item" @click.native="open = false">
          <i class="icon-new"></i>
          <span class="quick-nav-label">Update in last 24 hours</span>
          <i class="icon-chevron"></i>
        </CustomLink>
        <CustomLink to="/picks/" class="quick-nav-item" @click.native="open = false">
          <i class="icon-picks"></i>
          <span class="quick-nav-label">Easy Use and Happy Life</span>
          <i class="icon-chevron"></i>
        </CustomLink>
        <CustomLink to="/puzzle-games/" class="quick-nav-item" @click.native="open = false">
          <i class="icon-puzzle"></i>
          <span class="quick-nav-label">Best Free Puzzle Games</span>
          <i class="icon-chevron"></i>
        </CustomLink>
        <CustomLink to="/ai-apps/" class="quick-nav-item quick-nav-item-last" @click.native="open = false">
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
      @click="open = !open"
    >
      <i class="icon-quick-nav"></i>
      <span class="quick-nav-btn-label">Explore</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      open: false,
      isOverlappingAd: false,
      lastButtonRect: null // 保存按钮的最新边界矩形数据
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    document.addEventListener("click", this.handleOutsideClick);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    document.removeEventListener("click", this.handleOutsideClick);
  },
  methods: {
    // 跟原来 BackTop 的逻辑一样：悬浮按钮不能挡住广告，挡住了就直接隐藏，而不是叠在广告上面
    handleScroll() {
      const adsElements = document.querySelectorAll(".adsbygoogle");
      const quickNavBtn = this.$refs.quickNavBtn;

      if (quickNavBtn && quickNavBtn.getBoundingClientRect().height !== 0) {
        this.lastButtonRect = quickNavBtn.getBoundingClientRect();
      }

      if (!this.lastButtonRect || !adsElements) {
        this.isOverlappingAd = false;
        return;
      }

      let isOverlappingAnyAd = false;
      for (const adsElement of adsElements) {
        const adsRect = adsElement.getBoundingClientRect();
        if (this.isOverlapping(this.lastButtonRect, adsRect) && adsRect.height !== 0) {
          isOverlappingAnyAd = true;
          break;
        }
      }
      this.isOverlappingAd = isOverlappingAnyAd;
    },
    // 点击按钮和弹出面板以外的地方，自动收起面板
    handleOutsideClick(event) {
      if (this.open && !this.$el.contains(event.target)) {
        this.open = false;
      }
    },
    isOverlapping(rect1, rect2) {
      return (
        rect1.bottom > rect2.top &&
        rect1.top < rect2.bottom &&
        rect1.left < rect2.right &&
        rect1.right > rect2.left
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.quick-nav {
  position: fixed;
  z-index: 500;
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

  &.quick-nav-btn-open {
    transform: scale(0.94);
  }
}

.icon-quick-nav {
  @include icon(32px, 32px, "icon-quick-nav.png");
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
  .icon-quick-nav {
    width: vw(56);
    height: vw(56);
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
