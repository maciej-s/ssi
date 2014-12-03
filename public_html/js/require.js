require.config({
    baseUrl: 'js/',
    paths: {
        jquery: '../vendor/jquery/jquery.min',
        underscore: '../vendor/underscore/underscore-min',
        bootstrap: '../vendor/bootstrap/dist/js/bootstrap.min',
        handlebars: '../vendor/handlebars/handlebars.min',
        backbone: '../vendor/backbone/backbone',
        bootbox: '../vendor/bootbox/bootbox'
    }
});

require([
    'app'
], function (App){
   App.initialize();
});

