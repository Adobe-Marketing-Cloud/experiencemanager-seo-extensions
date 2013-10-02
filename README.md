# SEO Extensions for Adobe Experience Manager

## SEO Toolbox
The SEO Toolbox provides a UI widget that guides authors to optimize their pages for search engines. Since the list of potential criteria for SEO can be arbitrarily long, the SEO Toolbox is built with pluggability in mind. Each plugin, called an "SEO Tool" can contribute a number of criteria that an author needs to check and it can provide a UI to help fix any problems that were detected.

## SEO Tools aka Plugins
Currently the SEO Toolbox includes two SEO Tools. One helps an author to use coherent wording in titles and the page's URL handle. The other helps detecting similar pages within the same site and provides links to any detected duplicates.

## Getting Started
Assuming you have CQ5 running on `http://localhost:4502`, you can clone the project and run `mvn install -P installPackage` from the project root directory. This will build a content-package and install it into your CQ5 instance.

In order to then make use of the SEO Toolbox, you will need to add one more include statement to your page's rendering script. Ideally towards the end of the `<body>` tag. E.g. you can insert it in `/apps/geometrixx/components/page/body.jsp` and `/apps/geometrixx-outdoors/components/page/body.jsp` before the "timing" include.

    <cq:include path="seo" resourceType="seo/components/toolbox/init"/>

That's it. You should now have a new button in your sidekick, which allows toggling the SEO Toolbox.

## TODOs
* document SEO Tools jQuery plugin contract for extensions

---

