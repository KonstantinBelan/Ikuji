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
new Swiper(".shop__wrapper", {
  speed: 400,
  spaceBetween: 20,
  slidesPerView: 2,
  // loop: true,
  // centeredSlides: true,
  navigation: {
    nextEl: ".shop__arrow--next",
    prevEl: ".shop__arrow--prev"
  },
  scrollbar: {
    el: ".swiper-scrollbar",
    draggable: true
    // dragSize: 20,
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 14
    },
    480: {
      slidesPerView: 1,
      spaceBetween: 14
    },
    640: {
      slidesPerView: 2,
      spaceBetween: 20
    }
  }
});
console.log("Приложение запущено!");
