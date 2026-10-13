<template>
  <section
    v-infinite-scroll="loadMore"
    :infinite-scroll-disabled="loading || endOfList"
    infinite-scroll-distance="0"
  >
    <slot :items="items"></slot>
    <Loading v-if="loading" class="infinite-loading"></Loading>
  </section>
</template>

<script>
import { shuffleArray } from "~/utils/utils";

export default {
  props: {
    apiEndpoint: {
      type: String,
      required: true
    },
    initialPage: {
      type: Number,
      default: 2
    },
    pageSize: {
      type: Number,
      default: 20
    },
    initialItems: {
      type: Array,
      default: () => []
    },
    modId: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      result: [],
      loading: false,
      endOfList: false,
      currentPage: this.initialPage,
      items: [...this.initialItems]
    };
  },
  methods: {
    async loadMore() {
      if (this.loading || this.endOfList) return;
      this.loading = true;
      try {
        const [allAppsResponse, allGamesResponse] = await Promise.all([
          this.$axios.$get("/api/game/all_app", {
            params: {
              site_id: process.env.SITE_ID,
              page: this.currentPage,
              size: 20
            }
          }),
          this.$axios.$get("/api/game/all_game", {
            params: {
              site_id: process.env.SITE_ID,
              page: this.currentPage,
              size: 20
            }
          })
        ]);
        // todo: [game, app, game, app]
        const result = this.result;
        for (
          let i = 0;
          i < Math.max(allAppsResponse.list.length, allGamesResponse.list.length);
          i++
        ) {
          if (i < allAppsResponse.list.length) {
            result.push(allAppsResponse.list[i]);
          }
          if (i < allGamesResponse.list.length) {
            result.push(allGamesResponse.list[i]);
          }
        }

        // 按站点上架的 apk 产品随机排序：每一页拉到的 app+game 混合结果在拼进 items 前先打乱，
        // 不是全站严格随机（分页本身仍按后端各自的权重顺序取数据），但每一屏展示的产品顺序
        // 不固定，满足"随机排序"的展示需求，不需要后端额外支持真正的全局随机排序。
        const newData = shuffleArray(result);
        this.items = this.items.concat(newData);
        if (newData.length === 0 || newData.length < this.pageSize) {
          this.endOfList = true;
        }
        this.currentPage++;
        result.length = 0;
      } catch (error) {
        console.error("Failed to load more data:", error);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.infinite-loading {
  grid-column: 1 / -1;
}
</style>
