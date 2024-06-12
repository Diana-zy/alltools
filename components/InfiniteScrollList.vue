<template>
  <section
    v-infinite-scroll="loadMore"
    :infinite-scroll-disabled="loading || endOfList"
    infinite-scroll-distance="0"
    class="box-common"
  >
    <slot :items="items"></slot>
    <Loading v-if="loading" class="infinite-loading"></Loading>
  </section>
</template>

<script>
export default {
  props: {
    apiEndpoint: {
      type: String,
      required: true
    },
    initialPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 21
    },
    initialItems: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
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
        const response = await this.$axios.$get(this.apiEndpoint, {
          params: {
            site_id: process.env.SITE_ID,
            page: this.currentPage,
            size: this.pageSize
          }
        });
        const newData = response.list;
        this.items = this.items.concat(newData);
        if (newData.length === 0 || newData.length < this.pageSize) {
          this.endOfList = true;
        }
        this.currentPage++;
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
