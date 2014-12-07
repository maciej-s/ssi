define([
    'app/views/miniCart',
    'app/model/cart'
],function(miniCart, CartModel){

    // init user
    var initUser = function () {

    };

    // init cart
    // prepare cart model, read
    // cart model from storage
    // and fetch tpl
    var initCart = function () {
        miniCart.initialize({
            el: $('#mini-cart'), model: CartModel.get()
        });
    };

    // init view main frame
    var initialize = function () {
        // load user
        initUser();

        // initialize cart
        initCart();

    };

    return {
       initialize: initialize
    }
});