<%@page session="false" contentType="text/html" pageEncoding="utf-8" %><%
%><%@include file="/libs/foundation/global.jsp"%><%

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
    <style>
        div.edit-box {
            padding: 20px 80px;
            margin: 0;
            width: 440px;
            background-color: transparent;
        }

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
        .cq-seo-toolbox .tools .new {
            margin:8px;
            padding:0;
            border-bottom: none;
        }
        .cq-seo-toolbox h2 {
            width: auto;
            margin: 0;
            padding: 0;
            color: #ffffff;
            border: none;
        }
    </style>
</head>