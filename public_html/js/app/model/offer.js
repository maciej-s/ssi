define([
    'backbone'
], function (Backbone) {
    var Offer = Backbone.Model.extend({
        defaults: {
            id: 0,
            name: '',
            pricing: {
                regular: 0
            },
            badges: {}
        },
        urlRoot: 'get/offer/',
        url : function () {
            if ( this.get('id') ) {
                return this.urlRoot + this.get('id')+ '.json'
            }
            // throw error
        }
    });

   return {
        get : function (options) {
            return new Offer(options);
        }
   }
});