// 模拟点击链接
export function simulateSearch(value) {
  const targetPath = "/search/";
  const currentParams = new URLSearchParams(window.location.search);
  const currentPathname = window.location.pathname;

  // 定义路径与类型的映射关系
  const pathTypeMappings = [
    { pattern: /^\/category\/[\w-]+\/$/, type: "category-detail" },
    { pattern: /^\/topic\/[\w-]+\/$/, type: "topic-detail" },
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
  // to 里可能自带查询参数（比如 "/rankings/?tab=apps"），拆出来跟当前页面的追踪参数合并，
  // 而不是直接拼接产生两个"?"（那样第二个"?"会被当成普通字符，把 tab 的值污染成
  // "apps?from=home..." 这种脏字符串）。
  const [rawPath, ownQueryString] = url.split("?");
  const targetPath = rawPath;
  const currentParams = new URLSearchParams(window.location.search);
  const currentPathname = window.location.pathname;

  if (ownQueryString) {
    new URLSearchParams(ownQueryString).forEach((value, key) => {
      currentParams.set(key, value);
    });
  }

  // 定义路径与类型的映射关系
  const pathTypeMappings = [
    { pattern: /^\/category\/[\w-]+\/$/, type: "category-detail" },
    { pattern: /^\/category\/$/, type: "category" },
    { pattern: /^\/game\/.*/, type: "game" },
    { pattern: /^\/app\/.*/, type: "app" },
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
  function generateTargetDomain(currentDomain) {
    // 正则表达式：匹配域名结构（兼容多级子域名、数字前缀）
    const pattern = /^(www)?([a-z0-9]*)(?:\.([a-z0-9-]+))?\.([a-z0-9-]+)\.([a-z]{2,})$/i;
    const match = currentDomain.match(pattern);

    if (!match) {
      // 处理基础域名（如 a.com 或 www.a.com）
      const basePattern = /^(www\.)?([a-z0-9-]+)\.([a-z]{2,})$/i;
      const baseMatch = currentDomain.match(basePattern);
      if (baseMatch) {
        return baseMatch[1] ? `${baseMatch[2]}.${baseMatch[3]}` : `www.${currentDomain}`;
      }
      return currentDomain;
    }

    // 解析匹配结果
    // eslint-disable-next-line no-unused-vars
    const [_, wwwPrefix, numberPrefix, middle, main, tld] = match;

    if (wwwPrefix) {
      // 移除 www 前缀
      return `${numberPrefix || ""}${middle ? `.${middle}` : ""}.${main}.${tld}`.replace(/^\./, "");
    } else {
      // 添加 www 前缀
      return `www${numberPrefix || ""}${middle ? `.${middle}` : ""}.${main}.${tld}`.replace(
        /^\./,
        ""
      );
    }
  }

  const targetDomain = generateTargetDomain(window.location.host);

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
