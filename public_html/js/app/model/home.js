define([
    'backbone',
    'app/model/home/offer',
    'app/model/cart',
], function (Backbone, Offer, Cart) {
    var HomeModel = Backbone.Collection.extend({
        model: Offer,
        url: 'get/offers/home.json'
    });

    return {
        // create home model - connect
        // to cart model
        get : function () {
            var model = new HomeModel();

            model.on('add', function (offer) {
                // check product existence
               if (Cart.get().in(offer.get('id'))) {
                   offer.set('incart', true);
               }
            });
            return model;
        }
    };
});