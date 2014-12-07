define([
    'underscore',
    ''
],function(){

    return {
        initialize: function (options) {
            options.breadcrumbs.push('Offers');

            // loading default offers (mixed view)
            if (_.isEmpty(options.params)) {

            } else if(_.isNumber(options.params[0]) && options.params[1] !== undefined) {
                // load offer view

            }
        },
    }
})