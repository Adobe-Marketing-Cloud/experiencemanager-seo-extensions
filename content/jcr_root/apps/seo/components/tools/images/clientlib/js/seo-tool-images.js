;(function($, window, document, console) {

    var pluginName = 'images';
    var ImagesPlugin = function(toolbox, element) {
        this.toolbox = toolbox;
        this.element = element;
        this.$element = $(this.element);
    };
    var listItemTemplate = $.template(
            '<li>' +
            '    <img src="${thumbnailPath}">' +
            '    <ul>{{each(idx, val) comments}}' +
            '        <li class="${val.status}">${val.comment}</li>' +
            '    {{/each}}<ul>' +
            '    </ul>' +
            '</li>'
    );

    $.extend(ImagesPlugin.prototype, {
        extractCriteria: function(json) {
            var images = json[pluginName];
            var list = $("<ul></ul>");
            $.each(images, function(idx, image) {
                var img = $.tmpl(listItemTemplate, image);
                img.on("click", function() {
                    var editable = CQ.WCM.getEditable(image.path);
                    var el = $(editable.el.dom);
                    var scrollTop = el.offset().top - 100;
                    $(document.body).animate({ scrollTop: scrollTop }, function() {
                        editable.componentDropTarget.flash();
                    });
                });
                list.append(img);
            });
            this.$element.find("ul").first().replaceWith(list);
            return [];
        },
        name: function() {
            return pluginName;
        }
    });

    $.fn[pluginName] = function(config) {
        return this.each(function() {
            if (!$.data(this, pluginName)) {
                $.data(this, pluginName, new ImagesPlugin(this, config));
            }
        });
    };

    $(document).on('toolbox-registerplugins', function(event, tb) {
        $(tb).find('.tools .images').each(function(i, el) {
            var toolbox = $(tb).data('toolbox');
            toolbox.registerPlugin(new ImagesPlugin(toolbox, el));
        });
    });
})($CQ, window, document, CQ.WCM.getTopWindow().console);