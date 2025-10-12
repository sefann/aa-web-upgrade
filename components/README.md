# Shared Components

This directory contains shared header and footer components that are used across all pages of the website.

## Files

- **header.html** - Shared navigation header with logo and menu
- **footer.html** - Shared footer with contact info, links, and social media
- **loader.js** - JavaScript that loads the shared components into each page

## How It Works

1. Each HTML page has placeholder divs:
   ```html
   <div id="header-placeholder"></div>
   <!-- page content -->
   <div id="footer-placeholder"></div>
   ```

2. The `loader.js` script is included before the closing `</body>` tag:
   ```html
   <script src="/components/loader.js"></script>
   ```

3. The script fetches and injects the header and footer HTML into the placeholders.

## Benefits

- **Single Source of Truth**: Edit header/footer once, changes apply everywhere
- **Consistency**: All pages have identical headers and footers
- **Easy Maintenance**: No need to manually update each page
- **Active Navigation**: Script automatically highlights the current page in the menu

## Making Changes

To update the header or footer:

1. Edit `components/header.html` or `components/footer.html`
2. Save the file
3. Refresh any page to see the changes (may need hard refresh: Ctrl+Shift+R)

No need to edit individual page files!

## Pages Using Shared Components

- index.html (Home)
- about.html
- services.html
- education.html
- blog.html
- contact.html
- consultation.html
- privacy.html
- terms.html

