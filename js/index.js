const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.nav__link')

navToggle.addEventListener('click', () => {
    document.body.classList.toggle('nav-open');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        document.body.classList.remove('nav-open');
    })
});

if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
} else {
    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    }
}

window.onscroll = function () {
    const headerBar = document.querySelector(".header__bar");
    const themeSelector = document.querySelector(".theme__selector");
    const navButton = document.querySelector(".nav__button");
    const aboutMe = document.querySelector(".about-me");
    const myExperience = document.querySelector(".my-experience");

    let scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    ;
    headerBar.style.opacity = (0 + scrollPos / 500);

    if (scrollPos >= 300) {
        aboutMe.classList.add("is-visible");
    }
    if (scrollPos >= 1000) {
        myExperience.classList.add("is-visible");
    }

    if (headerBar.style.opacity > 0 && headerBar.style.opacity < 0.7) {
        themeSelector.style.pointerEvents = "none";
        navButton.style.pointerEvents = "none";
    } else {
        themeSelector.style.pointerEvents = "auto";
        navButton.style.pointerEvents = "auto";
    }

};