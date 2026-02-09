export interface Course {
    id: string;
    title: string;
    instructor: string;
    description: string;
    price: number;
    rating: number;
    reviews: number;
    image: string;
    enrolled: number;
}

export interface Session {
    id: string;
    title: string;
    date: string;
    time: string;
    attendees: number;
    maxAttendees: number;
}

export const COURSES: Course[] = [
    {
        id: '1',
        title: 'Introduction to React',
        instructor: 'Jane Smith',
        description: 'Learn the basics of React, components, and state management.',
        price: 49.99,
        rating: 4.8,
        reviews: 120,
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        enrolled: 1500,
    },
    {
        id: '2',
        title: 'Advanced JavaScript Patterns',
        instructor: 'John Doe',
        description: 'Master advanced JS concepts like closures, prototypes, and async/await.',
        price: 39.99,
        rating: 4.5,
        reviews: 85,
        image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        enrolled: 800,
    },
    {
        id: '3',
        title: 'UI/UX Design Fundamentals',
        instructor: 'Alice Johnson',
        description: 'Understand the core principles of user interface and user experience design.',
        price: 59.99,
        rating: 4.9,
        reviews: 200,
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        enrolled: 2200,
    },
    {
        id: '4',
        title: 'Machine Learning Basics',
        instructor: 'Bob Wilson',
        description: 'A beginner-friendly introduction to Python and Machine Learning from scratch.',
        price: 29.99,
        rating: 4.6,
        reviews: 95,
        image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        enrolled: 1100,
    },
];

export const SESSIONS: Session[] = [
    {
        id: '101',
        title: 'Live Q&A: React Hooks',
        date: '2023-11-15',
        time: '14:00',
        attendees: 15,
        maxAttendees: 25,
    },
    {
        id: '102',
        title: 'Project Review: Portfolio',
        date: '2023-11-16',
        time: '10:00',
        attendees: 8,
        maxAttendees: 10,
    },
];
