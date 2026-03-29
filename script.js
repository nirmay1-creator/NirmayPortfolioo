const navbarEl   = document.getElementById('navbar');
const navPill    = document.getElementById('navPill');
const navLinks   = document.querySelectorAll('.nav-link');
const hamburger  = document.getElementById('hamburger');
const mobileNav  = document.getElementById('mobileNav');
const mobileClose= document.getElementById('mobileClose');

function movePill(el) {
    if (!navPill || !el) return;
    navPill.style.left  = el.offsetLeft + 'px';
    navPill.style.width = el.offsetWidth + 'px';
}

function setActiveLink(section) {
    navLinks.forEach(l => {
        const isActive = l.dataset.section === section;
        l.classList.toggle('active', isActive);
        if (isActive) movePill(l);
    });
    document.querySelectorAll('.mobile-nav a').forEach(l => {
        l.classList.toggle('active', l.dataset.section === section);
    });
}

navLinks.forEach(link => {
    link.addEventListener('mouseenter', () => movePill(link));
    link.addEventListener('mouseleave', () => {
        const active = document.querySelector('.nav-link.active');
        if (active) movePill(active);
    });
    link.addEventListener('click', () => setActiveLink(link.dataset.section));
});

window.addEventListener('load', () => {
    const active = document.querySelector('.nav-link.active');
    if (active) movePill(active);
});

hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileNav?.classList.toggle('open');
});

mobileClose?.addEventListener('click', () => {
    hamburger?.classList.remove('open');
    mobileNav?.classList.remove('open');
});

document.querySelectorAll('.mobile-nav a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger?.classList.remove('open');
        mobileNav?.classList.remove('open');
    });
});


const card = document.querySelector(".main-card");

document.addEventListener("mousemove", (e) => {
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (rect.left + rect.width / 2 - e.clientX) / 25;
    const y = (e.clientY - (rect.top + rect.height / 2)) / 25;
    card.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${y}deg)`;
});

document.addEventListener("mouseleave", () => {
    if (card) {
        card.style.transition = "transform 0.5s ease";
        card.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg)";
    }
});

card?.addEventListener("mousemove", () => { card.style.transition = "none"; });
card?.addEventListener("mouseleave", () => {
    card.style.transition = "transform 0.5s ease";
    card.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg)";
});


/* icon bubbles: staggered float speeds via CSS var */
document.querySelectorAll('.icon-bubble').forEach((el, i) => {
    const dur = 2.8 + (i % 5) * 0.35;
    el.style.setProperty('--float-dur', dur + 's');
});

const badges = document.querySelectorAll(".badge");
const badgeState = [];

badges.forEach((badge, i) => {
    const speed = 500 + i * 80;
    const amplitude = 5 + (i % 3);
    badgeState.push({ hovering: false, floatY: 0 });

    function animate() {
        if (!badgeState[i].hovering) {
            const float = Math.sin(Date.now() / speed + i * 1.2) * amplitude;
            badgeState[i].floatY = float;
            badge.style.transform = `translateY(${float}px) scale(1)`;
        }
        requestAnimationFrame(animate);
    }
    animate();

    badge.addEventListener("mousemove", (e) => {
        badgeState[i].hovering = true;
        const rect = badge.getBoundingClientRect();
        const mx = (e.clientX - (rect.left + rect.width / 2)) * 0.35;
        const my = (e.clientY - (rect.top + rect.height / 2)) * 0.35;
        badge.style.transition = "transform 0.1s ease, box-shadow 0.2s ease";
        badge.style.transform = `translate(${mx}px, ${my}px) scale(1.2)`;
        badge.style.boxShadow = "0 8px 25px rgba(0,0,0,0.4), 0 0 15px rgba(255,255,255,0.15)";
        badge.style.zIndex = "10";
    });

    badge.addEventListener("mouseleave", () => {
        badgeState[i].hovering = false;
        badge.style.transition = "transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease";
        badge.style.transform = `translateY(${badgeState[i].floatY}px) scale(1)`;
        badge.style.boxShadow = "none";
        badge.style.zIndex = "5";
    });

    badge.addEventListener("click", () => {
        badge.style.transition = "transform 0.1s ease";
        badge.style.transform = `translateY(${badgeState[i].floatY}px) scale(0.88)`;
        setTimeout(() => {
            badge.style.transition = "transform 0.4s cubic-bezier(0.34,1.56,0.64,1)";
            badge.style.transform = `translateY(${badgeState[i].floatY}px) scale(1.15)`;
            setTimeout(() => {
                badge.style.transform = `translateY(${badgeState[i].floatY}px) scale(1)`;
            }, 300);
        }, 100);
    });
});




const heroRevealEls = document.querySelectorAll(".hero, .main-card");
heroRevealEls.forEach((el, i) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`;
});

const skillTags = document.querySelectorAll(".skill-tag");
skillTags.forEach((el, i) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(15px)";
    el.style.transition = `opacity 0.4s ease ${i * 0.04}s, transform 0.4s ease ${i * 0.04}s`;
});

