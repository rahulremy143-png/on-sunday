/* -------------------------------------------------------------
   SRI KANYA HANDICRAFTS - INTERACTIVE ENGINE (script.js - V2)
   ------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {

  // 1. SCROLLED NAVIGATION STICKY HEADER
  const header = document.getElementById('main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. MOBILE HAMBURGER MENU
  const menuToggle = document.getElementById('menuToggle');
  const navOverlay = document.getElementById('navOverlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  function toggleMenu() {
    menuToggle.classList.toggle('active');
    navOverlay.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
  }

  menuToggle.addEventListener('click', toggleMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navOverlay.classList.contains('active')) {
        toggleMenu();
      }
    });
  });

  // 3. DAY / NIGHT THEME TOGGLE
  const themeToggle = document.getElementById('themeToggle');
  
  // Check theme memory
  const savedTheme = localStorage.getItem('sri-kanya-theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
  }

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('sri-kanya-theme', 'dark');
    } else {
      localStorage.setItem('sri-kanya-theme', 'light');
    }
  });

  // 4. DYNAMIC SHOP TIMING HUD Check
  const shopStatusHud = document.getElementById('shop-status-hud');
  if (shopStatusHud) {
    const statusDot = shopStatusHud.querySelector('.status-dot');
    const statusText = shopStatusHud.querySelector('.status-text');
    
    // Shop hours: 9:00 AM (9) to 9:00 PM (21)
    const currentHour = new Date().getHours();
    
    if (currentHour >= 9 && currentHour < 21) {
      statusDot.classList.remove('closed');
      statusText.innerHTML = 'Open Now (9:00 AM - 9:00 PM)';
    } else {
      statusDot.classList.add('closed');
      statusText.innerHTML = 'Closed Now (Opens at 9:00 AM)';
    }
  }

  // 5. 3D PARALLAX SHOWCASE IN HERO
  const heroStack = document.getElementById('hero-3d-stack');
  const hero = document.getElementById('hero');

  if (hero && heroStack) {
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Compute angles for smooth 3D tilt
      const rotateX = -y / 35;
      const rotateY = x / 35;

      heroStack.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    hero.addEventListener('mouseleave', () => {
      heroStack.style.transform = `rotateX(0deg) rotateY(0deg)`;
    });
  }

  // 6. INTERACTIVE HOVER VIDEO ENGINE
  const videoFrame = document.getElementById('video-frame');
  const video = document.getElementById('artisan-video');
  const playIcon = document.getElementById('playIcon');

  if (videoFrame && video) {
    // Play video on hover
    videoFrame.addEventListener('mouseenter', () => {
      videoFrame.classList.add('playing');
      const playPromise = video.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log("Hover video playback started muted");
        });
      }
    });

    // Pause video on leave
    videoFrame.addEventListener('mouseleave', () => {
      videoFrame.classList.remove('playing');
      video.pause();
    });

    // Click to toggle mute/unmute
    videoFrame.addEventListener('click', () => {
      if (video.muted) {
        video.muted = false;
        playIcon.className = "fa-solid fa-volume-high";
      } else {
        video.muted = true;
        playIcon.className = "fa-solid fa-volume-xmark";
      }
    });
  }

  // 7. MAP TRANSFORMATION MORPHING SCRIPT
  const mapCard = document.getElementById('mapCard');
  const mapTransformBtn = document.getElementById('mapTransformBtn');
  const mapResetBtnBack = document.getElementById('mapResetBtnBack');
  const routePath = document.getElementById('routePath');

  if (mapCard && mapTransformBtn) {
    // Flip to map and trigger route line draw
    mapTransformBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      mapCard.classList.add('transformed');
      if (routePath) {
        // Trigger path drawing
        setTimeout(() => {
          routePath.classList.add('draw');
        }, 600);
      }
    });

    // Flip back
    if (mapResetBtnBack) {
      mapResetBtnBack.addEventListener('click', (e) => {
        e.stopPropagation();
        mapCard.classList.remove('transformed');
        if (routePath) {
          routePath.classList.remove('draw');
        }
      });
    }
  }

  // 8. DYNAMIC INJECTION OF SPOTLIGHT GRADIENT IN FOOTER SVG
  const svg = document.querySelector('.silhouette-svg');
  if (svg) {
    let defs = svg.querySelector('defs');
    if (!defs) {
      defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
      svg.insertBefore(defs, svg.firstChild);
    }
    
    // Add spotlight linear gradient
    const grad = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    grad.setAttribute('id', 'spotlightGrad');
    grad.setAttribute('x1', '0.5'); grad.setAttribute('y1', '0');
    grad.setAttribute('x2', '0.5'); grad.setAttribute('y2', '1');
    
    const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop1.setAttribute('offset', '0%');
    stop1.setAttribute('stop-color', 'rgba(255, 248, 220, 0.45)');
    
    const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop2.setAttribute('offset', '100%');
    stop2.setAttribute('stop-color', 'rgba(255, 248, 220, 0)');
    
    grad.appendChild(stop1);
    grad.appendChild(stop2);
    defs.appendChild(grad);
  }

  // 9. GALLERY FILTER SYSTEM
  const tabs = document.querySelectorAll('.filter-tab');
  const cards = document.querySelectorAll('.flip-card-container');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterVal = tab.getAttribute('data-category');

      cards.forEach(card => {
        const itemCategory = card.getAttribute('data-category');
        
        card.style.opacity = '0';
        card.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
          if (filterVal === 'all' || itemCategory === filterVal) {
            card.classList.remove('hidden');
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            }, 50);
          } else {
            card.classList.add('hidden');
          }
        }, 300);
      });
    });
  });

  // 10. TOUCH SUPPORT FOR FLIP CARDS
  cards.forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.enquire-btn')) {
        return;
      }
      
      if (window.matchMedia("(max-width: 1024px)").matches) {
        card.classList.toggle('touched');
        cards.forEach(c => {
          if (c !== card) c.classList.remove('touched');
        });
      }
    });
  });

  // 11. FOOTER OCEAN PARTICLE ENGINE
  const canvas = document.getElementById('footer-particles');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    window.addEventListener('resize', () => {
      if (canvas.parentElement) {
        width = canvas.width = canvas.parentElement.offsetWidth;
        height = canvas.height = canvas.parentElement.offsetHeight;
      }
    });

    const particles = [];
    const colors = ['#00f5d4', '#94d2bd', '#00b4d8', '#ffb703'];

    class OceanSparkle {
      constructor() {
        this.reset();
        this.y = Math.random() * height;
      }

      reset() {
        this.x = Math.random() * width;
        this.y = height + 10;
        this.size = Math.random() * 3 + 1;
        this.speedY = -(Math.random() * 0.8 + 0.2);
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.opacity = Math.random() * 0.7 + 0.1;
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.opacity -= 0.001;

        if (this.y < 0 || this.opacity <= 0) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.restore();
      }
    }

    const maxParticles = 40;
    for (let i = 0; i < maxParticles; i++) {
      particles.push(new OceanSparkle());
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animateParticles);
    }

    animateParticles();
  }

  // 12. SCROLL INTERSECTION REVEAL EFFECT
  const revealElements = document.querySelectorAll('.info-card, .section-header, .filter-container, .gallery-grid, .map-transform-container');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15
  });

  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    el.classList.add('reveal-ready');
    revealObserver.observe(el);
  });

  const revealStyle = document.createElement('style');
  revealStyle.innerHTML = `
    .reveal-active {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(revealStyle);

  // 13. PROTRACK STORE CARD 3D TILT & VIEWPORT REVEAL ENGINE
  const protrackCard = document.getElementById('protrackStoreCard');
  if (protrackCard) {
    const parent = protrackCard.parentElement;
    
    // Ensure wrapper shows pointer cursor
    parent.style.cursor = 'pointer';
    
    // Bind click to the wrapper to bypass 3D click hit-testing bugs
    parent.addEventListener('click', (e) => {
      e.preventDefault();
      window.open(protrackCard.href, '_blank');
    });

    parent.addEventListener('mousemove', (e) => {
      const rect = parent.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Calculate rotation angles
      const rotateX = -y / 15;
      const rotateY = x / 15;
      
      protrackCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
    });
    
    parent.addEventListener('mouseleave', () => {
      protrackCard.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
    });
  }

  const protrackWrapper = document.querySelector('.store-3d-card-wrapper');
  if (protrackWrapper) {
    protrackWrapper.classList.add('reveal-hidden');
    const storeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          protrackWrapper.classList.add('reveal-show');
          storeObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12
    });
    storeObserver.observe(protrackWrapper);
  }

});
