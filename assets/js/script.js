// Mi Fix Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Loading Wrapper Functionality
    const loadingWrapper = document.getElementById('loading-wrapper');
    const mainContent = document.getElementById('main-content');
    const loadingProgress = document.getElementById('loading-progress');
    
    // Fallback: ensure main content is shown if loading elements don't exist
    if (!loadingWrapper) {
        if (mainContent) {
            mainContent.classList.remove('opacity-0');
            mainContent.classList.add('opacity-100');
        }
        return;
    }
    
    // Start progress bar animation
    if (loadingProgress) {
        setTimeout(() => {
            loadingProgress.classList.remove('w-0');
            loadingProgress.classList.add('w-full');
        }, 100);
    }
    
    // Show loading for 2 seconds then reveal main content
    setTimeout(function() {
        // Fade out loading wrapper using tailwind classes
        if (loadingWrapper) {
            loadingWrapper.classList.add('opacity-0', 'pointer-events-none');
            loadingWrapper.classList.add('transition-opacity', 'duration-700', 'ease-in-out');
        }
        
        // After fade out transition, show main content
        setTimeout(function() {
            if (mainContent) {
                mainContent.classList.remove('opacity-0');
                mainContent.classList.add('opacity-100', 'transition-opacity', 'duration-1000', 'ease-in-out');
            }
            // Hide loading wrapper completely
            if (loadingWrapper) {
                loadingWrapper.style.display = 'none';
            }
        }, 700); // Wait for fade-out animation to complete
    }, 2000); // 2 seconds loading time

    // Initialize Lucide icons
    lucide.createIcons();
    
    // Initialize AOS animations
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100,
        delay: 0
    });
    
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
        
        // Hide hamburger button when menu is open
        if (mobileMenuBtn) {
            mobileMenuBtn.classList.add('opacity-0', 'pointer-events-none');
        }
    }
    
    function closeMobileMenu() {
        mobileMenu.classList.add('-translate-x-full');
        mobileMenuOverlay.classList.add('opacity-0', 'pointer-events-none');
        mobileMenuOverlay.classList.remove('opacity-100');
        document.body.classList.remove('overflow-hidden');
        
        // Show hamburger button when menu is closed
        if (mobileMenuBtn) {
            mobileMenuBtn.classList.remove('opacity-0', 'pointer-events-none');
        }
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
        const navLinks = document.querySelectorAll('nav a[href^="#"]'); // Only navbar links
        const homeLinks = document.querySelectorAll('nav a[href="#home"]'); // Only navbar home links
        
        // Remove active class from navbar links first
        navLinks.forEach(link => {
            link.classList.remove('text-orange-600', 'bg-orange-50');
        });
        
        // Add active class to navbar home links only
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
    
    // Active navigation highlighting - exclude footer links
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('nav a[href^="#"]'); // Only navbar links, not footer
        
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
    
    // Scroll-to-top button functionality
    const scrollTopBtn = document.getElementById('scroll-top-btn');
    if (scrollTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.remove('opacity-0', 'pointer-events-none');
                scrollTopBtn.classList.add('opacity-100');
            } else {
                scrollTopBtn.classList.add('opacity-0', 'pointer-events-none');
                scrollTopBtn.classList.remove('opacity-100');
            }
        });

        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // Mobile menu active state management with curved highlights
    function updateMobileMenuActiveState() {
        const mobileMenuItems = document.querySelectorAll('.mobile-menu-item');
        const currentSection = getCurrentSection();
        
        mobileMenuItems.forEach(item => {
            const href = item.getAttribute('href');
            const targetSection = href ? href.substring(1) : ''; // Remove #
            
            if (targetSection === currentSection) {
                // Add curved highlight for active section - exactly same as hover
                item.style.background = 'linear-gradient(to right, rgb(254, 215, 170), rgb(254, 215, 170))';
                item.style.color = '#ea580c';
                item.style.transform = 'translateX(4px)';
                
                // Force override the hover background element to show active state
                const hoverBg = item.querySelector('.absolute.inset-0');
                if (hoverBg) {
                    hoverBg.style.background = 'linear-gradient(to right, rgb(254, 215, 170), rgb(254, 215, 170))';
                    hoverBg.style.opacity = '1';
                }
                
                // Update icon background - same as hover
                const iconContainer = item.querySelector('.w-8.h-8');
                if (iconContainer) {
                    iconContainer.style.background = 'rgb(254, 215, 170)';
                    iconContainer.style.color = '#ea580c';
                }
            } else {
                // Reset styles for non-active items
                item.style.background = '';
                item.style.color = '';
                item.style.transform = '';
                
                // Reset hover background element
                const hoverBg = item.querySelector('.absolute.inset-0');
                if (hoverBg) {
                    hoverBg.style.background = '';
                    hoverBg.style.opacity = '';
                }
                
                const iconContainer = item.querySelector('.w-8.h-8');
                if (iconContainer) {
                    iconContainer.style.background = '';
                    iconContainer.style.color = '';
                }
            }
        });
    }
    
    // Get current section based on scroll position
    function getCurrentSection() {
        const sections = ['home', 'services', 'about', 'features', 'why-us', 'reviews', 'gallery', 'contact'];
        let currentSection = 'home';
        const scrollPosition = window.scrollY + 150; // Account for fixed nav height
        
        // Check if we're at the bottom of the page (improved detection)
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.scrollY;
        const isAtBottom = (scrollTop + windowHeight) >= (documentHeight - 100);
        
        // If at bottom, always show contact as active
        if (isAtBottom) {
            return 'contact';
        }
        
        // Check contact section specifically first (since it's the last section)
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            const contactTop = contactSection.offsetTop;
            const contactHeight = contactSection.offsetHeight;
            
            // If we're anywhere in the contact section or beyond it
            if (scrollPosition >= contactTop) {
                return 'contact';
            }
        }
        
        // Find the current section based on scroll position (reverse order for better detection)
        for (let i = sections.length - 1; i >= 0; i--) {
            const sectionId = sections[i];
            const section = document.getElementById(sectionId);
            if (section) {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    currentSection = sectionId;
                    break;
                }
            }
        }
        
        return currentSection;
    }
    
    // Update active state on scroll
    window.addEventListener('scroll', updateMobileMenuActiveState);
    
    // Initial call to set active state
    updateMobileMenuActiveState();
    
    console.log('Mi Fix website loaded successfully!');

    // Initialize scroll to top functionality
    initScrollToTop();
});

