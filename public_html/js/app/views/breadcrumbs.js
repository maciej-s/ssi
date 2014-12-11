define([
    'backbone',
    '../template',
    'app/model/breadcrumbs'
], function (Backbone,Template,Bread) {
    // load template to cache
    Template.cache('common/breadcrumbs');

    var Instance = null,
        Breadcrumbs = Backbone.View.extend({
            initialize: function () {
                this.render();
            },
            render : function () {
                if(this.model) {
                    var $el = this.$el,
                        dis = this;
                    Template.load('common/breadcrumbs', {
                        breadcrumbs: dis.model
                    }).done(function (template) {
                        var $parent = $el.parent(),
                            $wrapper = $('.breadcrumbs', $parent);

                        if ($wrapper.length === 0) {
                            $parent.prepend(template);
                        } else {
                            $wrapper.replaceWith(template);
                        }
                    });
                }
            }
        });

   return {
        get : function () {
            if(!Instance) {
                Instance = new Breadcrumbs({
                    el: $('#main-content'),
                    model: new Bread()
                });
            }
            return Instance;
        },
        push : function (name, link) {
            var instance = this.get().model;
            if(instance) {
                instance.add({
                    name: name,
                    link: link
                });
                this.render();
            }
        },
        clean : function () {
            if(Instance) {
                Instance.model.reset();
            }
        },

        render : function () {
            Instance.render();
        }
   }
});