const revealEls = document.querySelectorAll(".reveal");
const sections  = ['home', 'about', 'projects', 'contact'];

function revealOnScroll() {
  
    if (window.scrollY > 20) {
        navbarEl?.classList.add('scrolled');
    } else {
        navbarEl?.classList.remove('scrolled');
    }


    let current = 'home';
    sections.forEach(id => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) current = id;
    });
    setActiveLink(current);

    [...heroRevealEls, ...skillTags].forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 60) {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
        }
    });

    const aboutName = document.querySelector(".about-name");
    if (aboutName) {
        const rect = aboutName.getBoundingClientRect();
        if (rect.top < window.innerHeight - 60) aboutName.classList.add("revealed");
    }


    revealEls.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 80) el.classList.add("visible");
    });

    document.querySelectorAll(".stat-number[data-target]").forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 60 && !el.dataset.counted) {
            el.dataset.counted = "true";
            const target = parseInt(el.dataset.target);
            let count = 0;
            const step = Math.ceil(target / 30);
            const interval = setInterval(() => {
                count = Math.min(count + step, target);
                el.textContent = count + "+";
                if (count >= target) clearInterval(interval);
            }, 40);
        }
    });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);


const texts = [
    "Cybersecurity Expert",
    "Ethical Hacker",
    "Full Stack Developer",
    "Python Developer",
    "UI Designer"
];

let textIndex = 0, charIndex = 0, isDeleting = false;
const typingEl = document.querySelector(".typing-text");

function typeEffect() {
    if (!typingEl) return;
    const current = texts[textIndex];

    if (!isDeleting) {
        typingEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === current.length) {
            isDeleting = true;
            setTimeout(typeEffect, 1800);
            return;
        }
    } else {
        typingEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }
    }
    setTimeout(typeEffect, isDeleting ? 45 : 85);
}
typeEffect();



document.querySelectorAll("a[href^='#']").forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});



document.querySelectorAll(".skill-tag").forEach(tag => {
    tag.addEventListener("mouseenter", () => {
        tag.style.transform = "translateY(-3px) scale(1.05)";
        tag.style.transition = "transform 0.2s ease, background 0.2s, border-color 0.2s";
    });
    tag.addEventListener("mouseleave", () => {
        tag.style.transform = "translateY(0) scale(1)";
    });
});



const aboutSection = document.querySelector(".about");
if (aboutSection) {
    aboutSection.addEventListener("mousemove", (e) => {
        const rect = aboutSection.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        aboutSection.style.backgroundPosition = `${50 + px * 8}% ${50 + py * 8}%`;
    });
}



document.querySelectorAll(".stat-number").forEach(el => {
    const val = parseInt(el.textContent);
    if (!isNaN(val)) {
        el.dataset.target = val;
        el.textContent = "0+";
    }
});

setTimeout(revealOnScroll, 100);


/* ═══════════════════════════════════════════
   SCREENSHOT SLIDER — JusticeFlowX
═══════════════════════════════════════════ */

(function initSlider() {
    const track  = document.getElementById('screenshotTrack');
    const dots   = document.querySelectorAll('.slider-dot');
    const prev   = document.getElementById('sliderPrev');
    const next   = document.getElementById('sliderNext');
    const slides = document.querySelectorAll('.screenshot-slide');

    if (!track || !slides.length) return;

    let current = 0;
    let autoTimer = null;

    function goTo(index) {
        current = (index + slides.length) % slides.length;
        track.style.transform = `translateX(-${current * 100}%)`;
        dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    function startAuto() {
        stopAuto();
        autoTimer = setInterval(() => goTo(current + 1), 3500);
    }

    function stopAuto() {
        if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
    }

    prev?.addEventListener('click', () => { goTo(current - 1); stopAuto(); startAuto(); });
    next?.addEventListener('click', () => { goTo(current + 1); stopAuto(); startAuto(); });

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            goTo(parseInt(dot.dataset.index));
            stopAuto();
            startAuto();
        });
    });

    // Pause on hover
    const slider = document.getElementById('screenshotSlider');
    slider?.addEventListener('mouseenter', stopAuto);
    slider?.addEventListener('mouseleave', startAuto);

    // Touch/swipe support
    let touchStartX = 0;
    slider?.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    slider?.addEventListener('touchend', e => {
        const delta = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(delta) > 40) {
            goTo(delta > 0 ? current + 1 : current - 1);
            stopAuto(); startAuto();
        }
    });

    goTo(0);
    startAuto();
})();


/* ── Subtle tilt on project visual ── */
(function initProjectTilt() {
    const visual = document.querySelector('.project-visual');
    if (!visual) return;

    visual.addEventListener('mousemove', (e) => {
        const rect = visual.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 6;
        const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 6;
        visual.style.transition = 'none';
        visual.style.transform = `perspective(900px) rotateY(${x}deg) rotateX(${-y}deg)`;
    });

    visual.addEventListener('mouseleave', () => {
        visual.style.transition = 'transform 0.6s ease';
        visual.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg)';
    });
})();