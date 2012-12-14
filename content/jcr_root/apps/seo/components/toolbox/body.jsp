<%@page session="false" contentType="text/html" pageEncoding="utf-8" %><%
%><%@include file="/libs/foundation/global.jsp"%><%
    final String title = currentPage.getTitle() == null ? currentPage.getName() : currentPage.getTitle();
%><body>
    <h1><%=xssAPI.encodeForHTML(title)%></h1>
    <div class="edit-box">
        <section class="cq-seo-toolbox">
            <sling:include path=".tools.html"/>
        </section>
    </div>
</body>