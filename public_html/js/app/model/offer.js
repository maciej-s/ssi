define([
    'Backbone'
], function () {
    var Offer = Backbone.Model.extend({
        defaults: {
            // images
            images: Backbone.Collection.extend({
                model: Backbone.Model.extend({
                    defaults: {
                        image: '',
                        description: ''
                    }
                })
            }),
        }
    });


   return {

   }
});