// 统一打点：同时推给 GTM（dataLayer）、GA4（gtag），事件名统一加 able_ 前缀。
// hi_source=facebook 时（app.html 里读 URL/Cookie 判断、动态加载 fbq），同时把这个事件
// 作为自定义事件直推给 Facebook Pixel，不用等每个事件单独接。
export function trackEvent(name, params = {}) {
  if (typeof window === "undefined") return;

  const eventName = `able_${name}`;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: eventName, ...params });

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }

  if (typeof window.fbq === "function") {
    window.fbq("trackCustom", eventName, params);
  }
}

// 额外映射到 Facebook 标准事件（跟上面的自定义事件直推是两回事，标准事件是 Facebook
// 投放优化算法直接认的，自定义事件只是给后台看数据用）：
//   首页浏览 -> ViewContent
//   详情页浏览 -> Lead
//   全站有效内容点击 -> AddToCart
//   详情页下载按钮点击 -> InitiateCheckout
//   下载页下载按钮点击 -> StartTrial
//   非落地页停留3秒 -> CompleteRegistration（app.html 里单独直接调 fbq，不走这个函数）
//   插页广告变为可见 -> AddPaymentInfo（app.html 里单独直接调 fbq，不走这个函数）
//   详情页第一个页内 banner 广告点击 -> AddToWishlist（app.html 里单独直接调 fbq，
//     不走这个函数；这个动作专属，不跟别的动作共用）
//   详情页第一个页内banner广告点击 + 详情页下载按钮点击 + 下载页下载按钮点击
//     -> 统一共用 Purchase，三个动作各自发生一次都单独记一次，不去重（测试竞品那种
//     "多个深层动作统一报一个转化事件"的打法；插页广告点击本身已不再映射 Purchase）
export function trackFacebookStandardEvent(eventName, params = {}) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  window.fbq("track", eventName, params);
}

// 根据当前路径推断页面类型，用于打点的 page_type 参数
export function getPageType(pathname) {
  const path = pathname || (typeof window !== "undefined" ? window.location.pathname : "");

  const mappings = [
    { pattern: /^\/$/, type: "home" },
    { pattern: /^\/rankings\/?$/, type: "rankings" },
    { pattern: /^\/category\/[\w-]+\/$/, type: "category_detail" },
    { pattern: /^\/category\/?$/, type: "category" },
    { pattern: /^\/search\/?$/, type: "search" },
    { pattern: /^\/app\/.+/, type: "app_detail" },
    { pattern: /^\/game\/.+/, type: "game_detail" },
    { pattern: /^\/download\/.+/, type: "download" },
    { pattern: /^\/apps\/?$/, type: "apps" },
    { pattern: /^\/games\/?$/, type: "games" },
    { pattern: /^\/new\/?$/, type: "new" },
    { pattern: /^\/new-release\/?$/, type: "new_release" },
    { pattern: /^\/picks\/?$/, type: "picks" },
    { pattern: /^\/puzzle-games\/?$/, type: "puzzle_games" },
    { pattern: /^\/ai-apps\/?$/, type: "ai_apps" },
    { pattern: /^\/newtools\/?$/, type: "newtools" }
  ];

  const matched = mappings.find((m) => m.pattern.test(path));
  return matched ? matched.type : path.replaceAll("/", "") || "unknown";
}
