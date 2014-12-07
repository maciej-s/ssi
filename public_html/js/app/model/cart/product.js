define([
    'backbone',
    'app/alert'
],function (Backbone, Alert) {
   return Backbone.Model.extend({
       defaults: {
           'id': 0,
           'image': '',
           'uri': '',
           'name': '',
           'price': 0
       },
       urlRoot: 'get/offer/cart/',
       url: function () {
           if (this.get('id')) {
                return this.urlRoot  + this.get('id') + '.json';
           }
           Alert.warning('Error occurred. Unable to add unknown product to cart');
           throw new Error('Missing product id');
       }
   })
});