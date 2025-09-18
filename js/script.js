// Основные функции сайта Бюро Виста

// Плавная прокрутка для навигации
document.querySelectorAll('nav a, .btn[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Обновляем URL
            history.pushState(null, null, targetId);
        }
    });
});

// Анимация появления элементов при скролле
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Интерактивные hover-эффекты
function initHoverEffects() {
    const cards = document.querySelectorAll('.direction-card, .specialist-card, .review-card, .pricing-item, .expert-card');
    const buttons = document.querySelectorAll('.btn, .contact-link, .expert-link');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 15px 35px rgba(44, 62, 80, 0.15)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '';
        });
    });
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
        });
    });
}

// Анимация иконок при наведении
function initIconAnimations() {
    const icons = document.querySelectorAll('.card-icon, .contact-icon, .specialist-icon, .expert-icon');
    
    icons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.1)';
        });
        
        icon.addEventListener('mouseleave', () => {
            icon.style.transform = 'scale(1)';
        });
    });
}

// Плавное появление секций
function animateSections() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = `all 0.6s ease ${index * 0.2}s`;
        
        // Добавляем наблюдатель за видимостью
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(section);
    });
}

// Анимация хедера при скролле
function initHeaderScroll() {
    const header = document.querySelector('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.97)';
            header.style.backdropFilter = 'blur(8px)';
            header.style.boxShadow = '0 2px 20px rgba(44, 62, 80, 0.1)';
        } else {
            header.style.background = 'var(--white)';
            header.style.backdropFilter = 'none';
            header.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
}

// Параллакс эффект для героя
function initHeroParallax() {
    const background = document.querySelector('.hero-background-image');
    
    if (background) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            background.style.transform = `translateY(${rate}px) scale(1.05)`;
        });
    }
}

// Инициализация анимаций героя
function initHeroAnimations() {
    const heroText = document.querySelector('.hero-text');
    const heroExperts = document.querySelector('.hero-experts');
    
    if (heroText) {
        setTimeout(() => {
            heroText.style.opacity = '1';
            heroText.style.transform = 'translateY(0)';
        }, 100);
    }
    
    if (heroExperts) {
        setTimeout(() => {
            heroExperts.style.opacity = '1';
            heroExperts.style.transform = 'translateY(0)';
        }, 400);
    }
}

// Анимация для карточек экспертов
function initHeroExperts() {
    const expertCards = document.querySelectorAll('.expert-card');
    
    expertCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.2}s`;
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 800 + (index * 200));
    });
}

// Анимация для кнопки с пульсацией
function initPulseButton() {
    const pulseButton = document.querySelector('.btn.pulse');
    
    if (pulseButton) {
        setInterval(() => {
            pulseButton.style.boxShadow = '0 0 0 0 rgba(255, 123, 0, 0.7)';
            setTimeout(() => {
                pulseButton.style.boxShadow = '0 0 0 10px rgba(255, 123, 0, 0)';
            }, 500);
        }, 2000);
    }
}

// Предзагрузка фонового изображения
function preloadHeroImage() {
    const bgImage = new Image();
    bgImage.src = 'images/experts-background.jpg';
    bgImage.onload = function() {
        const heroBg = document.querySelector('.hero-background-image');
        if (heroBg) {
            heroBg.style.opacity = '1';
            heroBg.style.filter = 'brightness(0.7) contrast(1.1)';
        }
    };
    
    bgImage.onerror = function() {
        console.warn('Фоновое изображение не найдено, используется градиентный фон');
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.background = 'linear-gradient(135deg, var(--dark-gray), var(--primary-orange))';
        }
    };
}

// Проверка контрастности текста
function checkTextContrast() {
    const heroText = document.querySelector('.hero-text');
    if (heroText) {
        const textElements = heroText.querySelectorAll('h1, p');
        textElements.forEach(el => {
            el.style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.7)';
        });
    }
}

// Анимация плавающих элементов
function animateFloatingElements() {
    const elements = document.querySelectorAll('.floating-element');
    
    elements.forEach((element, index) => {
        const delay = index * 0.5;
        element.style.animationDelay = `${delay}s`;
        element.style.opacity = '1';
    });
}

// Инициализация всех функций
function initAll() {
    console.log('🚀 Бюро Виста - Инициализация сайта');
    
    // Добавляем классы для анимации
    document.querySelectorAll('.direction-card, .specialist-card, .review-card, .pricing-item').forEach(el => {
        el.classList.add('animate-on-scroll');
    });
    
    // Инициализируем функции
    animateOnScroll();
    initHoverEffects();
    initIconAnimations();
    animateSections();
    initHeaderScroll();
    initHeroParallax();
    initHeroAnimations();
    initHeroExperts();
    initPulseButton();
    preloadHeroImage();
    checkTextContrast();
    animateFloatingElements();
    
    // Обновляем год в футере
    const footerText = document.querySelector('footer p');
    if (footerText) {
        footerText.textContent = `© ${new Date().getFullYear()} Бюро "Виста". Все права защищены.`;
    }
}

// Обработчики событий
document.addEventListener('DOMContentLoaded', initAll);
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', checkTextContrast);

// Параллакс для фоновых элементов
function updateParallax() {
    const shapes = document.querySelectorAll('.shape');
    const scrollY = window.scrollY;
    
    shapes.forEach((shape, index) => {
        const speed = 0.1 + (index * 0.05);
        const yPos = -(scrollY * speed);
        shape.style.transform = `translateY(${yPos}px) rotate(${scrollY * 0.05}deg)`;
    });
}

window.addEventListener('scroll', updateParallax);

// Fallback для старых браузеров
if (!('IntersectionObserver' in window)) {
    console.warn('IntersectionObserver не поддерживается');
    
    // Простая анимация для старых браузеров
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    });
}

// Помощь для пользователей с reduced-motion
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('*').forEach(el => {
        el.style.animation = 'none !important';
        el.style.transition = 'none !important';
    });
}

// Глобальные функции для использования в консоли
window.BuroVista = {
    refreshAnimations: function() {
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            el.classList.remove('visible');
        });
        setTimeout(animateOnScroll, 100);
    },
    initHero: function() {
        initHeroAnimations();
        initHeroParallax();
        initHeroExperts();
    }
};

console.log('🌈 Бюро Виста - Скрипт загружен успешно!');