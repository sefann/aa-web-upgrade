# WordPress CMS Setup Guide for SiteGround

## 🎯 Overview

This guide will help you set up WordPress as a headless CMS for your Absolute Accountant website. Your staff will use WordPress's familiar dashboard to create blog posts, while your main site remains static and fast.

---

## ✅ **Why This Solution is Perfect for You**

### **Meets All Your Requirements:**
- ✅ **Works on SiteGround** - One-click WordPress installation
- ✅ **NO GitHub needed** - Staff never touches code or GitHub
- ✅ **Built-in Dashboard** - WordPress has the easiest CMS interface
- ✅ **Automatic RSS** - WordPress generates RSS feeds automatically
- ✅ **Non-technical friendly** - Used by millions of non-coders worldwide
- ✅ **User management** - Create staff accounts with different permissions
- ✅ **Rich editor** - Like using Microsoft Word for blog posts
- ✅ **Easy images** - Drag and drop image uploads
- ✅ **Mobile friendly** - Staff can write posts from phones/tablets

---

## 📋 **Setup Steps (30-45 minutes)**

### **STEP 1: Install WordPress on SiteGround**

#### **Option A: WordPress on Subdomain (RECOMMENDED)**

**Best choice because:**
- Clean separation between static site and blog
- Easier to manage
- Better performance
- Clear URL structure

**Instructions:**

