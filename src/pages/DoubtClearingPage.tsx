import { useState } from 'react';
import { Search, Plus, Filter } from 'lucide-react';
import { DoubtCard } from '../components/DoubtCard';
import { AskDoubtModal } from '../components/AskDoubtModal';
import { useDoubts } from '../context/DoubtContext';

export function DoubtClearingPage() {
    const { questions } = useDoubts();
    const [isAskModalOpen, setIsAskModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState<'newest' | 'popular' | 'unanswered'>('newest');

    const filteredQuestions = questions
        .filter(q =>
            q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            q.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            q.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
        )
        .sort((a, b) => {
            if (filter === 'newest') return b.createdAt.getTime() - a.createdAt.getTime();
            if (filter === 'popular') return b.votes - a.votes;
            if (filter === 'unanswered') return a.answers.length - b.answers.length;
            return 0;
        });

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Community Doubts</h1>
                    <p className="text-muted-foreground">Ask questions, share knowledge, and learn together.</p>
                </div>
                <button
                    onClick={() => setIsAskModalOpen(true)}
                    className="flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
                >
                    <Plus className="w-5 h-5 mr-2" />
                    Ask a Question
                </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Main Content */}
                <div className="flex-1">
                    {/* Search and Filter */}
                    <div className="flex gap-4 mb-6">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                            <input
                                type="text"
                                placeholder="Search questions..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border bg-card focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                            />
                        </div>
                        <div className="relative group">
                            <button className="flex items-center px-4 py-3 rounded-xl border bg-card hover:border-primary transition-colors">
                                <Filter className="w-5 h-5 mr-2 text-muted-foreground group-hover:text-primary transition-colors" />
                                <span className="hidden sm:inline">Sort by</span>
                            </button>
                            <div className="absolute right-0 mt-2 w-48 bg-card border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                                <button onClick={() => setFilter('newest')} className={`block w-full text-left px-4 py-2 hover:bg-muted first:rounded-t-lg ${filter === 'newest' ? 'text-primary font-medium' : ''}`}>Newest</button>
                                <button onClick={() => setFilter('popular')} className={`block w-full text-left px-4 py-2 hover:bg-muted ${filter === 'popular' ? 'text-primary font-medium' : ''}`}>Most Popular</button>
                                <button onClick={() => setFilter('unanswered')} className={`block w-full text-left px-4 py-2 hover:bg-muted last:rounded-b-lg ${filter === 'unanswered' ? 'text-primary font-medium' : ''}`}>Unanswered</button>
                            </div>
                        </div>
                    </div>

                    {/* Questions List */}
                    <div className="space-y-4">
                        {filteredQuestions.length > 0 ? (
                            filteredQuestions.map(question => (
                                <DoubtCard key={question.id} question={question} />
                            ))
                        ) : (
                            <div className="text-center py-20 bg-muted/20 rounded-xl border border-dashed">
                                <p className="text-lg text-muted-foreground">No questions found matching your search.</p>
                                <button
                                    onClick={() => { setSearchQuery(''); setFilter('newest'); }}
                                    className="mt-2 text-primary hover:underline"
                                >
                                    Clear filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:w-80 space-y-6">
                    <div className="bg-card border rounded-xl p-6 shadow-sm">
                        <h3 className="font-semibold mb-4 text-lg">Popular Tags</h3>
                        <div className="flex flex-wrap gap-2">
                            {['React', 'JavaScript', 'Python', 'CSS', 'Node.js', 'System Design', 'Algorithms'].map(tag => (
                                <button
                                    key={tag}
                                    onClick={() => setSearchQuery(tag)}
                                    className="px-3 py-1.5 bg-muted hover:bg-muted/80 text-sm rounded-lg transition-colors text-muted-foreground hover:text-foreground"
                                >
                                    #{tag}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-6">
                        <h3 className="font-semibold mb-2 text-lg text-primary">Need Help?</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            Join a live session to get real-time help from mentors and peers.
                        </p>
                        <button className="w-full py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                            Find a Mentor
                        </button>
                    </div>
                </div>
            </div>

            <AskDoubtModal isOpen={isAskModalOpen} onClose={() => setIsAskModalOpen(false)} />
        </div>
    );
}
