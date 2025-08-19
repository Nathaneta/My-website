import React from 'react';

const Blog = () => {
  const posts = [
    {
      title: "The Future of AI in Business Automation",
      excerpt: "Explore how artificial intelligence is revolutionizing business processes and what it means for the future of work.",
      author: "Sarah Johnson",
      date: "2024-01-15",
      readTime: "5 min read",
      category: "AI Trends"
    },
    {
      title: "Implementing Machine Learning: A Practical Guide",
      excerpt: "Step-by-step guide to successfully implementing machine learning solutions in your organization.",
      author: "Michael Chen",
      date: "2024-01-12",
      readTime: "8 min read",
      category: "Implementation"
    },
    {
      title: "Data Privacy in the Age of AI",
      excerpt: "Understanding the importance of data privacy and security when deploying AI solutions.",
      author: "Emily Rodriguez",
      date: "2024-01-10",
      readTime: "6 min read",
      category: "Security"
    }
  ];

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Latest Insights
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Stay updated with the latest trends, insights, and best practices in AI and business automation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <article key={index} className="card hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300">
              <div className="mb-4">
                <span className="inline-block bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 text-xs font-semibold px-3 py-1 rounded-full">
                  {post.category}
                </span>
              </div>
              
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {post.title}
              </h2>
              
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {post.excerpt}
              </p>
              
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center space-x-2">
                  <span>{post.author}</span>
                  <span>•</span>
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
                <span>{post.readTime}</span>
              </div>
              
              <button className="mt-4 text-primary-600 dark:text-primary-400 font-medium hover:text-primary-700 dark:hover:text-primary-300 transition-colors">
                Read More →
              </button>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;