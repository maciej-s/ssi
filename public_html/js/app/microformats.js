define([
    'jquery',
    'settings',
    'bootstrap',
], function($, Settings){
    $.fn.memorize = function () {
        if(arguments.length == 1) {
            return JSON.stringify(localStorage.getItem(arguments[0]));
        }
        else if (argumnts.length == 2) {
            localStorage.setItem(arguments[0], JSON.parse(arguments[1]));
        }
    };

    // append global microformats
    var global = function ($object) {

        // toggle class
        $object.on ( 'click', '.mf-toggle', function (e) {
           var cls = $(this).data('toggle') || 'active',
               obj = $(this).data('ref') || this;
           if ($(obj).length > 0) {
               $(obj).toggleClass(cls);
           }
           // trigger event mf.toggle.[on|off] on reference object
           $(obj).trigger('mf.toggle.'+($(obj).hasClass(cls)? 'on' : 'off'), [$(this)]);

           e.preventDefault();
        });

        // store and automatically load data from localStorage
        // use $.memorize function
        // if object is a input, function memorize its value
        // otherwise function memorize class attribute
        $object.on( 'click', '.mf-memorize', function () {
            var id = $(this).data('id') || $(this).attr('id');
            if (id) {
                // detect element type
                if (this.nodeName === 'INPUT') {
                    $(this).memorize(id, {
                        value: $(this).val()
                    });
                } else {
                    $(this).memorize(id, {
                        value: $(this).attr('class')
                    });
                }
            }
        });
        $( '.mf-memorize', $object).each (function () {
            var id = $(this).data('id') || $(this).attr('id');
            if ( id ) {
                var mem = $(this).memorize(id);
                if (mem && mem.value !== undefined) {
                    // detect element type
                    if (this.nodeName === 'INPUT') {
                        $(this).val(mem.value);
                    } else {
                        $(this).attr('class', mem.value);
                    }
                }
            }
        });

        // format text element
        $('.mf-format', $object).each ( function () {
            if ($(this).hasClass('price')) {
                var text = $(this).text();
                if (text) {
                    // perform rexexp
                    var matched = text.match(/([0-9.]+)/gm);
                    // format price
                    console.debug(matched);
                    // todo: complete
                }
            }
        });
    };
    return {
        global: global,
        init: function () {
            this.global($('body'));
        }
    }
});