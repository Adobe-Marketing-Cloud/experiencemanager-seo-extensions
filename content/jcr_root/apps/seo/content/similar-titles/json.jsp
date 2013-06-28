<%@page session="false" contentType="application/json" pageEncoding="utf-8" %><%--
--%><%@page import="
    org.apache.sling.api.resource.ResourceUtil,
    org.apache.sling.commons.json.JSONArray,
    org.apache.sling.commons.json.JSONObject,
    javax.jcr.query.Query,
    java.util.Iterator,
    java.util.regex.Pattern,
    java.util.regex.Matcher,
    org.apache.sling.api.resource.ResourceResolver,
    java.util.List,
    java.util.ArrayList,
    java.util.Collections,
    org.apache.jackrabbit.util.Text
" %><%@include file="/apps/seo/global.jsp" %><%

    final String q = request.getParameter("q");

    final List<Page> pages;
    if (q == null || q.length() < 3) {
        pages = Collections.emptyList();
    } else {
        pages = findPages(resourceResolver, q);
    }

    JSONArray similar = new JSONArray();
    for (final Page similarPage : pages) {
        final JSONObject p = new JSONObject();
        p.put("title", highlight(similarPage.getTitle(), q));
        p.put("path", similarPage.getPath());
        similar.put(p);
    }

    final JSONObject json = new JSONObject();
    json.put("pages", similar);
    json.put("query", q);
    out.append(json.toString());
%><%!
    private static final String HIGHLIGHT_FORMAT = "$1<span class=\"highlight\">$2</span>";

    private static final String QUERY_PATTERN =
            "/jcr:root/content//*[@jcr:primaryType='cq:Page' and (" +
                    "jcr:like(fn:lower-case(jcr:content/@jcr:title), '%1$s%%') " +
                    "or " +
                    "jcr:like(fn:lower-case(jcr:content/@jcr:title), '%% %1$s%%')" +
                    ")]";

    private static final int MAX_RESULTS = 6;

    private static List<Page> findPages(ResourceResolver resourceResolver, String titleQuery) {
        final String escapedTitle = Text.escapeIllegalXpathSearchChars(titleQuery.toLowerCase()).replaceAll("'", "''");

        final String query = String.format(QUERY_PATTERN, escapedTitle);
        final Iterator<Resource> pageResources = resourceResolver.findResources(query, Query.XPATH);
        final Iterator<Page> pages = ResourceUtil.adaptTo(pageResources, Page.class);

        final List<Page> result = new ArrayList<Page>();
        while (pages.hasNext()) {
            result.add(pages.next());
            if (result.size() >= MAX_RESULTS) {
                break;
            }
        }

        // return nothing if too many hits are found
        if (pages.hasNext()) {
            result.clear();
        }

        return result;
    }

    private static String highlight(String title, String term) {
        final Pattern pattern = Pattern.compile("(^|\\W)(" + term + ")", Pattern.CASE_INSENSITIVE);
        final Matcher matcher = pattern.matcher(title);
        return matcher.replaceAll(HIGHLIGHT_FORMAT);
    }
%>