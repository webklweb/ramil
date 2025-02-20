document.addEventListener("DOMContentLoaded", function () {
  const scrollWrapper = document.querySelector(".scroll-wrapper");
  const scrollContainer = document.querySelector(".scroll-container");
  let animationFrame;
  const scrollSpeed = 0.3;
  let scrollPosition = 0;

  const items = Array.from(scrollContainer.children);
  const itemCount = items.length;

  if (itemCount < 8) {
    while (scrollContainer.children.length < 16) {
      items.forEach((item) => {
        const clone = item.cloneNode(true);
        scrollContainer.appendChild(clone);
      });
    }
  } else {
    items.forEach((item) => {
      const clone = item.cloneNode(true);
      scrollContainer.appendChild(clone);
    });
  }

  scrollContainer.innerHTML += scrollContainer.innerHTML;

  function startAutoScroll() {
    stopAutoScroll();

    function step() {
      scrollPosition += scrollSpeed;
      scrollWrapper.scrollLeft = Math.floor(scrollPosition);

      if (scrollWrapper.scrollLeft >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0;
        scrollWrapper.scrollLeft = 0;
      }

      animationFrame = requestAnimationFrame(step);
    }

    animationFrame = requestAnimationFrame(step);
  }

  function stopAutoScroll() {
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
      animationFrame = null;
    }
  }

  startAutoScroll();



  // Остановка при наведении
  scrollWrapper.addEventListener("mouseenter", stopAutoScroll);
  scrollWrapper.addEventListener("mouseleave", startAutoScroll);

  const targetSection = document.querySelector(".s-main.section_bg");
  const contactSection = document.querySelector(
    ".biaris-contact-section-with-images"
  );

  if (!targetSection || !contactSection) return;

  function toggleContactSection() {
    const targetRect = targetSection.getBoundingClientRect();

    if (targetRect.top <= 0) {
      contactSection.classList.add("active");
    } else {
      contactSection.classList.remove("active");
    }
  }

  window.addEventListener("scroll", toggleContactSection);
  toggleContactSection();
});
