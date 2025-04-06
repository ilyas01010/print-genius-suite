
// Simple Node.js script to generate a production sitemap.xml

const fs = require('fs');
const path = require('path');

// Configuration
const domain = 'https://print-genius-suite.com';
const lastmod = new Date().toISOString().split('T')[0]; // Current date in YYYY-MM-DD format
const outputPath = path.join(__dirname, 'public', 'sitemap.xml');

// Define your routes and their priorities/change frequencies
const routes = [
  { path: '/', priority: 1.0, changefreq: 'weekly' },
  { path: '/dashboard', priority: 1.0, changefreq: 'weekly' },
  { path: '/design-generator', priority: 0.8, changefreq: 'weekly' },
  { path: '/niche-research', priority: 0.7, changefreq: 'monthly' },
  { path: '/analytics', priority: 0.7, changefreq: 'monthly' },
  { path: '/copyright-checker', priority: 0.7, changefreq: 'monthly' },
  { path: '/learning', priority: 0.6, changefreq: 'monthly' },
  { path: '/settings', priority: 0.5, changefreq: 'monthly' },
];

// Generate XML
let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

routes.forEach(route => {
  sitemap += '  <url>\n';
  sitemap += `    <loc>${domain}${route.path}</loc>\n`;
  sitemap += `    <lastmod>${lastmod}</lastmod>\n`;
  sitemap += `    <changefreq>${route.changefreq}</changefreq>\n`;
  sitemap += `    <priority>${route.priority}</priority>\n`;
  sitemap += '  </url>\n';
});

sitemap += '</urlset>\n';

// Write to file
fs.writeFileSync(outputPath, sitemap);
console.log(`Sitemap generated at ${outputPath}`);

// Add this to package.json scripts: "generate-sitemap": "node generate-sitemap.js"
