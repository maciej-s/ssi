define([
    'backbone'
], function (Backbone) {
    /**
     * Offer model
     */
    return Backbone.Model.extend({
        defaults: {
            incart: false,
            image: '',
            name: '',
            description: '',
            oldprice: '',
            price: '',
            id: 0,
            url: ''
        },
        urlRoot : 'get/offer/home',
        url: function () {
            if(this.get('id')) {
                return this.urlRoot +'/'+ this.get('id')+'.json'
            }
        }
    })
});