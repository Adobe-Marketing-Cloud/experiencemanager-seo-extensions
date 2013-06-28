<%@page session="false" contentType="text/html" pageEncoding="utf-8" %><%
%><%@include file="/apps/seo/global.jsp"%><%

    final String title = currentPage.getTitle() == null ? currentPage.getName() : currentPage.getTitle();

    String favIcon = currentDesign.getPath() + "/favicon.ico";
    if (resourceResolver.getResource(favIcon) == null) {
        favIcon = null;
    }

%><head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <cq:include script="/libs/wcm/core/components/init/init.jsp"/>
    <% if (favIcon != null) { %>
        <link rel="icon" type="image/vnd.microsoft.icon" href="<%= favIcon %>">
        <link rel="shortcut icon" type="image/vnd.microsoft.icon" href="<%= favIcon %>">
    <% } %>
    <title><%=xssAPI.encodeForHTML(title)%></title>
    <script src="/libs/cq/ui/resources/cq-ui.js"></script>
    <cq:includeClientLib css="seo.toolbox"/>
</head>