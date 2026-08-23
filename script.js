/* =========================================================
   ORBITA — SCRIPT.JS
   Interações e animações
   ========================================================= */


/* =========================================================
   01. ELEMENTOS PRINCIPAIS
   ========================================================= */

const body = document.body;

const header =
    document.querySelector(".site-header");

const menuToggle =
    document.querySelector(".menu-toggle");

const navigation =
    document.querySelector(".main-navigation");

const navigationLinks =
    document.querySelectorAll(
        ".navigation-item a"
    );

const sections =
    document.querySelectorAll(
        "main section[id]"
    );


/* =========================================================
   02. HEADER AO ROLAR
   ========================================================= */

function handleHeaderScroll() {

    if (!header) {
        return;
    }

    if (window.scrollY > 30) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}


window.addEventListener(
    "scroll",
    handleHeaderScroll,
    {
        passive: true
    }
);

handleHeaderScroll();


/* =========================================================
   03. MENU MOBILE
   ========================================================= */

function toggleMobileMenu() {

    if (!menuToggle || !navigation) {
        return;
    }

    const isOpen =
        navigation.classList.toggle("open");

    menuToggle.classList.toggle(
        "active",
        isOpen
    );

    body.classList.toggle(
        "menu-open",
        isOpen
    );

    menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

}


if (menuToggle) {

    menuToggle.addEventListener(
        "click",
        toggleMobileMenu
    );

}


/* Fechar menu ao clicar em um link */

navigationLinks.forEach(link => {

    link.addEventListener(
        "click",
        () => {

            if (!navigation) {
                return;
            }

            navigation.classList.remove(
                "open"
            );

            menuToggle?.classList.remove(
                "active"
            );

            body.classList.remove(
                "menu-open"
            );

            menuToggle?.setAttribute(
                "aria-expanded",
                "false"
            );

        }
    );

});


/* Fechar menu ao pressionar Escape */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            navigation?.classList.contains("open")
        ) {

            navigation.classList.remove(
                "open"
            );

            menuToggle?.classList.remove(
                "active"
            );

            body.classList.remove(
                "menu-open"
            );

            menuToggle?.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    }
);


/* =========================================================
   04. ÓRBITA DO HERO
   ========================================================= */

const heroVisual =
    document.querySelector(".hero-visual");


function createHeroOrbit() {

    if (!heroVisual) {
        return;
    }

    const ringOne =
        document.createElement("span");

    const ringTwo =
        document.createElement("span");

    const dot =
        document.createElement("span");


    ringOne.className =
        "orbit-ring";

    ringTwo.className =
        "orbit-ring-two";

    dot.className =
        "orbit-dot";


    heroVisual.appendChild(
        ringOne
    );

    heroVisual.appendChild(
        ringTwo
    );

    heroVisual.appendChild(
        dot
    );


    heroVisual.classList.add(
        "is-ready"
    );

}


createHeroOrbit();


/* =========================================================
   05. REVEAL DAS SEÇÕES
   ========================================================= */

const revealElements =
    document.querySelectorAll(
        ".section-heading, " +
        ".feature-card, " +
        ".project-card, " +
        ".problem-card, " +
        ".solution-card, " +
        ".service-card, " +
        ".differential-card, " +
        ".process-item, " +
        ".about-content, " +
        ".about-visual, " +
        ".testimonial-card, " +
        ".faq-item, " +
        ".cta-container"
    );


revealElements.forEach(
    (element, index) => {

        element.classList.add(
            "reveal"
        );

        /*
         * Pequeno atraso em elementos consecutivos.
         * Limitamos o atraso para manter o site rápido.
         */

        const delay =
            Math.min(
                (index % 4) * 100,
                300
            );

        if (delay > 0) {

            element.style.transitionDelay =
                `${delay}ms`;

        }

    }
);


if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "is-visible"
                            );

                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -50px 0px"
            }
        );


    revealElements.forEach(
        element => {

            revealObserver.observe(
                element
            );

        }
    );

} else {

    revealElements.forEach(
        element => {

            element.classList.add(
                "is-visible"
            );

        }
    );

}


/* =========================================================
   06. NAVEGAÇÃO ATIVA
   ========================================================= */

if (
    "IntersectionObserver" in window &&
    sections.length
) {

    const sectionObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        const currentId =
                            entry.target.id;


                        navigationLinks.forEach(
                            link => {

                                const linkTarget =
                                    link.getAttribute(
                                        "href"
                                    );


                                link.classList.toggle(
                                    "active",
                                    linkTarget ===
                                    `#${currentId}`
                                );

                            }
                        );

                    }
                );

            },
            {
                rootMargin:
                    "-35% 0px -55% 0px"
            }
        );


    sections.forEach(
        section => {

            sectionObserver.observe(
                section
            );

        }
    );

}


/* =========================================================
   07. EFEITO RIPPLE NOS BOTÕES
   ========================================================= */

const interactiveButtons =
    document.querySelectorAll(
        ".button"
    );


interactiveButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            event => {

                const rect =
                    button.getBoundingClientRect();


                const ripple =
                    document.createElement(
                        "span"
                    );


                ripple.className =
                    "ripple";


                ripple.style.left =
                    `${event.clientX - rect.left}px`;

                ripple.style.top =
                    `${event.clientY - rect.top}px`;


                button.appendChild(
                    ripple
                );


                ripple.addEventListener(
                    "animationend",
                    () => {

                        ripple.remove();

                    },
                    {
                        once: true
                    }
                );

            }
        );

    }
);


/* =========================================================
   08. TILT DOS CARDS
   =========================================================
   
   Ativado somente em dispositivos com mouse.
   Isso evita processamento desnecessário em celulares.
   ========================================================= */

const canHover =
    window.matchMedia(
        "(hover: hover) and (pointer: fine)"
    ).matches;


if (canHover) {

    const projectCards =
        document.querySelectorAll(
            ".project-card"
        );


    projectCards.forEach(
        card => {

            card.addEventListener(
                "pointermove",
                event => {

                    const rect =
                        card.getBoundingClientRect();


                    const x =
                        event.clientX -
                        rect.left;


                    const y =
                        event.clientY -
                        rect.top;


                    const centerX =
                        rect.width / 2;


                    const centerY =
                        rect.height / 2;


                    const rotateX =
                        ((y - centerY) /
                            centerY) *
                        -3;


                    const rotateY =
                        ((x - centerX) /
                            centerX) *
                        3;


                    card.style.transform =
                        `perspective(1000px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)
                         translateY(-4px)`;

                }
            );


            card.addEventListener(
                "pointerleave",
                () => {

                    card.style.transform =
                        "";

                }
            );

        }
    );

}


/* =========================================================
   09. CURSOR GLOW
   ========================================================= */

if (canHover) {

    const cursorGlow =
        document.createElement(
            "div"
        );


    cursorGlow.className =
        "cursor-glow";


    document.body.appendChild(
        cursorGlow
    );


    let mouseX = 0;
    let mouseY = 0;

    let glowX = 0;
    let glowY = 0;


    window.addEventListener(
        "pointermove",
        event => {

            mouseX =
                event.clientX;

            mouseY =
                event.clientY;

            cursorGlow.style.opacity =
                "1";

        },
        {
            passive: true
        }
    );


    function animateCursor() {

        glowX +=
            (mouseX - glowX) *
            0.08;

        glowY +=
            (mouseY - glowY) *
            0.08;


        cursorGlow.style.left =
            `${glowX}px`;

        cursorGlow.style.top =
            `${glowY}px`;


        requestAnimationFrame(
            animateCursor
        );

    }


    animateCursor();

}


/* =========================================================
   10. PARALLAX SUAVE DO HERO
   ========================================================= */

if (canHover && heroVisual) {

    let ticking = false;


    window.addEventListener(
        "pointermove",
        event => {

            if (ticking) {
                return;
            }


            ticking = true;


            requestAnimationFrame(
                () => {

                    const x =
                        (
                            event.clientX /
                            window.innerWidth
                        ) - 0.5;


                    const y =
                        (
                            event.clientY /
                            window.innerHeight
                        ) - 0.5;


                    heroVisual.style.transform =
                        `translate(
                            ${x * 8}px,
                            ${y * 8}px
                        )`;


                    ticking = false;

                }
            );

        },
        {
            passive: true
        }
    );


    heroVisual.addEventListener(
        "pointerleave",
        () => {

            heroVisual.style.transform =
                "";

        }
    );

}


/* =========================================================
   11. FAQ
   =========================================================
   
   Permite manter apenas uma pergunta aberta por vez.
   ========================================================= */

const faqItems =
    document.querySelectorAll(
        ".faq-item"
    );


faqItems.forEach(
    item => {

        item.addEventListener(
            "toggle",
            () => {

                if (!item.open) {
                    return;
                }


                faqItems.forEach(
                    otherItem => {

                        if (
                            otherItem !== item &&
                            otherItem.open
                        ) {

                            otherItem.open =
                                false;

                        }

                    }
                );

            }
        );

    }
);


/* =========================================================
   12. ANO AUTOMÁTICO DO FOOTER
   ========================================================= */

const footerTexts =
    document.querySelectorAll(
        ".footer-bottom p"
    );


if (footerTexts.length) {

    const currentYear =
        new Date().getFullYear();


    footerTexts[0].textContent =
        `© ${currentYear} Órbita. Todos os direitos reservados.`;

}


/* =========================================================
   13. SMOOTH SCROLL
   ========================================================= */

document.querySelectorAll(
    'a[href^="#"]'
).forEach(
    link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute(
                        "href"
                    );


                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    }
);


/* =========================================================
   14. PERFORMANCE
   ========================================================= */

/*
 * Se o usuário preferir reduzir animações,
 * desativamos interações visuais pesadas.
 */

const reducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );


if (reducedMotion.matches) {

    document.documentElement.style
        .scrollBehavior = "auto";

}