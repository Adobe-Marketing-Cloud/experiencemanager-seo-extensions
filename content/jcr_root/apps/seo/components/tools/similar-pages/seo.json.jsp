<%@page session="false" contentType="application/json" pageEncoding="utf-8" %><%
%><%@page import="
    org.apache.sling.api.resource.ResourceUtil,
    java.util.Iterator,
    javax.jcr.query.Query,
    org.apache.commons.lang.StringUtils,
    org.apache.sling.commons.json.JSONObject,
    org.apache.sling.commons.json.JSONArray
" %><%@include file="/libs/foundation/global.jsp"%><%

    final int parentLevel = 2;
    final int similarPagesLimit = 3;

    final JSONArray json = new JSONArray();

    final String analyzedPagePath = slingRequest.getParameter("page");
    final Page analyzedPage = pageManager.getPage(analyzedPagePath);
    if (analyzedPage != null && analyzedPage.getAbsoluteParent(parentLevel) != null) {
        final String languageRootPath = analyzedPage.getAbsoluteParent(parentLevel).getPath();
        final String queryFormat = "/jcr:root/%s//*[@jcr:primaryType='cq:Page' and rep:similar(., '%s')] order by @jcr:score descending";
        final String query = String.format(queryFormat, languageRootPath, analyzedPagePath);

        final Iterator<Resource> similarResources = resourceResolver.findResources(query, Query.XPATH);
        final Iterator<Page> similarPages = ResourceUtil.adaptTo(similarResources, Page.class);

        int count = 0;
        while (count < similarPagesLimit && similarPages.hasNext()) {
            final Page similarPage = similarPages.next();
            if (StringUtils.equals(analyzedPagePath, similarPage.getPath())) {
                continue;
            }
            count++;
            final JSONObject value = new JSONObject();

            String title = similarPage.getTitle();
            if (StringUtils.isBlank(title)) {
                title = similarPage.getPageTitle();
            }

            if (StringUtils.isBlank(title)) {
                title = similarPage.getName();
            }

            value.put("title", title);
            value.put("path", similarPage.getPath());
            json.put(value);
        }
    }

    final JSONObject rootJson = (JSONObject) request.getAttribute("seo-json");
    rootJson.put("similar-pages", json);
%>