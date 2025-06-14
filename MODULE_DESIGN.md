# 个人简历网页模块设计

## 整体结构

### HTML结构
```
index.html
├── 加载动画 (.loader)
├── 背景效果 (.background-overlay)
├── 导航栏 (nav.navbar)
├── 首页部分 (section#home)
├── 关于我部分 (section#about)
├── 教育背景部分 (section#education)
├── 专业技能部分 (section#skills)
├── 项目经验部分 (section#experience)
├── 海报展示部分 (section#posters) - 轮播功能
├── 荣誉证书部分 (section#certificates)
├── 个人展示部分 (section#gallery)
├── 联系方式部分 (section#contact)
└── 返回顶部按钮 (.back-to-top)
```

### CSS结构
```
/css
├── style.css      - 主要样式
├── animations.css - 动画效果
└── responsive.css - 响应式设计
```

### JavaScript结构
```
/js
├── main.js          - 主要功能和事件处理
├── carousel.js      - 轮播图功能
├── poster-carousel.js - 海报轮播功能
└── scroll.js        - 滚动效果
```

## 模块接口设计

### 1. 导航模块
- 方法:
  - `toggleMobileNav()`: void - 切换移动导航菜单
  - `setActiveNavItem(section: string)`: void - 设置当前活动导航项
  - `handleScroll()`: void - 处理滚动事件，更新导航状态

### 2. 轮播模块
- 方法:
  - `initCarousel(id: string)`: void - 初始化轮播组件
  - `slideNext(id: string)`: void - 切换到下一张
  - `slidePrev(id: string)`: void - 切换到上一张
  - `slideTo(id: string, index: number)`: void - 切换到指定索引
  - `autoSlide(id: string)`: void - 自动轮播

### 3. 海报轮播模块
- 方法:
  - `initPosterCarousel()`: void - 初始化海报轮播
  - `rotatePoster(direction: string)`: void - 旋转海报（方向: 'next' | 'prev'）
  - `goToPoster(index: number)`: void - 跳转到指定海报
  - `startAutoRotation()`: void - 开始自动轮播
  - `stopAutoRotation()`: void - 停止自动轮播

### 4. 滚动效果模块
- 方法:
  - `initScrollEffects()`: void - 初始化滚动效果
  - `animateOnScroll()`: void - 滚动时触发动画
  - `scrollToSection(sectionId: string)`: void - 滚动到指定部分

### 5. 加载动画模块
- 方法:
  - `showLoader()`: void - 显示加载动画
  - `hideLoader()`: void - 隐藏加载动画

### 6. 技能展示模块
- 方法:
  - `initSkillBars()`: void - 初始化技能条
  - `animateSkillBars()`: void - 动画显示技能条

### 7. 返回顶部模块
- 方法:
  - `showBackToTop()`: void - 显示返回顶部按钮
  - `hideBackToTop()`: void - 隐藏返回顶部按钮
  - `scrollToTop()`: void - 滚动到页面顶部

## 数据结构

### 1. 导航项
```javascript
const navItems = [
  { id: 'home', label: '首页' },
  { id: 'about', label: '关于我' },
  // ...更多导航项
];
```

### 2. 轮播图片
```javascript
const carouselImages = {
  about: [
    { src: 'images/personal/avatar.jpg', alt: '个人照片1' },
    { src: 'images/personal/city_view.jpg', alt: '个人照片2' },
    // ...更多图片
  ],
  // ...更多轮播
};
```

### 3. 海报图片
```javascript
const posterImages = [
  { src: 'images/posters/poster1.jpg', alt: '海报1', title: '海报标题1' },
  { src: 'images/posters/poster2.jpg', alt: '海报2', title: '海报标题2' },
  // ...更多海报
];
```

## 响应式设计断点
- 移动设备: 0 - 767px
- 平板设备: 768px - 1023px
- 桌面设备: 1024px 及以上