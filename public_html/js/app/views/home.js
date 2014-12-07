define([
    'jquery',
    'underscore',
    'backbone',
    'app/template',
    'app/model/home'
],function($,_,Backbone, Template, HomeModel){
    var Home = Backbone.View.extend({
        initialize : function () {

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

        }
    });
    // home view instance
    var HomeView = null;

    function init (settings) {
        var extend = {
            model : HomeModel.get()
        };
        return new Home(_.extend(settings, extend));
    }

    // return home view
    return {
        initialize: function (settings) {
            if(!HomeView) {
                HomeView = init(settings);
            }
            return HomeView;
        }
    };
});