"use strict";

/*=============== MENU ===============*/
function setupMenuToggle() {
  const navMenu = document.getElementById("nav-menu");
  const navToggle = document.getElementById("nav-toggle");

  /* Menu show - hidden */
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("show-menu");
    navToggle.classList.toggle("animation-toggle");
  });
}

/*=============== REMOVE MENU MOBILE ===============*/
function setupRemoveMenuMobile() {
  const navLink = document.querySelectorAll(".nav-link");

  const linkAction = () => {
    const navMenu = document.getElementById("nav-menu");
    const navToggle = document.getElementById("nav-toggle");
    if (navMenu.classList.contains("show-menu")) {
      navMenu.classList.remove("show-menu");
      navToggle.classList.remove("animation-toggle");
    }
  };

  navLink.forEach((n) => n.addEventListener("click", linkAction));
}

/*=============== CHANGE BACKGROUND HEADER ===============*/
function setupScrollHeader() {
  const header = document.getElementById("header");

  const scrollHeader = () => {
    window.scrollY >= 20
      ? header.classList.add("bg-header")
      : header.classList.remove("bg-header");
  };

  window.addEventListener("scroll", scrollHeader);
}

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
function setupScrollActive() {
  const sections = document.querySelectorAll(`.section[id]`);

  const scrollActive = () => {
    const scrollY = window.pageYOffset;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 58;
      const sectionId = current.getAttribute("id");
      const sectionsClass = document.querySelector(
        `.nav-menu a[href*='${sectionId}']`
      );

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        sectionsClass?.classList.add("active-link");
      } else {
        sectionsClass?.classList.remove("active-link");
      }
    });
  };

  window.addEventListener("scroll", scrollActive);
  scrollActive();
}

/*=============== SERVICES SWIPER ===============*/
function setupServicesSwiper() {
  var servicesSwiper = new Swiper(".services-swiper", {
    spaceBetween: 32,

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },

    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1208: {
        slidesPerView: 3,
      },
    },
  });
}

/*=============== MIXITUP FILTER PORTFOLIO ===============*/
function setupMixitupFilterPortfolio() {
  var mixer = mixitup("#work-container", {
    selectors: {
      target: ".mix",
    },
    animation: {
      duration: 300,
    },
  });

  /* Active work */
  const linkWork = document.querySelectorAll(".work-item");

  linkWork.forEach((btn) => {
    btn.addEventListener("click", function () {
      linkWork.forEach((el) => el.classList.remove("active-work"));
      this.classList.add("active-work");
    });
  });
}

/*=============== RESUME ===============*/
function setupResumeAccordion() {
  const accordionItem = document.querySelectorAll(".resume-item");

  accordionItem.forEach((item) => {
    const header = item.querySelector(".resume-header"),
      content = item.querySelector(".resume-content"),
      icon = item.querySelector(".resume-icon");

    header.addEventListener("click", () => {
      const isOpen = item.classList.toggle("accordion-open");

      content.style.height = isOpen ? content.scrollHeight + "px" : "0";
      icon.innerHTML = isOpen
        ? `<i class="ri-subtract-line"></i>`
        : `<i class="ri-add-line"></i>`;

      accordionItem.forEach((otherItem) => {
        if (
          otherItem !== item &&
          otherItem.classList.contains("accordion-open")
        ) {
          otherItem.classList.remove("accordion-open");
          otherItem.querySelector(".resume-content").style.height = "0";
          otherItem.querySelector(
            ".resume-icon"
          ).innerHTML = `<i class="ri-add-line"></i>`;
        }
      });
    });
  });
}

/*=============== TESTIMONIALS SWIPER ===============*/
function setupTestimonialsSwiper() {
  var testimonialsSwiper = new Swiper(".testimonial-swiper", {
    spaceBetween: 32,

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },

    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1208: {
        slidesPerView: 3,
      },
    },
  });
}

