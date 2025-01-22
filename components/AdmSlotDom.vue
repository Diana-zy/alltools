<!-- eslint-disable vue/no-v-html -->
<template>
  <div>
    <div ref="admSlot" class="adm-slot">
      <p ref="title" class="title">Advertisement</p>
      <div :id="admId" ref="googleAdmSlot" class="ad-slot"></div>
      <script
        v-html="
          `
         if (!window._admSlotInitialized) {
          window._admSlotInitialized = {};
        }
        if (!window._admSlotInitialized['${admId}']) {
          window._admSlotInitialized['${admId}'] = true;
          window.googletag = window.googletag || { cmd: [] };
          googletag.cmd.push(function() {
            console.log('admId', '${admId}');
            googletag
              .defineSlot('${admUnit}', [336, 280], '${admId}')
              .addService(googletag.pubads());
            googletag.enableServices();
            googletag.display('${admId}');
          });
        }
        `
        "
      ></script>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    admId: {
      type: String,
      required: true
    },
    admUnit: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.adm-slot {
  margin: 0 auto;
  width: 100%;
  height: 280px;
}
.title {
  background: $color1;

  line-height: 24px;
  color: #ffffff;
  text-align: center;
}

@media screen and (max-width: 879px) {
  .adm-slot {
    height: vw(673);
  }
  .title {
    font-size: vw(24);
    line-height: vw(35);
  }
}
</style>
