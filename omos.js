// Java på fade-in/slide-in billeder og tekst 
const header = document.querySelector("header");
const intruduktion = document.querySelector(".intruduktion");

const optoning = document.querySelectorAll(".fade-in");
const skridning = document.querySelectorAll(".slide-in");

const sektionEt = {
  rootMargin: "-200px 0px 0px 0px"
};

const sektionEtTydelig = new IntersectionObserver(function (
    indgang
  ) {
    indgang.forEach(adgang => {
      if (!adgang.isIntersecting) {
        header.classList.add("nav-scrolled");
      } else {
        header.classList.remove("nav-scrolled");
      }
    });
  },
  sektionEt);

  sektionEtTydelig.observe(intruduktion);

const visesFrem = {
  threshold: 0,
  rootMargin: "0px 0px -250px 0px"
};

const hvisVedScroll = new IntersectionObserver(function (
    indgang,
    hvisVedScroll
  ) {
    indgang.forEach(adgang => {
      if (!adgang.isIntersecting) {
        return;
      } else {
        adgang.target.classList.add("appear");
        hvisVedScroll.unobserve(adgang.target);
      }
    });
  },
  visesFrem);

  optoning.forEach(fader => {
    hvisVedScroll.observe(fader);
});

skridning.forEach(slider => {
  hvisVedScroll.observe(slider);
});



// Java på kunde citater i bunden 
var sideIndikator = 1;
visSlides(sideIndikator);

function plusSlides(n) {
  visSlides(sideIndikator += n);
}

function nuværendeSlide(n) {
  visSlides(sideIndikator = n);
}

function visSlides(n) {
  var i;
  var slides = document.getElementsByClassName("citater");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    sideIndikator = 1
  }
  if (n < 1) {
    sideIndikator = slides.length
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[sideIndikator - 1].style.display = "block";
  dots[sideIndikator - 1].className += " active";
}