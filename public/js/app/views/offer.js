define([
    'underscore',
    ''
],function(){

    return {
        initialize: function (options) {
            options.breadcrumbs.push('Offers');

            if (!_.isEmpty(options.params)) {
                if (_.isNumber(Number(options.params[0])) &&
                    options.params[1] !== undefined) {

                    // load offer view
                    require(['app/views/offer/single'], function (single) {
                        // initialize single view
                        single.initialize(options);
                    });
                } else if (options.params[0]) {
                    // load all categories
                    require(['app/views/offer/categories'], function (categories){
                        categories.initialize(options);
                    });
                }
            } else {
                // error page 404
            }
        }
    }
})