<%@page session="false" contentType="text/html" pageEncoding="utf-8" %><%
%><%@include file="/libs/foundation/global.jsp"%>
<header class="cq-seo-header">
    <h1>SEO Toolbox</h1>
    <div class="cq-close" title="Close"></div>
</header>
<div class="cq-seo-suggestions">
    <h2>Suggested Improvements</h2>
    <ul>
        <li class="fixed">Nothing to do.</li>
    </ul>
</div>
<sling:include path="tools" resourceType="foundation/components/parsys"/>