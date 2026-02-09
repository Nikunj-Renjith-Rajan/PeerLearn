import { useState } from 'react';
import { CourseCard } from '../components/CourseCard';
import { COURSES } from '../data/mockData';
import { Search } from 'lucide-react';

export function CoursesPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState<'rating' | 'price'>('rating');

    const filteredCourses = COURSES.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    ).sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'price') return a.price - b.price;
        return 0;
    });

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8 space-y-4">
                <h1 className="text-3xl font-bold">Explore Courses</h1>
                <p className="text-muted-foreground">Find the perfect course to upgrade your skills.</p>

                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search courses, topics, or instructors..."
                            className="w-full h-10 pl-10 pr-4 rounded-md border bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <select
                        className="h-10 px-3 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as 'rating' | 'price')}
                    >
                        <option value="rating">Sort by Rating</option>
                        <option value="price">Sort by Price</option>
                    </select>
                </div>
            </div>

            {filteredCourses.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredCourses.map(course => (
                        <CourseCard key={course.id} course={course} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <p className="text-muted-foreground">No courses found matching your search.</p>
                </div>
            )}
        </div>
    );
}
