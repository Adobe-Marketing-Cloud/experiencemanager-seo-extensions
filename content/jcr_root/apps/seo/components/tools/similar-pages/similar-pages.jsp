<%--
    = Page Properties SEO Tool
     The page properties SEO Tool allows to have the following properties
     checked according to a heuristics. The tool rejects pages when these
     properties are not sufficietly coherent (i.e. they should use similar
     keywords.

     Available properties are:
     * Page Title (html > head > title)
     * Page Heading (body h1, only the first h1)
     * Navigation Title (title used in navigation)
     * Description (meta[name=description])
     * Keywords (meta[name=keywords]
     * URL handle (sling:alias, special property nodeName, not editable)

--%><%@page session="false" contentType="text/html" pageEncoding="utf-8" %><%
%><%@page import="
    java.util.Map,
    java.util.LinkedHashMap
" %><%@include file="/libs/foundation/global.jsp"%><%
    final Map<String, String> fields = new LinkedHashMap<java.lang.String, java.lang.String>();
    fields.put("URL Handle", "urlHandleProperties");
    fields.put("Page Title", "pageTitleProperties");
    fields.put("Page Heading", "pageHeadingProperties");
    fields.put("Navigation Title", "navigationTitleProperties");
    fields.put("Description", "descriptionProperties");
%>
<h2>Similar Pages</h2>
<ul>
    <li>No similar pages found.</li>
</ul>