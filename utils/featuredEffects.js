// "Featured Effects" 卡片：只在测试子域名 apk1.alltools1.com 上显示，其他域名（包括现在
// 跑量的 1-5 这些）完全不受影响——这套卡片是为了提升详情页的互动深度/下载触发率做的
// 实验，不想影响现有域名的真实转化数据，所以用域名 + 产品 path 两个条件一起判断。
// 图片目前只给这两款在投的产品做了，没配置的产品不显示这张卡片。往后要给别的产品加，
// 在这个表里加一条就行，不用改页面结构。
const TEST_HOSTNAME = "apk1.alltools1.com";

const FEATURED_EFFECTS_CONFIG = {
  "hypic-photo-editor-ai-art-105040": {
    image: "/images/featured-hypic-couple.jpg",
    title: "Generate Romantic Couple Photos",
    subtitle: "Make the magic happen instantly. Try it now!"
  },
  "faceapp-perfect-face-editor-104993": {
    image: "/images/featured-faceapp-aging.jpg",
    title: "AI Time Travel: Meet Your Future Self",
    subtitle: "Will you look like your parents? Find out now!"
  }
};

// 返回 null 就是"不显示"：域名不对，或者这个产品没配置过图
export function getFeaturedEffect(path) {
  if (typeof window === "undefined" || window.location.hostname !== TEST_HOSTNAME) {
    return null;
  }
  return FEATURED_EFFECTS_CONFIG[path] || null;
}
