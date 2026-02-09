import { useParams } from 'react-router-dom';
import { COURSES } from '../data/mockData';
import { Star, Users, Clock, CheckCircle, Share2, Heart } from 'lucide-react';

export function CourseDetailPage() {
    const { id } = useParams<{ id: string }>();
    const course = COURSES.find(c => c.id === id);

    if (!course) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <h1 className="text-2xl font-bold">Course not found</h1>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
                        <p className="text-lg text-muted-foreground mb-4">{course.description}</p>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="font-medium text-foreground">{course.rating}</span>
                                <span>({course.reviews} reviews)</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <Users className="h-4 w-4" />
                                <span>{course.enrolled} students</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <span className="font-medium text-foreground">Created by</span>
                                <span>{course.instructor}</span>
                            </div>
                        </div>
                    </div>

                    <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                        <img
                            src={course.image}
                            alt={course.title}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold">What you'll learn</h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="flex items-start space-x-2">
                                    <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                                    <span className="text-sm">Master the core concepts and advanced techniques in this field.</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <div className="sticky top-24 p-6 rounded-lg border bg-card shadow-sm space-y-6">
                        <div className="flex justify-between items-center">
                            <span className="text-3xl font-bold">${course.price}</span>
                            <div className="flex space-x-2">
                                <button className="p-2 rounded-full hover:bg-muted transition-colors">
                                    <Share2 className="h-5 w-5 text-muted-foreground" />
                                </button>
                                <button className="p-2 rounded-full hover:bg-muted transition-colors">
                                    <Heart className="h-5 w-5 text-muted-foreground" />
                                </button>
                            </div>
                        </div>

                        <button className="w-full py-3 px-4 bg-primary text-primary-foreground rounded-md font-bold hover:bg-primary/90 transition-colors">
                            Enroll Now
                        </button>

                        <div className="space-y-4 text-sm">
                            <div className="flex justify-between py-2 border-b">
                                <span className="text-muted-foreground">Duration</span>
                                <span className="font-medium">12.5 total hours</span>
                            </div>
                            <div className="flex justify-between py-2 border-b">
                                <span className="text-muted-foreground">Lectures</span>
                                <span className="font-medium">42 lectures</span>
                            </div>
                            <div className="flex justify-between py-2 border-b">
                                <span className="text-muted-foreground">Level</span>
                                <span className="font-medium">Beginner</span>
                            </div>
                            <div className="flex justify-between py-2 border-b">
                                <span className="text-muted-foreground">Language</span>
                                <span className="font-medium">English</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
