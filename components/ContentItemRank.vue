<template>
  <CustomLink :to="to" class="item">
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
      <span v-if="index < 6" class="rank-badge">{{ index + 1 }}</span>
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
}

.rank-badge {
  position: absolute;
  top: -6px;
  left: -6px;
  min-width: 20px;
  height: 20px;
  padding: 0 4px;
  border-radius: 6px;
  background: #fd6b21;
  border: 2px solid #ffffff;
  color: #ffffff;
  font-family: "seb";
  font-size: 12px;
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
    top: vw(-10);
    left: vw(-10);
    min-width: vw(36);
    height: vw(36);
    padding: 0 vw(6);
    border-radius: vw(10);
    border-width: vw(3);
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
