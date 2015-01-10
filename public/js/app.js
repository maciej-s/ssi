define([
    'jquery',
    'underscore',
    'backbone',
    'router',
    'view',
    // just get (invoke)
    //'bootstrap',
    'bootbox',
    //'handlebars'
], function ($, _, Backbone, Router, View) {

    var initialize = function () {
        Router.initialize();

        View.initialize();
    };


    return {
        initialize: initialize
    };
});