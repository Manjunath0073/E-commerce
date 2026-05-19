// =========================
// MOBILE MENU
// =========================

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {

  navLinks.classList.toggle("active");

});

// =========================
// NAVBAR SCROLL EFFECT
// =========================

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

  if(window.scrollY > 50){

    navbar.classList.add("scrolled");

  }else{

    navbar.classList.remove("scrolled");

  }

});


// =========================
// PREMIUM HERO COUNTER
// =========================

const counters = document.querySelectorAll(".counter");
const statBoxes = document.querySelectorAll(".stat-box");

let counterStarted = false;

function animateCounter(counter, target, duration = 2000){

  let start = 0;

  const isDecimal = target % 1 !== 0;

  const startTime = performance.now();

  function update(currentTime){

    const elapsed = currentTime - startTime;

    const progress = Math.min(elapsed / duration, 1);

    // Ease Out Cubic

    const easeOut = 1 - Math.pow(1 - progress, 3);

    const value = start + (target - start) * easeOut;

    counter.innerText = isDecimal
      ? value.toFixed(1)
      : Math.floor(value).toLocaleString();

    if(progress < 1){

      requestAnimationFrame(update);

    }else{

      counter.innerText = isDecimal
        ? target.toFixed(1)
        : target.toLocaleString();

      // Final Glow Pop

      counter.classList.add("counter-pop");

      setTimeout(() => {
        counter.classList.remove("counter-pop");
      }, 500);

    }

  }

  requestAnimationFrame(update);

}

function startCounters(){

  if(counterStarted) return;

  counters.forEach((counter, index) => {

    const target = parseFloat(
      counter.getAttribute("data-target")
    );

    // Stagger Animation

    setTimeout(() => {

      animateCounter(counter, target);

      // Activate Card Animation

      statBoxes[index].classList.add("active-stat");

    }, index * 300);

  });

  counterStarted = true;

}

// =========================
// INTERSECTION OBSERVER
// =========================

const statsSection = document.querySelector(".hero-stats");

const observer = new IntersectionObserver((entries) => {

  entries.forEach(entry => {

    if(entry.isIntersecting){

      startCounters();

    }

  });

}, {
  threshold: 0.4
});

observer.observe(statsSection);