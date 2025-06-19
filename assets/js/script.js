// Mi Fix Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Mobile menu functionality
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const navLinks = document.querySelectorAll('#mobile-menu a');
    
    function openMobileMenu() {
        mobileMenu.classList.remove('-translate-x-full');
        mobileMenuOverlay.classList.remove('opacity-0', 'pointer-events-none');
        mobileMenuOverlay.classList.add('opacity-100');
        document.body.classList.add('overflow-hidden');
    }
    
    function closeMobileMenu() {
        mobileMenu.classList.add('-translate-x-full');
        mobileMenuOverlay.classList.add('opacity-0', 'pointer-events-none');
        mobileMenuOverlay.classList.remove('opacity-100');
        document.body.classList.remove('overflow-hidden');
    }
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', openMobileMenu);
        
        if (mobileMenuClose) {
            mobileMenuClose.addEventListener('click', closeMobileMenu);
        }
        
        if (mobileMenuOverlay) {
            mobileMenuOverlay.addEventListener('click', closeMobileMenu);
        }
        
        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                closeMobileMenu();
            });
        });
        
        // Close menu with escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeMobileMenu();
            }
        });
    }
    
    // Smooth scrolling for navigation links
    const allNavLinks = document.querySelectorAll('a[href^="#"]');
    allNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Navbar scroll effect
    const navbar = document.querySelector('nav');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('nav-scrolled');
        } else {
            navbar.classList.remove('nav-scrolled');
        }
        
        lastScrollY = window.scrollY;
    });
    
    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !message) {
                showMessage('Please fill in all required fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.classList.add('loading');
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                submitBtn.classList.remove('loading');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                showMessage('Thank you for your message! We\'ll get back to you soon.', 'success');
                this.reset();
            }, 2000);
        });
    }
    
    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Show success/error messages
    function showMessage(text, type) {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.success-message, .error-message');
        existingMessages.forEach(msg => msg.remove());
        
        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = type === 'success' ? 'success-message' : 'error-message';
        messageDiv.textContent = text;
        messageDiv.style.display = 'block';
        
        // Add to form
        const form = document.getElementById('contact-form');
        if (form) {
            form.appendChild(messageDiv);
            
            // Auto hide after 5 seconds
            setTimeout(() => {
                messageDiv.style.display = 'none';
                messageDiv.remove();
            }, 5000);
        }
    }
    
    // Add hover effects to service cards - more specific targeting (exclude "what makes us different")
    const serviceCards = document.querySelectorAll('#services .bg-white');
    const whyUsCards = document.querySelectorAll('#why-us .grid.md\\:grid-cols-3 .bg-white');
    
    serviceCards.forEach(card => {
        card.classList.add('service-card');
    });
    
    whyUsCards.forEach(card => {
        card.classList.add('service-card');
    });
    
    // Add hover effects to feature icons
    const featureIcons = document.querySelectorAll('.w-20.h-20');
    featureIcons.forEach(icon => {
        icon.classList.add('feature-icon');
    });
    
    // Add hover effects to review cards
    const reviewCards = document.querySelectorAll('#reviews .bg-white');
    reviewCards.forEach(card => {
        card.classList.add('review-card');
    });
    
    // Add icon hover effects
    const icons = document.querySelectorAll('[data-lucide]');
    icons.forEach(icon => {
        icon.classList.add('icon-hover');
    });
    
    // Add fade-in animation to hero content
    const heroContent = document.querySelector('#home h1');
    if (heroContent) {
        heroContent.classList.add('fade-in-up');
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);
    
    // Observe sections for animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Stats counter animation
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const finalNumber = parseInt(stat.textContent);
        animateCounter(stat, finalNumber);
    });
    
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            if (target === 98) {
                element.textContent = Math.floor(current) + '%';
            } else {
                element.textContent = Math.floor(current) + '+';
            }
        }, 20);
    }
    
    // Service showcase hover effects
    const showcaseCards = document.querySelectorAll('#home .grid.grid-cols-2 > div');
    showcaseCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // CTA button effects
    const ctaButtons = document.querySelectorAll('.bg-orange-600');
    ctaButtons.forEach(btn => {
        btn.classList.add('btn-primary');
    });
    
    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }
    });
    
    // Form input focus effects
    const formInputs = document.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.classList.add('form-input');
        
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
    
    // Lazy loading for better performance
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    images.forEach(img => {
        if (img.dataset.src) {
            imageObserver.observe(img);
        }
    });
    
    // Set Home as active by default on page load
    function setActiveNav() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        const homeLinks = document.querySelectorAll('a[href="#home"]');
        
        // Remove active class from all links first
        navLinks.forEach(link => {
            link.classList.remove('text-orange-600', 'bg-orange-50');
        });
        
        // Add active class to all home links (desktop and mobile)
        homeLinks.forEach(link => {
            link.classList.add('text-orange-600');
            // Add background for mobile menu item
            if (link.classList.contains('block')) {
                link.classList.add('bg-orange-50');
            }
        });
    }
    
    // Set home as active immediately
    setActiveNav();
    
    // Active navigation highlighting
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        let current = 'home'; // Default to home
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('text-orange-600', 'bg-orange-50');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('text-orange-600');
                // Add background for mobile menu items
                if (link.classList.contains('block')) {
                    link.classList.add('bg-orange-50');
                }
            }
        });
    });
    
    // Preload critical resources
    const preloadLinks = [
        'https://unpkg.com/lucide@latest/dist/umd/lucide.js',
        'https://cdn.tailwindcss.com'
    ];
    
    preloadLinks.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = href;
        document.head.appendChild(link);
    });
    
    // Performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
            }, 0);
        });
    }
    
    // Service worker registration for PWA capabilities
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').catch(err => {
            console.log('Service worker registration failed:', err);
        });
    }
    
    console.log('Mi Fix website loaded successfully!');
}); 