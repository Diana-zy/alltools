<template>
  <div class="expandable-text">
    <div :class="{ 'is-expanded': expanded }" class="text-content">
      {{ text }}
    </div>
    <button class="toggle-button" @click="toggleExpand">
      {{ expanded ? "Show Less" : "Show More" }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      expanded: false
    };
  },
  methods: {
    toggleExpand() {
      this.expanded = !this.expanded;
    }
  }
};
</script>

<style lang="scss" scoped>
.expandable-text {
  position: relative;
  text-align: center;
}

.text-content {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-clamp: 2;
  box-orient: vertical;
  height: 2.6em;
  transition: height 0.3s ease;
  line-height: 1.2;
  color: rgba($font1, 0.6);
  font-family: "sesb";
  text-align: left;
}

.text-content.is-expanded {
  height: auto;
  -webkit-line-clamp: unset;
  line-clamp: unset;
  box-orient: unset;
}

.toggle-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  color: rgba($font1, 0.6);
  font-family: "sesb";
  margin-top: 1em;
}
</style>
