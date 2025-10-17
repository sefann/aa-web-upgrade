// Blog Content Loader for Absolute Accountant
class BlogLoader {
    constructor() {
        this.blogPosts = [];
        this.newsPosts = [];
        this.init();
    }

    async init() {
        await this.loadBlogPosts();
        await this.loadNewsPosts();
        this.renderContent();
    }

    async loadBlogPosts() {
        try {
            // In a real implementation, you would fetch from your CMS API
            // For now, we'll use the sample data structure
            this.blogPosts = [
                {
                    title: "Welcome to Our Blog",
                    date: "2024-10-17T10:00:00.000Z",
                    excerpt: "Welcome to the Absolute Accountant blog where we share insights, tips, and updates about accounting and tax services.",
                    author: "Absolute Accountant",
                    categories: ["News", "Welcome"],
                    tags: ["welcome", "blog", "accounting"],
                    featured_image: "/assets/images/blog/welcome-blog.jpg",
                    filename: "2024-10-17-welcome-to-our-blog.md"
                }
            ];
        } catch (error) {
            console.error('Error loading blog posts:', error);
        }
    }

    async loadNewsPosts() {
        try {
            this.newsPosts = [
                {
                    title: "TaxDome Transition Update",
                    date: "2024-10-17T14:30:00.000Z",
                    excerpt: "We're excited to announce the successful transition to TaxDome platform, providing enhanced client experience and streamlined processes.",
                    author: "Absolute Accountant",
                    priority: "High",
                    featured_image: "/assets/images/blog/taxdome-update.jpg",
                    filename: "2024-10-17-taxdome-transition-update.md"
                }
            ];
        } catch (error) {
            console.error('Error loading news posts:', error);
        }
    }

    renderContent() {
        this.renderBlogPosts();
        this.renderNewsPosts();
        this.addRSSLink();
    }

    renderBlogPosts() {
        const blogContainer = document.getElementById('blog-posts');
        if (!blogContainer) return;

        if (this.blogPosts.length === 0) {
            blogContainer.innerHTML = '<p>No blog posts available at the moment. Check back soon!</p>';
            return;
        }

        const blogHTML = this.blogPosts.map(post => this.createPostHTML(post, 'blog')).join('');
        blogContainer.innerHTML = blogHTML;
    }

    renderNewsPosts() {
        const newsContainer = document.getElementById('news-posts');
        if (!newsContainer) return;

        if (this.newsPosts.length === 0) {
            newsContainer.innerHTML = '<p>No news updates at the moment. Check back soon!</p>';
            return;
        }

        const newsHTML = this.newsPosts.map(post => this.createPostHTML(post, 'news')).join('');
        newsContainer.innerHTML = newsHTML;
    }

    createPostHTML(post, type) {
        const date = new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        const categories = post.categories ? post.categories.map(cat => 
            `<span class="category-tag">${cat}</span>`
        ).join('') : '';

        const priorityBadge = post.priority && post.priority === 'High' ? 
            '<span class="priority-badge high">High Priority</span>' : '';

        return `
            <article class="post-card ${type}-card">
                ${priorityBadge}
                <div class="post-image">
                    <img src="${post.featured_image || '/assets/images/blog/default.jpg'}" 
                         alt="${post.title}" 
                         onerror="this.src='/assets/images/blog/default.jpg'">
                </div>
                <div class="post-content">
                    <div class="post-meta">
                        <span class="post-date">${date}</span>
                        <span class="post-author">by ${post.author}</span>
                    </div>
                    <h3 class="post-title">${post.title}</h3>
                    <p class="post-excerpt">${post.excerpt}</p>
                    <div class="post-categories">
                        ${categories}
                    </div>
                    <a href="/${type}/${post.filename.replace('.md', '')}" class="read-more-btn">
                        Read More <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </article>
        `;
    }

    addRSSLink() {
        // Add RSS link to the page
        const rssLink = document.createElement('link');
        rssLink.rel = 'alternate';
        rssLink.type = 'application/rss+xml';
        rssLink.title = 'Absolute Accountant RSS Feed';
        rssLink.href = '/rss.xml';
        document.head.appendChild(rssLink);

        // Add RSS button to the page if there's a container for it
        const rssContainer = document.getElementById('rss-link');
        if (rssContainer) {
            rssContainer.innerHTML = `
                <a href="/rss.xml" class="rss-button" target="_blank">
                    <i class="fas fa-rss"></i> Subscribe to RSS Feed
                </a>
            `;
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BlogLoader();
});
