// ============================================
// PREMIUM UX INTERACTION SCRIPT (v3 Final)
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Core Visuals
    initTheme();
    initSpotlightEffect();
    initScrollAnimations();
    initNavbarScroll();
    
    // 2. Components
    initCarousel();
    initRegistrationForm(); // 등록 폼 로직 초기화
    
    // 3. Program Modal Logic
    initProgramModal();
});

// ============================================
// 1. THEME & VISUALS
// ============================================
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'medical';
    applyTheme(savedTheme);

    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const theme = this.dataset.theme;
            applyTheme(theme);
        });
    });
    
    // Animation Toggle
    const aniBtn = document.getElementById('animationToggle');
    const aniBg = document.getElementById('animationBg');
    if(aniBtn && aniBg) {
        aniBtn.addEventListener('click', () => {
            aniBtn.classList.toggle('active');
            aniBg.style.opacity = aniBtn.classList.contains('active') ? '1' : '0';
        });
    }
}

function applyTheme(theme) {
    document.body.className = `${theme}-theme`;
    localStorage.setItem('theme', theme);
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.theme === theme);
    });
}

function initSpotlightEffect() {
    const cards = document.querySelectorAll('.glass-card');
    document.addEventListener('mousemove', (e) => {
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));
}

function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ============================================
// 2. CAROUSEL
// ============================================
function initCarousel() {
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const indicators = document.querySelectorAll('.indicator');
    
    if (!track || slides.length === 0) return;

    let currentIndex = 0;
    const totalSlides = slides.length;

    function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        indicators.forEach((ind, idx) => {
            ind.classList.toggle('active', idx === currentIndex);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateCarousel();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateCarousel();
        });
    }
    
    // Indicator Click
    indicators.forEach((ind, i) => {
        ind.addEventListener('click', () => {
            currentIndex = i;
            updateCarousel();
        });
    });

    // Auto Play
    setInterval(() => {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarousel();
    }, 5000);
}

// ============================================
// 3. REGISTRATION FORM LOGIC (FIXED)
// ============================================
function initRegistrationForm() {
    const categoryRadios = document.querySelectorAll('input[name="category"]');
    const feeInput = document.getElementById('totalFee');

    if (!categoryRadios.length || !feeInput) return;

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('ko-KR').format(amount);
    }

    categoryRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (e.target.checked) {
                const fee = e.target.dataset.fee;
                feeInput.value = formatCurrency(fee);
            }
        });
    });
}

// ============================================
// 4. PROGRAM MODAL LOGIC (GLOBAL SCOPE)
// ============================================
// HTML onclick 속성에서 호출하기 위해 전역 함수로 선언
window.switchDay = function(dayId) {
    const buttons = document.querySelectorAll('.program-container .tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // 클릭된 버튼 찾아서 active (event 객체 활용)
    if(event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }

    document.getElementById('day1-preview').classList.add('hidden');
    document.getElementById('day2-preview').classList.add('hidden');
    
    const target = document.getElementById(dayId + '-preview');
    if(target) target.classList.remove('hidden');
};

window.openProgramModal = function() {
    const modal = document.getElementById('programModal');
    if(modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
};

window.closeProgramModal = function() {
    const modal = document.getElementById('programModal');
    if(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
};

function initProgramModal() {
    const modal = document.getElementById('programModal');
    if (!modal) return;

    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) window.closeProgramModal();
    });

    // Modal Internal Tabs
    const modalTabs = document.querySelectorAll('.modal-tabs .tab-btn');
    const modalGrids = document.querySelectorAll('.schedule-grid');

    modalTabs.forEach(btn => {
        btn.addEventListener('click', () => {
            modalTabs.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            modalGrids.forEach(grid => grid.classList.remove('active'));
            const targetId = btn.dataset.target;
            const targetGrid = document.getElementById(targetId);
            if(targetGrid) targetGrid.classList.add('active');
        });
    });
}