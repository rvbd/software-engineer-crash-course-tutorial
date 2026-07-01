document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".reveal .slides section");

  slides.forEach((slide) => {
    if (!slide.querySelector(".slide-footer")) {
      const footer = document.createElement("footer");
      footer.className = "slide-footer";

      const link = document.createElement("a");
      link.href = "https://www.instagram.com/arvy.budiarto/";
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = "@arvy.budiarto";

      footer.appendChild(link);
      slide.appendChild(footer);
    }
  });
});
