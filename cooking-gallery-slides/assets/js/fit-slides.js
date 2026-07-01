const SLIDE_WIDTH = 1280;
const SLIDE_HEIGHT = 720;
const SLIDE_PADDING_X = 104;
const SLIDE_PADDING_Y = 76;
const MIN_SCALE = 0.72;

const applySlideFit = () => {
  const slides = document.querySelectorAll(".reveal .slides section");
  const safeWidth = SLIDE_WIDTH - SLIDE_PADDING_X;
  const safeHeight = SLIDE_HEIGHT - SLIDE_PADDING_Y;

  slides.forEach((slide) => {
    const inner = slide.querySelector(".slide-inner");
    if (!inner) {
      return;
    }

    slide.classList.remove("compact-slide", "ultra-compact-slide", "fit-scaled");
    inner.style.transform = "";
    inner.style.width = "";

    const contentWidth = Math.max(inner.scrollWidth, 1);
    const contentHeight = Math.max(inner.scrollHeight, 1);
    const widthScale = safeWidth / contentWidth;
    const heightScale = safeHeight / contentHeight;
    const scale = Math.min(1, widthScale, heightScale);

    if (scale < 1) {
      const finalScale = Math.max(MIN_SCALE, scale);
      slide.classList.add("compact-slide", "fit-scaled");
      inner.style.transform = `scale(${finalScale})`;
      inner.style.width = `${100 / finalScale}%`;

      if (finalScale === MIN_SCALE) {
        slide.classList.add("ultra-compact-slide");
      }
    }
  });
};

window.applySlideFit = applySlideFit;
window.addEventListener("load", applySlideFit);
window.addEventListener("resize", applySlideFit);
document.addEventListener("DOMContentLoaded", applySlideFit);
