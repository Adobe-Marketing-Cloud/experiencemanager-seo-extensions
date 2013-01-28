;(function($, window, document, console) {

    var pluginName = 'similar-pages';
    var SimilarPagesPlugin = function(toolbox, element) {
        this.toolbox = toolbox;
        this.element = element;
        this.$element = $(this.element);
    };
    var linkTemplate = $.template('<li><a href="${path}.html">${title}</a></li>');

    $.extend(SimilarPagesPlugin.prototype, {
        extractCriteria: function(json) {
            var similarPages = json[pluginName];
            var list = $("<ul></ul>");
            $.each(similarPages, function(idx, similarPage) {
                list.append($.tmpl(linkTemplate, similarPage));
            });
            this.$element.find("ul").replaceWith(list);
            return [];
        },
        name: function() {
            return pluginName;
        }
    });

    $.fn[pluginName] = function(config) {
        return this.each(function() {
            if (!$.data(this, pluginName)) {
                $.data(this, pluginName, new SimilarPagesPlugin(this, config));
            }
        });
    };

    $(document).on('toolbox-registerplugins', function(event, tb) {
        $(tb).find('.tools .similar-pages').each(function(i, el) {
            var toolbox = $(tb).data('toolbox');
            toolbox.registerPlugin(new SimilarPagesPlugin(toolbox, el));
        });
    });
})($CQ, window, document, CQ.WCM.getTopWindow().console);