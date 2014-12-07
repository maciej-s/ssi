/**
 * Simple app router
 * @author Łukasz Torba <torba.lukasz@gmail.com>
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'app/alert',
    'app/views/breadcrumbs',
    'bootstrap'
],function($,_,Backbone, Alert, Breadcrumbs){

    // setup dynamic routing
    var Router = Backbone.Router.extend({
        initialize : function () {
            // this.route('*actions', 'home');
        },
        routes: {
            '*actions': 'dynamic'
        }
    });

    // routing resolver
    var dynamicResolver = function (action) {
        var params = [];
        if(!action) {
            action = 'home';
        } else {
            console.log(action);
            var matched = action.match(/([\w-_]+)(?=\/|)/g);
            if(matched && matched.length > 0) {
                action = matched[0]; matched.shift();
                params = matched;
            } else {
                Alert.error('Error at page loading.');
                return false;
            }
            // escape url
            console.debug(params);
        }

        console.debug('loading view '+action);
        require(['app/views/'+action], function (view){
            console.debug('init view', view);

            var breadcrumbs = Breadcrumbs.get();

            var $def = view.initialize({
                el: $('#main-content'),
                breadcrumbs: Breadcrumbs,
                paras: params
            });

            $.when($def).done(function () {
                breadcrumbs.render();
            })

        }, function () {
            Alert.error('Error occurred during view loading. Unable to continue');
        });
    };

    return {
        initialize: function () {
            var appRouter = new Router;
            // use dynamic routing as default
            appRouter.on('route:dynamic', dynamicResolver);
            Backbone.history.start();
        }
    }
});
