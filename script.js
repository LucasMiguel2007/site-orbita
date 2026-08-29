document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MENU MOBILE
    ===================================================== */

    const menuButton = document.querySelector(".menu-button");
    const nav = document.querySelector(".nav");

    if (menuButton && nav) {

        const toggleMenu = () => {

            const isOpen = nav.classList.toggle("open");

            menuButton.classList.toggle("active", isOpen);

            menuButton.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuButton.setAttribute(
                "aria-label",
                isOpen
                    ? "Fechar menu"
                    : "Abrir menu"
            );
        };


        menuButton.addEventListener(
            "click",
            toggleMenu
        );


        /* Fecha ao clicar em um link */

        const links = nav.querySelectorAll("a");

        links.forEach(link => {

            link.addEventListener("click", () => {

                nav.classList.remove("open");

                menuButton.classList.remove("active");

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuButton.setAttribute(
                    "aria-label",
                    "Abrir menu"
                );
            });

        });


        /* Fecha ao clicar fora */

        document.addEventListener("click", event => {

            const clickedInsideMenu =
                nav.contains(event.target);

            const clickedButton =
                menuButton.contains(event.target);

            if (
                nav.classList.contains("open") &&
                !clickedInsideMenu &&
                !clickedButton
            ) {

                nav.classList.remove("open");

                menuButton.classList.remove("active");

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuButton.setAttribute(
                    "aria-label",
                    "Abrir menu"
                );
            }

        });


        /* ESC fecha o menu */

        document.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Escape" &&
                    nav.classList.contains("open")
                ) {

                    nav.classList.remove("open");

                    menuButton.classList.remove("active");

                    menuButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    menuButton.setAttribute(
                        "aria-label",
                        "Abrir menu"
                    );

                    menuButton.focus();
                }

            }
        );


        /* Voltar para desktop */

        window.addEventListener(
            "resize",
            () => {

                if (window.innerWidth > 720) {

                    nav.classList.remove("open");

                    menuButton.classList.remove("active");

                    menuButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    menuButton.setAttribute(
                        "aria-label",
                        "Abrir menu"
                    );
                }

            }
        );

    }


    /* =====================================================
       ANO AUTOMÁTICO
    ===================================================== */

    const year = document.querySelector("#year");

    if (year) {
        year.textContent =
            new Date().getFullYear();
    }


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".problem-card, .service, .process-item, .differential-card"
        );

    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add("visible");

                            observer.unobserve(
                                entry.target
                            );
                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );

        revealElements.forEach(element => {

            element.classList.add("reveal");

            observer.observe(element);

        });

    }


});