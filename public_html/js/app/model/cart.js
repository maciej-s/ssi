define([
    'jquery',
    'underscore',
    'backbone',
    'app/model/common/offer'
], function ($, _, Backbone, Product) {

    var ProductsFixtures = [
        {
            'id': 2,
            'image': 'skin/image/creative-tour-and-travel-logo-design2.png',
            'uri': '#/offer/test',
            'name': 'Testing fixture',
            'price': 10.50
        }
    ];

    // create products collection
    var ProductsCollection = Backbone.Collection.extend({
        model: Product
    }),
        products = new ProductsCollection();

    var CartInstance = null;
    // create cart model
    var Cart = Backbone.Model.extend({
        defaults: {
            currency: '€',
            amount: 0,
            value: 0,
            products: products
        },

        /**
         * Recalculate cart content
         */
        recalculate : function () {
            var amount = 0, value = 0;
            _.each(products.toJSON(), function (v, k) {
                amount+=1;
                value += Number(v.price);
            });

            CartInstance.set({
                amount: amount,
                value: value.toFixed(2)
            });
        },

        /**
         * Remove product from cart by pid
         * @param pid
         */
        remove : function (pid) {
            var products = this.get('products'),
                l = products.length;

            products.each(function (product, k) {
                if( product && Number(product.get('id')) === Number(pid) ) {
                    products.remove(product);
                    return false;
                }
            });
            return l > products.length || l === 0;
        },

        /**
         * Add product to cart
         * @param {Product} product
         */
        add : function (id) {
            var product = new Product({id: id}),
                $def = new $.Deferred(),
                dis = this;
            product.fetch({
                success : function () {
                    // add product to cart
                    var products = dis.get('products');
                    products.add(product);
                    $def.resolve();
                },
                fail : function (){
                    $def.reject();
                }
            });
            return $def.promise();
        },

        /**
         * Look for product in cart
         * @param pid
         */
        in : function (pid) {
            var found = null,
                products = this.get('products');
            products.each(function (product, k){
                if( Number(product.get('id')) === Number(pid) ) {
                    found = product; return false;
                }
            });
            return found ? true : false;
        }

    });

    // add handlers for products set/remove
    products.on('add', function (product){
        CartInstance.recalculate();
    });

    // remove products from cart
    products.on('remove', function (product) {
        CartInstance.recalculate();
    });

    return {
        get : function () {
            if(!CartInstance) {
                CartInstance = new Cart();
                CartInstance.get('products').reset(ProductsFixtures);
                CartInstance.recalculate();
            }
            return CartInstance;
        },

        /**
         * Set model properties
         * @param model
         */
        setProperties : function (model) {
            var cart = this.get();
            // check in cart status
            model.set('incart', cart.in(model.get('id')));
        }
    }
});