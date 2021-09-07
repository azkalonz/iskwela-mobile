import React, { useEffect } from "react";

export default function (
  elementRef: React.MutableRefObject<any>,
  selectors?: string[],
  hiddenEl?: string[]
) {
  const skeletonize = (el: HTMLElement) => {
    const ee = el as HTMLDivElement;
    ee.style.pointerEvents = "none";
    if (hiddenEl) {
      hiddenEl.forEach((e) => {
        el.querySelectorAll(e).forEach(function (ee) {
          const e = ee as HTMLDivElement;
          e.style.display = "none";
        });
      });
    }
    if (selectors) {
      selectors.forEach((s) => {
        el.querySelectorAll(s).forEach(function (e) {
          const ee = e as HTMLDivElement;
          if (e.querySelector(".skeleton-loader") !== null) return;
          const loader = document.createElement("div");
          loader.classList.add("skeleton-loader");
          e.prepend(loader);
          if (getComputedStyle(ee).position !== "absolute") {
            ee.style.position = "relative";
            ee.style.overflow = "hidden!important";
            ee.style.background = "none";
          }
        });
      });
    }
  };

  useEffect(() => {
    if (elementRef.current) {
      skeletonize(elementRef.current);
    }
  }, []);
  return null;
}
