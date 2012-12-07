<%@page session="false" contentType="application/json" pageEncoding="utf-8" %><%
%><%@page import="
    org.apache.sling.commons.json.JSONObject,
    org.apache.commons.lang.StringUtils
" %><%@include file="/libs/foundation/global.jsp"%><%
    final String[] PROPERTY_NAMES = {
            "urlHandleProperties",
            "pageTitleProperties",
            "pageHeadingProperties",
            "navigationTitleProperties",
            "descriptionProperties"
    };

    final JSONObject json = new JSONObject();
    final String analyzedPagePath = slingRequest.getParameter("page");
    final Page analyzedPage = analyzedPagePath == null ? null : pageManager.getPage(analyzedPagePath);
    if (analyzedPage != null) {
        final ValueMap analyzedPageProperties = analyzedPage.getProperties();
        for (final String name : PROPERTY_NAMES) {
            final String value = properties.get(name, "");
            final String[] pagePropNames = StringUtils.split(value, ',');
            for (final String pagePropName : pagePropNames) {
                final String pagePropValue;
                if (":nodename".equals(pagePropName)) {
                    pagePropValue = analyzedPage.getName();
                } else {
                    pagePropValue = analyzedPageProperties.get(pagePropName, String.class);
                }
                if (pagePropValue != null) {
                    json.put(pagePropName, pagePropValue);
                }
            }
        }
    }
    out.append(json.toString());
%>