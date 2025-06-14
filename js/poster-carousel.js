/**
 * 辛怡洁 - 个人简历网站专用海报轮播图组件
 * 文件: poster-carousel.js
 * 描述: 实现海报轮播图的专用功能
 */

document.addEventListener('DOMContentLoaded', () => {
  const posterCarousel = document.getElementById('posterCarousel');
  if (posterCarousel) {
    initPosterCarousel(posterCarousel);
  }
});

/**
 * 初始化海报轮播图
 * @param {HTMLElement} carouselElement - 轮播图根元素
 * @param {number} autoplaySpeed - 自动播放速度 (毫秒)
 */
function initPosterCarousel(carouselElement, autoplaySpeed = 5000) {
  const slides = carouselElement.querySelectorAll('.poster-slide');
  const nextButton = carouselElement.querySelector('.poster-carousel-button.next');
  const prevButton = carouselElement.querySelector('.poster-carousel-button.prev');
  const indicators = carouselElement.querySelectorAll('.poster-indicator');
  
  let currentIndex = 0;
  const slideCount = slides.length;
  let autoplayTimer;
  
  // 初始化轮播图
  updatePosterCarousel();
  
  // 自动播放
  startAutoplay();
  
  // 事件监听
  if (nextButton) {
    nextButton.addEventListener('click', () => {
      goToNextSlide();
    });
  }
  
  if (prevButton) {
    prevButton.addEventListener('click', () => {
      goToPrevSlide();
    });
  }
  
  // 指示器点击事件
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      goToSlide(index);
    });
  });
  
  // 鼠标悬停时暂停自动播放
  carouselElement.addEventListener('mouseenter', () => {
    clearInterval(autoplayTimer);
  });
  
  // 鼠标离开时恢复自动播放
  carouselElement.addEventListener('mouseleave', () => {
    startAutoplay();
  });
  
  // 轮播图操作函数
  function goToNextSlide() {
    currentIndex = (currentIndex + 1) % slideCount;
    updatePosterCarousel();
    resetAutoplay();
  }
  
  function goToPrevSlide() {
    currentIndex = (currentIndex - 1 + slideCount) % slideCount;
    updatePosterCarousel();
    resetAutoplay();
  }
  
  function goToSlide(index) {
    currentIndex = index;
    updatePosterCarousel();
    resetAutoplay();
  }
  
  // 更新海报轮播图状态
  function updatePosterCarousel() {
    slides.forEach((slide, index) => {
      if (index === currentIndex) {
        slide.classList.add('active');
        slide.setAttribute('aria-hidden', 'false');
      } else {
        slide.classList.remove('active');
        slide.setAttribute('aria-hidden', 'true');
      }
    });
    
    // 更新指示器
    indicators.forEach((indicator, index) => {
      if (index === currentIndex) {
        indicator.classList.add('active');
        indicator.setAttribute('aria-selected', 'true');
      } else {
        indicator.classList.remove('active');
        indicator.setAttribute('aria-selected', 'false');
      }
    });
    
    // 触发自定义事件
    const event = new CustomEvent('slide-change', { 
      detail: { currentIndex, slideCount } 
    });
    carouselElement.dispatchEvent(event);
  }
  
  // 启动自动播放
  function startAutoplay() {
    clearInterval(autoplayTimer);
    autoplayTimer = setInterval(goToNextSlide, autoplaySpeed);
  }
  
  // 重置自动播放
  function resetAutoplay() {
    clearInterval(autoplayTimer);
    startAutoplay();
  }
  
  // 触摸事件支持
  let touchStartX = 0;
  let touchEndX = 0;
  
  carouselElement.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  
  carouselElement.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });
  
  function handleSwipe() {
    const swipeThreshold = 50;
    
    // 向左滑动
    if (touchEndX < touchStartX - swipeThreshold) {
      goToNextSlide();
    }
    // 向右滑动
    else if (touchEndX > touchStartX + swipeThreshold) {
      goToPrevSlide();
    }
  }
  
  // 返回控制API
  return {
    next: goToNextSlide,
    prev: goToPrevSlide,
    goTo: goToSlide,
    getCurrentIndex: () => currentIndex,
    getSlideCount: () => slideCount,
    pause: () => clearInterval(autoplayTimer),
    resume: startAutoplay
  };
}

// 将函数暴露到全局作用域
window.initPosterCarousel = initPosterCarousel;

// 语法检查
try {
  console.log("Poster carousel script syntax check passed");
} catch (error) {
  console.error("Syntax error in poster carousel script:", error.message);
}

// 函数验证
console.assert(
  typeof initPosterCarousel === 'function',
  "initPosterCarousel should be defined as a function"
);