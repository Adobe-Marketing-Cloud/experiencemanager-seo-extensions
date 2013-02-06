<%--
    = Similar Pages SEO Tool
     This plugin displays pages that are similar to the context page.

     The list is populated via javascript with the data provided via teh *.seo.json request.

--%><%@page session="false" contentType="text/html" pageEncoding="utf-8" %><%
%><%@include file="/libs/foundation/global.jsp"%>
<h2>Images</h2>
<p>Click the images to find them in the page.</p>
<ul>
    <li>
        <img src="/content/dam/geometrixx/packshots/pack_triangle.jpg/jcr:content/renditions/cq5dam.thumbnail.48.48.png">
        <ul>
            <li class="fixed">make sure the alt attribute is set</li>
            <li class="todo">make sure the title attribute is set</li>
        </ul>
    </li>
</ul>