// Gallery modal with swipe and arrow navigation
let currentImageIndex = 0;
let galleryImages = [];
let touchStartX = 0;
let touchEndX = 0;

// Initialize gallery images array
function initializeGallery() {
    galleryImages = [
        { src: 'assets/img/motherboard-repair-work.png', caption: 'Software Flash Service' },
        { src: 'assets/img/smartphone-repair-process.png', caption: 'IC Replacement Service' },
        { src: 'assets/img/chip-level-repair.png', caption: 'Charging Error Fix' },
        { src: 'assets/img/screen-replacement-work.png', caption: 'IC Replacement Service' },
        { src: 'assets/img/battery-replacement.png', caption: 'IC Repair Service' },
        { src: 'assets/img/water-damage-repair.png', caption: 'Water Damage Repair' },
        { src: 'assets/img/charging-port-repair.png', caption: 'IC Repair Service' },
        { src: 'assets/img/expert-technician-work.jpg', caption: 'Water Damage Restoration' },
        { src: 'assets/img/equipment-tools-1.jpg', caption: 'Water Damage Repair' },
        { src: 'assets/img/repair-process.jpg', caption: 'White Screen Fix' },
        { src: 'assets/img/repair-showcase-1.jpg', caption: 'White Screen Fix' },
        { src: 'assets/img/repair-showcase-3.jpg', caption: 'Expert Showcase' }
    ];
}

function openModal(imageSrc, caption) {
    // Find the current image index
    currentImageIndex = galleryImages.findIndex(img => img.src === imageSrc);
    if (currentImageIndex === -1) currentImageIndex = 0;
    
    const modal = document.getElementById('imageModal');
    updateModalImage();
    
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    // Add touch event listeners for swipe
    modal.addEventListener('touchstart', handleTouchStart, { passive: true });
    modal.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    // Reinitialize lucide icons
    lucide.createIcons();
}

function updateModalImage() {
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const imageCounter = document.getElementById('imageCounter');
    const currentImage = galleryImages[currentImageIndex];
    
    // Add fade transition
    modalImage.style.opacity = '0';
    
    setTimeout(() => {
        modalImage.src = currentImage.src;
        modalImage.alt = currentImage.caption;
        modalCaption.textContent = currentImage.caption;
        imageCounter.textContent = `${currentImageIndex + 1} / ${galleryImages.length}`;
        modalImage.style.opacity = '1';
    }, 150);
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    updateModalImage();
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    updateModalImage();
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
    
    // Remove touch event listeners
    modal.removeEventListener('touchstart', handleTouchStart);
    modal.removeEventListener('touchend', handleTouchEnd);
}

// Touch event handlers for swipe gestures
function handleTouchStart(e) {
    touchStartX = e.changedTouches[0].screenX;
}

function handleTouchEnd(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}

function handleSwipe() {
    const swipeThreshold = 50; // Minimum distance for a swipe
    const swipeDistance = touchEndX - touchStartX;
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
        if (swipeDistance > 0) {
            // Swipe right - previous image
            prevImage();
        } else {
            // Swipe left - next image
            nextImage();
        }
    }
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    const modal = document.getElementById('imageModal');
    const isModalOpen = !modal.classList.contains('hidden');
    
    if (isModalOpen) {
        switch(e.key) {
            case 'Escape':
                closeModal();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                prevImage();
                break;
            case 'ArrowRight':
                e.preventDefault();
                nextImage();
                break;
        }
    }
});

// Initialize gallery on page load
initializeGallery(); 