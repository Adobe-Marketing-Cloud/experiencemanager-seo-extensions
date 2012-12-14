;
(function($, window, document, topWindow) {
    var attachSEOButton = function(topWindow) {
        var seoButtonConfig = {
            iconCls: "cq-sidekick-seo-toolbox",
            icon: CQ.HTTP.getContextPath() + "/etc/clientlibs/seo/icons/seo-toolbox.png",
            tooltip: {
                title: "SEO",
                text: CQ.I18n.getMessage("Show the SEO Tools"),
                autoHide: true
            },
            enableToggle: true,
            handler: function() {
                var contentWindow = topWindow.CQ.WCM.getContentWindow();
                var toolbox = contentWindow.$CQ(".cq-seo-toolbox");
                toolbox.data("toolbox").toggle();
            }
        };

        var addSEOButton = function(toolbar) {
            var seoButtons = $.grep(toolbar.items.items, function(button) {
                return button.iconCls === "cq-sidekick-seo-toolbox";
            });
            if (seoButtons.length === 0) {
                var seoButton;
                var clientContextButtons = $.grep(toolbar.items.items, function(button) {
                    return button.iconCls === "cq-sidekick-clientcontext";
                });
                if (clientContextButtons.length > 0) {
                    var idx = $.inArray(clientContextButtons[0], toolbar.items.items);
                    seoButton = toolbar.insertButton(idx + 1, seoButtonConfig);
                }


                var contentWindow = topWindow.CQ.WCM.getContentWindow();
                var displaySEOToolbox = contentWindow.location.search.indexOf("wcmmode=seo") > -1;
                if (displaySEOToolbox) {
                    var toolbox = contentWindow.$CQ(contentWindow.document).find(".cq-seo-toolbox");
                    toolbox.fadeToggle();
                    seoButton && seoButton.toggle();
                }
            }
        };

        topWindow.CQ.WCM.on("sidekickready", function(sidekick) {
            topWindow.console.debug("attaching SEO button to sidekick");
            var toolbar = sidekick.getBottomToolbar();
            toolbar.on("afterlayout", function(tb) {
                addSEOButton(tb);
            });
        });
    };

    $(function() {
        $(".cq-seo-toolbox").toolbox();
    });

    topWindow.$CQ(function() {
        attachSEOButton(topWindow);
    });

    // handle cookie
    /*
    $(document)
            .on('toolbox-ready', function(event, el) {
                var restoreState = $.cookie('cq-seo-toolbox');
                if (restoreState) {
                    var parts = restoreState.split(':');
                    var visibility = parts[0];
                    var offset = { top: parts[1], left: parts[2] };
                    console.debug("restore state", visibility, offset, el);
                    $(el).offset(offset);
                    if ('show' === visibility) {
                        $(el).show();
                    } else if ('hide' === visibility) {
                        $(el).hide();
                    }
                }
            })
            .on('toolbox-show', function(event, el) {
                if ($(el).is('.cq-seo-toolbox')) {
                    var pos = $(el).offset();
                    pos.top = pos.top - $(document).scrollTop()
                    pos.left = pos.left - $(document).scrollLeft()
                    var value = 'show:' + pos.top + ':' + pos.left;
                    console.debug("show: store state", value);
                    $.cookie('cq-seo-toolbox', value);
                }
            })
            .on('toolbox-beforehide', function(event, el) {
                if ($(el).is('.cq-seo-toolbox')) {
                    var pos = $(el).offset();
                    pos.top = pos.top - $(document).scrollTop()
                    pos.left = pos.left - $(document).scrollLeft()
                    var value = 'hide:' + pos.top + ':' + pos.left;
                    console.debug("hide: store state", value);
                    $.cookie('cq-seo-toolbox', value);
                }
            });
    */


})($CQ, CQ.WCM.getContentWindow(), CQ.WCM.getContentWindow().document, CQ.WCM.getTopWindow());
