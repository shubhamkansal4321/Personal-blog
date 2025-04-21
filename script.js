// Main JavaScript file for Shubham Kansal's blog

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initCustomCursor();
    initThemeSwitcher();
    init3DCardEffect();
    initBackToTopButton();
    initReadingProgressBar();
    initMobileMenu();
    initImageComparisonSlider();
    initSearchFunctionality();
    initFormValidation();
    initLoadingAnimations();
    initCategoryFilter();
});

// ------------ CUSTOM CURSOR ------------
function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.cursor-dot');
    
    if (!cursor || !cursorDot) return;
    
    document.addEventListener('mousemove', (e) => {
        // Update cursor position with a slight delay for the main cursor (trailing effect)
        setTimeout(() => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        }, 100);
        
        // Update dot position immediately (follows cursor exactly)
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
    });
    
    // Add classes on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .card, .interactive');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-active');
            cursorDot.classList.add('cursor-active');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-active');
            cursorDot.classList.remove('cursor-active');
        });
    });
}

// ------------ THEME SWITCHER ------------
function initThemeSwitcher() {
    const themeOptions = document.querySelectorAll('.theme-color');
    const root = document.documentElement;
    
    if (themeOptions.length === 0) return;
    
    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
        applyTheme(JSON.parse(savedTheme));
    }
    
    themeOptions.forEach(option => {
        option.addEventListener('click', function() {
            const themeColor = this.dataset.color;
            const secondaryColor = this.dataset.secondary;
            const accentColor = this.dataset.accent;
            
            const themeData = {
                main: themeColor,
                secondary: secondaryColor,
                accent: accentColor
            };
            
            applyTheme(themeData);
            localStorage.setItem('selectedTheme', JSON.stringify(themeData));
            
            // Show visual feedback
            themeOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    function applyTheme(themeData) {
        root.style.setProperty('--primary-color', themeData.main);
        root.style.setProperty('--secondary-color', themeData.secondary);
        root.style.setProperty('--accent-color', themeData.accent);
    }
}

// ------------ 3D CARD EFFECT ------------
function init3DCardEffect() {
    const cards = document.querySelectorAll('.card-3d');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', handleCardMove);
        card.addEventListener('mouseenter', handleCardEnter);
        card.addEventListener('mouseleave', handleCardLeave);
    });
    
    function handleCardMove(e) {
        const card = this;
        const cardRect = card.getBoundingClientRect();
        
        // Calculate mouse position relative to card center
        const cardCenterX = cardRect.left + cardRect.width / 2;
        const cardCenterY = cardRect.top + cardRect.height / 2;
        const mouseX = e.clientX - cardCenterX;
        const mouseY = e.clientY - cardCenterY;
        
        // Calculate rotation values (limited to +/- 15 degrees)
        const rotateY = (mouseX / (cardRect.width / 2)) * 15;
        const rotateX = -(mouseY / (cardRect.height / 2)) * 15;
        
        // Apply the transform
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        
        // Add highlight effect based on mouse position
        const shine = card.querySelector('.card-shine') || createShineElement(card);
        const shineX = (mouseX / cardRect.width) * 100 + 50;
        const shineY = (mouseY / cardRect.height) * 100 + 50;
        shine.style.background = `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 50%)`;
    }
    
    function handleCardEnter() {
        this.style.transition = 'none';
    }
    
    function handleCardLeave() {
        this.style.transition = 'transform 0.5s ease';
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        
        const shine = this.querySelector('.card-shine');
        if (shine) {
            shine.style.background = 'none';
        }
    }
    
    function createShineElement(card) {
        const shine = document.createElement('div');
        shine.classList.add('card-shine');
        shine.style.position = 'absolute';
        shine.style.top = '0';
        shine.style.left = '0';
        shine.style.right = '0';
        shine.style.bottom = '0';
        shine.style.pointerEvents = 'none';
        shine.style.zIndex = '1';
        card.appendChild(shine);
        return shine;
    }
}

// ------------ BACK TO TOP BUTTON ------------
function initBackToTopButton() {
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', () => {
        // Show button when scrolled down 300px
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Smooth scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ------------ READING PROGRESS BAR ------------
function initReadingProgressBar() {
    const progressBar = document.querySelector('.reading-progress-bar');
    
    if (!progressBar) return;
    
    window.addEventListener('scroll', () => {
        // Calculate how far user has scrolled
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercentage = (scrollTop / docHeight) * 100;
        
        // Update progress bar width
        progressBar.style.width = scrollPercentage + '%';
    });
}

// ------------ MOBILE MENU ------------
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const body = document.body;
    
    if (!menuToggle || !mobileNav) return;
    
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        mobileNav.classList.toggle('active');
        body.classList.toggle('menu-open');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileNav.classList.contains('active') && 
            !mobileNav.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            
            menuToggle.classList.remove('active');
            mobileNav.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });
    
    // Close menu when pressing escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
            menuToggle.classList.remove('active');
            mobileNav.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });
    
    // Handle submenu toggling
    const subMenuToggles = mobileNav.querySelectorAll('.has-submenu');
    subMenuToggles.forEach(item => {
        const toggle = item.querySelector('.submenu-toggle');
        const submenu = item.querySelector('.submenu');
        
        if (toggle && submenu) {
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                submenu.classList.toggle('active');
                toggle.classList.toggle('active');
            });
        }
    });
}

