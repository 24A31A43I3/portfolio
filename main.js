/* ============================================
   GANESH NEELI - PORTFOLIO JAVASCRIPT
   ============================================ */

document.addEventListener("DOMContentLoaded", function () {
    
    // ============================================
    // 1. MOBILE MENU TOGGLE
    // ============================================
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", function () {
            navLinks.classList.toggle("active");
            menuToggle.textContent = navLinks.classList.contains("active") ? "✕" : "☰";
        });

        // Close menu when a link is clicked
        document.querySelectorAll(".nav-links a").forEach(link => {
            link.addEventListener("click", function () {
                navLinks.classList.remove("active");
                menuToggle.textContent = "☰";
            });
        });
    }

    // ============================================
    // 2. NAVBAR SCROLL EFFECT
    // ============================================
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll
        if (currentScroll > lastScroll && currentScroll > 200) {
            navbar.style.transform = 'translateX(-50%) translateY(-100%)';
        } else {
            navbar.style.transform = 'translateX(-50%) translateY(0)';
        }
        
        lastScroll = currentScroll;
    });

    // ============================================
    // 3. TYPEWRITER ANIMATION
    // ============================================
    const typewriterElement = document.getElementById('typewriter');
    const texts = ['Full Stack Developer', 'AI Engineer', 'MERN Stack Expert', 'Problem Solver'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function typeWriter() {
        const currentText = texts[textIndex];
        
        if (!isDeleting) {
            // Typing
            typewriterElement.textContent = currentText.slice(0, charIndex + 1);
            charIndex++;
            
            if (charIndex === currentText.length) {
                // Pause before deleting
                isDeleting = true;
                typeSpeed = 2000;
            } else {
                typeSpeed = 100;
            }
        } else {
            // Deleting
            typewriterElement.textContent = currentText.slice(0, charIndex - 1);
            charIndex--;
            
            if (charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 500;
            } else {
                typeSpeed = 50;
            }
        }
        
        setTimeout(typeWriter, typeSpeed);
    }

    // Start typewriter
    if (typewriterElement) {
        setTimeout(typeWriter, 1000);
    }

    // ============================================
    // 4. SCROLL REVEAL ANIMATION
    // ============================================
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '-50px'
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // ============================================
    // 5. SMOOTH SCROLL FOR NAV LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // 6. SKILL TAGS HOVER EFFECT
    // ============================================
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            // Add slight random movement to nearby tags
            skillTags.forEach(otherTag => {
                if (otherTag !== tag) {
                    const randomX = (Math.random() - 0.5) * 5;
                    const randomY = (Math.random() - 0.5) * 5;
                    otherTag.style.transform = `translate(${randomX}px, ${randomY}px)`;
                }
            });
        });
        
        tag.addEventListener('mouseleave', function() {
            skillTags.forEach(otherTag => {
                otherTag.style.transform = 'translate(0, 0)';
            });
        });
    });

    // ============================================
    // 7. PARALLAX EFFECT FOR HERO ORBS
    // ============================================
    const heroOrb1 = document.querySelector('.hero-orb-1');
    const heroOrb2 = document.querySelector('.hero-orb-2');

    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        if (heroOrb1) {
            heroOrb1.style.transform = `translate(${mouseX * 50}px, ${mouseY * 30}px)`;
        }
        if (heroOrb2) {
            heroOrb2.style.transform = `translate(${-mouseX * 40}px, ${-mouseY * 20}px)`;
        }
    });

    // ============================================
    // 8. BUTTON MAGNETIC EFFECT
    // ============================================
    const magneticButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
    
    magneticButtons.forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        
        button.addEventListener('mouseleave', function() {
            button.style.transform = 'translate(0, 0)';
        });
    });

    // ============================================
    // 9. ACTIVE NAV LINK ON SCROLL
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.style.color = '';
                });
                if (navLink) {
                    navLink.style.color = 'var(--primary)';
                }
            }
        });
    });

    // ============================================
    // 10. LOADING ANIMATION
    // ============================================
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        // Trigger initial reveal for visible elements
        setTimeout(() => {
            revealElements.forEach(element => {
                const rect = element.getBoundingClientRect();
                if (rect.top < window.innerHeight) {
                    element.classList.add('visible');
                }
            });
        }, 100);
    });

    // ============================================
    // 11. FLIP CARD TOUCH SUPPORT (Mobile)
    // ============================================
    const flipCards = document.querySelectorAll('.flip-card');
    
    flipCards.forEach(card => {
        card.addEventListener('click', function() {
            // Toggle flipped state on click (for touch devices)
            if (window.innerWidth <= 768) {
                this.classList.toggle('flipped');
                
                // Toggle transform
                const inner = this.querySelector('.flip-card-inner');
                if (this.classList.contains('flipped')) {
                    inner.style.transform = 'rotateY(180deg)';
                } else {
                    inner.style.transform = 'rotateY(0deg)';
                }
            }
        });
    });

    // ============================================
    // 12. CONSOLE EASTER EGG
    // ============================================
    console.log('%c👋 Hey there, curious developer!', 'font-size: 20px; font-weight: bold; color: #00f2ff;');
    console.log('%cWant to collaborate? Reach out at: ganeshneeli@example.com', 'font-size: 14px; color: #8b5cf6;');
    console.log('%c🚀 Built with passion using vanilla HTML, CSS, and JavaScript', 'font-size: 12px; color: #94a3b8;');

    // ============================================
    // 13. THEME TOGGLE FUNCTIONALITY
    // ============================================
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    
    // Check for saved user preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        
        if (currentTheme === 'light') {
            // Switch to Dark
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'dark');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            // Switch to Light
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    });

});