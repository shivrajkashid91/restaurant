/* ==================== PRELOADER ==================== */
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    preloader.style.opacity = '0';
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 500);
});

/* ==================== MOBILE MENU ==================== */
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

/* Menu Show */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('active');
    });
}

/* Menu Hidden */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('active');
    });
}

/* Remove Menu Mobile */
const navLink = document.querySelectorAll('.nav__link');

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('active');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/* Close Menu on Scroll */
window.addEventListener('scroll', () => {
    const navMenu = document.getElementById('nav-menu');
    if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
    }
});

/* ==================== SEARCH MODAL ==================== */
const searchBtn = document.getElementById('search-btn'),
      searchModal = document.getElementById('search-modal'),
      searchClose = document.getElementById('search-close');

if(searchBtn){
    searchBtn.addEventListener('click', () =>{
        searchModal.classList.add('active');
        gsap.from('.search-modal__content', {
            opacity: 0,
            y: -50,
            duration: 0.5,
            ease: "power2.out"
        });
    });
}

if(searchClose){
    searchClose.addEventListener('click', () =>{
        searchModal.classList.remove('active');
    });
}

/* Close Search on Escape */
document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && searchModal.classList.contains('active')){
        searchModal.classList.remove('active');
    }
});

/* ==================== CHANGE BACKGROUND HEADER ==================== */
const scrollHeader = () =>{
    const header = document.getElementById('header') || document.querySelector('.header');
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    if(window.scrollY >= 50) header.classList.add('scroll-header'); else header.classList.remove('scroll-header');
}
window.addEventListener('scroll', scrollHeader);

/* ==================== MENU FILTERING ==================== */
const menuCategories = document.querySelectorAll('.menu__category');
const menuItems = document.querySelectorAll('.menu__item');

menuCategories.forEach(category => {
    category.addEventListener('click', () => {
        // Update active class
        menuCategories.forEach(c => c.classList.remove('active'));
        category.classList.add('active');
        
        const filterValue = category.getAttribute('data-filter');
        
        menuItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                gsap.from(item, {
                    opacity: 0,
                    y: 20,
                    duration: 0.5,
                    ease: "power2.out"
                });
            } else {
                item.style.display = 'none';
            }
        });
    });
});

/* ==================== SCROLL SECTIONS ACTIVE LINK ==================== */
const sections = document.querySelectorAll('section[id]');

const scrollActive = () =>{
    const scrollY = window.pageYOffset;

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']');

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link');
        }else{
            sectionsClass.classList.remove('active-link');
        }                                                    
    });
}
window.addEventListener('scroll', scrollActive);

/* ==================== SHOW BACK TO TOP ==================== */
const scrollUp = () =>{
	const scrollUp = document.getElementById('back-to-top');
	// When the scroll is higher than 350 viewport height, add the show class to the a tag with the back-to-top class
	if(window.scrollY >= 350) scrollUp.classList.add('show'); else scrollUp.classList.remove('show');
}
window.addEventListener('scroll', scrollUp);

/* ==================== BOOKING FORM SUBMISSION ==================== */
const bookingForm = document.getElementById('booking-form'),
      bookingMessage = document.getElementById('booking-message');

if(bookingForm){
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulate form submission
        bookingForm.classList.add('hide');
        bookingMessage.classList.add('show');
        
        // Reset after 5 seconds
        setTimeout(() => {
            bookingForm.reset();
            bookingForm.classList.remove('hide');
            bookingMessage.classList.remove('show');
        }, 5000);
    });
}

/* ==================== CUSTOM CURSOR ==================== */
const cursorDot = document.querySelector('.cursor-dot'),
      cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    // Dot follows immediately
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Outline follows with a slight delay using GSAP for smoothness
    gsap.to(cursorOutline, {
        left: posX,
        top: posY,
        duration: 0.5,
        ease: "power2.out"
    });
});

// Cursor Hover Effects
const interactiveElements = document.querySelectorAll('a, button, .menu__item, .signature__card');

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorOutline.style.width = '60px';
        cursorOutline.style.height = '60px';
        cursorOutline.style.backgroundColor = 'rgba(255, 180, 0, 0.1)';
        cursorDot.style.transform = 'translate(-50%, -50%) scale(2)';
    });
    el.addEventListener('mouseleave', () => {
        cursorOutline.style.width = '40px';
        cursorOutline.style.height = '40px';
        cursorOutline.style.backgroundColor = 'transparent';
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
    });
});

/* ==================== MOUSE FOLLOW DEPTH (PARALLAX) ==================== */
document.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;

    gsap.to('.element-1', { x: moveX * 2, y: moveY * 2, duration: 1 });
    gsap.to('.element-2', { x: -moveX * 1.5, y: -moveY * 1.5, duration: 1 });
});

/* ==================== INITIALIZE LIBRARIES ==================== */
// AOS Initialization
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// GSAP Animations
gsap.from('.home__title', {
    opacity: 0,
    y: 100,
    duration: 1.5,
    ease: "power4.out",
    delay: 0.5
});

// Advanced Text Splitting Animation Effect (Simulated)
const heroTitle = document.querySelector('.home__title');
if(heroTitle) {
    const text = heroTitle.innerText;
    // We can't easily split into spans with SearchReplace safely without breaking tags, 
    // but we can animate the container and then sub-elements
}

gsap.from('.home__description', {
    opacity: 0,
    y: 50,
    duration: 1.5,
    ease: "power4.out",
    delay: 0.8
});

gsap.from('.home__btns', {
    opacity: 0,
    y: 50,
    duration: 1.5,
    ease: "power4.out",
    delay: 1.1
});

// Animate signature cards on scroll using GSAP + ScrollTrigger
gsap.from('.signature__card', {
    scrollTrigger: {
        trigger: '.signature__container',
        start: 'top 80%',
    },
    opacity: 0,
    y: 100,
    duration: 1,
    stagger: 0.3,
    ease: "power2.out"
});

gsap.from('.nav__logo', {
    opacity: 0,
    x: -50,
    duration: 1,
    ease: "power2.out",
    delay: 0.2
});

gsap.from('.nav__item', {
    opacity: 0,
    y: -20,
    duration: 1,
    ease: "power2.out",
    stagger: 0.1,
    delay: 0.5
});