// ------------ IMAGE COMPARISON SLIDER ------------
function initImageComparisonSlider() {
    const sliders = document.querySelectorAll('.image-comparison-slider');
    
    sliders.forEach(slider => {
        const handle = slider.querySelector('.slider-handle');
        const beforeImage = slider.querySelector('.before-image');
        
        if (!handle || !beforeImage) return;
        
        let isDragging = false;
        
        // Set initial position
        updateSliderPosition(slider, 50);
        
        // Handle interactions
        handle.addEventListener('mousedown', startDrag);
        handle.addEventListener('touchstart', startDrag, { passive: true });
        
        function startDrag() {
            isDragging = true;
            document.addEventListener('mousemove', drag);
            document.addEventListener('touchmove', drag, { passive: false });
            document.addEventListener('mouseup', stopDrag);
            document.addEventListener('touchend', stopDrag);
        }
        
        function drag(e) {
            if (!isDragging) return;
            
            e.preventDefault();
            
            const sliderRect = slider.getBoundingClientRect();
            const clientX = e.clientX || e.touches[0].clientX;
            
            // Calculate percentage
            let percentage = ((clientX - sliderRect.left) / sliderRect.width) * 100;
            percentage = Math.min(Math.max(percentage, 0), 100);
            
            updateSliderPosition(slider, percentage);
        }
        
        function stopDrag() {
            isDragging = false;
            document.removeEventListener('mousemove', drag);
            document.removeEventListener('touchmove', drag);
            document.removeEventListener('mouseup', stopDrag);
            document.removeEventListener('touchend', stopDrag);
        }
    });
    
    function updateSliderPosition(slider, percentage) {
        const handle = slider.querySelector('.slider-handle');
        const beforeImage = slider.querySelector('.before-image');
        
        handle.style.left = `${percentage}%`;
        beforeImage.style.width = `${percentage}%`;
    }
}

