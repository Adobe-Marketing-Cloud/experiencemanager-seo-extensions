;(function($) {
    $(document).on("seo-toolbox-ready", function(event, toolbox) {
        var fieldNames = ["jcr:title", "jcr:description", "navTitle"];
        var inputFields = $(toolbox).find(".tools .titles input");
        $(toolbox).on("change", ".tools .titles input", function(event) {
            var field = $(event.currentTarget);
            var params = {};
            params[field.attr("name")] = field.val();
            $.post(CQ.WCM.getPagePath() + "/jcr:content", params);
        });
        $.get(CQ.WCM.getPagePath() + "/jcr:content.infinity.json", function(pageProps) {
            inputFields.each(function(idx, field) {
                var name = $(field).attr("name");
                var parts = name.split("/");
                var value = pageProps;
                for (var i = 0; i < parts.length; i++) {
                    value = value ? value[parts[i]] : value;
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
})($CQ);