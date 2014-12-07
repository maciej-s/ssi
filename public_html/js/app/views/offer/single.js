define([
    'backbone',
    'app/template',
    'app/Pool',
    'app/Cart',
    'app/Alert',
    'add/model/offer'
], function (Backbone, Template, Pool, Cart, Alert) {
    Template.cache('pages/offer');
    Template.cache('pages/offer');
    // single offer view

    return {
        // initialize single view
        initialize : function (pid) {
            if (pid) {
                this.model = '';
            } else {
                Alert.error('Unknown offer.');
            }
        }
    }
});