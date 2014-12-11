define([
    'jquery'
], function ($) {

    /**
     * Poor-equivalent of printf function
     * support:
     *  %s, %i, %.[n]f, %f
     * @param {string} message
     */
    var printf = function (message) {
        var f = message.match(/\%{1,1}([sif])|(\.\df)/gm);

        if (f) {
            if (f.length !== arguments.length - 1) {
                throw new Error('Mismatch amount of parameters in message');
            } else {
                var args = arguments;
                $.each(f, function (k, v) {
                    console.log(k, v, arguments[k + 1]);
                    message = message.replace(new RegExp('(' + v[0] + ')'), args[k + 1]);
                });

            }
        }
        return message;
    };

    /**
     * Create alert and attach it to #alert-container
     * @param {string} type
     * @param {string} message
     */
    var alert = function (type, message) {

        var icon = '',
            args = [].slice.call(arguments);
        switch(type) {
            case 'danger':  icon = 'glyphicon glyphicon-remove'; break;
            case 'info':    icon = 'glyphicon glyphicon-pencil'; break;
            case 'success': icon = 'glyphicon glyphicon-ok'; break;
            case 'warning': icon = 'glyphicon glyphicon-warning-sign'; break;
        }

        // shift both arguments
        args.shift(); args.shift();

        var $alert = $('<div>',{
            class: 'alert alert-'+type+' alert-dismissible',
            html: '<div class="container"><div class="row"><div class="col-xs-12"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>'+
                '<i class="'+icon+'"></i>' + printf.apply(printf, [message].concat(args))+'</div></div></div>'
        });
        $('.alert-container').append($alert);
    };

    return {
        /**
         * Display information message
         * @param {string} message
         */
        notice : function (message) {
            alert.apply (alert, ['info'].concat([].slice.call(arguments)));
        },

        /**
         * Display error message
         * @param {string} message
         */
        error : function (message) {
            alert.apply (alert, ['danger'].concat([].slice.call(arguments)));
        },

        /**
         * Display warning message
         * @param message
         */
        warning : function (message) {
            alert.apply (alert, ['warning'].concat([].slice.call(arguments)));
        },

        /**
         * Display success message
         * @param message
         */
        success : function (message) {
            alert.apply (alert, ['success'].concat(arguments));
        },

        alert : alert,
        printf: printf
    }
});