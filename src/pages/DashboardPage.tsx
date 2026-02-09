import { useAuth } from '../context/AuthContext';
import { CourseCard } from '../components/CourseCard';
import { SessionCard } from '../components/SessionCard';
import { COURSES, SESSIONS } from '../data/mockData';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export function DashboardPage() {
    const { user } = useAuth();
    const enrolledCourses = COURSES.slice(0, 2); // Mock enrolled courses
    const upcomingSessions = SESSIONS; // Mock upcoming sessions

    return (
        <div className="container mx-auto px-4 py-8 space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Dashboard</h1>
                    <p className="text-muted-foreground">
                        Welcome back, {user?.name}! Here's what's happening today.
                    </p>
                </div>
                <Link
                    to="/create-course"
                    className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Course
                </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-8">
                    <section>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold">Your Enrolled Courses</h2>
                            <Link to="/courses" className="text-primary hover:underline text-sm">View All</Link>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {enrolledCourses.map(course => (
                                <CourseCard key={course.id} course={course} />
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">Recommended For You</h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {COURSES.slice(2, 4).map(course => (
                                <CourseCard key={course.id} course={course} />
                            ))}
                        </div>
                    </section>
                </div>

                <div className="space-y-6">
                    <section>
                        <h2 className="text-xl font-bold mb-4">Upcoming Live Sessions</h2>
                        <div className="space-y-4">
                            {upcomingSessions.map(session => (
                                <SessionCard key={session.id} session={session} />
                            ))}
                        </div>
                    </section>

                    <div className="p-4 rounded-lg bg-secondary/20 border border-secondary">
                        <h3 className="font-semibold mb-2">Quick Stats</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span>Courses Completed</span>
                                <span className="font-mono font-bold">12</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Hours Learned</span>
                                <span className="font-mono font-bold">48</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Sessions Attended</span>
                                <span className="font-mono font-bold">5</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
