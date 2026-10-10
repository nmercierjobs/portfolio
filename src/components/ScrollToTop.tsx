import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  // Stop the browser from restoring the previous scroll position on refresh,
  // which otherwise leaves the page slightly scrolled after a reload.
  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }

  useLayoutEffect(() => {
    const root = document.documentElement;
    const previousBehavior = root.style.scrollBehavior;

    root.style.scrollBehavior = "auto";
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    root.scrollTop = 0;
    document.body.scrollTop = 0;

    const frame = requestAnimationFrame(() => {
      root.style.scrollBehavior = previousBehavior;
    });

    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
