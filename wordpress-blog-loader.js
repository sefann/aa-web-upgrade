// WordPress Blog Loader for Absolute Accountant
// This script fetches blog posts from WordPress REST API and displays them on your static site

class WordPressBlogLoader {
    constructor(wordpressUrl) {
        // Set your WordPress URL (can be subdomain or main domain with /blog/)
        this.wpUrl = wordpressUrl || 'https://blog.absoluteaccountant.com';
        this.apiUrl = `${this.wpUrl}/wp-json/wp/v2`;
        this.blogPosts = [];
        this.newsPosts = [];
        this.featuredPost = null;
        this.init();
    }

    async init() {
        try {
            await this.loadBlogPosts();
            await this.loadFeaturedPost();
            this.renderContent();
            this.setupRSSFeed();
        } catch (error) {
            console.error('Error initializing WordPress blog loader:', error);
            this.showError();
        }
    }

    async loadBlogPosts() {
        try {
            // Fetch posts from WordPress REST API
            const response = await fetch(`${this.apiUrl}/posts?per_page=10&_embed`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch blog posts');
            }

            const posts = await response.json();
            this.blogPosts = posts.map(post => this.formatPost(post));
        } catch (error) {
            console.error('Error loading blog posts:', error);
            this.blogPosts = [];
        }
    }

    async loadFeaturedPost() {
        try {
            // Fetch featured post (you can set this via WordPress by adding a tag or category)
            const response = await fetch(`${this.apiUrl}/posts?per_page=1&tags=featured&_embed`);
            
            if (response.ok) {
                const posts = await response.json();
                if (posts.length > 0) {
                    this.featuredPost = this.formatPost(posts[0]);
                }
            }
        } catch (error) {
            console.error('Error loading featured post:', error);
        }
    }

    formatPost(wpPost) {
        return {
            id: wpPost.id,
            title: wpPost.title.rendered,
            excerpt: wpPost.excerpt.rendered.replace(/<[^>]*>/g, ''), // Strip HTML
            content: wpPost.content.rendered,
            date: wpPost.date,
            author: wpPost._embedded?.author?.[0]?.name || 'Absolute Accountant',
            authorAvatar: wpPost._embedded?.author?.[0]?.avatar_urls?.['96'] || '',
            featuredImage: wpPost._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/assets/images/blog/default.jpg',
            categories: wpPost._embedded?.['wp:term']?.[0]?.map(cat => cat.name) || [],
            tags: wpPost._embedded?.['wp:term']?.[1]?.map(tag => tag.name) || [],
            link: wpPost.link,
            slug: wpPost.slug
        };
    }

    renderContent() {
        this.renderFeaturedPost();
        this.renderBlogPosts();
        this.renderCategories();
    }

    renderFeaturedPost() {
        const featuredContainer = document.querySelector('.featured-post-container');
        if (!featuredContainer || !this.featuredPost) return;

        const post = this.featuredPost;
        const date = new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // Update featured post content
        const featuredImage = featuredContainer.querySelector('.featured-image img');
        const featuredTitle = featuredContainer.querySelector('.featured-text h2');
        const featuredExcerpt = featuredContainer.querySelector('.featured-text p');
        const featuredDate = featuredContainer.querySelector('.post-date');
        const featuredBtn = featuredContainer.querySelector('.read-more-btn');

        if (featuredImage) featuredImage.src = post.featuredImage;
        if (featuredTitle) featuredTitle.textContent = post.title;
        if (featuredExcerpt) featuredExcerpt.textContent = post.excerpt;
        if (featuredDate) featuredDate.innerHTML = `<i class="far fa-calendar"></i> ${date}`;
        if (featuredBtn) {
            featuredBtn.onclick = () => window.open(post.link, '_blank');
        }
    }

    renderBlogPosts() {
        const blogContainer = document.getElementById('blog-posts');
        if (!blogContainer) return;

        if (this.blogPosts.length === 0) {
            blogContainer.innerHTML = '<p style="text-align: center; padding: 40px;">No blog posts available. Check back soon!</p>';
            return;
        }

        const blogHTML = this.blogPosts.map(post => this.createPostHTML(post)).join('');
        blogContainer.innerHTML = blogHTML;
    }