/*=============== EMAIL JS ===============*/
function setupEmailJS() {
  const contactForm = document.getElementById("contact-form"),
    contactName = document.getElementById("contact-name"),
    contactEmail = document.getElementById("contact-email"),
    contactSubject = document.getElementById("contact-subject"),
    contactMessage = document.getElementById("contact-message"),
    message = document.getElementById("message");

  const sendEmail = (e) => {
    e.preventDefault();

    if (
      contactName.value === "" ||
      contactEmail.value === "" ||
      contactSubject.value === "" ||
      contactMessage.value === ""
    ) {
      message.classList.remove("color-first");
      message.classList.add("color-red");
      message.textContent = "Write all the input fields";

      setTimeout(() => {
        message.textContent = "";
      }, 3000);
    } else {
      emailjs
        .sendForm(
          "service_hxf6e5a",
          "template_lkfo1ln",
          "#contact-form",
          "8dabSZqO4hCxq4lAU"
        )

        .then(
          () => {
            message.classList.add("color-first");
            message.textContent = "Message sent ✔";

            setTimeout(() => {
              message.textContent = "";
            }, 5000);
          },
          (error) => {
            alert("OOPs! SOMETHING WENT WRONG...", error);
          }
        );

      contactName.value = "";
      contactEmail.value = "";
      contactSubject.value = "";
      contactMessage.value = "";
    }
  };

  contactForm.addEventListener("submit", sendEmail);
}

/*=============== STYLE SWITCHER ===============*/
function setupStyleSwitcher() {
  const styleSwitcher = document.getElementById("style-switcher"),
    switcherToggle = document.getElementById("switcher-toggle"),
    switcherClose = document.getElementById("switcher-close");

  /* Switcher show */
  switcherToggle.addEventListener("click", () => {
    styleSwitcher.classList.add("show-switcher");
  });

  switcherClose.addEventListener("click", () => {
    styleSwitcher.classList.remove("show-switcher");
  });

  /* Switcher hidden */
}

/*=============== THEME COLORS ===============*/
function setupThemeColors() {
  const colors = document.querySelectorAll(".style-switcher-color");

  colors.forEach((color) => {
    color.addEventListener("click", () => {
      const activeColor = color.style.getPropertyValue("--hue");

      colors.forEach((c) => {
        c.classList.remove("active-color");
      });
      color.classList.add("active-color");

      document.documentElement.style.setProperty("--hue", activeColor);
      localStorage.setItem("selected-hue", activeColor);
    });
  });
}

/*=============== LIGHT/DARK MODE ===============*/
function setupLightDarkMode() {
  document.querySelectorAll(`input[name="body-theme"]`).forEach((input) => {
    input.addEventListener("click", () => {
      document.body.classList.remove("light", "dark");
      document.body.classList.add(input.value);
      localStorage.setItem("selected-theme", input.value);
    });
  });

  // Apply saved theme on load
  window.addEventListener("DOMContentLoaded", () => {
    const savedHue = localStorage.getItem("selected-hue");
    const savedTheme = localStorage.getItem("selected-theme");

    if (savedHue) {
      document.documentElement.style.setProperty("--hue", savedHue);
      document.querySelectorAll(".style-switcher-color").forEach((el) => {
        el.classList.remove("active-color");
        if (el.style.getPropertyValue("--hue") === savedHue) {
          el.classList.add("active-color");
        }
      });
    }

    if (savedTheme) {
      document.body.classList.remove("light", "dark");
      document.body.classList.add(savedTheme);
      document.querySelectorAll(`input[name="body-theme"]`).forEach((input) => {
        input.checked = input.value === savedTheme;
      });
    }
  });
}

/*=============== SHOW DATE IN FOOTER ===============*/
function setupFooterDate() {
  const copyrightDate = document.querySelector(".footer-copyright-date");
  const newDate = new Date();
  const getYear = newDate.getFullYear();

  if (copyrightDate) {
    copyrightDate.innerHTML = getYear;
  }
}

/*=============== SCROLL ANIMATION  ===============*/
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry);
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } 
/*     else {
      entry.target.classList.remove("show");
    } */
  });
});

const hiddenElement = document.querySelectorAll(".hidden");
hiddenElement.forEach((el) => observer.observe(el));

/* ! */

const observer2 = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show2");
    }
  });
});

document.querySelectorAll('.hidden2').forEach((el) => observer2.observe(el));



/*=============== INITIALIZE ALL FUNCTIONS ===============*/

setupMenuToggle();
setupRemoveMenuMobile();
setupScrollHeader();
setupScrollActive();
setupServicesSwiper();
setupMixitupFilterPortfolio();
setupResumeAccordion();
setupTestimonialsSwiper();
setupEmailJS();
setupStyleSwitcher();
setupThemeColors();
setupLightDarkMode();
setupFooterDate();
