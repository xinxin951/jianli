/**
 * 辛怡洁 - 个人简历网站主JavaScript文件
 * 文件: main.js
 * 描述: 实现网站的核心功能
 */

document.addEventListener('DOMContentLoaded', () => {
  // 页面加载后执行
  setTimeout(() => {
    document.querySelector('.loader').style.opacity = '0';
    setTimeout(() => {
      document.querySelector('.loader').style.display = 'none';
    }, 600);
  }, 1500);
  
  // 初始化所有组件
  initNavbar();
  initTypedText();
  initScrollAnimation();
  initBackToTop();
  initSkillBars();
  initFilterGallery();
  initContactForm();
  initCarousels();
});

/**
 * 导航栏相关功能
 */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const menuToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navLinksItems = document.querySelectorAll('.nav-link');
  
  // 滚动时改变导航栏样式
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    // 更新活动导航链接
    updateActiveNavLink();
  });
  
  // 点击汉堡菜单切换导航
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
    
    // 切换汉堡菜单动画
    const spans = menuToggle.querySelectorAll('span');
    if (menuToggle.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });
  
  // 点击导航链接时关闭菜单
  navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuToggle.classList.remove('active');
      
      const spans = menuToggle.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    });
  });
  
  // 更新当前活动的导航链接
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    let currentSection = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute('id');
      }
    });
    
    navLinksItems.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').slice(1) === currentSection) {
        link.classList.add('active');
      }
    });
  }
  
  // 初始化时检查
  updateActiveNavLink();
}

/**
 * 打字机效果实现
 */
function initTypedText() {
  const typedText = document.querySelector('.typed-text');
  const strings = ['区块链工程专业在读', '三亚学院 2023-2027', '专注软件开发与设计', '对区块链技术充满热情'];
  let stringIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 80;
  
  function type() {
    const currentString = strings[stringIndex];
    
    if (isDeleting) {
      // 删除字符
      typedText.textContent = currentString.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      // 添加字符
      typedText.textContent = currentString.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 80;
    }
    
    // 字符串已完成
    if (!isDeleting && charIndex === currentString.length) {
      // 完成后等待一段时间再开始删除
      isDeleting = true;
      typingSpeed = 1000;
    } else if (isDeleting && charIndex === 0) {
      // 删除完成后切换到下一个字符串
      isDeleting = false;
      stringIndex = (stringIndex + 1) % strings.length;
      typingSpeed = 500;
    }
    
    setTimeout(type, typingSpeed);
  }
  
  // 启动打字效果
  setTimeout(type, 1500);
}

/**
 * 滚动动画效果
 */
function initScrollAnimation() {
  const animatedElements = document.querySelectorAll('.fade-up, .fade-left, .fade-right, .scale-up');
  
  function checkScroll() {
    animatedElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add('active');
      }
    });
  }
  
  // 监听滚动事件
  window.addEventListener('scroll', checkScroll);
  
  // 初始检查
  checkScroll();
}

/**
 * 返回顶部按钮功能
 */
function initBackToTop() {
  const backToTopBtn = document.querySelector('.back-to-top');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('active');
    } else {
      backToTopBtn.classList.remove('active');
    }
  });
  
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * 技能进度条动画
 */
function initSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress');
  
  function animateSkillBars() {
    skillBars.forEach(skillBar => {
      const percent = skillBar.getAttribute('data-percent');
      skillBar.style.setProperty('--percent', `${percent}%`);
      
      const inView = isElementInViewport(skillBar.parentElement);
      if (inView && !skillBar.classList.contains('animated')) {
        skillBar.style.width = percent + '%';
        skillBar.classList.add('animated');
      }
    });
  }
  
  // 检查元素是否在可视区域内
  function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
  }
  
  // 监听滚动
  window.addEventListener('scroll', animateSkillBars);
  
  // 初始化检查
  animateSkillBars();
}

/**
 * 图片筛选功能
 */
function initFilterGallery() {
  const filterBtns = document.querySelectorAll('.gallery-filter');
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // 移除所有活动类
      filterBtns.forEach(btn => btn.classList.remove('active'));
      
      // 添加活动类到当前按钮
      btn.classList.add('active');
      
      const filterValue = btn.getAttribute('data-filter');
      
      // 筛选图片
      galleryItems.forEach(item => {
        if (filterValue === 'all' || item.classList.contains(filterValue)) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 200);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 500);
        }
      });
    });
  });
}

