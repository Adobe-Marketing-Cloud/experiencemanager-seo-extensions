;(function($) {
    var seoButton = {
        text:"SEO",
        tooltip: {
            title: "SEO",
            text: CQ.I18n.getMessage("Show the SEO Tools"),
            autoHide: true
        },
        handler: function(cmp, evt) {
            var toolboxHTML = $(".cq-seo-toolbox");
            if (toolboxHTML.size() === 0) {
                $.get("/etc/seo/toolbox.tools.html?wcmmode=disabled",
                        function(data) {
                            toolboxHTML = $(data)
                                    .addClass("CQjquery")
                                    .resizable()
                                    .draggable({
                                        handle: ".cq-seo-tools",
                                        addClasses: false
                                    })
                                    .removeAttr("style")
                                    .css("position", "fixed")
                                    .css("top", "50px")
                                    .css("left", "50px")
                                    .css("opacity", ".94")
                                    .hide()
                            $("#CQ").before(toolboxHTML)
                            toolboxHTML.fadeToggle()
                        }
                )
            } else {
                toolboxHTML.fadeToggle()
            }
            this.toggle()
        }
    };

    CQ.WCM.on("sidekickready", function(sidekick) {
        var bt = sidekick.getBottomToolbar();
        bt.on("afterlayout", function(toolbar) {
            var seoButtons = $.grep(toolbar.items.items, function(button) {
                return button.text === "SEO";
            })
            if (seoButtons.length === 0) {
                var clientContextButtons = $.grep(toolbar.items.items, function(button) {
                    return button.iconCls === "cq-sidekick-clientcontext";
                })
                if (clientContextButtons.length > 0) {
                    var idx = $.inArray(clientContextButtons[0], bt.items.items)
                    toolbar.insertButton(idx + 1, seoButton)
                }
            }
        });
    })
})($CQ);