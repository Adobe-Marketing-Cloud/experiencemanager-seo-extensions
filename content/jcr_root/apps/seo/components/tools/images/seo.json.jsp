<%@page session="false" contentType="application/json" pageEncoding="utf-8" %><%
%><%@page import="
    org.apache.sling.api.resource.ResourceUtil,
    java.util.Iterator,
    org.apache.sling.commons.json.JSONObject,
    org.apache.sling.commons.json.JSONArray,
    org.apache.sling.commons.json.JSONException,
    java.util.Collections,
    java.util.List,
    java.util.ArrayList
" %><%@include file="/libs/foundation/global.jsp"%><%

    final String analyzedPagePath = slingRequest.getParameter("page");
    final Page analyzedPage = analyzedPagePath == null ? null : pageManager.getPage(analyzedPagePath);

    final Iterator<Resource> images;
    if (analyzedPage != null) {
        images = collectImageResources(analyzedPage);
    } else {
        images = Collections.<Resource>emptySet().iterator();
    }

    final JSONArray json = new JSONArray();
    while (images.hasNext()) {
        final Resource image = images.next();
        json.put(createImageObject(image));
    }

    final JSONObject rootJson = (JSONObject) request.getAttribute("seo-json");
    rootJson.put("images", json);
%><%!
    private Iterator<Resource> collectImageResources(final Page page) {
        final Resource parResource = page.getContentResource("par");
        final Iterator<Resource> paragraphs = parResource.listChildren();
        final List<Resource> images = new ArrayList<Resource>();
        while (paragraphs.hasNext()) {
            final Resource image = paragraphs.next();
            // TODO: make resourceTypes configurable
            // currently this covers image and textimage
            if (image.getResourceType().endsWith("image")) {
                images.add(image);
            }
        }
        return images.iterator();
    }

    private JSONObject createImageObject(final Resource image) throws JSONException {
        final ValueMap props = ResourceUtil.getValueMap(image);
        final String fileReference = props.get("fileReference",
                props.get("image/fileReference", ""));

        final JSONObject jsonImage = new JSONObject();
        jsonImage.put("thumbnailPath", fileReference + "/jcr:content/renditions/cq5dam.thumbnail.48.48.png");
        jsonImage.put("path", image.getPath());
        jsonImage.put("comments", createImageComments(image));
        return jsonImage;
    }

    private JSONArray createImageComments(final Resource image) throws JSONException {
        final Resource img = image.getChild("image") != null ? image.getChild("image") : image;

        final ValueMap props = ResourceUtil.getValueMap(img);
        boolean hasAlt = props.get("alt", String.class) != null;
        boolean hasTitle = props.get("jcr:title", String.class) != null;

        JSONArray comments = new JSONArray();
        JSONObject comment = new JSONObject();
        comment.put("status", hasAlt ? "fixed" : "todo");
        comment.put("comment", "make sure the alt attribute is set");
        comments.put(comment);

        comment = new JSONObject();
        comment.put("status", hasTitle ? "fixed" : "todo");
        comment.put("comment", "make sure the title attribute is set");
        comments.put(comment);
        return comments;
    }
%>