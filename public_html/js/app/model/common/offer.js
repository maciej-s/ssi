define([
    'backbone',
    'app/alert'
], function (Backbone, Alert) {
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
        urlRoot : 'get/offer',
        url: function () {
            if(this.get('id')) {
                return this.urlRoot +'/'+ this.get('id')+'/info.json'
            }
            Alert.warning('Offer does not exists');
            throw new Error('Missing product id');
        }
    });

});