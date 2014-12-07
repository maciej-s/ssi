define([
    'backbone'
],function (Backbone) {
   return Backbone.Model.extend({
       defaults: {
           'id': 0,
           'image': '',
           'uri': '',
           'name': '',
           'price': 0
       }
   })
});