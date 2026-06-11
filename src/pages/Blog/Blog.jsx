import { useState } from 'react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { FiSearch, FiCalendar, FiUser, FiClock } from 'react-icons/fi';

const BLOGS_DATA = [
    {
        id: 1,
        title: "How to Find the Perfect Tutor for Your Child",
        excerpt: "Finding the right tutor can be challenging. Learn how to identify your child's learning needs and select a tutor who matches their style.",
        content: "Detailed post content here...",
        category: "Parenting Tips",
        date: "June 10, 2026",
        author: "Tahmid Rahman",
        readTime: "5 min read",
        image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=600"
    },
    {
        id: 2,
        title: "Top 5 Strategies for Board Exam Preparation",
        excerpt: "Success in Board Exams requires structured preparation. Read our comprehensive guide on study planners, active recall, and mock test strategies.",
        content: "Detailed post content here...",
        category: "Study Guides",
        date: "May 28, 2026",
        author: "Dr. Nusrat Jahan",
        readTime: "8 min read",
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=600"
    },
    {
        id: 3,
        title: "Building a Career as a Professional Home Tutor",
        excerpt: "Tutoring is more than a side gig. Learn how to structure lessons, handle parents' expectations, and set rates to build a sustainable career.",
        content: "Detailed post content here...",
        category: "Tutor Growth",
        date: "May 15, 2026",
        author: "Sajib Ahmed",
        readTime: "6 min read",
        image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=600"
    },
    {
        id: 4,
        title: "The Impact of E-Learning on Traditional Home Tuitions",
        excerpt: "Is online tutoring overtaking in-person classes? We analyze the pros and cons of both formats and how hybrid learning is shaping the future.",
        content: "Detailed post content here...",
        category: "EdTech Trends",
        date: "April 20, 2026",
        author: "Sarah Islam",
        readTime: "7 min read",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600"
    }
];

const Blog = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = ['All', 'Parenting Tips', 'Study Guides', 'Tutor Growth', 'EdTech Trends'];

    const filteredBlogs = BLOGS_DATA.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 font-inter">
            {/* Header banner */}
            <div className="text-center mb-16">
                <h1 className="text-5xl font-extrabold text-primary mb-4 tracking-tight">Our Blog & Insights</h1>
                <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
                    Stay updated with the latest educational tips, learning strategies, and tutor success guides.
                </p>
            </div>

            {/* Controls */}
            <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-10">
                {/* Categories Tab */}
                <div className="flex flex-wrap gap-2">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`btn btn-sm rounded-xl px-4 py-2 font-semibold transition-all ${selectedCategory === cat ? 'btn-primary text-white shadow-md' : 'bg-base-200 text-base-content hover:bg-base-300'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Search input */}
                <div className="relative w-full md:w-80">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-base-content/40">
                        <FiSearch />
                    </span>
                    <input
                        type="text"
                        placeholder="Search articles..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="input input-bordered w-full pl-10 rounded-xl bg-base-100"
                    />
                </div>
            </div>

            {/* Blogs Grid */}
            {filteredBlogs.length === 0 ? (
                <div className="bg-base-100 p-16 text-center rounded-3xl border border-base-200">
                    <p className="text-lg text-base-content/60 font-semibold">No blog articles match your search or filters.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredBlogs.map(post => (
                        <Card key={post.id} className="overflow-hidden h-full flex flex-col justify-between border border-base-200 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl" hoverable>
                            <div>
                                <div className="relative h-48 w-full overflow-hidden">
                                    <img 
                                        src={post.image} 
                                        alt={post.title} 
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <Badge variant="accent" className="font-bold uppercase tracking-wider">{post.category}</Badge>
                                    </div>
                                </div>
                                <div className="p-6">
                                    {/* Meta tags */}
                                    <div className="flex items-center gap-4 text-xs text-base-content/50 font-medium mb-3">
                                        <span className="flex items-center gap-1"><FiCalendar /> {post.date}</span>
                                        <span className="flex items-center gap-1"><FiClock /> {post.readTime}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-base-content mb-3 leading-snug hover:text-primary cursor-pointer transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="text-sm text-base-content/70 leading-relaxed">
                                        {post.excerpt}
                                    </p>
                                </div>
                            </div>
                            <div className="p-6 pt-0 flex justify-between items-center border-t border-base-200/50 mt-4">
                                <span className="flex items-center gap-1.5 text-xs text-base-content/60 font-semibold">
                                    <FiUser /> By {post.author}
                                </span>
                                <Button variant="secondary" className="btn-sm rounded-xl">Read More</Button>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Blog;
