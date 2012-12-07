;(function($, window, document, console) {
    $(document).on("seo-toolbox-ready", function(event, toolbox) {
        var inputFields = $(toolbox).find(".tools .page-properties [data-properties]");
        /*
            .on("click", function(event) {
                $(event.currentTarget).attr("contenteditable", true);
            });
        */
        $(toolbox).on("change", ".tools .page-properties [data-properties]", function(event) {
            var field = $(event.currentTarget);
            var propName = field.attr("data-properties").split(",")[0];
            var params = {};
            params[propName] = field.val();
            $.post(CQ.WCM.getPagePath() + "/jcr:content", params);
        });
        var jsonURL = $(toolbox).attr("data-url");
        $.get(jsonURL, { page: CQ.WCM.getPagePath()}, function(pageProps) {
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
        });
        console.debug("Initializing titles plugin", toolbox);
    });
    $(document).on("seo-toolbox-beforeshow", function(event, toolbox) {
        console.debug("Initializing titles plugin beforeshow", toolbox);
    });
    $(document).on("seo-toolbox-beforehide", function(event, toolbox) {
        console.debug("Initializing titles plugin beforehide", toolbox);
    });
})($CQ, window, document, CQ.WCM.getTopWindow().console);