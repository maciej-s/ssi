define([
    'backbone'
], function (Backbone) {
    var Breadcrumbs = Backbone.Model.extend({
        defaults: {
            name: ''
        }
    });
    return Backbone.Collection.extend({
        model: Breadcrumbs
    });
});