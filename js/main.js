// ============================================
// 1. АНИМАЦИИ ПРИ СКРОЛЛЕ
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .fade-in-scale');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    animateElements.forEach(el => observer.observe(el));
});

// ============================================
// 2. КАЛЬКУЛЯТОР
// ============================================
const range = document.getElementById('calcRange');
const valueInput = document.getElementById('calcValue');
const resultSpan = document.getElementById('calcResult');

function updateCalc() {
    if (!range || !valueInput || !resultSpan) return;
    const aptTypeEl = document.querySelector('input[name="aptType"]:checked');
    const renovTypeEl = document.querySelector('input[name="renovType"]:checked');
    if (!aptTypeEl || !renovTypeEl) return;
    const area = parseInt(valueInput.value) || 84;
    const total = Math.round(area * parseFloat(renovTypeEl.value) * parseFloat(aptTypeEl.value));
    resultSpan.textContent = total.toLocaleString('ru-RU');
}

if (range && valueInput && resultSpan) {
    range.addEventListener('input', function() {
        valueInput.value = this.value;
        updateCalc();
    });
    valueInput.addEventListener('input', function() {
        let val = parseInt(this.value) || 10;
        if (val < 10) val = 10;
        if (val > 200) val = 200;
        this.value = val; range.value = val; updateCalc();
    });
    document.querySelectorAll('input[name="aptType"], input[name="renovType"]').forEach(el => {
        el.addEventListener('change', updateCalc);
    });
    const minusBtn = document.getElementById('minusBtn');
    const plusBtn = document.getElementById('plusBtn');
    if (minusBtn) minusBtn.addEventListener('click', function() {
        let val = parseInt(valueInput.value) || 84;
        if (val > 10) val--;
        valueInput.value = val; range.value = val; updateCalc();
    });
    if (plusBtn) plusBtn.addEventListener('click', function() {
        let val = parseInt(valueInput.value) || 84;
        if (val < 200) val++;
        valueInput.value = val; range.value = val; updateCalc();
    });
    updateCalc();
}

// ============================================
// 3. QUIZ (пошаговый тест)
// ============================================
const quizSteps = document.querySelectorAll('.quiz__item');
const stepIndicators = document.querySelectorAll('.quiz__steps p');
const stepLines = document.querySelectorAll('.quiz__steps span');

document.querySelectorAll('.quiz__next').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        showQuizStep(parseInt(this.dataset.step));
    });
});
document.querySelectorAll('.quiz__prev').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        showQuizStep(parseInt(this.dataset.step));
    });
});
function showQuizStep(step) {
    quizSteps.forEach((el, i) => el.classList.toggle('active', i === step - 1));
    stepIndicators.forEach((el, i) => el.classList.toggle('active', i < step));
    stepLines.forEach((el, i) => {
        el.style.background = i < step - 1 ? '#ff6a00' : '#ddd';
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
        const targetEl = document.getElementById(target);
        if (targetEl) targetEl.classList.add('active');
    });
});
document.querySelectorAll('.price__tabs a').forEach(tab => {
    tab.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelectorAll('.price__tabs a').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        const target = this.dataset.tab;
        document.querySelectorAll('.price__block').forEach(b => b.classList.remove('active'));
        const targetEl = document.getElementById(target);
        if (targetEl) targetEl.classList.add('active');
    });
});

// ============================================
// 5. ГАЛЕРЕЯ РЕМОНТА
// ============================================
document.querySelectorAll('.repair__thumbnail').forEach(thumb => {
    thumb.addEventListener('click', function() {
        const parent = this.closest('.repair__images');
        const slider = parent.querySelector('.repair__slider img');
        slider.src = this.querySelector('img').src;
        parent.querySelectorAll('.repair__thumbnail').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
    });
});

// ============================================
// 6. ГАЛЕРЕЯ СКЛАДА
// ============================================
document.querySelectorAll('.stock__thumbnail').forEach(thumb => {
    thumb.addEventListener('click', function() {
        const parent = this.closest('.stock__sliders');
        const slider = parent.querySelector('.stock__slider img');
        slider.src = this.querySelector('img').src;
        parent.querySelectorAll('.stock__thumbnail').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
    });
});

// ============================================
// 7. АКЦИИ
// ============================================
const slides = document.querySelectorAll('.jolly-slider-extra');
const controls = document.querySelectorAll('.jolly-slide-control');
controls.forEach(control => {
    control.addEventListener('click', function() {
        controls.forEach(c => c.classList.remove('active'));
        this.classList.add('active');
        const index = parseInt(this.dataset.index);
        slides.forEach(s => s.classList.remove('active'));
        if (slides[index]) slides[index].classList.add('active');
    });
});

// ============================================
// 8. FAQ
// ============================================
document.querySelectorAll('.faq__question').forEach(q => {
    q.addEventListener('click', function() {
        this.classList.toggle('active');
        const answer = this.nextElementSibling;
        if (answer) answer.classList.toggle('show');
    });
});

// ============================================
// 9. БУРГЕР-МЕНЮ
// ============================================
(function() {
    const navbarToggle = document.getElementById('navbarToggle');
    const menuMobile = document.getElementById('menuMobile');
    const closeMenu = document.getElementById('closeMenu');
    if (!navbarToggle || !menuMobile) return;

    function openMenu() {
        menuMobile.classList.add('active');
        navbarToggle.classList.add('active');
        document.body.classList.add('menu-open');
    }
    function closeMenuFunc() {
        menuMobile.classList.remove('active');
        navbarToggle.classList.remove('active');
        document.body.classList.remove('menu-open');
    }

    navbarToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        if (menuMobile.classList.contains('active')) closeMenuFunc();
        else openMenu();
    });

    if (closeMenu) closeMenu.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        closeMenuFunc();
    });

    menuMobile.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenuFunc);
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && menuMobile.classList.contains('active')) closeMenuFunc();
    });
})();

// ============================================
// 10. БОКОВЫЕ КНОПКИ
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
            col.style.display = col.textContent.toLowerCase().includes(filter) ? '' : 'none';
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
        const targetEl = document.getElementById(target);
        if (targetEl) targetEl.classList.add('active');
    });
});

// ============================================
// 14. ГАЛЕРЕЯ РАБОТ
// ============================================
let currentWork = 0;
const works = document.querySelectorAll('.work');
const dots = document.querySelectorAll('.works__dots span');
function showWork(index) {
    works.forEach((w, i) => { w.style.display = i === index ? 'flex' : 'none'; });
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
}
const arrowPrev = document.querySelector('.works__arrow_prev');
const arrowNext = document.querySelector('.works__arrow_next');
if (arrowPrev && arrowNext && works.length) {
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
if (works.length) showWork(0);

// ============================================
// 15. ОТКЛЮЧЕНИЕ ВСЕХ КНОПОК
// ============================================
document.querySelectorAll('a[href="javascript:void(0)"]').forEach(el => {
    el.addEventListener('click', function(e) { e.preventDefault(); });
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
// 17. ПЛАВНАЯ ПРОКРУТКА
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

console.log('✅ Сайт полностью загружен!');
