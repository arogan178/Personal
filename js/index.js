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
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (window.scrollY > 450) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    });

    const header = document.querySelector(".header__bar");

    observer.observe(header);
}

function sectionVisibility() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.intersectionRatio >= 0.7) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    });

    const aboutMe = document.querySelector(".about-me");
    const myExperience = document.querySelector(".my-experience");


    observer.observe(aboutMe);
    observer.observe(myExperience);
}

function createBackToTopButton() {
    const backToTopBtn = document.querySelector("#back-to-top");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
            backToTopBtn.classList.add("btn-show");
            backToTopBtn.classList.remove("btn-hide");
        } else {
            backToTopBtn.classList.remove("btn-show");
            backToTopBtn.classList.add("btn-hide");
        }
    });

    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

window.onscroll = function () {
    headerBarOpacity();
    sectionVisibility();
};

window.onload = function () {
    headerBarOpacity();
    navToggle();
    createBackToTopButton();
};


