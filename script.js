// Enhanced typing animation is now handled in bhramastra-hero.js

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Theme Toggle Functionality
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.themeIcon = document.getElementById('theme-icon');
        this.currentTheme = localStorage.getItem('theme') || 'dark';
        
        this.init();
    }
    
    init() {
        // Set initial theme
        this.setTheme(this.currentTheme);
        
        // Add event listener
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }
    
    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.currentTheme = theme;
        
        // Update icon
        if (theme === 'dark') {
            this.themeIcon.className = 'fas fa-sun';
        } else {
            this.themeIcon.className = 'fas fa-moon';
        }
        
        // Save to localStorage
        localStorage.setItem('theme', theme);
        
        // Update navbar background on scroll
        this.updateNavbarBackground();
    }
    
    toggleTheme() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }
    
    updateNavbarBackground() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            if (this.currentTheme === 'dark') {
                navbar.style.background = 'rgba(26, 26, 26, 0.98)';
            } else {
                navbar.style.background = 'rgba(248, 249, 250, 0.98)';
            }
        } else {
            if (this.currentTheme === 'dark') {
                navbar.style.background = 'rgba(26, 26, 26, 0.95)';
            } else {
                navbar.style.background = 'rgba(248, 249, 250, 0.95)';
            }
        }
    }
}

// Initialize theme manager
let themeManager;
document.addEventListener('DOMContentLoaded', function() {
    themeManager = new ThemeManager();
});

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    if (themeManager) {
        themeManager.updateNavbarBackground();
    }
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.skill-card, .project-card, .cert-card, .timeline-item, .education-card, .about-content');
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.5s ease ${index * 0.05}s, transform 0.5s ease ${index * 0.05}s`;
        observer.observe(el);
    });
    
    // Initialize photo interactions
    initPhotoEffects();
});

document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

function animateCounters() {
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    animateCounters();
    
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.3s ease';
        document.body.style.opacity = '1';
    }, 50);
    
    initTheme3DEffects();
});

// Theme-aware 3D effects
function initTheme3DEffects() {
    // Update 3D model colors based on theme
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
                updateTheme3DColors();
            }
        });
    });
    
    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme']
    });
}

function updateTheme3DColors() {
    // This function will be called when theme changes
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    
    // Update 3D models
    if (window.portfolio3D && window.portfolio3D.updateTheme) {
        window.portfolio3D.updateTheme(isDark);
    }
    
    // Update Bhramastra hero colors
    if (window.bhramastraHero && window.bhramastraHero.updateTheme) {
        window.bhramastraHero.updateTheme(isDark);
    }
    
    // Update cinematic effects
    if (window.cinematicEffects && window.cinematicEffects.updateTheme) {
        window.cinematicEffects.updateTheme(isDark);
    }
}

// Contact form functionality
function handleContactClick(type) {
    switch(type) {
        case 'email':
            window.location.href = 'mailto:kartikkapri817@gmail.com';
            break;
        case 'github':
            window.open('https://github.com/kartikkapri', '_blank');
            break;
        case 'linkedin':
            window.open('https://www.linkedin.com/in/kartik-kapri-675867273/', '_blank');
            break;
    }
}

// Resume download functionality
function downloadResume() {
    window.open('https://drive.google.com/file/d/1tAxclyzqe1R6h4BXW8KhR6_yubnZy-xb/view?usp=drivesdk', '_blank');
}

// Mobile menu toggle (if implementing mobile menu)
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});



// Photo effects initialization
function initPhotoEffects() {
    const profilePhoto = document.querySelector('.profile-photo');
    const photoContainer = document.querySelector('.photo-container');
    
    if (profilePhoto) {
        // Try multiple URL formats for Google Drive image
        const imageUrls = [
            'https://lh3.googleusercontent.com/d/1uPTyTd_cWqz6TQGCFfGMdlrnfke-hhck',
            'https://drive.google.com/uc?export=view&id=1uPTyTd_cWqz6TQGCFfGMdlrnfke-hhck',
            'https://drive.google.com/thumbnail?id=1uPTyTd_cWqz6TQGCFfGMdlrnfke-hhck&sz=w300',
            'https://via.placeholder.com/300x300/0066ff/ffffff?text=KK'
        ];
        
        let currentIndex = 0;
        
        profilePhoto.addEventListener('error', function() {
            currentIndex++;
            if (currentIndex < imageUrls.length) {
                this.src = imageUrls[currentIndex];
            }
        });
        
        if (photoContainer) {
            profilePhoto.addEventListener('mouseenter', function() {
                this.style.animationPlayState = 'paused';
                photoContainer.style.transform = 'scale(1.05)';
            });
            
            profilePhoto.addEventListener('mouseleave', function() {
                this.style.animationPlayState = 'running';
                photoContainer.style.transform = 'scale(1)';
            });
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.setAttribute('aria-label', 'Toggle between dark and light theme');
    }
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
});