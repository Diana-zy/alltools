// 首页运营位配置：这里的值填的是应用/游戏详情页路径（/app/<path>/ 或 /game/<path>/ 里的 <path>），
// 不是包名、不是显示名。改这个文件不需要重新部署后端，只是前端静态内容。
//
// 1. heroApps / heroGames：首页顶部轮播固定展示的应用/游戏（替代原来按热度自动选取的逻辑）
// 2. recommendedApks：首页 "Recommended apks you must have" 模块固定展示的 10 个应用
//
// 三个数组目前都是空的，需要产品/运营从已同步的应用库里选定后再填入对应的 path。
// 在配置好之前，首页会自动 fallback 到当前的 ranking 数据（bestApps/bestGames），保证不会空白。

export const heroApps = [];
export const heroGames = [];
export const recommendedApks = [];
