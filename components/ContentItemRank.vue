<template>
  <CustomLink :to="to" class="item">
    <span class="rank">{{ index + 1 }}</span>
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
  padding: 12px 8px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.rank {
  width: 24px;
  flex-shrink: 0;
  text-align: center;
  color: $font2;
  font-family: "seb";
  font-size: 16px;
}

.icon {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  margin: 0 12px;
  flex-shrink: 0;
}

.info {
  flex: 1;
  min-width: 0;
}

.name {
  color: $font1;
  font-family: "seb";
  font-size: 15px;
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
    padding: vw(20) vw(16);
  }
  .rank {
    width: vw(40);
    font-size: vw(26);
  }
  .icon {
    width: vw(96);
    height: vw(96);
    border-radius: vw(20);
    margin: 0 vw(20);
  }
  .name {
    font-size: vw(28);
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
