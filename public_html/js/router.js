/**
 * Simple app router
 * @author Łukasz Torba <torba.lukasz@gmail.com>
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'bootbox',
    'bootstrap'

],function($,_,Backbone,Bootbox){


    // read static routing "table"
    var getRouter =  function (routerfile) {
        // force to read using async - reason:
        // main app instance is waiting for routing data
        var routing = {};
        Backbone.ajax({
            url: routerfile,
            dataType: 'json',
            success: function (data) {
                routing = data
            },
            error : function () {
                throw new Error('Unable to setup application');
            },
            async: true
        });
        return routing;
    };
    /*getRouter('js/router/router.json')*/
    // setup dynamic routing
    var Router = Backbone.Router.extend({
        routes: {
            '*actions': 'default'
        }
    });

    // routing resolver
    var dynamicResolver = function (action) {
        require(['app/views/'+action], function (view){
            console.log('found!');
            if (view instanceof Backbone.View) {
                view.render();
            }

        }, function () {
            console.debug('?');
        });
    };

    return {
        initialize: function () {
            var appRouter = new Router;
            console.log('init-router');
            // use dynamic routing as default
            appRouter.on('route:default', dynamicResolver);

            // Backbone.history.start();
        }
    }
});
