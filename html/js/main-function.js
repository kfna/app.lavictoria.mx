$(document).ready(function () {
    feather.replace();

    $('.menu-toggler, .menu-close').on('click', function (e) {
        e.preventDefault();
        toggleMenu()
    });

    $(document).keyup(function(e) {
        if (e.key === "Escape") toggleMenu();
    });

    function toggleMenu () {
        $('.menu').toggleClass('menu-on')
    }
});