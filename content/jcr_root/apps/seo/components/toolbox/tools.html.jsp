<%@page session="false" contentType="text/html" pageEncoding="utf-8" %><%
%><%@include file="/libs/foundation/global.jsp"%>
<section class="cq-seo-toolbox" data-url="/etc/seo/toolbox/jcr:content.seo.json">
    <header class="cq-seo-header">
        <h1>SEO Toolbox</h1>
        <div class="cq-close" title="Close"></div>
    </header>
    <sling:include path="tools" resourceType="foundation/components/parsys"/>
</section>