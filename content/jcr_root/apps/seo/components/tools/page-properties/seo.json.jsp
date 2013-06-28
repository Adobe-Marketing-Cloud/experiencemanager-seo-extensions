<%@page session="false" contentType="application/json" pageEncoding="utf-8" %><%
%><%@page import="
    org.apache.sling.commons.json.JSONObject,
    org.apache.sling.commons.json.JSONArray,
    org.apache.commons.lang.StringUtils,
    java.util.Map,
    java.util.HashMap
" %><%@include file="/apps/seo/global.jsp"%><%
    final String[] PROPERTY_NAMES = {
            "urlHandleProperties",
            "pageTitleProperties",
            "pageHeadingProperties",
            "navigationTitleProperties",
            "descriptionProperties"
    };

    final Map<String, String> values = new HashMap<String, String>();

    final JSONObject json = new JSONObject();
    final JSONObject data = new JSONObject();
    json.put("data", data);
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
                    data.put(pagePropName, pagePropValue);
                    if (!values.containsKey(name)) {
                        values.put(name,  pagePropValue);
                    }
                }
            }
        }
    }

    final JSONArray criteria = new JSONArray();
    json.put("criteria", criteria);
    JSONObject criterion;

    final String urlHandle = StringUtils.defaultString(values.get(PROPERTY_NAMES[0]), "");
    final String pageTitle = StringUtils.defaultString(values.get(PROPERTY_NAMES[1]), "");
    final String pageHeading = StringUtils.defaultString(values.get(PROPERTY_NAMES[2]), "");
    final String navTitle = StringUtils.defaultString(values.get(PROPERTY_NAMES[3]), "");
    final String description = StringUtils.defaultString(values.get(PROPERTY_NAMES[4]), "");

    //final boolean status =
    criterion = new JSONObject();
    criterion.put("title", pageTitle.toLowerCase());
    criterion.put("url",urlHandle.toLowerCase());
    criterion.put("status", pageTitle.toLowerCase().contains(urlHandle) ? "fixed" : "todo");
    criterion.put("hint", "Use the same words in URL Handle and Page Title.");
    criteria.put(criterion);

    criterion = new JSONObject();
    criterion.put("status", pageHeading.toLowerCase().contains(urlHandle) ? "fixed" : "todo");
    criterion.put("hint", "Use the same words in URL Handle and Page Header.");
    criteria.put(criterion);

    criterion = new JSONObject();
    criterion.put("status", navTitle.toLowerCase().contains(urlHandle) ? "fixed" : "todo");
    criterion.put("hint", "Use the same words in URL Handle and Navigation Title.");
    criteria.put(criterion);

    criterion = new JSONObject();
    criterion.put("status", description.isEmpty() ? "todo" : "fixed");
    criterion.put("hint", "Add a description to the page.");
    criteria.put(criterion);

    final JSONObject rootJson = (JSONObject) request.getAttribute("seo-json");
    rootJson.put("page-properties", json);
%>