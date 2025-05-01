document.addEventListener('DOMContentLoaded', function() {
    // ===== Mobile Menu Toggle =====
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
      menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      });
    }
  
    // ===== Scroll Animations =====
    function animateOnScroll() {
      const elements = document.querySelectorAll(
        '.hero-text h1, .hero-text h2, .hero-text p, .btn, .image-frame, section h2, ' +
        '.education-card, .experience-card, .skill-card, .project-card, .certificate-card'
      );
  
      elements.forEach(el => {
        const elementPosition = el.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
  
        if (elementPosition < screenPosition) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }
      });
    }
  
    // Initialize styles for animated elements
    function initAnimations() {
      document.querySelectorAll('[class*="card"], .image-frame, section h2').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
      });
  
      // Hero image specific animation
      const heroImage = document.querySelector('.image-frame');
      if (heroImage) {
        heroImage.style.transform = 'translateX(-50px)';
      }
    }
  
    // ===== Smooth Scrolling =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 70,
            behavior: 'smooth'
          });
          
          // Close mobile menu if open
          if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
          }
        }
      });
    });
  
    // ===== Sticky Navbar =====
    const navbar = document.querySelector('nav');
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        navbar.style.background = 'rgba(26, 31, 44, 0.95)';
      } else {
        navbar.style.boxShadow = 'none';
        navbar.style.background = 'var(--dark-color)';
      }
    });
  
    // ===== Card Hover Effects (Desktop Only) =====
    const cards = document.querySelectorAll('.education-card, .experience-card, .skill-card, .project-card, .certificate-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        if (window.innerWidth > 768) {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const angleX = (y - centerY) / 20;
          const angleY = (centerX - x) / 20;
          
          card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.03)`;
        }
      });
  
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
      });
    });
  
    // Initialize everything
    initAnimations();
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
  });
  
  // ===== Optional Typewriter Effect =====
  function typeWriter() {
    const heroTitle = document.querySelector('.hero-text h1');
    if (heroTitle) {
      const text = heroTitle.textContent;
      heroTitle.textContent = '';
      let i = 0;
      
      function type() {
        if (i < text.length) {
          heroTitle.textContent += text.charAt(i);
          i++;
          setTimeout(type, 100);
        }
      }
      type();
    }
  }
  
  // Start typewriter after page loads
  window.addEventListener('load', typeWriter);