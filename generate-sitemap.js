const { SitemapStream, streamToPromise } = require("sitemap");
const { createWriteStream } = require("fs");
const path = require("path");

// Define the base URL of the website
const BASE_URL = "https://admin.bashaway.sliitfoss.org";

// Define the public routes with their change frequency and priority
const routes = [
  { url: "/", changefreq: "daily", priority: 1.0 },
  { url: "/dashboard", changefreq: "daily", priority: 0.9 },
  { url: "/events", changefreq: "weekly", priority: 0.8 },
  { url: "/users", changefreq: "weekly", priority: 0.8 },
  { url: "/login", changefreq: "monthly", priority: 0.7 },
  { url: "/questions", changefreq: "weekly", priority: 0.8 },
  { url: "/questions/1", changefreq: "weekly", priority: 0.6 }, // Example dynamic route
  { url: "/questions/2", changefreq: "weekly", priority: 0.6 }, // Example dynamic route
  { url: "/questions/1/submissions", changefreq: "weekly", priority: 0.5 }, // Example dynamic route
  { url: "/forgot-password", changefreq: "yearly", priority: 0.3 },
  { url: "/reset-password/example-code", changefreq: "yearly", priority: 0.3 }, // Example dynamic route
  { url: "/change-password", changefreq: "yearly", priority: 0.4 },
  { url: "/profile", changefreq: "monthly", priority: 0.6 }
];

(async () => {
  try {
    // Create a sitemap stream
    const sitemapStream = new SitemapStream({ hostname: BASE_URL });

    // Write each route to the sitemap stream
    routes.forEach((route) => sitemapStream.write(route));

    // End the stream
    sitemapStream.end();

    // Convert the stream to a promise and save it to a file
    const sitemapPath = path.join(__dirname, "public", "sitemap.xml");
    const writeStream = createWriteStream(sitemapPath);
    const sitemap = await streamToPromise(sitemapStream).then((data) => data.toString());

    writeStream.write(sitemap);
    writeStream.end();

    console.log("Sitemap successfully generated at:", sitemapPath);
  } catch (error) {
    console.error("Error generating sitemap:", error);
  }
})();
