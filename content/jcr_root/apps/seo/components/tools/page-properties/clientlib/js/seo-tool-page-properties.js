;(function($, window, document, console) {

    var pluginName = 'page-properties';
    var PagePropertiesPlugin = function(toolbox, element) {
        this.toolbox = toolbox;
        this.element = element;
        this.$element = $(this.element);
        this._init();
    };

    $.extend(PagePropertiesPlugin.prototype, {
        _init: function() {
            var self = this;
            this.$element.on("change", "[data-properties]", function(event) {
                var field = $(event.currentTarget);
                var propName = field.attr("data-properties").split(",")[0];
                var params = {};
                params[propName] = field.val();
                $.post(CQ.WCM.getPagePath() + "/jcr:content", params, function() {
                    self.toolbox.refresh();
                });
            });
        },
        _setData: function(pageProps) {
            var inputFields = this.$element.find("[data-properties]");
            inputFields.each(function(idx, field) {
                var propNames = $(field).attr("data-properties").split(",");
                var value;
                for (var i = 0; i < propNames.length; i++) {
                    var propName = propNames[i];
                    value = pageProps[propName];
                    if (value && value !== "") {
                        break;
                    }
                }

                if (value) {
                    $(field).val(value);
                }
            });
        },
        extractCriteria: function(json) {
            var config = json[pluginName];
            this._setData(config['data']);
            return config['criteria'];
        },
        name: function() {
            return pluginName;
        }
    });

    $.fn[pluginName] = function(config) {
        return this.each(function() {
            if (!$.data(this, pluginName)) {
                $.data(this, pluginName, new PagePropertiesPlugin(this, config));
            }
        });
    };

    $(document).on('toolbox-registerplugins', function(event, tb) {
        $(tb).find('.tools .page-properties').each(function(i, el) {
            var toolbox = $(tb).data('toolbox');
            toolbox.registerPlugin(new PagePropertiesPlugin(toolbox, el));
        });
    });
})($CQ, window, document, CQ.WCM.getTopWindow().console);