define([
    'backbone',
    'app/model/common/offer',
    'app/model/cart',
], function (Backbone, Offer, Cart) {
   // category model - offers collection
    var Model =  Backbone.Collection.extend({
        model: Offer,
        urlRoot: 'get/category/',
        url : function () {
            var id = 'all';
            if (this.id) {
                id = this.id;
            }
            return this.urlRoot + id + '.json';
        },

        merge: function (collection) {
            var dis = this;

            collection.each(function (val, k) {
                if(!dis.any(function (_collection) {
                    return _collection.get('id') === val.get('id');
                })) {
                    dis.set(collection.get(k));
                }
            });
        }
    });

    return {
        /**
         * Return model
         * @returns {Model}
         */
        get : function (options) {
            var model = new Model(options);

            model.on('add', function (offer) {
                // check product existence
                offer.set('incart', Cart.get().in(offer.get('id')));
            });
            return model;
        },

        /**
         * Return single offer
         * @param id
         */
        getSingle : function (id) {
            return new Offer({
                id: id
            });
        }
    };
});