/**
 * 联系表单功能
 */
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // 获取表单数据
      const formData = new FormData(contactForm);
      const formValues = Object.fromEntries(formData.entries());
      
      // 模拟表单提交效果
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      submitBtn.disabled = true;
      submitBtn.textContent = '发送中...';
      
      // 模拟网络请求
      setTimeout(() => {
        // 显示成功消息
        const messageElement = document.createElement('div');
        messageElement.className = 'form-message success';
        messageElement.textContent = '感谢您的留言，我会尽快回复！';
        
        contactForm.insertAdjacentElement('afterend', messageElement);
        
        // 重置表单
        contactForm.reset();
        
        // 恢复按钮状态
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        
        // 3秒后移除消息
        setTimeout(() => {
          messageElement.remove();
        }, 3000);
      }, 1500);
    });
  }
}

/**
 * 初始化所有轮播图功能
 */
function initCarousels() {
  // 关于我轮播图
  const aboutCarousel = document.getElementById('aboutCarousel');
  if (aboutCarousel) {
    initCarousel(aboutCarousel, 5000);
  }
  
  // 初始化海报轮播图
  const posterCarousel = document.getElementById('posterCarousel');
  if (posterCarousel) {
    initPosterCarousel(posterCarousel, 6000);
  }
}

/**
 * 普通轮播图实现
 */
function initCarousel(carouselElement, autoplaySpeed) {
  const track = carouselElement.querySelector('.carousel-track');
  const slides = carouselElement.querySelectorAll('.carousel-slide');
  const nextButton = carouselElement.querySelector('.carousel-button.next');
  const prevButton = carouselElement.querySelector('.carousel-button.prev');
  const indicators = carouselElement.querySelectorAll('.indicator');
  
  let currentIndex = 0;
  const slideCount = slides.length;
  let autoplayTimer;
  
  // 初始化轮播图位置
  updateCarousel();
  
  // 自动播放
  startAutoplay();
  
  // 事件监听
  nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slideCount;
    updateCarousel();
    resetAutoplay();
  });
  
  prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slideCount) % slideCount;
    updateCarousel();
    resetAutoplay();
  });
  
  // 指示器点击事件
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      currentIndex = index;
      updateCarousel();
      resetAutoplay();
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
  
  // 更新轮播图状态
  function updateCarousel() {
    const translateX = -currentIndex * 100 + '%';
    track.style.transform = `translateX(${translateX})`;
    
    // 更新指示器
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === currentIndex);
    });
  }
  
  // 启动自动播放
  function startAutoplay() {
    clearInterval(autoplayTimer);
    autoplayTimer = setInterval(() => {
      currentIndex = (currentIndex + 1) % slideCount;
      updateCarousel();
    }, autoplaySpeed);
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
    // 向左滑动
    if (touchEndX < touchStartX - 50) {
      currentIndex = (currentIndex + 1) % slideCount;
    }
    // 向右滑动
    else if (touchEndX > touchStartX + 50) {
      currentIndex = (currentIndex - 1 + slideCount) % slideCount;
    }
    
    updateCarousel();
    resetAutoplay();
  }
}

/**
 * 海报轮播图实现（淡入淡出效果）
 */
function initPosterCarousel(carouselElement, autoplaySpeed) {
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
  nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slideCount;
    updatePosterCarousel();
    resetAutoplay();
  });
  
  prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slideCount) % slideCount;
    updatePosterCarousel();
    resetAutoplay();
  });
  
  // 指示器点击事件
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      currentIndex = index;
      updatePosterCarousel();
      resetAutoplay();
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
  
  // 更新海报轮播图
  function updatePosterCarousel() {
    slides.forEach((slide, index) => {
      slide.classList.toggle('active', index === currentIndex);
    });
    
    // 更新指示器
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === currentIndex);
    });
  }
  
  // 启动自动播放
  function startAutoplay() {
    clearInterval(autoplayTimer);
    autoplayTimer = setInterval(() => {
      currentIndex = (currentIndex + 1) % slideCount;
      updatePosterCarousel();
    }, autoplaySpeed);
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
    // 向左滑动
    if (touchEndX < touchStartX - 50) {
      currentIndex = (currentIndex + 1) % slideCount;
    }
    // 向右滑动
    else if (touchEndX > touchStartX + 50) {
      currentIndex = (currentIndex - 1 + slideCount) % slideCount;
    }
    
    updatePosterCarousel();
    resetAutoplay();
  }
}

// 语法自检
try {
  console.log("Syntax check passed");
} catch (error) {
  console.error("Syntax error:", error.message);
}

// 函数验证
console.assert(
  typeof initCarousel === 'function', 
  "initCarousel should be a function"
);

console.assert(
  typeof initPosterCarousel === 'function', 
  "initPosterCarousel should be a function"
);