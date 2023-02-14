function navToggle() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelectorAll('.nav__link')

    navToggle.addEventListener('click', () => {
        document.body.classList.toggle('nav-open');
        if (document.body.classList.contains('nav-open')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            document.body.classList.remove('nav-open');
            document.body.style.overflow = 'auto';
        })
    });
}

function headerBarOpacity() {
    const headerBar = document.querySelector('.header__bar');
    const themeSelector = document.querySelector('.theme__selector');
    const navButton = document.querySelector('.nav-toggle');

    //Vary opacity of header bar based on scroll position
    let scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    headerBar.style.opacity = Math.min(1, 0 + (scrollPos / 500));

    //if opactiy <70 disable functionality
    if (headerBar.style.opacity <= 0.7) {
        themeSelector.style.pointerEvents = 'none';
        navButton.style.pointerEvents = 'none';
    } else {
        themeSelector.style.pointerEvents = 'auto';
        navButton.style.pointerEvents = 'auto';
    }
}

function sectionVisibility() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.intersectionRatio >= 0.8) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    });

    const aboutMe = document.querySelector(".about-me");
    const education = document.querySelector(".my-education");
    const myExperience = document.querySelector(".my-experience");
    

    observer.observe(aboutMe);
    observer.observe(education);
    observer.observe(myExperience);
}

window.onscroll = function () {
    headerBarOpacity();
    sectionVisibility();
};

window.onload = function () {
    headerBarOpacity();
    navToggle();
};
