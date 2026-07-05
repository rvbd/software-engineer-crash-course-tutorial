document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".reveal .slides section");

  slides.forEach((slide) => {
    if (!slide.querySelector(".slide-footer")) {
      const footer = document.createElement("footer");
      footer.className = "slide-footer";

      const instagramLink = document.createElement("a");
      instagramLink.className = "slide-footer-link";
      instagramLink.href = "https://www.instagram.com/arvy.budiarto/";
      instagramLink.target = "_blank";
      instagramLink.rel = "noopener noreferrer";
      instagramLink.setAttribute("aria-label", "Instagram @arvy.budiarto");

      const instagramIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      instagramIcon.setAttribute("class", "slide-footer-icon");
      instagramIcon.setAttribute("viewBox", "0 0 24 24");
      instagramIcon.setAttribute("aria-hidden", "true");
      instagramIcon.innerHTML = [
        '<rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>',
        '<path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>',
        '<line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>',
      ].join("");

      const instagramHandle = document.createElement("span");
      instagramHandle.textContent = "@arvy.budiarto";

      const websiteLink = document.createElement("a");
      websiteLink.className = "slide-footer-link";
      websiteLink.href = "https://www.agiletechnica.com/";
      websiteLink.target = "_blank";
      websiteLink.rel = "noopener noreferrer";
      websiteLink.textContent = "www.agiletechnica.com";

      instagramLink.append(instagramIcon, instagramHandle);
      footer.append(instagramLink, websiteLink);
      slide.appendChild(footer);
    }
  });
});
