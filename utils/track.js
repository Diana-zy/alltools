// 统一打点：同时推给 GTM（dataLayer）和 GA4（gtag），事件名统一加 able_ 前缀。
export function trackEvent(name, params = {}) {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: `able_${name}`, ...params });

  if (typeof window.gtag === "function") {
    window.gtag("event", `able_${name}`, params);
  }
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
    { pattern: /^\/newtools\/?$/, type: "newtools" },
    { pattern: /^\/menu\/?$/, type: "menu" }
  ];

  const matched = mappings.find((m) => m.pattern.test(path));
  return matched ? matched.type : path.replaceAll("/", "") || "unknown";
}
