const applySlideFit = () => {
  const slides = document.querySelectorAll(".reveal .slides section");

  slides.forEach((slide) => {
    slide.classList.remove("compact-slide", "ultra-compact-slide");

    if (slide.scrollHeight > slide.clientHeight) {
      slide.classList.add("compact-slide");
    }

    if (slide.scrollHeight > slide.clientHeight) {
      slide.classList.add("ultra-compact-slide");
    }
  });
};

window.applySlideFit = applySlideFit;
window.addEventListener("load", applySlideFit);
window.addEventListener("resize", applySlideFit);
document.addEventListener("DOMContentLoaded", applySlideFit);
