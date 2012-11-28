<%@page session="false" contentType="text/html" pageEncoding="utf-8" %><%
%><%@page import="
    java.util.Map,
    java.util.HashMap,
    org.apache.commons.lang.StringUtils
" %><%@include file="/libs/foundation/global.jsp"%><%
    final String[] propertyNames = properties.get("propertyNames", new String[0]);
%>
<h2>Titles</h2>
<form action="#">
<%
    for (final String propertyName : propertyNames) {
        final String[] parts = StringUtils.split(propertyName, '|');
        if (parts.length > 0) {
            final String label = parts[0];
            final String name = parts.length == 2 ? parts[1] : label;
            %>
            <input id="<%=name%>" name="<%=name%>" placeholder="<%=label%>">
            <%
        }
    }
%>
</form>