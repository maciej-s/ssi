var def = function (callback) {
    define([
        'jquery', 'underscore', 'backbone'
    ], callback);
};

define([
    'jquery',
    'underscore',
    'backbone',
    'router',
    // just get (invoke)
    //'bootstrap',
    'bootbox',
    //'handlebars'
], function ($, _, Backbone, Router) {

    var initialize = function () {
        Router.initialize();
    };


    return {
        initialize: initialize
    };
});