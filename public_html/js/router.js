/**
 * Simple app router
 * @author Łukasz Torba <torba.lukasz@gmail.com>
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'app/alert',
    'bootstrap'
],function($,_,Backbone, Alert){

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
        if(!action) {
            action = 'home';
        }
        console.debug('loading view '+action);
        require(['app/views/'+action], function (view){
            console.debug('init view', view);
            view.initialize({
                el: $('#main-content')
            });
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
