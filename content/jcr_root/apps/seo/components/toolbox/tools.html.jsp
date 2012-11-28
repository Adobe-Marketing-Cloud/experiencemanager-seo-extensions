<%@page session="false" contentType="text/html" pageEncoding="utf-8" %><%
%><%@include file="/libs/foundation/global.jsp"%>
<section class="cq-seo-toolbox">
    <div class="cq-seo-tools">
        SEO Toolbox (<%=currentPage.getPath()%>)
        <div class="cq-close" title="Close"></div>
    </div>
    <sling:include path="tools" resourceType="foundation/components/parsys"/>
</section>