// ------------ SEARCH FUNCTIONALITY ------------
function initSearchFunctionality() {
    const searchToggle = document.querySelector('.search-toggle');
    const searchForm = document.querySelector('.search-form');
    const searchInput = document.querySelector('.search-input');
    const searchResults = document.querySelector('.search-results');
    
    if (!searchToggle || !searchForm) return;
    
    // Toggle search form visibility
    searchToggle.addEventListener('click', (e) => {
        e.preventDefault();
        searchForm.classList.toggle('active');
        
        if (searchForm.classList.contains('active') && searchInput) {
            searchInput.focus();
        }
    });
    
    // Close search on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchForm.classList.contains('active')) {
            searchForm.classList.remove('active');
        }
    });
    
    // Handle search input
    if (searchInput && searchResults) {
        // For demo: Sample blog post data
        const blogPosts = [
            { title: 'Advanced CSS Animations', category: 'CSS', url: '/blog/css-animations' },
            { title: 'JavaScript Best Practices', category: 'JavaScript', url: '/blog/js-best-practices' },
            { title: 'Getting Started with React', category: 'React', url: '/blog/react-intro' },
            { title: 'CSS Grid Layout', category: 'CSS', url: '/blog/css-grid' },
            { title: 'Responsive Design Tips', category: 'Design', url: '/blog/responsive-design' }
        ];
        
        let searchTimeout;
        
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            
            searchTimeout = setTimeout(() => {
                const query = this.value.toLowerCase().trim();
                
                if (query.length < 2) {
                    searchResults.innerHTML = '';
                    searchResults.classList.remove('show');
                    return;
                }
                
                // Filter blog posts based on query
                const filteredPosts = blogPosts.filter(post => 
                    post.title.toLowerCase().includes(query) || 
                    post.category.toLowerCase().includes(query)
                );
                
                displaySearchResults(filteredPosts, query);
            }, 300);
        });
        
        function displaySearchResults(results, query) {
            searchResults.innerHTML = '';
            
            if (results.length === 0) {
                searchResults.innerHTML = `<p class="no-results">No results found for "${query}"</p>`;
                searchResults.classList.add('show');
                return;
            }
            
            const resultsList = document.createElement('ul');
            
            results.forEach(post => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <a href="${post.url}">
                        <span class="result-title">${highlightMatch(post.title, query)}</span>
                        <span class="result-category">${post.category}</span>
                    </a>
                `;
                resultsList.appendChild(listItem);
            });
            
            searchResults.appendChild(resultsList);
            searchResults.classList.add('show');
        }
        
        function highlightMatch(text, query) {
            const regex = new RegExp(`(${query})`, 'gi');
            return text.replace(regex, '<mark>$1</mark>');
        }
        
        // Close search results when clicking outside
        document.addEventListener('click', (e) => {
            if (!searchForm.contains(e.target)) {
                searchResults.classList.remove('show');
            }
        });
    }
}

// ------------ FORM VALIDATION ------------
function initFormValidation() {
    const forms = document.querySelectorAll('form[data-validate]');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            let isValid = true;
            
            // Get all required fields
            const requiredFields = form.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                // Remove existing error messages
                removeError(field);
                
                // Check if field is empty
                if (!field.value.trim()) {
                    showError(field, 'This field is required');
                    isValid = false;
                } 
                // Email validation
                else if (field.type === 'email' && !validateEmail(field.value)) {
                    showError(field, 'Please enter a valid email address');
                    isValid = false;
                }
            });
            
            if (!isValid) {
                e.preventDefault();
            }
        });
        
        // Live validation
        const fields = form.querySelectorAll('input, textarea, select');
        fields.forEach(field => {
            field.addEventListener('blur', function() {
                if (field.required && !field.value.trim()) {
                    showError(field, 'This field is required');
                } else if (field.type === 'email' && field.value.trim() && !validateEmail(field.value)) {
                    showError(field, 'Please enter a valid email address');
                } else {
                    removeError(field);
                }
            });
            
            field.addEventListener('input', function() {
                if (field.value.trim()) {
                    removeError(field);
                }
            });
        });
    });
    
    function showError(field, message) {
        removeError(field);
        
        field.classList.add('error');
        
        const errorMessage = document.createElement('div');
        errorMessage.classList.add('error-message');
        errorMessage.textContent = message;
        
        const parent = field.parentElement;
        parent.appendChild(errorMessage);
    }
    
    function removeError(field) {
        field.classList.remove('error');
        
        const parent = field.parentElement;
        const errorMessage = parent.querySelector('.error-message');
        
        if (errorMessage) {
            parent.removeChild(errorMessage);
        }
    }
    
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email.toLowerCase());
    }
}

// ------------ LOADING ANIMATIONS ------------
function initLoadingAnimations() {
    // Elements to animate when they come into view
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in, .scale-in');
    
    if (animatedElements.length === 0) return;
    
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target); // Stop observing once animated
                }
            });
        }, {
            threshold: 0.2 // Trigger when 20% of the element is visible
        });
        
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        animatedElements.forEach(element => {
            element.classList.add('animate');
        });
    }
    
    // Initial page load animation
    document.body.classList.add('loaded');
}

// ------------ CATEGORY FILTER ------------
function initCategoryFilter() {
    const filterButtons = document.querySelectorAll('.category-filter button');
    const blogPosts = document.querySelectorAll('.blog-post');
    
    if (filterButtons.length === 0 || blogPosts.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.dataset.category;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter posts
            if (category === 'all') {
                // Show all posts
                blogPosts.forEach(post => {
                    post.style.display = 'block';
                    
                    // Add animation class
                    post.classList.add('fade-in');
                    setTimeout(() => {
                        post.classList.remove('fade-in');
                    }, 500);
                });
            } else {
                // Show only posts that match the category
                blogPosts.forEach(post => {
                    const postCategories = post.dataset.categories.split(',');
                    
                    if (postCategories.includes(category)) {
                        post.style.display = 'block';
                        
                        // Add animation class
                        post.classList.add('fade-in');
                        setTimeout(() => {
                            post.classList.remove('fade-in');
                        }, 500);
                    } else {
                        post.style.display = 'none';
                    }
                });
            }
        });
    });
}