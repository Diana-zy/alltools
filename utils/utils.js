// 模拟点击链接
export function simulateSearch(value) {
  const targetPath = "/search/";
  const currentParams = new URLSearchParams(window.location.search);
  const currentPathname = window.location.pathname;

  // 定义路径与类型的映射关系
  const pathTypeMappings = [
    { pattern: /^\/category\/[\w-]+\/$/, type: "category-detail" },
    { pattern: /^\/category\/$/, type: "category" },
    { pattern: /^\/game\/.*/, type: "game" },
    { pattern: /^\/download\/.*/, type: "download" },
    { pattern: /^\/$/, type: "home" }
  ];

  // 查找匹配的路径类型
  const matchedPathType = pathTypeMappings.find((mapping) => mapping.pattern.test(currentPathname));
  const from = matchedPathType ? matchedPathType.type : currentPathname.replaceAll("/", "");

  // 删除不需要的查询参数
  currentParams.delete("from");
  currentParams.delete("text");
  currentParams.set("text", value);

  const queryString = currentParams.toString();

  const link = document.createElement("a");
  link.href = `${targetPath}?${queryString}${queryString ? "&" : ""}from=${encodeURIComponent(
    from
  )}`;
  link.style.display = "none";
  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
}

export function generateCustomLink(url) {
  const targetPath = url;
  const currentParams = new URLSearchParams(window.location.search);
  const currentPathname = window.location.pathname;

  // 定义路径与类型的映射关系
  const pathTypeMappings = [
    { pattern: /^\/category\/[\w-]+\/$/, type: "category-detail" },
    { pattern: /^\/category\/$/, type: "category" },
    { pattern: /^\/game\/.*/, type: "game" },
    { pattern: /^\/download\/.*/, type: "download" },
    { pattern: /^\/$/, type: "home" }
  ];

  // 查找匹配的路径类型
  const matchedPathType = pathTypeMappings.find((mapping) => mapping.pattern.test(currentPathname));
  const from = matchedPathType ? matchedPathType.type : currentPathname.replaceAll("/", "");

  // 删除不需要的查询参数
  currentParams.delete("from");
  if (currentPathname === "/search/") {
    currentParams.delete("text");
  }

  const siteId = process.env.SITE_ID;
  const currentDomain = window.location.host;
  let targetDomain = "";

  // 检查当前域名是否为 x.siteId.com 的情况
  // if (new RegExp(`^[0-9]+\\.${siteId}\\.com$`).test(currentDomain)) {
  //   targetDomain = "www" + currentDomain;
  // }
  // // 检查当前域名是否为 siteId.com 的情况
  // else
  if (currentDomain === `${siteId}.com`) {
    targetDomain = "www." + currentDomain;
  }
  // 检查当前域名是否为 www.siteId.com 的情况
  else if (currentDomain === `www.${siteId}.com`) {
    targetDomain = currentDomain.substring(4);
  }
  // 检查当前域名是否为 wwwx.siteId.com 的情况
  // else if (new RegExp(`^www[0-9]*\\.${siteId}\\.com$`).test(currentDomain)) {
  //   targetDomain = currentDomain.substring(3);
  // }
  // 如果都不符合，那么当前域名可能是其他非预期的情况
  else {
    targetDomain = currentDomain;
  }
  const protocol = window.location.protocol;

  // 生成新的查询参数字符串
  const queryString = currentParams.toString();
  return `${protocol}//${targetDomain}${targetPath}?${queryString}${
    queryString ? "&" : ""
  }from=${encodeURIComponent(from)}`;
}

export function simulateClickLink(url) {
  const link = document.createElement("a");
  link.href = url;
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// 校验邮箱格式
export function validateEmail(email) {
  // 使用正则表达式验证邮箱格式
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// 在数组中随机取值
export function getRandomValueFromArray(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

// 重新排序
export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // 生成一个随机索引，范围是 [0, i]
    [array[i], array[j]] = [array[j], array[i]]; // 交换当前位置和随机位置的元素
  }
  return array;
}
