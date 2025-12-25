document.addEventListener("DOMContentLoaded", function () {
    
    // --- 1. MOBILE MENU TOGGLE ---
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");
    const navItems = document.querySelectorAll(".nav-links a");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", function () {
            navLinks.classList.toggle("active");
            
            // Optional: Change icon to 'X' when open
            if (navLinks.classList.contains("active")) {
                menuToggle.textContent = "✕";
            } else {
                menuToggle.textContent = "☰";
            }
        });
    }

    // Close mobile menu when a link is clicked
    navItems.forEach(item => {
        item.addEventListener("click", function () {
            navLinks.classList.remove("active");
            if (menuToggle) menuToggle.textContent = "☰";
        });
    });


    // --- 2. THEME TOGGLE (Dark/Light) ---
    const themeToggle = document.getElementById("theme-toggle");
    const themeIcon = document.querySelector(".theme-icon");
    
    // Check local storage for saved theme
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-theme");
        if (themeIcon) themeIcon.textContent = "🌙";
    }

    if (themeToggle) {
        themeToggle.addEventListener("click", function () {
            document.body.classList.toggle("dark-theme");
            
            // Update icon and save to local storage
            if (document.body.classList.contains("dark-theme")) {
                if (themeIcon) themeIcon.textContent = "🌙";
                localStorage.setItem("theme", "dark");
            } else {
                if (themeIcon) themeIcon.textContent = "🌞";
                localStorage.setItem("theme", "light");
            }
        });
    }


    // --- 3. NAVBAR SCROLL EFFECT ---
    const nav = document.querySelector('nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            nav.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
            return;
        }
        
        if (currentScroll > lastScroll && !navLinks.classList.contains("active")) {
            // Scrolling down (and menu is closed) -> Hide Nav
            nav.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up -> Show Nav
            nav.style.transform = 'translateY(0)';
            nav.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        }
        
        lastScroll = currentScroll;
    });


    // --- 4. SMOOTH SCROLL FOR ANCHOR LINKS ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === "#") return; // Skip empty links
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });


    // --- 5. FADE-IN ANIMATION ---
    const observerOptions = { threshold: 0.1 };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll("section").forEach(section => {
        section.style.opacity = "0";
        section.style.transform = "translateY(20px)";
        section.style.transition = "all 0.6s ease-out";
        observer.observe(section);
    });

});