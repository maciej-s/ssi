define([
    'backbone',
    'app/model/common/offer'
], function (Backbone, Offer) {
   // category model - offers collection
    return Backbone.Collection.extend({
        model: Offer,
        url : function () {
            return '';
        }
    })
});