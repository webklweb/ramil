document.addEventListener("DOMContentLoaded", function () {
  const scrollWrapper = document.querySelector(".scroll-wrapper");
  const scrollContainer = document.querySelector(".scroll-container");
  let animationFrame;
  const scrollSpeed = 1;

  // Дублируем контент для бесконечной прокрутки
  scrollContainer.innerHTML += scrollContainer.innerHTML;

  // Функция автоматической прокрутки
  function startAutoScroll() {
    stopAutoScroll();

    let lastScrollTime = 0;

    function step(timestamp) {
      if (lastScrollTime === 0) lastScrollTime = timestamp;
      const deltaTime = timestamp - lastScrollTime;

      if (deltaTime > 16) {
        // Устанавливаем минимальный интервал (для 60fps)
        scrollWrapper.scrollLeft += scrollSpeed; // Применяем скорость прокрутки
        lastScrollTime = timestamp;
      }

      if (scrollWrapper.scrollLeft >= scrollContainer.scrollWidth / 2) {
        scrollWrapper.scrollLeft =
          scrollWrapper.scrollLeft % (scrollContainer.scrollWidth / 2);
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
