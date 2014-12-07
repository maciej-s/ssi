define([
    'backbone',
    'app/template',
    'app/alert',
    'app/model/cart',
    'app/pool'
], function (Backbone, Template, Alert, Cart, Pool) {
    var MiniCart = Backbone.View.extend({
        initialize: function () {
            console.log('Init mini cart', this.$el);
            this.render()
        },
        // render minicart template
        render : function () {
            var $el = this.$el;
            Template.load('common/cart', _.extend(this.model.toJSON())).done(function (template){
                // set template
               $el.html ( template );
            });
        },
        events: {
            'click .remove-product': 'removeProduct'
        },

        // remove product from cart
        removeProduct : function (e) {
            e.preventDefault(); e.stopPropagation();

            // get target element
            var $target = $(e.target);

            // remove item only when item has assigned product id
            var pid = $target.data('pid');
            if(pid) {
                if (this.model.remove(pid)) {
                    // this.model.recalculate();
                    // populate cart refreshing
                    Pool.trigger('cart:refresh', pid);
                } else {
                    Alert.error('Missing offer data');
                }
            } else {
                Alert.error('Product already has benn removed. Try to recalculate cart.');
            }

        }
    });

    var CartInstance = null;

    // register pool events

    // remove product from cart
    Pool.on('cart:remove', function ( pid ) {
        if (CartInstance.model.remove(pid)) {
            // this.model.recalculate();
        } else {
            Alert.error('Missing offer data');
        }
    });

    // add product to cart
    Pool.on('cart:add', function (pid) {
        CartInstance.model.add(pid);
    });

    Pool.on('cart:refresh', function ( pid ) {
        CartInstance.render();
    });

    return {
        /**
         * Initialize cart view instance
         * @param options
         * @returns {MiniCart}
         */
        initialize: function (options) {
            if(!CartInstance) {
                CartInstance = new MiniCart(_.extend(options, {
                    model: Cart.get()
                }));
            }
            return CartInstance;
        },
        /**
         * Return cart view instance
         * @returns {MiniCart}
         */
        get : function () {
            if(!CartInstance) {
                this.initialize({});
            }
            return CartInstance;
        },
        /**
         * Refresh cart view
         */
        refresh : function () {
            this.get().render();
        },
        /**
         * Return cart model
         */
        model : function () {
            return Cart.get()
        }
    }
});