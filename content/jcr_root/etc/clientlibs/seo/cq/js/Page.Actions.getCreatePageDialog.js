;(function(CQ) {

    var similarTitlesURL = CQ.shared.HTTP.externalize('/apps/seo/content/similar-titles.json');

    var registerOnKeyEventHandler = function(title, similarTitles) {
        if(!title.enableKeyEvents){
            title.mon(title.el, {
                scope: title,
                keyup: title.onKeyUp
            });
        }

        title.on("keyup", function(field, e) {
            var val = this.getValue();
            if (val.length > 2) {
                var url = CQ.shared.HTTP.addParameter(similarTitlesURL, "q", val);
                CQ.shared.HTTP.get(url, function(options, success, response) {
                    var pages = [];
                    if (success) {
                        var json = CQ.Ext.util.JSON.decode(response.body);
                        if (json && json.pages) {
                            pages = json.pages;
                        }
                    }

                    if (pages.length > 0) {
                        similarTitles.update(pages);
                        similarTitles.show();
                    } else {
                        similarTitles.hide();
                    }
                });
            } else {
                similarTitles.update([]);
                similarTitles.hide();
            }
        });
    };

    var attachSimilarTitlesElement = function(title) {
        var config = {
            "xtype": "box",
            "fieldLabel": CQ.I18n.getMessage("Pages with similar title"),
            "itemCls": "similar-titles",
            "hidden": true,
            "data": [],
            "tpl": new CQ.Ext.XTemplate(
                    '<ul><tpl for=".">' +
                    '    <li><a href="/cf#{path}.html" target="_blank">{title} <span class="path">({path})</span></a></li>' +
                    '</tpl></ul>', {
                compiled: true,
                disableFormats: true
            })
        };

        var panel = title.ownerCt;
        var index = panel.items.indexOf(title);
        var similarTitles = CQ.Ext.ComponentMgr.create(config);
        panel.insert(index + 1, similarTitles);
        return similarTitles;
    };


    var redefineGetCreatePageDialog = function() {

        var originalGetCreatePageDialog = CQ.wcm.Page.getCreatePageDialog;

        CQ.wcm.Page.getCreatePageDialog = function(parentPath) {
            var dialog = originalGetCreatePageDialog(parentPath);
            var title = dialog.find("name", "title")[0];

            var similarTitles = attachSimilarTitlesElement(title);
            registerOnKeyEventHandler(title, similarTitles);
            return dialog;
        };    
    };

    if (CQ && CQ.wcm && CQ.wcm.Page && CQ.wcm.Page.getCreatePageDialog) {
        redefineGetCreatePageDialog();
    } else {
        CQ.Ext.onReady(redefineGetCreatePageDialog);
    }
})(CQ);