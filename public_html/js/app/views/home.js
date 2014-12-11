define([
    'jquery',
    'underscore',
    'backbone',
    'app/template',
    'app/model/home',
    'app/views/miniCart',
    'app/alert',
    'app/pool'
],function($,_,Backbone, Template, HomeModel, Cart, Alert, Pool){
    // home view
    var Home = Backbone.View.extend({
        initialize : function (options) {

            console.log(options, this);

            // fetch home with content
            var $def = new $.Deferred();
            this.model.fetch({
                success : function () {
                    $def.resolve();
                },
                error : function () {
                    $def.reject();
                }
            });

            this.render($def.promise());
        },
        render : function ($syncPromise) {
            var $el = this.$el,
                dis = this,
                // load main template to cache
                def = Template.cache('pages/home');

            // wait for data loading and template loading
            $.when.apply($, [def, $syncPromise]).done(function (){
                // fetch home template
                Template.load('pages/home', {offers: dis.model}).done(function (template) {
                    $el.html ( template );
                });
            }).fail(function(){
                console.error('Unable to load home tlp');
            });

            // load home offerts
        },
        events: {
            'click .remove-product' : removeOfferFromCart,
            'click .add-product' : addOfferToCart
        }
    });
    // home view instance
    var HomeView = null;

    // init view
    function init (settings) {
        var extend = {
            model : HomeModel.get()
        };
        return new Home(_.extend(settings, extend));
    }

    // remove product from link - force refresh
    function removeOfferFromCart (e) {
        e.preventDefault();
        var $item = $(e.target);
        if ($item.length > 0) {
            // preload offer template
            Template.cache('pages/home/offer');

            // get offer id
            var id = $item.data('id');
            var cart = Cart.model();
            // remove product from cart
            if( cart.remove(id) ) {
                // refresh cart
                Pool.trigger('cart:refresh', id, false);
            }
        }
    }

    // add product to cart from link - force refresh
    function addOfferToCart (e) {
        e.preventDefault();
        var $item = $(e.target);
        if ($item.length > 0) {
            // preload offer template
            Template.cache('pages/home/offer');

            // get offer id
            var id = $item.data('id');
            var cart = Cart.model();
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
    }

    // Trigger for refreshing offers contents
    Pool.on('cart:refresh', function ( pid, status){
        var offer = HomeModel.getSingle(pid);
        offer.set('incart', status);
        offer.fetch({
            success: function() {
                var json = offer.toJSON();
                // refresh product view
                Template.load('pages/home/offer', json).done(function (template) {
                    $('#offer-' + pid, HomeView.$el).html(template);
                });
            }
        });
    });

    // return home view
    return {
        initialize: function (settings) {
            return HomeView = init(settings);
        }
    };
});