// Loading screen
window.addEventListener('load', function() {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
    }, 1500);
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.skill-card, .experience-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add subtle parallax effect to hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Dynamic typing effect for hero subtitle
const subtitle = document.querySelector('.hero-subtitle');
const text = 'PROFESSIONAL EDITOR';
let index = 0;

function typeWriter() {
    if (index < text.length) {
        subtitle.textContent = text.slice(0, index + 1);
        index++;
        setTimeout(typeWriter, 100);
    }
}

// Start typing effect after hero animation
setTimeout(typeWriter, 2000);

// Additional interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Add mouse movement effect to hero section
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    hero.addEventListener('mousemove', function(e) {
        const rect = hero.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const deltaX = (x - centerX) / centerX;
        const deltaY = (y - centerY) / centerY;
        
        heroContent.style.transform = `translate(${deltaX * 10}px, ${deltaY * 10}px)`;
    });
    
    hero.addEventListener('mouseleave', function() {
        heroContent.style.transform = 'translate(0, 0)';
    });

    // Add click ripple effect to buttons
    const buttons = document.querySelectorAll('.cta-button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const ripple = document.createElement('span');
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Smooth reveal animation for sections
    const sections = document.querySelectorAll('.section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        sectionObserver.observe(section);
    });

    // Add CSS for section reveal
    const sectionStyle = document.createElement('style');
    sectionStyle.textContent = `
        .section-visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(sectionStyle);

    // Contact form interaction (if you want to add a contact form later)
    const contactButton = document.querySelector('a[href^="mailto:"]');
    if (contactButton) {
        contactButton.addEventListener('click', function() {
            // Add a subtle animation when email is clicked
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }

    // Add scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: var(--accent-color);
        z-index: 10001;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });

    // Auto-change testimonials every 5 seconds (improved for stacking)
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const navDots = document.querySelectorAll('.nav-dot');
    let currentTestimonial = 0;
    function showTestimonial(index) {
        testimonialCards.forEach((card, i) => {
            card.classList.remove('active');
            card.style.opacity = '0';
            card.style.zIndex = '0';
            card.style.position = 'absolute';
        });
        testimonialCards[index].classList.add('active');
        testimonialCards[index].style.opacity = '1';
        testimonialCards[index].style.zIndex = '1';
        testimonialCards[index].style.position = 'relative';
        navDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }
    showTestimonial(currentTestimonial);
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    }, 5000);
    navDots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            currentTestimonial = i;
            showTestimonial(i);
        });
    });

    // === Google Drive Video Gallery ===
    const API_KEY = 'AIzaSyATKOfH2yNoKA2yU27PEcSIliukPIgOs1Q';
    const FOLDER_ID = '1xbzjQPq4M4MB8FEI93YIBp_Zh2bDu60g';
    const videoGallery = document.getElementById('video-gallery');

    function createVideoCard(file) {
        const videoId = file.id;
        const videoName = file.name;
        const videoUrl = `https://drive.google.com/file/d/${videoId}/preview`;
        const card = document.createElement('div');
        card.className = 'project-card video-card';
        card.innerHTML = `
            <div class="video-wrapper">
                <iframe src="${videoUrl}" width="640" height="360" allow="autoplay"></iframe>
            </div>
            <div class="video-info">
                <h3>${videoName}</h3>
            </div>
        `;
        return card;
    }

    function loadDriveVideos() {
        const url = `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}'+in+parents+and+mimeType+contains+'video/'&key=${API_KEY}&fields=files(id,name,mimeType)`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                videoGallery.innerHTML = '';
                if (data.files && data.files.length > 0) {
                    data.files.forEach(file => {
                        videoGallery.appendChild(createVideoCard(file));
                    });
                } else {
                    videoGallery.innerHTML = '<p>No videos found in the folder.</p>';
                }
            })
            .catch(err => {
                videoGallery.innerHTML = '<p>Error loading videos.</p>';
                console.error('Google Drive API error:', err);
            });
    }

    document.addEventListener('DOMContentLoaded', loadDriveVideos);

    // Blur/fade hero and blur about when about is visible (lifted)
    const aboutSection = document.getElementById('about');
    const aboutContent = document.querySelector('.about-content');
    const heroSection = document.querySelector('.hero');

    if (aboutSection && aboutContent && heroSection) {
        const aboutObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    aboutContent.classList.add('lifted');
                    heroSection.classList.add('blur-fade');
                } else {
                    aboutContent.classList.remove('lifted');
                    heroSection.classList.remove('blur-fade');
                }
            });
        }, { threshold: 0.5 });
        aboutObserver.observe(aboutSection);
    }
});
