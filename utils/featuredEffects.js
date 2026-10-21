// "Featured Effects" 卡片：只在 apk1.alltools1.com 本身、以及它的任何子域名/带前缀
// 版本（比如 1.apk1.alltools1.com、www.apk1.alltools1.com、www2.apk1.alltools1.com）
// 上显示，其他域名（包括现在跑量的 1-5 这些）完全不受影响——这套卡片是为了提升详情页的
// 互动深度/下载触发率做的实验，不想影响现有域名的真实转化数据，所以用域名 + 产品 path
// 两个条件一起判断。图片目前只给这两款在投的产品做了，没配置的产品不显示这张卡片。
// 往后要给别的产品加，在这个表里加一条就行，不用改页面结构；以后再加新的前缀域名
// （比如 3.apk1.alltools1.com）也会自动生效，不用改这里的判断逻辑。
const TEST_HOSTNAME = "apk1.alltools1.com";

function isTestHostname(hostname) {
  return hostname === TEST_HOSTNAME || hostname.endsWith(`.${TEST_HOSTNAME}`);
}

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
  if (typeof window === "undefined" || !isTestHostname(window.location.hostname)) {
    return null;
  }
  return FEATURED_EFFECTS_CONFIG[path] || null;
}
