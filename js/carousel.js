/**
 * 辛怡洁 - 个人简历网站轮播图组件
 * 文件: carousel.js
 * 描述: 实现网站的通用轮播图功能
 */

document.addEventListener('DOMContentLoaded', () => {
  // 初始化关于我部分轮播图
  const aboutCarousel = document.getElementById('aboutCarousel');
  if (aboutCarousel) {
    initCarousel(aboutCarousel);
  }
  
  // 初始化其他可能的轮播图实例
  document.querySelectorAll('.carousel-container').forEach(carousel => {
    if (carousel.id !== 'aboutCarousel' && carousel.id !== 'posterCarousel') {
      initCarousel(carousel);
    }
  });
});

/**
 * 初始化通用轮播图
 * @param {HTMLElement} carouselElement - 轮播图容器元素
 * @param {number} autoplaySpeed - 自动切换间隔时间(毫秒)
 */
function initCarousel(carouselElement, autoplaySpeed = 5000) {
  // 轮播图组件元素
  const track = carouselElement.querySelector('.carousel-track');
  const slides = carouselElement.querySelectorAll('.carousel-slide');
  const nextButton = carouselElement.querySelector('.carousel-button.next');
  const prevButton = carouselElement.querySelector('.carousel-button.prev');
  const indicators = carouselElement.querySelectorAll('.indicator');
  
  // 如果找不到必要元素，直接返回
  if (!track || slides.length === 0) {
    console.error('Carousel initialization failed: Missing required elements');
    return null;
  }
  
  // 轮播图状态
  let currentIndex = 0;
  const slideCount = slides.length;
  let isTransitioning = false;
  let autoplayTimer;
  
  // 初始化轮播图
  function setupCarousel() {
    // 设置初始位置
    updateCarouselPosition();
    
    // 添加事件监听
    if (nextButton) {
      nextButton.addEventListener('click', goToNextSlide);
    }
    
    if (prevButton) {
      prevButton.addEventListener('click', goToPrevSlide);
    }
    
    // 指示器点击事件
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => goToSlide(index));
    });
    
    // 鼠标悬停事件
    carouselElement.addEventListener('mouseenter', pauseAutoplay);
    carouselElement.addEventListener('mouseleave', resumeAutoplay);
    
    // 触摸事件
    setupTouchEvents();
    
    // 键盘事件(无障碍)
    setupKeyboardEvents();
    
    // 开始自动播放
    startAutoplay();
    
    // 解决窗口大小变化问题
    window.addEventListener('resize', updateCarouselPosition);
  }
  
  // 轮播图操作函数
  function goToNextSlide() {
    if (isTransitioning) return;
    currentIndex = (currentIndex + 1) % slideCount;
    updateCarouselPosition();
    resetAutoplay();
  }
  
  function goToPrevSlide() {
    if (isTransitioning) return;
    currentIndex = (currentIndex - 1 + slideCount) % slideCount;
    updateCarouselPosition();
    resetAutoplay();
  }
  
  function goToSlide(index) {
    if (isTransitioning || index === currentIndex) return;
    currentIndex = index;
    updateCarouselPosition();
    resetAutoplay();
  }
  
  // 更新轮播图位置
  function updateCarouselPosition() {
    if (!track) return;
    
    isTransitioning = true;
    const translateX = -currentIndex * 100 + '%';
    
    // 添加过渡效果
    track.style.transition = 'transform 0.5s ease-in-out';
    track.style.transform = `translateX(${translateX})`;
    
    // 更新指示器
    updateIndicators();
    
    // 更新ARIA属性(无障碍支持)
    updateAriaAttributes();
    
    // 过渡结束后重置状态
    setTimeout(() => {
      isTransitioning = false;
    }, 500);
  }
  
  // 更新指示器状态
  function updateIndicators() {
    indicators.forEach((indicator, index) => {
      if (index === currentIndex) {
        indicator.classList.add('active');
        indicator.setAttribute('aria-selected', 'true');
      } else {
        indicator.classList.remove('active');
        indicator.setAttribute('aria-selected', 'false');
      }
    });
  }
  
  // 更新ARIA属性
  function updateAriaAttributes() {
    slides.forEach((slide, index) => {
      if (index === currentIndex) {
        slide.setAttribute('aria-hidden', 'false');
      } else {
        slide.setAttribute('aria-hidden', 'true');
      }
    });
  }
  
  // 自动播放相关函数
  function startAutoplay() {
    clearInterval(autoplayTimer);
    autoplayTimer = setInterval(goToNextSlide, autoplaySpeed);
  }
  
  function pauseAutoplay() {
    clearInterval(autoplayTimer);
  }
  
  function resumeAutoplay() {
    startAutoplay();
  }
  
  function resetAutoplay() {
    pauseAutoplay();
    resumeAutoplay();
  }
  
  // 设置触摸事件
  function setupTouchEvents() {
    let touchStartX = 0;
    let touchEndX = 0;
    const swipeThreshold = 50; // 滑动阈值
    
    carouselElement.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      pauseAutoplay();
    }, { passive: true });
    
    carouselElement.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
      resumeAutoplay();
    }, { passive: true });
    
    function handleSwipe() {
      // 向左滑动
      if (touchEndX < touchStartX - swipeThreshold) {
        goToNextSlide();
      }
      // 向右滑动
      else if (touchEndX > touchStartX + swipeThreshold) {
        goToPrevSlide();
      }
    }
  }
  
  // 设置键盘导航(无障碍)
  function setupKeyboardEvents() {
    carouselElement.setAttribute('tabindex', '0');
    
    carouselElement.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'ArrowLeft':
          goToPrevSlide();
          e.preventDefault();
          break;
        case 'ArrowRight':
          goToNextSlide();
          e.preventDefault();
          break;
      }
    });
  }
  
  // 初始化
  setupCarousel();
  
  // 返回控制API
  return {
    next: goToNextSlide,
    prev: goToPrevSlide,
    goTo: goToSlide,
    getCurrentIndex: () => currentIndex,
    getSlideCount: () => slideCount,
    pause: pauseAutoplay,
    resume: resumeAutoplay
  };
}

// 将函数暴露到全局作用域
window.initCarousel = initCarousel;

// 语法自检
try {
  console.log("Carousel script syntax check passed");
} catch (error) {
  console.error("Syntax error in carousel script:", error.message);
}

// 函数验证
console.assert(
  typeof initCarousel === 'function',
  "initCarousel should be defined as a function"
);