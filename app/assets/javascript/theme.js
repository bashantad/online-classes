/*
 *= require libraries/jquery.min.js
 *= require libraries/jquery-migrate.min.js
 *= require libraries/bootstrap.bundle.min.js
 *= require libraries/hs.core
 *= require hs-unfold.min.js
 *= require hs-header.min.js
 *= require hs-mega-menu.min.js
 *= require_self
 */
// initialization of header component
const header = new HSHeader($('#header')).init();

// initialization of HSMegaMenu component
const megaMenu = new HSMegaMenu($('.js-mega-menu')).init();

// initialization of unfold
var unfold = new HSUnfold('.js-hs-unfold-invoker').init();

// initialization of sticky blocks
$('.js-sticky-block').each(function () {
    var stickyBlock = new HSStickyBlock($(this)).init();
});