# Netlify CMS Setup for Absolute Accountant

## Overview
This setup adds a Content Management System (CMS) to your static website, allowing you to easily manage blog posts and news updates without touching code.

## What's Been Added

### 1. Admin Interface
- **Location**: `/admin/` (e.g., `https://yourdomain.com/admin/`)
- **Purpose**: Web-based interface for content management
- **Features**: Create, edit, and delete blog posts and news updates

### 2. Content Structure
```
content/
├── blog/           # Blog posts (markdown files)
├── news/           # News updates (markdown files)
└── pages/          # Page content (optional)

assets/images/blog/ # Images for blog posts
```

### 3. RSS Feed
- **Location**: `/rss.xml`
- **Purpose**: Automatic RSS feed generation for blog and news content
- **Update**: Run `node rss-generator.js` to regenerate

## How to Use

### For Content Creators (Non-Technical)

1. **Access the CMS**:
   - Go to `https://yourdomain.com/admin/`
   - Sign in with your GitHub account (first time only)

2. **Create a Blog Post**:
   - Click "New Blog Post"
   - Fill in the title, date, excerpt
   - Add a featured image (optional)
   - Write your content in the editor
   - Click "Publish"

3. **Create a News Update**:
   - Click "New News Update"
   - Similar process to blog posts
   - Can set priority level (High/Medium/Low)

### For Developers

1. **Generate RSS Feed**:
   ```bash
   node rss-generator.js
   ```

2. **Add New Content Types**:
   - Edit `admin/config.yml`
   - Add new collections as needed

3. **Customize Display**:
   - Edit `blog-loader.js` for content loading logic
   - Edit `blog.css` for styling

## Content Types

### Blog Posts
- **Title**: Post title
- **Date**: Publication date
- **Featured Image**: Optional header image
- **Excerpt**: Short description
- **Author**: Post author
- **Categories**: Tags for organization
- **Body**: Main content (Markdown)

### News Updates
- **Title**: Update title
- **Date**: Publication date
- **Featured Image**: Optional header image
- **Excerpt**: Short description
- **Author**: Update author
- **Priority**: High/Medium/Low
- **Body**: Main content (Markdown)

## RSS Feed Features

- **Automatic Generation**: Combines blog and news content
- **Proper Formatting**: Valid RSS 2.0 format
- **SEO Friendly**: Includes proper meta tags
- **Categories**: Supports content categorization

## Deployment Notes

### For SiteGround (Current Setup)
1. Upload all new files to your file manager
2. The CMS will work with your existing static hosting
3. Content is stored as markdown files in your repository

### For Netlify (Future Option)
1. Connect your GitHub repository to Netlify
2. Enable Git Gateway in Netlify settings
3. The CMS will work seamlessly with automatic deployments

## File Structure
```
your-website/
├── admin/
│   ├── index.html          # CMS interface
│   └── config.yml          # CMS configuration
├── content/
│   ├── blog/               # Blog posts
│   ├── news/               # News updates
│   └── pages/              # Page content
├── assets/images/blog/     # Blog images
├── blog-loader.js          # Content loader
├── rss-generator.js        # RSS feed generator
├── package.json            # Node.js dependencies
└── rss.xml                 # Generated RSS feed
```

## Benefits

1. **Easy Content Management**: Non-technical users can create content
2. **Version Control**: All content is stored in Git
3. **RSS Feed**: Automatic feed generation for subscribers
4. **SEO Friendly**: Proper meta tags and structure
5. **Responsive**: Works on all devices
6. **Fast**: Static files load quickly

## Next Steps

1. **Test the CMS**: Create a test blog post
2. **Customize Styling**: Adjust colors and layout as needed
3. **Add More Content Types**: Extend the CMS for other content
4. **Set Up Notifications**: Configure email alerts for new content

## Support

If you need help with the CMS setup or have questions about adding new features, the system is designed to be easily extensible and maintainable.
