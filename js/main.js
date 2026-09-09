// ============================================
// 1. АНИМАЦИИ ПРИ СКРОЛЛЕ (Intersection Observer)
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .fade-in-scale');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animateElements.forEach(el => observer.observe(el));
});

// ============================================
// 2. КАЛЬКУЛЯТОР
// ============================================
const range = document.getElementById('calcRange');
const valueInput = document.getElementById('calcValue');
const resultSpan = document.getElementById('calcResult');

function updateCalc() {
    const area = parseInt(valueInput.value) || 84;
    const aptType = parseFloat(document.querySelector('input[name="aptType"]:checked').value);
    const renovType = parseFloat(document.querySelector('input[name="renovType"]:checked').value);
    const total = Math.round(area * renovType * aptType);
    resultSpan.textContent = total.toLocaleString('ru-RU');
}

range.addEventListener('input', function() {
    valueInput.value = this.value;
    updateCalc();
});

valueInput.addEventListener('input', function() {
    let val = parseInt(this.value) || 10;
    if (val < 10) val = 10;
    if (val > 200) val = 200;
    this.value = val;
    range.value = val;
    updateCalc();
});

document.querySelectorAll('input[name="aptType"], input[name="renovType"]').forEach(el => {
    el.addEventListener('change', updateCalc);
});

document.getElementById('minusBtn').addEventListener('click', function() {
    let val = parseInt(valueInput.value) || 84;
    if (val > 10) val--;
    valueInput.value = val;
    range.value = val;
    updateCalc();
});

document.getElementById('plusBtn').addEventListener('click', function() {
    let val = parseInt(valueInput.value) || 84;
    if (val < 200) val++;
    valueInput.value = val;
    range.value = val;
    updateCalc();
});

// ============================================
// 3. QUIZ (пошаговый тест)
// ============================================
const quizSteps = document.querySelectorAll('.quiz__item');
const stepIndicators = document.querySelectorAll('.quiz__steps p');
const stepLines = document.querySelectorAll('.quiz__steps span');

document.querySelectorAll('.quiz__next').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const nextStep = parseInt(this.dataset.step);
        showQuizStep(nextStep);
    });
});

document.querySelectorAll('.quiz__prev').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const prevStep = parseInt(this.dataset.step);
        showQuizStep(prevStep);
    });
});

function showQuizStep(step) {
    quizSteps.forEach((el, index) => {
        el.classList.toggle('active', index === step - 1);
    });
    stepIndicators.forEach((el, index) => {
        el.classList.toggle('active', index < step);
    });
    stepLines.forEach((el, index) => {
        if (index < step - 1) {
            el.style.background = '#ff6a00';
        } else {
            el.style.background = '#ddd';
        }
    });
}

// ============================================
// 4. ВКЛАДКИ (ремонт, цены)
// ============================================
document.querySelectorAll('.repair__tabs a').forEach(tab => {
    tab.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelectorAll('.repair__tabs a').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        const target = this.dataset.tab;
        document.querySelectorAll('.repair__item').forEach(item => item.classList.remove('active'));
        document.getElementById(target).classList.add('active');

        // Активируем первую миниатюру
        const firstThumb = document.querySelector('.repair__item.active .repair__thumbnail.active');
        if (firstThumb) {
            const slider = firstThumb.closest('.repair__images').querySelector('.repair__slider img');
            slider.src = firstThumb.querySelector('img').src;
        }
    });
});

document.querySelectorAll('.price__tabs a').forEach(tab => {
    tab.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelectorAll('.price__tabs a').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        const target = this.dataset.tab;
        document.querySelectorAll('.price__block').forEach(block => block.classList.remove('active'));
        document.getElementById(target).classList.add('active');
    });
});

// ============================================
// 5. ГАЛЕРЕЯ РЕМОНТА (переключение миниатюр)
// ============================================
document.querySelectorAll('.repair__thumbnail').forEach(thumb => {
    thumb.addEventListener('click', function() {
        const parent = this.closest('.repair__images');
        const slider = parent.querySelector('.repair__slider img');
        const newSrc = this.querySelector('img').src;
        slider.src = newSrc;
        parent.querySelectorAll('.repair__thumbnail').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
    });
});

// ============================================
// 6. ГАЛЕРЕЯ СКЛАДА (переключение миниатюр)
// ============================================
document.querySelectorAll('.stock__thumbnail').forEach(thumb => {
    thumb.addEventListener('click', function() {
        const parent = this.closest('.stock__sliders');
        const slider = parent.querySelector('.stock__slider img');
        const newSrc = this.querySelector('img').src;
        slider.src = newSrc;
        parent.querySelectorAll('.stock__thumbnail').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
    });
});

// ============================================
// 7. АКЦИИ (плавное появление)
// ============================================
const slides = document.querySelectorAll('.jolly-slider-extra');
const controls = document.querySelectorAll('.jolly-slide-control');

