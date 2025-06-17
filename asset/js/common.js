/* ========================================
   共通JavaScript - MSG株式会社
   ======================================== */

// DOM読み込み完了時の処理
document.addEventListener('DOMContentLoaded', function() {
  // スムーススクロール
  initSmoothScroll();
  
  // ナビゲーションの処理
  initNavigation();
  
  // スクロールアニメーション
  initScrollAnimations();
  
  // フォームの処理
  initFormHandling();
});

/**
 * スムーススクロールの初期化
 */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;
      
      const headerOffset = 80;
      const elementPosition = targetElement.offsetTop;
      const offsetPosition = elementPosition - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // モバイルメニューを閉じる
      const navbarToggler = document.querySelector('.navbar-toggler');
      const navbarCollapse = document.querySelector('.navbar-collapse');
      if (navbarToggler && navbarCollapse.classList.contains('show')) {
        navbarToggler.click();
      }
    });
  });
}

/**
 * ナビゲーションの処理
 */
function initNavigation() {
  const navbar = document.querySelector('header');
  let lastScrollTop = 0;
  
  // スクロール時のヘッダー処理
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // スクロール方向の判定
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // 下にスクロール
      navbar.style.transform = 'translateY(-100%)';
    } else {
      // 上にスクロール
      navbar.style.transform = 'translateY(0)';
    }
    
    // 背景の透明度調整
    if (scrollTop > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    lastScrollTop = scrollTop;
  });
  
  // アクティブリンクのハイライト
  const sections = document.querySelectorAll('section[id], div[id]');
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  
  window.addEventListener('scroll', function() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      
      if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });
}

/**
 * スクロールアニメーションの初期化
 */
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // アニメーション対象要素を監視
  const animatedElements = document.querySelectorAll('.fade-in');
  animatedElements.forEach(element => {
    observer.observe(element);
  });
}

/**
 * フォーム処理の初期化
 */
function initFormHandling() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      // バリデーション
      const requiredFields = form.querySelectorAll('[required]');
      let isValid = true;
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add('is-invalid');
        } else {
          field.classList.remove('is-invalid');
        }
      });
      
      if (!isValid) {
        e.preventDefault();
        return false;
      }
    });
  });
  
  // リアルタイムバリデーション
  const inputs = document.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('blur', function() {
      if (this.hasAttribute('required') && !this.value.trim()) {
        this.classList.add('is-invalid');
      } else {
        this.classList.remove('is-invalid');
      }
    });
  });
}

/**
 * ユーティリティ関数
 */
const Utils = {
  // デバウンス関数
  debounce: function(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },
  
  // スロットル関数
  throttle: function(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
};

// グローバルに公開
window.Utils = Utils;