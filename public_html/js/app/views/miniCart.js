define([
    'backbone',
    'app/template',
    'app/alert'
], function (Backbone, Template, Alert) {
    var miniCart = Backbone.View.extend({
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
                    // reload view
                    this.render(true);
                } else {
                    Alert.error('Missing offer data');
                }
            } else {
                Alert.error('Product already has benn removed. Try to recalculate cart.');
            }

        }
    });

    return {
        initialize: function (options) {
            new miniCart(options)
        }
    }
});