document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       MENU MOBILE
    ===================================================== */

    const menuButton =
        document.querySelector(".menu-button");

    const nav =
        document.querySelector(".nav");


    if (menuButton && nav) {

        menuButton.addEventListener("click", function () {

            const aberto =
                nav.classList.toggle("open");


            menuButton.setAttribute(
                "aria-expanded",
                aberto
            );


            menuButton.setAttribute(
                "aria-label",
                aberto
                    ? "Fechar menu"
                    : "Abrir menu"
            );

        });


        /* Fecha o menu ao clicar em um link */

        const links =
            nav.querySelectorAll("a");


        links.forEach(function (link) {

            link.addEventListener("click", function () {

                nav.classList.remove("open");

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

    }



    /* =====================================================
       ANO AUTOMÁTICO
    ===================================================== */

    const year =
        document.querySelector("#year");


    if (year) {

        year.textContent =
            new Date().getFullYear();

    }



    /* =====================================================
       ESC FECHA MENU
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                nav &&
                nav.classList.contains("open")
            ) {

                nav.classList.remove("open");

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


});