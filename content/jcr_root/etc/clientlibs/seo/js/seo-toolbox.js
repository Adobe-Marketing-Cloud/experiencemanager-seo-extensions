;
(function($, window, document, topWindow) {
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
        var seoButton = findSEOButton(CQ);
        if (seoButton === undefined) {
            var clientContextButtons = $.grep(toolbar.items.items, function(button) {
                return button.iconCls === "cq-sidekick-clientcontext";
            });
            if (clientContextButtons.length > 0) {
                var idx = $.inArray(clientContextButtons[0], toolbar.items.items);
                toolbar.insertButton(idx + 1, seoButtonConfig);
            }
        }
    };

    var findSEOButton = function(CQ) {
        var toolbar = CQ.WCM.getSidekick().getBottomToolbar();
        var seoButtons = $.grep(toolbar.items.items, function(button) {
            return button.iconCls === "cq-sidekick-seo-toolbox";
        });
        return seoButtons.length > 0 ? seoButtons[0] : undefined;
    };

    topWindow.CQ.WCM.on("sidekickready", function(sidekick) {
        var toolbar = sidekick.getBottomToolbar();
        toolbar.on("afterlayout", function(tb) {
            addSEOButton(tb);
            $(document).on('toolbox-ready', function(event, el) {
                topWindow.console.debug("init button on toolbox-ready");
                findSEOButton(CQ).toggle($(el).is(':visible'));
            });
        });
    });

    topWindow.console.debug("setting up toolbox handlers");
    $(document).on('toolbox-ready', function(event, el) {
        var $el = $(el);
        $el.on('toolbox-show', function(event, el) {
            findSEOButton(CQ).toggle(true);
        });
        $el.on('toolbox-hide', function(event, el) {
            findSEOButton(CQ).toggle(false);
        });

        var contentWindow = topWindow.CQ.WCM.getContentWindow();
        var displaySEOToolbox = contentWindow.location.search.indexOf("wcmmode=seo") > -1;
        if (displaySEOToolbox) {
            console.debug("show toolbox because of wcmmode=seo");
            $el.data("toolbox").show();
        }
    });

    $(function() {
        topWindow.console.debug("initialize toolbox");
        $(".cq-seo-toolbox").toolbox();
    });

})($CQ, CQ.WCM.getContentWindow(), CQ.WCM.getContentWindow().document, CQ.WCM.getTopWindow());
