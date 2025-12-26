(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) return;
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) processPreload(link);
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") continue;
      for (const node of mutation.addedNodes) if (node.tagName === "LINK" && node.rel === "modulepreload") processPreload(node);
    }
  }).observe(document, {
    childList: true,
    subtree: true
  });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials") fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep) return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
$(".slick-slider").slick({
  infinite: false,
  speed: 200,
  slidesToShow: 3,
  slidesToScroll: 1,
  prevArrow: document.querySelector(".reviews__arrow--prev"),
  nextArrow: document.querySelector(".reviews__arrow--next"),
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});
Fancybox.bind("[data-fancybox]");
document.addEventListener("DOMContentLoaded", () => {
  const techWrapper = document.querySelector(".why");
  if (techWrapper) {
    let switchSlide2 = function(index) {
      if (index < 0 || index >= techItems.length) return;
      techItems.forEach((i) => i.classList.remove("why__item--active"));
      techCards.forEach((card) => card.classList.remove("why__img--active"));
      techItems[index].classList.add("why__item--active");
      techCards[index].classList.add("why__img--active");
      currentIndex = index;
    }, isElementInViewport2 = function(el) {
      const rect = el.getBoundingClientRect();
      return rect.top >= 0 && rect.top <= window.innerHeight * 0.2 && rect.bottom >= window.innerHeight * 0.2;
    }, preventDefaultScroll2 = function(e) {
      if (scrollLockEnabled) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    }, enableScrollLock2 = function() {
      if (scrollLockEnabled) return;
      document.addEventListener("wheel", preventDefaultScroll2, { passive: false });
      document.addEventListener("touchmove", preventDefaultScroll2, { passive: false });
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      scrollLockEnabled = true;
    }, disableScrollLock2 = function() {
      if (!scrollLockEnabled) return;
      document.removeEventListener("wheel", preventDefaultScroll2);
      document.removeEventListener("touchmove", preventDefaultScroll2);
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      scrollLockEnabled = false;
      ignoreNextScroll = true;
      setTimeout(() => {
        ignoreNextScroll = false;
      }, 100);
    }, handleTechScroll2 = function(delta) {
      if (isScrolling || ignoreNextScroll) return;
      isScrolling = true;
      const prevIndex = currentIndex;
      if (delta > 0 && currentIndex < techItems.length - 1) {
        switchSlide2(currentIndex + 1);
      } else if (delta < 0 && currentIndex > 0) {
        switchSlide2(currentIndex - 1);
      }
      const atLastSlide = currentIndex === techItems.length - 1;
      const atFirstSlide = currentIndex === 0;
      const noSlideChange = currentIndex === prevIndex;
      if (atLastSlide && delta > 0 && noSlideChange || atFirstSlide && delta < 0 && noSlideChange) {
        disableScrollLock2();
        isScrolling = false;
        return;
      }
      setTimeout(() => {
        isScrolling = false;
      }, 150);
    }, handleGlobalWheel2 = function(e) {
      if (scrollLockEnabled) {
        handleTechScroll2(e.deltaY);
        return;
      }
      const inViewport = isElementInViewport2(techList);
      if (inViewport && !ignoreNextScroll) {
        enableScrollLock2();
        handleTechScroll2(e.deltaY);
        e.preventDefault();
        e.stopPropagation();
      }
    }, handleTouchStart2 = function(e) {
      const inViewport = isElementInViewport2(techList);
      if (inViewport) {
        touchStartY = e.touches[0].clientY;
        isTouchInTechSection = true;
        if (!scrollLockEnabled) {
          enableScrollLock2();
        }
      }
    }, handleTouchMove2 = function(e) {
      if (!isTouchInTechSection || isScrolling) return;
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;
      if (Math.abs(deltaY) > 5) {
        handleTechScroll2(deltaY);
        e.preventDefault();
      }
    }, handleTouchEnd2 = function() {
      isTouchInTechSection = false;
    };
    var switchSlide = switchSlide2, isElementInViewport = isElementInViewport2, preventDefaultScroll = preventDefaultScroll2, enableScrollLock = enableScrollLock2, disableScrollLock = disableScrollLock2, handleTechScroll = handleTechScroll2, handleGlobalWheel = handleGlobalWheel2, handleTouchStart = handleTouchStart2, handleTouchMove = handleTouchMove2, handleTouchEnd = handleTouchEnd2;
    const techList = techWrapper.querySelector(".why__list");
    const techItems = techList.querySelectorAll(".why__item");
    const techCards = techWrapper.querySelectorAll(".why__img");
    let currentIndex = 0;
    let isScrolling = false;
    let scrollLockEnabled = false;
    let ignoreNextScroll = false;
    let isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    techItems.forEach((item, index) => {
      item.addEventListener("click", () => {
        if (!techCards[index]) return;
        switchSlide2(index);
      });
    });
    if (isTouchDevice) return;
    let touchStartY = 0;
    let isTouchInTechSection = false;
    document.addEventListener("wheel", handleGlobalWheel2, { passive: false });
    document.addEventListener("touchstart", handleTouchStart2, { passive: true });
    document.addEventListener("touchmove", handleTouchMove2, { passive: false });
    document.addEventListener("touchend", handleTouchEnd2);
    document.addEventListener("keydown", (e) => {
      const inViewport = isElementInViewport2(techList);
      if (!inViewport) {
        if (scrollLockEnabled) {
          disableScrollLock2();
        }
        return;
      }
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        if (!scrollLockEnabled) {
          enableScrollLock2();
        }
        e.preventDefault();
        handleTechScroll2(e.key === "ArrowDown" ? 1 : -1);
      }
    });
    let scrollCheckTimeout;
    window.addEventListener("scroll", () => {
      clearTimeout(scrollCheckTimeout);
      scrollCheckTimeout = setTimeout(() => {
        const inViewport = isElementInViewport2(techList);
        if (!inViewport && scrollLockEnabled) {
          disableScrollLock2();
        }
      }, 100);
    });
    window.addEventListener("beforeunload", disableScrollLock2);
  }
});
console.log("Приложение запущено!");
