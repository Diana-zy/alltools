// 自定义页面级滚动条：默认完全不可见，滚动时淡入一条细指示条，停止滚动后延时淡出。
// 不占用页面宽度（fixed 定位浮在内容上面），浏览器原生的页面滚动条在 common.scss 里已经隐藏。
export default () => {
  if (typeof window === "undefined") return;

  const MIN_THUMB_HEIGHT = 24;
  const EDGE_OFFSET = 2;
  const HIDE_DELAY = 800;

  const thumb = document.createElement("div");
  thumb.setAttribute("aria-hidden", "true");
  Object.assign(thumb.style, {
    position: "fixed",
    top: "0",
    right: `${EDGE_OFFSET}px`,
    width: "4px",
    borderRadius: "2px",
    background: "rgba(65, 65, 76, 0.35)",
    opacity: "0",
    transition: "opacity 0.25s ease",
    zIndex: "9999",
    pointerEvents: "none"
  });

  let hideTimer = null;
  let rafId = null;

  function updateThumb() {
    rafId = null;
    const doc = document.documentElement;
    const viewportHeight = window.innerHeight;
    const scrollHeight = doc.scrollHeight;

    if (scrollHeight <= viewportHeight) {
      thumb.style.opacity = "0";
      return;
    }

    const thumbHeight = Math.max(
      MIN_THUMB_HEIGHT,
      (viewportHeight / scrollHeight) * viewportHeight
    );
    const maxScroll = scrollHeight - viewportHeight;
    const maxThumbTravel = viewportHeight - thumbHeight;
    const scrollTop = window.scrollY || doc.scrollTop;
    const thumbTop = maxScroll > 0 ? (scrollTop / maxScroll) * maxThumbTravel : 0;

    thumb.style.height = `${thumbHeight}px`;
    thumb.style.top = `${thumbTop}px`;
  }

  function onScroll() {
    if (rafId === null) rafId = requestAnimationFrame(updateThumb);
    thumb.style.opacity = "1";
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => {
      thumb.style.opacity = "0";
    }, HIDE_DELAY);
  }

  function mount() {
    document.body.appendChild(thumb);
    updateThumb();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateThumb, { passive: true });
  }

  if (document.readyState === "complete" || document.readyState === "interactive") {
    mount();
  } else {
    document.addEventListener("DOMContentLoaded", mount);
  }
};
