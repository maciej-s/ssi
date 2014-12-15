define([
    'app/views/miniCart',
    'app/microformats'
],function(miniCart, Microformats){

    // init user
    var initUser = function () {

    };

    // init cart
    // prepare cart model, read
    // cart model from storage
    // and fetch tpl
    var initCart = function () {
        miniCart.initialize({
            el: $('#mini-cart')
        });
    };

    // init view main frame
    var initialize = function () {
        // load user
        initUser();

        // initialize cart
        initCart();

        // init microformats
        Microformats.init();
    };

    return {
       initialize: initialize
    }
});