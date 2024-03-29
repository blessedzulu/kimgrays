import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import jump from "jump.js";

gsap.registerPlugin(ScrollTrigger);
gsap.defaults({ ease: "power4.out", duration: 1 });
ScrollTrigger.defaults({ ease: "power2.out" });

const animations = {
  fadeInUp(el) {
    return gsap.from(el, {
      yPercent: 10,
      autoAlpha: 0,
      scale: 0.95,
      ease: "power4.out",
      scrollTrigger: {
        trigger: el,
        start: "top center+=200",
      },
    });
  },
  fadeInLeft(el) {
    return gsap.from(el, {
      xPercent: -10,
      autoAlpha: 0,
      ease: "power4.out",
      scrollTrigger: {
        trigger: el,
        start: "top center+=200",
      },
    });
  },
  fadeInLeftStagger(els, elTrigger, stagger) {
    return gsap.from(els, {
      xPercent: -10,
      autoAlpha: 0,
      ease: "power4.out",
      stagger,
      scrollTrigger: {
        trigger: elTrigger,
        start: "top center+=200",
      },
    });
  },
  fadeIn(el, duration) {
    return gsap.from(el, {
      autoAlpha: 0,
      duration,
      ease: "power2.out",
    });
  },
  fadeInOnScroll(el, duration) {
    return gsap.from(el, {
      autoAlpha: 0,
      duration,
      scrollTrigger: {
        trigger: el,
        start: "top center+=200",
      },
    });
  },
  tiltImg(img, xPos, yPos, i) {
    gsap.to(img, {
      duration: 2,
      ease: "power2.out",
      x: -xPos * 50 * (i + 0.5),
      y: -yPos * 50 * (i + 0.5),
      rotationY: xPos * 20,
      rotationX: yPos * 40,
    });
  },
  animHeaderBg(el, elTrigger) {
    gsap.to(el, {
      scrollTrigger: {
        trigger: elTrigger,
        start: 200,
        toggleClass: {
          targets: el,
          className: "has-scrolled",
        },
      },
    });
  },
  jumpTo(target) {
    jump(target, { duration: 500, offset: -100 });
  },
};

const animContent = () => {
  const content = document.querySelectorAll(".content");

  [...content].forEach((el) => {
    animations.fadeInUp(el);
  });
};

const animTestimonials = () => {
  const testimonials = document.querySelectorAll(".testimonials__item");

  [...testimonials].forEach((el) => {
    animations.fadeInLeft(el);
  });
};

const animHeroHome = () => {
  const heroHome = document.querySelector(".hero--home");
  if (!heroHome) return;

  animations.fadeIn(heroHome, 1.5);
};

const tiltImages = (e) => {
  const heroImgs = document.querySelectorAll(".hero__img");

  // prettier-ignore
  const { offsetX, offsetY, target: { clientWidth, clientHeight } } = e;

  const xPos = offsetX / clientWidth - 0.5; // 0/0 when at center, and >= .5 elsewhere
  const yPos = offsetY / clientHeight - 0.5;

  [...heroImgs].forEach((img, i) => {
    animations.tiltImg(img, xPos, yPos, i);
  });
};

const animHeaderBg = () => {
  const header = document.querySelector(".header");
  const body = document.querySelector("body");

  animations.animHeaderBg(header, body);
};

const animHeroImgs = () => {
  const heroHome = document.querySelector(".hero--home");

  if (!heroHome) return;

  heroHome.addEventListener("mousemove", tiltImages);
};

const animRibbons = () => {
  const ribbons = document.querySelectorAll(".section__ribbon");

  [...ribbons].forEach((el) => {
    animations.fadeInOnScroll(el, 2);
  });
};

const animSectionHeaders = () => {
  const sectionHeaders = document.querySelectorAll(".section__header");

  [...sectionHeaders].forEach((el) => {
    animations.fadeInOnScroll(el, 2);
  });
};

const animFooterContent = () => {
  const fq = document.querySelector(".footer__quotation");
  const fcon = document.querySelector(".footer__connect");
  const fcopy = document.querySelector(".footer__copyright");
  const fmb = document.querySelector(".footer__made-by");
  const els = [fq, fcon, fcopy, fmb];

  animations.fadeInLeftStagger(els, ".footer", 0.25);
};

const animJumpToSection = () => {
  const linkAbout = document.querySelector(".nav__link--about");
  const linkServices = document.querySelector(".nav__link--services");

  if (!linkServices || !linkAbout) return;

  linkAbout.addEventListener("click", (e) => {
    e.preventDefault();
    animations.jumpTo(".section--about");
  });

  linkServices.addEventListener("click", (e) => {
    e.preventDefault();
    animations.jumpTo(".section--services");
  });
};

const init = () => {
  animContent();
  animTestimonials();
  animHeroHome();
  animHeroImgs();
  animRibbons();
  animSectionHeaders();
  animFooterContent();
  animHeroImgs();
  animHeaderBg();
  animJumpToSection();
};

window.addEventListener("DOMContentLoaded", init);

// todo: Tomorrow todo list
// task: 1. Add loading screen
// task: 3. Add small screen nav menu
// fixme: Testing
// ~
// ^
// &
// *
