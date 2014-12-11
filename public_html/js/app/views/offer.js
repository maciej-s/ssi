define([
    'underscore',
    ''
],function(){

    return {
        initialize: function (options) {
            options.breadcrumbs.push('Offers');


            // loading default offers (mixed view)
            if (_.isEmpty(options.params)) {

            } else if(_.isNumber(Number(options.params[0])) &&
                options.params[1] !== undefined) {

                // load offer view
                require(['app/views/offer/single'], function (single){
                    // initialize single view
                    single.initialize(options);
                });
            }
        }
    }
})