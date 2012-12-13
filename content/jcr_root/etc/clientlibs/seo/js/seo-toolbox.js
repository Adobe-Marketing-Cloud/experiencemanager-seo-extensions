;(function($, window, document, topWindow) {
    var initSEOToolbox = function() {
        $.get("/etc/seo/toolbox.tools.html?wcmmode=disabled",
                function(data) {
                    var toolboxHTML = $(data)
                            .addClass("CQjquery")
                            .resizable()
                            .draggable({
                                handle: ".cq-seo-tools",
                                addClasses: false
                            })
                            .removeAttr("style")
                            .hide();
                    $("#CQ").before(toolboxHTML);
                    // TODO: restore position and size from cookie
                    $(document).trigger("seo-toolbox-ready", toolboxHTML);
                    toggleWithEvents(toolboxHTML);
                }
        );
    };

    var toggleSEOToolbox = function(cmp, evt) {
        var toolboxHTML = CQ.WCM.getContentWindow().$CQ(".cq-seo-toolbox");
        if (toolboxHTML.size() === 0) {
            initSEOToolbox();
        } else {
            toggleWithEvents(toolboxHTML);
        }
    };

    var toggleWithEvents = function(toolbox) {
        if (toolbox.is(":hidden")) {
            $(document).trigger("seo-toolbox-beforeshow", toolbox);
        } else {
            $(document).trigger("seo-toolbox-beforehide", toolbox);
        }
        toolbox.fadeToggle();
    };

    var seoButtonConfig = {
        iconCls: "cq-sidekick-seo-toolbox",
        icon: CQ.HTTP.getContextPath() + "/etc/clientlibs/seo/icons/seo-toolbox.png",
        tooltip: {
            title: "SEO",
            text: CQ.I18n.getMessage("Show the SEO Tools"),
            autoHide: true
        },
        enableToggle: true,
        handler: toggleSEOToolbox
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

            var displaySEOToolbox = window.location.search.indexOf("wcmmode=seo") > -1;
            if (displaySEOToolbox) {
                toggleSEOToolbox();
                seoButton && seoButton.toggle();
            }
        }
    };

    topWindow.CQ.WCM.on("sidekickready", function(sidekick) {
        var toolbar = sidekick.getBottomToolbar();
        toolbar.on("afterlayout", function(tb) {
            addSEOButton(tb);
        });
    });
})($CQ, CQ.WCM.getContentWindow(), CQ.WCM.getContentWindow().document, CQ.WCM.getTopWindow());
