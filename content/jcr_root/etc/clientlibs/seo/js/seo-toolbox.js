;(function($) {
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
        var toolboxHTML = $(".cq-seo-toolbox");
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
        text:"SEO",
        tooltip: {
            title: "SEO",
            text: CQ.I18n.getMessage("Show the SEO Tools"),
            autoHide: true
        },
        enableToggle: true,
        handler: toggleSEOToolbox
    };

    CQ.WCM.on("sidekickready", function(sidekick) {
        var bt = sidekick.getBottomToolbar();
        bt.on("afterlayout", function(toolbar) {
            var seoButtons = $.grep(toolbar.items.items, function(button) {
                return button.text === "SEO";
            });
            if (seoButtons.length === 0) {
                var seoButton;
                var clientContextButtons = $.grep(toolbar.items.items, function(button) {
                    return button.iconCls === "cq-sidekick-clientcontext";
                });
                if (clientContextButtons.length > 0) {
                    var idx = $.inArray(clientContextButtons[0], bt.items.items);
                    seoButton = toolbar.insertButton(idx + 1, seoButtonConfig);
                }

                var displaySEOToolbox = window.location.search.indexOf("wcmmode=seo") > -1;
                if (displaySEOToolbox) {
                    toggleSEOToolbox();
                    seoButton && seoButton.toggle();
                }
            }
        });
    })
})($CQ);