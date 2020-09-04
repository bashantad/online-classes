/*
 *= require libraries/jquery.min.js
 *= require libraries/jquery-migrate.min.js
 *= require libraries/bootstrap.bundle.min.js
 *= require libraries/hs.core
 *= require hs-unfold.min.js
 *= require hs-header.min.js
 *= require hs-mega-menu.min.js
 *= require hs-add-field.min.js
 *= require hs-step-form.min.js
 *= require_self
 */
// initialization of header component
const header = new HSHeader($('#header')).init();

// initialization of HSMegaMenu component
const megaMenu = new HSMegaMenu($('.js-mega-menu')).init();

// initialization of unfold
var unfold = new HSUnfold('.js-hs-unfold-invoker').init();

// initialization of step form
$('.js-step-form').each(function () {
    var stepForm = new HSStepForm($(this)).init();
});

$('.js-add-field').each(function () {
    new HSAddField($(this)).init();
});
