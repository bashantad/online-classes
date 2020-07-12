/*
 *= require libraries/jquery.min.js
 *= require libraries/jquery-migrate.min.js
 *= require libraries/bootstrap.bundle.min.js
 *= require libraries/hs.core
 *= require hs-unfold.min.js
 *= require hs-header.min.js
 *= require hs-mega-menu.min.js
 *= require hs.slick-carousel
 *= require slick
 *= require_self
 */
// initialization of header component
const header = new HSHeader($('#header')).init();

// initialization of HSMegaMenu component
const megaMenu = new HSMegaMenu($('.js-mega-menu')).init();

// initialization of slick carousel
$('.js-slick-carousel').each(function() {
    const slickCarousel = $.HSCore.components.HSSlickCarousel.init($(this));
});