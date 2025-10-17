// RSS Feed Generator for Absolute Accountant Blog
const fs = require('fs');
const path = require('path');

// Function to parse front matter from markdown files
function parseFrontMatter(content) {
  const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontMatterRegex);
  
  if (!match) {
    return { frontMatter: {}, content: content };
  }
  
  const frontMatterText = match[1];
  const markdownContent = match[2];
  const frontMatter = {};
  
  // Simple YAML parser for basic key-value pairs
  frontMatterText.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();
      
      // Remove quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      
      // Handle arrays (simple format)
      if (value.startsWith('[') && value.endsWith(']')) {
        value = value.slice(1, -1).split(',').map(item => item.trim().replace(/['"]/g, ''));
      }
      
      frontMatter[key] = value;
    }
  });
  
  return { frontMatter, content: markdownContent };
}

// Function to generate RSS feed
function generateRSSFeed() {
  const blogDir = path.join(__dirname, 'content', 'blog');
  const newsDir = path.join(__dirname, 'content', 'news');
  
  let allPosts = [];
  
  // Read blog posts
  if (fs.existsSync(blogDir)) {
    const blogFiles = fs.readdirSync(blogDir).filter(file => file.endsWith('.md'));
    blogFiles.forEach(file => {
      const filePath = path.join(blogDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      const { frontMatter } = parseFrontMatter(content);
      
      if (frontMatter.title && frontMatter.date) {
        allPosts.push({
          ...frontMatter,
          type: 'blog',
          filename: file
        });
      }
    });
  }
  
  // Read news posts
  if (fs.existsSync(newsDir)) {
    const newsFiles = fs.readdirSync(newsDir).filter(file => file.endsWith('.md'));
    newsFiles.forEach(file => {
      const filePath = path.join(newsDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      const { frontMatter } = parseFrontMatter(content);
      
      if (frontMatter.title && frontMatter.date) {
        allPosts.push({
          ...frontMatter,
          type: 'news',
          filename: file
        });
      }
    });
  }
  
  // Sort posts by date (newest first)
  allPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  // Generate RSS XML
  const rssItems = allPosts.map(post => {
    const pubDate = new Date(post.date).toUTCString();
    const link = `https://absoluteaccountant.com/${post.type}/${post.filename.replace('.md', '')}`;
    const description = post.excerpt || post.title;
    
    return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${link}</link>
      <description><![CDATA[${description}]]></description>
      <pubDate>${pubDate}</pubDate>
      <guid isPermaLink="true">${link}</guid>
      <author>${post.author || 'Absolute Accountant'}</author>
      ${post.categories ? post.categories.map(cat => `<category><![CDATA[${cat}]]></category>`).join('') : ''}
    </item>`;
  }).join('');
  
  const rssContent = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Absolute Accountant - Blog & News</title>
    <link>https://absoluteaccountant.com</link>
    <description>Latest updates, tips, and insights from Absolute Accountant</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="https://absoluteaccountant.com/rss.xml" rel="self" type="application/rss+xml"/>
    ${rssItems}
  </channel>
</rss>`;
  
  // Write RSS file
  fs.writeFileSync(path.join(__dirname, 'rss.xml'), rssContent);
  console.log(`RSS feed generated with ${allPosts.length} posts`);
}

// Run the generator
generateRSSFeed();
