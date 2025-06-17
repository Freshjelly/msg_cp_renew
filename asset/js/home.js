/* ========================================
   トップページ専用JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
  // ヒーローセクションのパララックス効果
  initParallax();
  
  // サービスカードのアニメーション
  initServiceCards();
  
  // カウントアップアニメーション
  initCountUp();
  
  // タイプライターエフェクト
  initTypewriter();
});

/**
 * パララックス効果の初期化
 */
function initParallax() {
  const hero = document.querySelector('.jumbotron');
  if (!hero) return;
  
  window.addEventListener('scroll', Utils.throttle(function() {
    const scrolled = window.pageYOffset;
    const speed = 0.5;
    
    hero.style.transform = `translateY(${scrolled * speed}px)`;
  }, 16));
}

/**
 * サービスカードのアニメーション
 */
function initServiceCards() {
  const cards = document.querySelectorAll('.service-card');
  
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
      card.style.transition = 'all 0.6s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 200 * (index + 1));
  });
}

/**
 * 数値のカウントアップアニメーション
 */
function initCountUp() {
  const counters = document.querySelectorAll('.counter');
  
  const countUp = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2秒
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
      current += increment;
      if (current < target) {
        element.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target;
      }
    };
    
    updateCounter();
  };
  
  // Intersection Observerで表示時にアニメーション開始
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        countUp(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(counter => {
    observer.observe(counter);
  });
}

/**
 * タイプライターエフェクト
 */
function initTypewriter() {
  const typewriterElement = document.querySelector('.typewriter');
  if (!typewriterElement) return;
  
  const text = typewriterElement.getAttribute('data-text');
  const speed = 100; // ミリ秒
  let index = 0;
  
  typewriterElement.textContent = '';
  
  const type = () => {
    if (index < text.length) {
      typewriterElement.textContent += text.charAt(index);
      index++;
      setTimeout(type, speed);
    }
  };
  
  // 要素が表示されたらアニメーション開始
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        type();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  observer.observe(typewriterElement);
}

/**
 * 背景画像の動的変更
 */
function initDynamicBackground() {
  const backgrounds = [
    'asset/img/bg1.png',
    'asset/img/bg2.png',
    'asset/img/bg3.jpg'
  ];
  
  let currentIndex = 0;
  const hero = document.querySelector('.jumbotron');
  
  setInterval(() => {
    currentIndex = (currentIndex + 1) % backgrounds.length;
    hero.style.backgroundImage = `url(${backgrounds[currentIndex]})`;
  }, 5000);
}