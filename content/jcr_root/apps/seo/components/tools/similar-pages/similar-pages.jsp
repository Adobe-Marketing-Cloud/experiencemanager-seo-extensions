<%--
    = Similar Pages SEO Tool
     This plugin displays pages that are similar to the context page.

     The list is populated via javascript with the data provided via teh *.seo.json request.

--%><%@page session="false" contentType="text/html" pageEncoding="utf-8" %><%
%><%@include file="/apps/seo/global.jsp"%>
<h2>Similar Pages</h2>
<p>Please verify that none of the similar pages listed below conveys the same information as this page.</p>
<ul>
    <li>No similar pages found.</li>
</ul>