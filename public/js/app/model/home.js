define([
    'backbone',
    'app/model/common/offer',
    'app/model/cart',
], function (Backbone, Offer, Cart) {
    var HomeModel = Backbone.Collection.extend({
        model: Offer,
        url: 'get/offer/home.json'
    });

    return {
        /**
         * Return home model
         * @returns {HomeModel}
         */
        get : function () {
            var model = new HomeModel();

            model.on('add', function (offer) {
                // check product existence
               offer.set('incart', Cart.get().in(offer.get('id')));
            });
            return model;
        },
        /**
         * Return single home offer
         * @param id
         */
        getSingle : function (id) {

            return new Offer({
                id: id
            });
        }
    };
});