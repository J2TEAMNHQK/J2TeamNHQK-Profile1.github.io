/* Portfolio JavaScript cho Nguyễn Hồ Quang Khải - Beach Theme */

/* Đợi DOM load hoàn tất trước khi chạy các script */
document.addEventListener('DOMContentLoaded', function() {

    /* Lấy các elements quan trọng từ DOM */
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    /* Xử lý menu hamburger cho mobile */
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            /* Ngăn scroll khi menu mở */
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
        });
    }

    /* Đóng menu khi click vào link */
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger) {
                hamburger.classList.remove('active');
            }
            if (navMenu) {
                navMenu.classList.remove('active');
            }
            document.body.style.overflow = 'auto';
        });
    });

    /* Smooth scroll cho navigation links */
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            /* Chỉ xử lý smooth scroll cho internal links */
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    const navHeight = navbar.offsetHeight;
                    const targetPosition = targetSection.offsetTop - navHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    /* Cập nhật active link khi scroll */
    function updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + navbar.offsetHeight + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    /* Thêm hiệu ứng cho navbar khi scroll */
    function handleNavbarScroll() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    /* Intersection Observer cho scroll animations */
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    /* Observer cho các animated elements */
    const animatedElements = document.querySelectorAll('[data-tech], .tech-card, .skill-category, .career-card, .info-card, .hobby-card, .gallery-item, .contact-card');
    animatedElements.forEach(el => scrollObserver.observe(el));

    /* Tạo lightbox cho ảnh */
    function createLightbox(imageSrc, imageAlt) {
        /* Tạo lightbox modal */
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox-modal';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <span class="lightbox-close">&times;</span>
                <img src="${imageSrc}" alt="${imageAlt}">
            </div>
        `;

        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';

        /* Hàm đóng lightbox */
        function closeLightbox() {
            lightbox.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                if (document.body.contains(lightbox)) {
                    document.body.removeChild(lightbox);
                }
                document.body.style.overflow = 'auto';
            }, 300);
        }

        /* Click vào close button để đóng */
        const closeButton = lightbox.querySelector('.lightbox-close');
        if (closeButton) {
            closeButton.addEventListener('click', closeLightbox);
        }

        /* Click vào background để đóng */
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        /* Nhấn ESC để đóng */
        function handleEscKey(e) {
            if (e.key === 'Escape') {
                closeLightbox();
                document.removeEventListener('keydown', handleEscKey);
            }
        }
        document.addEventListener('keydown', handleEscKey);
    }

    /* Thêm click handler cho gallery items */
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('.gallery-image');
            if (img) {
                createLightbox(img.src, img.alt);
            }
        });
    });

    /* Thêm click handler cho certificate image */
    const certImages = document.querySelectorAll('.cert-image');
    certImages.forEach(img => {
        img.addEventListener('click', function() {
            createLightbox(this.src, this.alt);
        });
    });

    /* Thêm click handler cho artwork */
    const artworkFrame = document.querySelector('.artwork-frame');
    if (artworkFrame) {
        artworkFrame.addEventListener('click', function() {
            const img = this.querySelector('.artwork-image');
            if (img) {
                createLightbox(img.src, img.alt);
            }
        });
    }

    /* Tạo nút scroll to top */
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.className = 'scroll-to-top';
    scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 35px;
        right: 35px;
        width: 58px;
        height: 58px;
        background: linear-gradient(135deg, #FF9A8B, #FFBFAB);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        box-shadow: 0 6px 28px rgba(255, 154, 139, 0.5);
        transition: all 0.3s ease;
        z-index: 999;
        display: none;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transform: scale(0.8);
    `;

    document.body.appendChild(scrollTopBtn);

    /* Hiển thị/ẩn nút scroll to top */
    function toggleScrollButton() {
        if (window.scrollY > 600) {
            scrollTopBtn.style.display = 'flex';
            setTimeout(() => {
                scrollTopBtn.style.opacity = '1';
                scrollTopBtn.style.transform = 'scale(1)';
            }, 10);
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.transform = 'scale(0.8)';
            setTimeout(() => {
                if (window.scrollY <= 600) {
                    scrollTopBtn.style.display = 'none';
                }
            }, 300);
        }
    }

    /* Click để scroll lên đầu trang */
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    /* Hover effects cho scroll button */
    scrollTopBtn.addEventListener('mouseenter', () => {
        scrollTopBtn.style.transform = 'translateY(-8px) scale(1.1)';
        scrollTopBtn.style.boxShadow = '0 12px 38px rgba(255, 154, 139, 0.7)';
    });

    scrollTopBtn.addEventListener('mouseleave', () => {
        scrollTopBtn.style.transform = 'translateY(0) scale(1)';
        scrollTopBtn.style.boxShadow = '0 6px 28px rgba(255, 154, 139, 0.5)';
    });

    /* Tilt effect cho cards khi hover */
    function addTiltEffect(cards) {
        cards.forEach(card => {
            card.addEventListener('mousemove', function(e) {
                if (window.innerWidth > 768) {
                    const rect = this.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;

                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;

                    const rotateX = (y - centerY) / 15;
                    const rotateY = (centerX - x) / 15;

                    this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
                }
            });

            card.addEventListener('mouseleave', function() {
                this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            });
        });
    }

    /* Áp dụng tilt effect cho các cards */
    const tiltCards = document.querySelectorAll('.info-card, .career-card, .hobby-card, .tech-card');
    addTiltEffect(tiltCards);

    /* Ripple effect cho skill tags */
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                left: ${x}px;
                top: ${y}px;
                animation: rippleEffect 0.6s ease-out;
                pointer-events: none;
            `;

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    /* Thêm ripple animation CSS */
    if (!document.querySelector('#ripple-animation-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-animation-style';
        style.textContent = `
            @keyframes rippleEffect {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    /* Parallax effect cho beach decorations */
    function handleParallax() {
        const scrolled = window.pageYOffset;
        const beachDecor = document.querySelector('.beach-decorations');

        if (beachDecor && window.innerWidth > 768) {
            const palmTrees = beachDecor.querySelectorAll('.palm-tree');
            const seagulls = beachDecor.querySelectorAll('.seagull');
            const beachBall = beachDecor.querySelector('.beach-ball');
            const sunDecor = beachDecor.querySelector('.sun-decoration');

            palmTrees.forEach((palm, index) => {
                const speed = 0.1 + (index * 0.05);
                const yPos = -(scrolled * speed);
                palm.style.transform = `translateY(${yPos}px)`;
            });

            if (beachBall) {
                const yPos = -(scrolled * 0.15);
                beachBall.style.transform = `translateY(${yPos}px)`;
            }

            if (sunDecor) {
                const yPos = -(scrolled * 0.08);
                sunDecor.style.transform = `translateY(${yPos}px)`;
            }
        }
    }

    /* Throttle function để tối ưu performance */
    function throttle(func, delay) {
        let lastCall = 0;
        return function(...args) {
            const now = new Date().getTime();
            if (now - lastCall < delay) {
                return;
            }
            lastCall = now;
            return func(...args);
        };
    }

    /* Gắn scroll event với throttle */
    window.addEventListener('scroll', throttle(() => {
        updateActiveLink();
        handleNavbarScroll();
        toggleScrollButton();
        handleParallax();
    }, 100));

    /* Xử lý resize window */
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            /* Đóng mobile menu khi resize về desktop */
            if (window.innerWidth > 1024) {
                if (hamburger) hamburger.classList.remove('active');
                if (navMenu) navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        }, 250);
    });

    /* Page load animation */
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';

        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 50);

        /* Console message */
        console.log('%c🌊 Welcome to my Beach Portfolio! 🌊', 'color: #91C5D4; font-size: 20px; font-weight: bold;');
        console.log('%c🚀 Nguyễn Hồ Quang Khải', 'color: #FF9A8B; font-size: 18px; font-weight: bold;');
        console.log('%c🤖 AI Engineer | ML Engineer | GenAI Engineer', 'color: #8E7CC3; font-size: 14px;');
        console.log('%c💼 GitHub: https://github.com/J2TEAMNHQK', 'color: #6FBACD; font-size: 12px;');
        console.log('%c✨ Made with HTML5, CSS3 & JavaScript', 'color: #FFE5A4; font-size: 12px;');
    });

    /* Lazy loading cho images */
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;

                /* Load image nếu có data-src */
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }

                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    }, {
        rootMargin: '100px'
    });

    /* Observer tất cả images có data-src */
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));

    /* Wave animation cho contact cards */
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            if (window.innerWidth > 768) {
                const wave = document.createElement('div');
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                wave.style.cssText = `
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    top: 0;
                    left: 0;
                    background: radial-gradient(circle at ${x}px ${y}px, rgba(145, 197, 212, 0.2), transparent);
                    pointer-events: none;
                    animation: waveExpand 0.6s ease-out;
                    border-radius: 26px;
                `;

                this.style.position = 'relative';
                this.appendChild(wave);

                setTimeout(() => wave.remove(), 600);
            }
        });
    });

    /* Wave expand animation CSS */
    if (!document.querySelector('#wave-animation-style')) {
        const waveStyle = document.createElement('style');
        waveStyle.id = 'wave-animation-style';
        waveStyle.textContent = `
            @keyframes waveExpand {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(waveStyle);
    }

    /* Easter egg khi click vào logo 5 lần */
    let logoClickCount = 0;
    const logo = document.querySelector('.logo');

    if (logo) {
        logo.addEventListener('click', () => {
            logoClickCount++;

            if (logoClickCount === 5) {
                /* Tạo hiệu ứng confetti đơn giản */
                const colors = ['#FF9A8B', '#91C5D4', '#FFE5A4', '#8E7CC3', '#6FBACD'];
                for (let i = 0; i < 50; i++) {
                    setTimeout(() => {
                        const confetti = document.createElement('div');
                        confetti.textContent = '✨';
                        confetti.style.cssText = `
                            position: fixed;
                            top: 50%;
                            left: 50%;
                            font-size: ${Math.random() * 30 + 20}px;
                            pointer-events: none;
                            z-index: 10001;
                            animation: confettiFall ${Math.random() * 2 + 1}s ease-out forwards;
                        `;
                        document.body.appendChild(confetti);

                        setTimeout(() => confetti.remove(), 3000);
                    }, i * 30);
                }

                setTimeout(() => {
                    alert('🎉 Bạn đã tìm thấy Easter Egg! Cảm ơn bạn đã ghé thăm portfolio của tôi! 🚀');
                    logoClickCount = 0;
                }, 500);
            }
        });
    }

    /* Confetti animation */
    if (!document.querySelector('#confetti-animation-style')) {
        const confettiStyle = document.createElement('style');
        confettiStyle.id = 'confetti-animation-style';
        confettiStyle.textContent = `
            @keyframes confettiFall {
                0% {
                    transform: translate(-50%, -50%) translateY(0) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 500 + 300}px) rotate(${Math.random() * 720}deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(confettiStyle);
    }

    /* Performance monitoring */
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.timing;
                const loadTime = perfData.loadEventEnd - perfData.navigationStart;
                console.log(`%c⚡ Page load time: ${loadTime}ms`, 'color: #FFD700; font-size: 12px;');
                console.log('%c✅ All features loaded successfully!', 'color: #27AE60; font-size: 14px; font-weight: bold;');
            }, 0);
        });
    }

    /* Smooth scroll polyfill cho Safari */
    if (!('scrollBehavior' in document.documentElement.style)) {
        /* Polyfill đơn giản cho smooth scroll */
        const smoothScroll = (target, duration = 1000) => {
            const targetPosition = target.offsetTop;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            let startTime = null;

            function animation(currentTime) {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
                window.scrollTo(0, run);
                if (timeElapsed < duration) requestAnimationFrame(animation);
            }

            function easeInOutQuad(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            }

            requestAnimationFrame(animation);
        };
    }

    /* Khởi chạy các function cần thiết */
    updateActiveLink();
    handleNavbarScroll();
    toggleScrollButton();

    console.log('%c🎨 Portfolio fully initialized!', 'color: #FF9A8B; font-size: 14px; font-weight: bold;');
});

/* Utility Functions */

/* Debounce function */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/* Get random number trong khoảng min-max */
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* Format date sang định dạng Việt Nam */
function formatDate(date) {
    return new Date(date).toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

/* Check nếu element đang visible trong viewport */
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

