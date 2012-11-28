<%--
  Copyright 1997-2009 Day Management AG
  Barfuesserplatz 6, 4001 Basel, Switzerland
  All Rights Reserved.

  This software is the confidential and proprietary information of
  Day Management AG, ("Confidential Information"). You shall not
  disclose such Confidential Information and shall use it only in
  accordance with the terms of the license agreement you entered into
  with Day.

  ==============================================================================

  Default content script.

  Draws the HTML content.

  ==============================================================================

--%>
<%@include file="/libs/foundation/global.jsp" %>
<div class="container_16">
    <div class="grid_16">
        <cq:include path="breadcrumb" resourceType="foundation/components/breadcrumb"/>
        <cq:include path="title" resourceType="geometrixx/components/title"/>
    </div>
    <div class="grid_12 body_container">
        <cq:include script="redirect.jsp"/>
        <cq:include path="par" resourceType="foundation/components/parsys"/>
    </div>
    <div class="grid_4 right_container">
        <cq:include path="rightpar" resourceType="foundation/components/iparsys"/>
    </div>
    <div class="clear"></div>
</div>
<style>

    .cq-seo-toolbox {
        background-color: #4E514D;
        border: 1px solid #4E514D;
        border-radius: 8px;
        -moz-border-radius: 8px;
        -webkit-border-radius: 8px;
        width:440px;
        font-family: Tahoma, sans-serif;
        font-size: 14px;
        font-weight: normal;
        z-index: 9002;

        position: absolute;
        top: 50px;
        left: 50px;
        opacity: .94;

    }
    .cq-seo-toolbox .cq-seo-tools {
        height: 28px;
        margin: -1px;
        background-color: #151515;
        border: 1px solid #151515;
        border-radius: 8px 8px 0px 0px;
    }
    .cq-seo-toolbox .tools .section {
        border: none;
        border-bottom: 1px solid #151515;
        min-height: 40px;
        padding: 8px;
    }
    .cq-seo-toolbox .tools .section:last-child {
        border: none;
    }
    .cq-seo-toolbox .tools .new {
        margin:8px;
        padding:0;
    }
    .cq-seo-toolbox h2 {
        width: auto;
        margin: 0;
        padding: 0;
        color: #ffffff;
        border: none;
    }
</style>
<script>
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
                    // alert("Inserting SEO button at " + idx);
                    toolbar.insertButton(idx + 1, seoButton)
                }
            }
        });
    })
})($CQ);
</script>