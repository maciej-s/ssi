define([
    'backbone',
    'app/template',
    'app/pool',
    'app/model/categories',
    'settings',
    'app/views/miniCart',
    'app/alert'
], function (Backbone, Template, Pool, Categories, Settings, Cart, Alert) {
    // view controller logic
    Template.cache('pages/category');
    var View = Backbone.View.extend({
        initialize : function (options) {
            this.model = Categories.get();

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
                def = Template.cache('pages/category');

            // wait for data loading and template loading
            $.when.apply($, [def, $syncPromise]).done(function (){
                // fetch home template
                Template.load('pages/category', {offers: dis.model}).done(function (template) {
                    $el.empty();
                    template.appendTo($el);
                });
            }).fail(function(){
                console.error('Unable to load tlp');
            });
        },

        // render next results (send request for data)
        renderNext : function (settings) {
            var $el = this.$el,
                dis = this,
                $mdef = new $.Deferred(),
            // load template to cache
                def= Template.cache('pages/category/inner');

            settings = _.extend(settings || {}, {
                replace: false
            });

            // get categories
            var model = Categories.get();
            model.fetch({
                data: {
                    next: dis.model.length,
                    max: 10
                },
                success : function () {
                    var prev = dis.model.length;
                    if (prev.length > 0) {
                        // merge collections
                        dis.model.merge(model);
                        if (prev !== dis.model.length) {
                            $mdef.resolve();
                        } else {
                            $mdef.reject()
                        }
                    } else {
                        $mdef.reject();
                    }
                },
                error : function () {
                    $mdef.reject()
                }
            });

            $.when.apply($, [def, $mdef]).done(function () {
                Template.load('pages/category/inner', {offers: model}).done(function ($template){
                    var $offers = $('#offers', $el);
                    if(!settings.replace) {
                        $template.appendTo($offers);
                    }

                });
            }).fail(function () {
                $('.fetch-more', $el).removeClass('active');
            })
        },

        events: {
            'click .remove-product' : removeOfferFromCart,
            'click .add-product' :    addOfferToCart,
            'click .fetch-more':      nextPage,
            'click .filter':          filter
        }
    });

    // remove product from link - force refresh
    function removeOfferFromCart (e) {
        e.preventDefault();
        var $item = $(e.target),
            that = this;
        if ($item.length > 0) {
            // preload offer template
            Template.cache('pages/home/offer');

            // get offer id
            var id = $item.data('id');
            var cart = Cart.model();
            // remove product from cart
            if( cart.remove(id) ) {
                // refresh cart
                Pool.trigger('cart:refresh', [id, false, that]);
            }
        }
    }

    // add product to cart from link - force refresh
    function addOfferToCart (e) {
        e.preventDefault();
        var $item = $(e.target),
            that = this;

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
                Pool.trigger('cart:refresh', [id, true, that]);
            });

        }
    }

    // load next page
    function nextPage (e) {
        e.preventDefault();
        this.renderNext();
    }

    // filter
    function filter (e) {
        var that = this,
            filters = {};

        $('.offer-item', that.$el).parent().addClass('hidden');

        // collect all filters
        $('input.filter', that.$el).each (function () {
            var type = $(this).data ('type');
            var $obj = $('.offer-'+type, that.$el).parent();
            if ( (filters [type] = $(this).is(':checked')) === true) {
                $obj.removeClass('hidden');

            }
            // @todo: fix errors with sorting
            if ( $(this).hasClass('modifier') ) {
                if(filters [type]) {
                    $obj.removeClass('hidden');
                } else {
                    $obj.addClass('hidden');
                }
            }

        });
    }

    // Trigger for refreshing offers contents
    Pool.on('cart:refresh', function ( pid, status, view){
        var offer = Categories.getSingle(pid);
        offer.set('incart', status);
        offer.fetch({
            success: function() {
                var json = offer.toJSON();
                // refresh product view
                Template.load('pages/home/offer', json).done(function (template) {
                    $('#offer-' + pid, view.$el).html(template);
                });
            }
        });
    });



    return {
        initialize : function (options) {
            return new View(options);
        }
    }
});