function scrollToTopSmoothly() {
    const scrollDuration = 2500; // 4 seconds
    const startTime = performance.now();

    function scroll() {
      const currentTime = performance.now();
      const elapsed = currentTime - startTime;

      const scrollPosition = Math.easeInOutQuad(elapsed, document.body.scrollHeight, -document.body.scrollHeight, scrollDuration);
      window.scrollTo(0, scrollPosition);

      if (elapsed < scrollDuration) {
        requestAnimationFrame(scroll);
      }
    }

    // Scroll to the bottom initially
    window.scrollTo(0, document.body.scrollHeight);

    // Start the smooth scroll immediately after scrolling to the bottom using requestAnimationFrame
    requestAnimationFrame(scroll);
  }

  // Easing function for smooth scrolling
  Math.easeInOutQuad = function(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  };

  // Call the scrollToTopSmoothly function when the page finishes loading
  window.onload = function() {
    scrollToTopSmoothly();
  };