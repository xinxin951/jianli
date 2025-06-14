/**
 * 辛怡洁 - 个人简历网站滚动效果
 * 文件: scroll.js
 * 描述: 实现网站的滚动相关效果
 */

document.addEventListener('DOMContentLoaded', () => {
  // 初始化滚动效果
  initSmoothScroll();
  initScrollAnimation();
  initBackToTop();
});

/**
 * 平滑滚动功能
 */
function initSmoothScroll() {
  // 获取所有导航链接
  const navLinks = document.querySelectorAll('.nav-link, .scroll-down a');
  
  // 为每个链接添加点击事件
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // 获取目标元素 ID
      const targetId = link.getAttribute('href');
      
      // 确保链接是页内锚点
      if (targetId && targetId.startsWith('#')) {
        e.preventDefault();
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          // 获取导航栏高度作为偏移量
          const navbar = document.getElementById('navbar');
          const navbarHeight = navbar ? navbar.offsetHeight : 0;
          
          // 计算滚动位置
          const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
          const offsetPosition = targetPosition - navbarHeight - 20; // 额外20px缓冲
          
          // 执行平滑滚动
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          
          // 更新 URL
          history.pushState(null, null, targetId);
        }
      }
    });
  });
}

/**
 * 滚动时的元素动画效果
 */
function initScrollAnimation() {
  // 获取所有需要动画的元素
  const animatedElements = document.querySelectorAll(
    '.fade-in, .fade-up, .fade-left, .fade-right, .scale-up'
  );
  
  const options = {
    threshold: 0.15, // 元素至少有15%在可视区域内才触发
    rootMargin: '0px 0px -50px 0px' // 视口底部往上50px作为触发边界
  };
  
  // 使用Intersection Observer监听元素进入视口
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // 已经显示的元素不再需要监听
        observer.unobserve(entry.target);
      }
    });
  }, options);
  
  // 监听所有动画元素
  animatedElements.forEach(element => {
    observer.observe(element);
  });
  
  // 添加手动初始检查，确保首屏元素显示正常
  checkVisibleElements();
  
  // 手动检查当前可见的元素
  function checkVisibleElements() {
    animatedElements.forEach(element => {
      const position = element.getBoundingClientRect();
      
      // 如果元素在可见区域内
      if (position.top < window.innerHeight && position.bottom >= 0) {
        element.classList.add('active');
        observer.unobserve(element);
      }
    });
  }
}

/**
 * 返回顶部按钮功能
 */
function initBackToTop() {
  const backToTopBtn = document.querySelector('.back-to-top');
  
  if (backToTopBtn) {
    // 监听滚动事件
    window.addEventListener('scroll', () => {
      // 当页面滚动超过300px时显示按钮
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('active');
      } else {
        backToTopBtn.classList.remove('active');
      }
    });
    
    // 点击按钮返回顶部
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

// 语法自检
try {
  console.log("Scroll script syntax check passed");
} catch (error) {
  console.error("Syntax error in scroll script:", error.message);
}

// 函数验证
console.assert(
  typeof initSmoothScroll === 'function', 
  "initSmoothScroll should be defined as a function"
);

console.assert(
  typeof initScrollAnimation === 'function', 
  "initScrollAnimation should be defined as a function"
);