1. **Log into SiteGround**
   - Go to [SiteGround.com](https://www.siteground.com)
   - Click "Login" → "Client Area"

2. **Create Subdomain**
   - Go to "Sites" → Your website
   - Click "Site Tools"
   - Go to "Domain" → "Subdomains"
   - Create subdomain: `blog`
   - Full domain will be: `blog.absoluteaccountant.com`

3. **Install WordPress**
   - In Site Tools, go to "WordPress" → "Install & Manage"
   - Click "Install WordPress"
   - **Installation Settings:**
     - **Domain:** `blog.absoluteaccountant.com`
     - **Protocol:** `https://` (with SSL)
     - **Directory:** Leave blank (install in root of subdomain)
     - **Admin Email:** Your email
     - **Admin Username:** Choose a username (NOT "admin")
     - **Admin Password:** Use a strong password
     - **Site Title:** "Absolute Accountant Blog"
     - **Site Description:** "Financial insights and tax tips"
   - Click "Install"

4. **Wait for Installation** (2-3 minutes)
   - You'll receive an email confirmation
   - Note your WordPress login URL: `https://blog.absoluteaccountant.com/wp-admin`

#### **Option B: WordPress in Subfolder** (Alternative)

If you prefer `absoluteaccountant.com/blog/` instead of subdomain:

1. Install WordPress in Site Tools
2. Choose main domain: `absoluteaccountant.com`
3. Set directory: `/blog`
4. Login URL: `https://absoluteaccountant.com/blog/wp-admin`

---

### **STEP 2: Configure WordPress**

1. **Log into WordPress**
   - Go to: `https://blog.absoluteaccountant.com/wp-admin`
   - Enter your admin username and password

2. **Update Permalink Structure**
   - Go to "Settings" → "Permalinks"
   - Select "Post name" (creates clean URLs)
   - Click "Save Changes"

3. **Install Essential Plugins**

   Navigate to "Plugins" → "Add New" and install these:

   a. **WP REST API Controller** (Optional, for better API control)
      - Allows fine-tuning of REST API
   
   b. **Classic Editor** (If your staff prefer simpler editor)
      - Easier for non-technical users
   
   c. **Yoast SEO** (Recommended)
      - Better SEO for blog posts
      - RSS enhancements
   
   d. **Enable Media Replace** (Recommended)
      - Easy image replacement
   
   e. **WP RSS Aggregator** (If you want enhanced RSS)
      - More RSS customization options

4. **Set Up Categories**
   - Go to "Posts" → "Categories"
   - Create these categories (matching your blog page):
     - Tax Strategy
     - Business Growth
     - Bookkeeping Tips
     - Financial Literacy
     - News

5. **Create "Featured" Tag**
   - Go to "Posts" → "Tags"
   - Add tag: `featured`
   - Use this tag for posts you want featured on homepage

6. **Configure RSS Feed**
   - Go to "Settings" → "Reading"
   - Set "Syndication feeds show the most recent" to 10 items
   - Set "For each post in a feed, include" to "Summary"
   - Click "Save Changes"

---

### **STEP 3: Create Staff User Accounts**

1. **Add New Users**
   - Go to "Users" → "Add New"
   - **For each staff member:**
     - Username: Their email username (e.g., `john.smith`)
     - Email: Their work email
     - First Name, Last Name
     - **Role:** Choose based on responsibility:
       - **Author** - Can write, edit, and publish their own posts
       - **Editor** - Can publish and manage all posts (including others')
       - **Contributor** - Can write and edit their own posts, but not publish
     - Send notification email

2. **Recommended Role: Author**
   - Staff can create and publish posts
   - Can't break the site
   - Can manage their own content

---

### **STEP 4: Update Your Static Website**

1. **Update blog.html**
   - Replace the line in blog.html:
   
   **Find this:**
   ```html
   <script src="blog-loader.js"></script>
   ```
   
   **Replace with:**
   ```html
   <script src="wordpress-blog-loader.js"></script>
   ```

2. **Configure WordPress URL**
   - Open `wordpress-blog-loader.js`
   - Find the `WP_CONFIG` section (near bottom):
   
   ```javascript
   const WP_CONFIG = {
       wordpressUrl: 'https://blog.absoluteaccountant.com', // UPDATE THIS
   };
   ```
   
   **Update with your actual WordPress URL:**
   - If subdomain: `https://blog.absoluteaccountant.com`
   - If subfolder: `https://absoluteaccountant.com/blog`

3. **Upload Files to SiteGround**
   - Upload `wordpress-blog-loader.js` to your main site
   - Upload updated `blog.html` to your main site

4. **Test the Integration**
   - Go to your blog page: `https://absoluteaccountant.com/blog.html`
   - Blog posts should load from WordPress
   - If nothing appears, check browser console for errors

---

### **STEP 5: Enable CORS (Cross-Origin Requests)**

If your WordPress is on a subdomain, you need to enable CORS:

1. **In WordPress, go to** "Plugins" → "Add New"
2. **Search for** "WP REST API Controller" or "WP CORS"
3. **Install and activate**
4. **Configure** to allow requests from your main domain

**OR manually add to WordPress `.htaccess`:**

```apache
<IfModule mod_headers.c>
    SetEnvIf Origin "^https://absoluteaccountant\.com$" ORIGIN_DOMAIN=$0
    Header set Access-Control-Allow-Origin "%{ORIGIN_DOMAIN}e" env=ORIGIN_DOMAIN
    Header set Access-Control-Allow-Methods "GET, POST, OPTIONS"
</IfModule>
```

---

### **STEP 6: Test Everything**

1. **Create a Test Post in WordPress**
   - Log into WordPress admin
   - Go to "Posts" → "Add New"
   - Title: "Test Blog Post"
   - Content: Write some test content
   - Set category: "Tax Strategy"
   - Add a featured image (optional)
   - Click "Publish"

2. **Check Your Static Site**
   - Go to your blog page on main site
   - Your test post should appear
   - Click "Read More" - it should open the WordPress post

3. **Test RSS Feed**
   - Go to: `https://blog.absoluteaccountant.com/feed/`
   - You should see XML RSS feed
   - Your test post should be in the feed

4. **Test on Your Main Site**
   - RSS button should link to WordPress feed
   - All blog posts should load correctly

---

## 👥 **Staff Training Guide**

### **What to Send Your Staff:**

```
Subject: How to Add Blog Posts to Our Website

Hi Team,

We now have a blog management system! Here's how to add blog posts:

1. LOGIN
   - Go to: https://blog.absoluteaccountant.com/wp-admin
   - Username: [your-username]
   - Password: [your-password]

2. CREATE A NEW POST
   - Click "Posts" → "Add New"
   - Write your title in the big box at top
   - Write your content in the editor (like Microsoft Word)
   
3. FORMATTING
   - Use the toolbar to make text bold, italic, add links
   - Click "Add Media" to insert images
   - Use headings for structure (Heading 2, Heading 3)

4. ADD DETAILS
   - Select a Category on the right (Tax Strategy, Business Growth, etc.)
   - Add a Featured Image (appears at top of post)
   - Fill in the excerpt (short summary) if desired

5. PUBLISH
   - Click the blue "Publish" button on the right
   - Your post is now live on our website!

6. RSS FEED
   - Posts automatically appear in our RSS feed
   - No extra steps needed!

Questions? Contact me!
```

---

## 🎨 **Customizing WordPress (Optional)**

### **Make WordPress Match Your Branding:**

1. **Install a Simple Theme**
   - Go to "Appearance" → "Themes"
   - Install a minimal theme (e.g., "Astra", "GeneratePress")
   - This is what visitors see if they visit WordPress directly

2. **Hide WordPress from Public** (Advanced)
   - Since you're using WordPress as headless CMS, you can hide it
   - Install plugin: "Private Site"
   - Redirect visitors to main site

3. **Custom Post Types** (If needed)
   - Can create "News" as separate post type
   - Requires "Custom Post Type UI" plugin

---

## 📊 **RSS Feed Information**

### **Your RSS Feed URLs:**

**Main Feed (All Posts):**
```
https://blog.absoluteaccountant.com/feed/
```

**Category Feeds:**
```
https://blog.absoluteaccountant.com/category/tax-strategy/feed/
https://blog.absoluteaccountant.com/category/business-growth/feed/
```

**RSS Features:**
- ✅ Automatically updates when new posts are published
- ✅ Includes post title, excerpt, full content
- ✅ Includes author information
- ✅ Includes featured images
- ✅ Includes categories and tags
- ✅ Compatible with all RSS readers (Feedly, Inoreader, etc.)

---

## 🔧 **Troubleshooting**

### **Blog posts not appearing on main site:**

1. **Check WordPress REST API:**
   - Visit: `https://blog.absoluteaccountant.com/wp-json/wp/v2/posts`
   - You should see JSON data
   - If error, check WordPress permalinks

2. **Check CORS:**
   - Open browser console on main site
   - Look for CORS errors
   - Install WP CORS plugin if needed

3. **Check JavaScript:**
   - Make sure `wordpress-blog-loader.js` is loaded
   - Check browser console for errors
   - Verify WordPress URL in config

### **RSS feed not working:**

1. **Regenerate Permalinks:**
   - Go to "Settings" → "Permalinks"
   - Click "Save Changes" (even without changes)

2. **Check Feed URL:**
   - Visit: `https://blog.absoluteaccountant.com/feed/`
   - Should see XML (not HTML error page)

### **Staff can't log in:**

1. **Reset Password:**
   - On login page, click "Lost your password?"
   - Enter email address
   - Check email for reset link

2. **Check User Role:**
   - Make sure user has "Author" or "Editor" role
   - "Subscriber" role can't create posts

---

## 💰 **Cost Analysis**

### **Using WordPress on SiteGround:**

- **Hosting:** Already included in your SiteGround plan
- **WordPress:** Free
- **Plugins:** Free (basic plugins)
- **Total Additional Cost:** $0/month

### **Comparison to Other CMS:**

| CMS Option | Monthly Cost | Setup Complexity | Staff Friendly |
|------------|--------------|------------------|----------------|
| WordPress  | $0           | Easy             | ⭐⭐⭐⭐⭐       |
| Ghost      | $9-29        | Medium           | ⭐⭐⭐⭐         |
| Contentful | $0-300       | Hard             | ⭐⭐⭐           |
| Strapi     | $0           | Very Hard        | ⭐⭐⭐           |

**WordPress wins on all fronts for your use case.**

---

## ✅ **Next Steps**

1. ✅ Install WordPress on SiteGround subdomain
2. ✅ Configure WordPress settings
3. ✅ Create staff user accounts
4. ✅ Update your static site with new loader script
5. ✅ Create test blog post
6. ✅ Train staff on WordPress
7. ✅ Start publishing content!

---

## 📞 **Support Resources**

- **SiteGround WordPress Docs:** https://www.siteground.com/tutorials/wordpress/
- **WordPress Official Guide:** https://wordpress.org/support/article/first-steps-with-wordpress/
- **WordPress YouTube Tutorials:** Search "WordPress for beginners"

---

## 🎉 **Benefits Summary**

✅ **For You:**
- No more manual file uploads
- Staff can work independently
- Automatic RSS feed generation
- Professional blog management
- Easy to maintain

✅ **For Your Staff:**
- Familiar, easy-to-use interface
- No coding required
- Works from any device
- Can preview before publishing
- Can edit old posts easily

✅ **For Your Website:**
- Fast static site remains unchanged
- Professional blog content
- SEO-friendly blog posts
- Automatic RSS feeds
- Easy to scale

**This is the best solution for your requirements!** 🚀
