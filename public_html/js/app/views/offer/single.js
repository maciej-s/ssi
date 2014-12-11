define([
    'backbone',
    'app/template',
    'app/model/offer',
    'app/pool',
    'app/model/cart'
], function (Backbone, Template, OfferModel, Pool, CartModel) {
    // preload single offer page view
    Template.cache('pages/offer');

    // single offer view
    var SingleView = Backbone.View.extend({
        initialize: function (options) {
            var that = this;

            // load model with offer
            this.model = OfferModel.get({
                id: options.params[0]
            });
            this.model.fetch({
                success : function () {
                    that.model.set('largeButtons', true);

                    // check cart
                    CartModel.setProperties(that.model);

                    that.render();

                    // fix url (for safety)
                    Backbone.history.navigate(that.model.get('url'), { trigger:false, replace: true });

                    // set breadcrumbs
                    options.breadcrumbs.push(that.model.get('name'),
                        that.model.get('url'));
                }
            });
        },

        render : function () {
            var that = this;
            Template.load('pages/offer', this.model.toJSON())
                .done(function(template){
                that.$el.html(template);
            });
        },

        events : {
            // add product to cart
            'click .add-product' : function (e) {
                e.preventDefault();
                var $item = $(e.target);
                if ($item.length > 0) {
                    // preload offer template


                    // get offer id
                    var id = $item.data('id');
                    var cart = CartModel.get();
                    // remove product from cart
                    if(cart.in(id)) {
                        Alert.warning('Offer already exists in your cart!');
                        return false;
                    }

                    var $cartPromise = cart.add(id);
                    $.when.apply($, [$cartPromise]).done(function () {
                        // refresh cart
                        Pool.trigger('cart:refresh', id, true);
                    });

                }
            },
            // remove product from cart
            'click .remove-product' : function (e) {
                e.preventDefault();
                var $item = $(e.target);
                if ($item.length > 0) {

                    // get offer id
                    var id = $item.data('id');
                    var cart = CartModel.get();
                    // remove product from cart
                    if( cart.remove(id) ) {
                        // refresh cart
                        Pool.trigger('cart:refresh', id, false);
                    }
                }
            }
        }
    });

    var ViewInstance = null;


    // Trigger for refreshing offers contents
    Pool.on('cart:refresh', function ( pid, status){
        var offer = OfferModel.get({ id: pid });
        offer.set('incart', status);
        offer.set('largeButtons', true);
        offer.fetch({
            success: function() {
                var json = offer.toJSON();
                // refresh product view
                Template.load('common/cart/buttons', json).done(function (template) {
                    $('#action-buttons', ViewInstance.$el).html(template);
                });
            }
        });
    });

    return {
        initialize: function (options) {
            ViewInstance = new SingleView(options);
        }
    }
});