controls.forEach(control => {
    control.addEventListener('click', function() {
        controls.forEach(c => c.classList.remove('active'));
        this.classList.add('active');
        const index = parseInt(this.dataset.index);
        slides.forEach(s => s.classList.remove('active'));
        slides[index].classList.add('active');
    });
});

// ============================================
// 8. FAQ (аккордеон)
// ============================================
document.querySelectorAll('.faq__question').forEach(q => {
    q.addEventListener('click', function() {
        this.classList.toggle('active');
        const answer = this.nextElementSibling;
        answer.classList.toggle('show');
    });
});

// ============================================
// 9. БУРГЕР-МЕНЮ
// ============================================
const navbarToggle = document.getElementById('navbarToggle');
const menuMobile = document.getElementById('menuMobile');
const closeMenu = document.getElementById('closeMenu');

if (navbarToggle && menuMobile && closeMenu) {
    navbarToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        menuMobile.classList.toggle('active');
        document.body.style.overflow = menuMobile.classList.contains('active') ? 'hidden' : '';
    });

    closeMenu.addEventListener('click', function() {
        navbarToggle.classList.remove('active');
        menuMobile.classList.remove('active');
        document.body.style.overflow = '';
    });

    menuMobile.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            navbarToggle.classList.remove('active');
            menuMobile.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// ============================================
// 10. БОКОВЫЕ КНОПКИ (скрытие/показ)
// ============================================
const btnsToggle = document.getElementById('btnsToggle');
const sideButtons = document.getElementById('sideButtons');
let btnsHidden = false;

if (btnsToggle && sideButtons) {
    btnsToggle.addEventListener('click', function() {
        btnsHidden = !btnsHidden;
        sideButtons.classList.toggle('hidden-btns', btnsHidden);
        this.classList.toggle('hidden-toggle', btnsHidden);
    });
}

// ============================================
// 11. МОДАЛЬНОЕ ОКНО (города)
// ============================================
const cityBtn = document.getElementById('cityBtn');
const cityModal = document.getElementById('cityModal');

if (cityBtn && cityModal) {
    cityBtn.addEventListener('click', function(e) {
        e.preventDefault();
        cityModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    cityModal.addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ============================================
// 12. ФИЛЬТР ГОРОДОВ
// ============================================
const citySearch = document.querySelector('.cities-search');
const cityColumns = document.querySelectorAll('.city-column');

if (citySearch) {
    citySearch.addEventListener('input', function() {
        const filter = this.value.toLowerCase();
        cityColumns.forEach(col => {
            const text = col.textContent.toLowerCase();
            col.style.display = text.includes(filter) ? '' : 'none';
        });
    });
}

// ============================================
// 13. ВКЛАДКИ ГОРОДОВ
// ============================================
document.querySelectorAll('.cities__tabs a').forEach(tab => {
    tab.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelectorAll('.cities__tabs a').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        const target = this.dataset.city;
        document.querySelectorAll('.cities__list').forEach(list => list.classList.remove('active'));
        document.getElementById(target).classList.add('active');
    });
});

// ============================================
// 14. ГАЛЕРЕЯ РАБОТ (слайдер)
// ============================================
let currentWork = 0;
const works = document.querySelectorAll('.work');
const dots = document.querySelectorAll('.works__dots span');

function showWork(index) {
    works.forEach((w, i) => {
        w.style.display = i === index ? 'flex' : 'none';
    });
    dots.forEach((d, i) => {
        d.classList.toggle('active', i === index);
    });
}

const arrowPrev = document.querySelector('.works__arrow_prev');
const arrowNext = document.querySelector('.works__arrow_next');

if (arrowPrev && arrowNext) {
    arrowPrev.addEventListener('click', function() {
        currentWork = (currentWork - 1 + works.length) % works.length;
        showWork(currentWork);
    });

    arrowNext.addEventListener('click', function() {
        currentWork = (currentWork + 1) % works.length;
        showWork(currentWork);
    });
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', function() {
        currentWork = index;
        showWork(currentWork);
    });
});

showWork(0);

// ============================================
// 15. ОТКЛЮЧЕНИЕ ВСЕХ КНОПОК
// ============================================
document.querySelectorAll('a[href="javascript:void(0)"]').forEach(el => {
    el.addEventListener('click', function(e) {
        e.preventDefault();
    });
});

// ============================================
// 16. ОТПРАВКА ФОРМ (заглушка)
// ============================================
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('✅ Форма отправлена! (демо-режим)');
        this.reset();
    });
});

// ============================================
// 17. ПЛАВНАЯ ПРОКРУТКА (якоря)
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId && targetId !== '#') {
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

console.log('✅ Сайт полностью загружен и готов к работе!');
console.log('📱 Адаптивный дизайн включён');
console.log('✨ Плавные анимации активны');
console.log('📋 Все пункты меню отображаются');
console.log('🖼️ Галереи с миниатюрами работают');