    renderCategories() {
        // Count posts per category
        const categoryCounts = {};
        this.blogPosts.forEach(post => {
            post.categories.forEach(cat => {
                categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
            });
        });

        // Update category counts in the UI if elements exist
        const categoryCards = document.querySelectorAll('.category-card');
        categoryCards.forEach(card => {
            const categoryName = card.querySelector('h3')?.textContent;
            const countSpan = card.querySelector('.post-count');
            if (categoryName && countSpan && categoryCounts[categoryName]) {
                countSpan.textContent = categoryCounts[categoryName];
            }
        });
    }

    createPostHTML(post) {
        const date = new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        const categories = post.categories.map(cat => 
            `<span class="category-tag">${cat}</span>`
        ).join('');

        return `
            <article class="post-card blog-card">
                <div class="post-image">
                    <img src="${post.featuredImage}" 
                         alt="${post.title}" 
                         onerror="this.src='/assets/images/blog/default.jpg'">
                </div>
                <div class="post-content">
                    <div class="post-meta">
                        <span class="post-date"><i class="far fa-calendar"></i> ${date}</span>
                        <span class="post-author">by ${post.author}</span>
                    </div>
                    <h3 class="post-title">${post.title}</h3>
                    <p class="post-excerpt">${post.excerpt}</p>
                    <div class="post-categories">
                        ${categories}
                    </div>
                    <a href="${post.link}" target="_blank" class="read-more-btn">
                        Read More <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </article>
        `;
    }

    setupRSSFeed() {
        // WordPress automatically generates RSS feed at /feed/
        const rssUrl = `${this.wpUrl}/feed/`;
        
        // Update RSS link in the page
        const rssContainer = document.getElementById('rss-link');
        if (rssContainer) {
            rssContainer.innerHTML = `
                <a href="${rssUrl}" class="rss-button" target="_blank">
                    <i class="fas fa-rss"></i> Subscribe to RSS Feed
                </a>
            `;
        }

        // Add RSS link to head if not present
        if (!document.querySelector('link[type="application/rss+xml"]')) {
            const rssLink = document.createElement('link');
            rssLink.rel = 'alternate';
            rssLink.type = 'application/rss+xml';
            rssLink.title = 'Absolute Accountant RSS Feed';
            rssLink.href = rssUrl;
            document.head.appendChild(rssLink);
        }
    }

    showError() {
        const blogContainer = document.getElementById('blog-posts');
        if (blogContainer) {
            blogContainer.innerHTML = `
                <div style="text-align: center; padding: 40px; color: #666;">
                    <i class="fas fa-exclamation-circle" style="font-size: 48px; color: #ff6b35; margin-bottom: 20px;"></i>
                    <h3>Unable to Load Blog Posts</h3>
                    <p>Please check your WordPress installation and try again.</p>
                </div>
            `;
        }
    }

    // Optional: Load posts by category
    async loadPostsByCategory(categorySlug) {
        try {
            const response = await fetch(`${this.apiUrl}/posts?categories=${categorySlug}&per_page=10&_embed`);
            if (response.ok) {
                const posts = await response.json();
                this.blogPosts = posts.map(post => this.formatPost(post));
                this.renderBlogPosts();
            }
        } catch (error) {
            console.error('Error loading posts by category:', error);
        }
    }

    // Optional: Search posts
    async searchPosts(query) {
        try {
            const response = await fetch(`${this.apiUrl}/posts?search=${encodeURIComponent(query)}&per_page=10&_embed`);
            if (response.ok) {
                const posts = await response.json();
                this.blogPosts = posts.map(post => this.formatPost(post));
                this.renderBlogPosts();
            }
        } catch (error) {
            console.error('Error searching posts:', error);
        }
    }
}

// Configuration object - UPDATE THIS WITH YOUR WORDPRESS URL
const WP_CONFIG = {
    // Option 1: WordPress on subdomain (RECOMMENDED)
    wordpressUrl: 'https://blog.absoluteaccountant.com',
    
    // Option 2: WordPress in subfolder
    // wordpressUrl: 'https://absoluteaccountant.com/blog',
    
    // Option 3: Local testing
    // wordpressUrl: 'http://localhost/wordpress'
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if we're on the blog page
    if (document.getElementById('blog-posts') || document.querySelector('.featured-post-container')) {
        new WordPressBlogLoader(WP_CONFIG.wordpressUrl);
    }
});
