/** @type {import('next-sitemap').IConfig} */

// config for next-sitemap module
//? sitemap module is used to generate sitemap.xml file for SEO purposes
//? A sitemap is a file where you provide information about the pages, videos, and other files on your site
//? and the relationships between them. Search engines like Google read this file to more intelligently crawl your site.
module.exports = {
    siteUrl: process.env.SITE_URL ,
    generateRobotsTxt: true, // (optional)
    generateIndexSitemap: false,
};
