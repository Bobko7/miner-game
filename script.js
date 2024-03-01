function scrollToTopSmoothly() {
    const scrollDuration = 1700;
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

  const levelTwoContainer = document.querySelector(".level-two");
  const levelTwoLink = document.querySelector(".level-two-link");
  if(localStorage.getItem("levelOneCleared")){
    console.log(levelTwoContainer, levelTwoLink);
    levelTwoContainer.classList.remove("chained-level");
    levelTwoLink.href = 'secondLevel.html';
    levelTwoLink.querySelector(".chains").style.visibility = "hidden";
  }

  const levelThreeContainer = document.querySelector(".level-three");
  const levelThreeLink = document.querySelector(".level-three-link");
  if(localStorage.getItem("levelTwoCleared")){
    levelThreeContainer.classList.remove("chained-level");
    levelThreeLink.href = 'thirdLevel.html';
    levelThreeLink.querySelector(".chains").style.visibility = "hidden";
  }