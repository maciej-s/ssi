define([
    'handlebars',
    'jquery',
    'app/microformats'
], function (Handlebars, $, Microformats){

    window.Compiled = [];

    /**
     * Get template content
     * @param template
     */
    function get (template) {
        return $.ajax({
            url: 'skin/templates/'+template+'.hbs',
            dataType: 'text',
            method: 'GET'
        });
    }

    /**
     * Load tempalte to cache
     * @param template
     */
    function cache(template) {
        var $def = $.Deferred();
        if(Compiled[template] == undefined) {
            get(template).done(function (data) {
                Compiled[template] = Handlebars.compile(data);
                // resolve tpl
                $def.resolve(Compiled[template], data);
            }).fail(function(){
                $def.reject();
            });
        }else {
            // resolve tpl
            $def.resolve(Compiled[template]);
        }
        return $def.promise();
    }

    /**
     * Load template via ajax,
     * store compiled template in browser memory
     *
     * @param template
     * @param context
     */
    function load (template, context) {
        var $def = $.Deferred();
        cache(template).done(function (compiled) {
            var $template = $(compiled(context));

            Microformats.global($template);
            $def.resolve($template, compiled);
        }).fail(function(){
            $def.reject();
        });
        return $def.promise();
    };


    ///// handlebars helpers
    // load, fetch and append partial template
    Handlebars.registerHelper('partial', function (pid, options){

    });

    // Iterate through Backbone collection
    Handlebars.registerHelper('collection', function (context, options) {
        var ret = '';
        if (context.length > 0 ) {
            var json = context.toJSON();
            for(var i=0; i < json.length; i++) {
                ret += options.fn(json[i]);
            }
        } else {
            ret += options.inverse();
        }
        return ret;
    });

    // register partials
    cache('common/cart/buttons').done(function (template) {
        Handlebars.registerPartial('cartButtons', template);

        cache('pages/home/offer').done(function (template) {
            Handlebars.registerPartial('offer', template);
        });
    });

    return {
        load: load,
        get: get,
        cache: cache
    }
});