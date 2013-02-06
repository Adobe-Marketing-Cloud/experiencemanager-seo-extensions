;(function($, document, topWindow) {
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
            return true;
        }
        return false;
    };

    var findSEOButton = function(CQ) {
        var toolbar = CQ.WCM.getSidekick().getBottomToolbar();
        var seoButtons = $.grep(toolbar.items.items, function(button) {
            return button.iconCls === "cq-sidekick-seo-toolbox";
        });
        // TODO: this may return undefined, so callers should not try to toggle the button
        return seoButtons.length > 0 ? seoButtons[0] : undefined;
    };

    $(document).one('toolbox-ready', function(event, el) {
        $(el)
            .on('toolbox-show', function(event, el) {
                findSEOButton(CQ).toggle(true);
            })
            .on('toolbox-hide', function(event, el) {
                findSEOButton(CQ).toggle(false);
            });
    });

    topWindow.CQ.WCM.on("sidekickready", function(sidekick) {
        var toolbar = sidekick.getBottomToolbar();
        toolbar.on("afterlayout", function(tb) {
            if (addSEOButton(tb)) {
                var toolbox = $(".cq-seo-toolbox").toolbox({
                    extraClass: "CQjquery",
                    closeSelector: ".cq-close",
                    draggableOptions: {
                        addClasses: false
                    },
                    cookie: "cq-seo-toolbox"
                });
                var contentWindow = topWindow.CQ.WCM.getContentWindow();
                var showSEOToolbox = contentWindow.location.search.indexOf("wcmmode=seo") > -1;
                if (showSEOToolbox) {
                    toolbox.data("toolbox").show();
                }
            }
        });
    });
})($CQ, CQ.WCM.getContentWindow().document, CQ.WCM.getTopWindow());
