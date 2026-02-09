export interface ClassData {
  id: string;
  title: string;
  subject: string;
  tutorName: string;
  tutorAvatar: string;
  date: string;
  time: string;
  duration: string;
  description: string;
  level: string;
  maxStudents: number;
  currentStudents: number;
}

export const mockClasses: ClassData[] = [
  {
    id: '1',
    title: 'Introduction to React Hooks',
    subject: 'Programming',
    tutorName: 'Sarah Chen',
    tutorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    date: 'Jan 20, 2026',
    time: '2:00 PM EST',
    duration: '1.5 hours',
    description: 'Learn the fundamentals of React Hooks including useState, useEffect, and custom hooks. Perfect for developers transitioning from class components to functional components.',
    level: 'Intermediate',
    maxStudents: 25,
    currentStudents: 18,
  },
  {
    id: '2',
    title: 'Calculus I: Limits and Derivatives',
    subject: 'Mathematics',
    tutorName: 'Dr. Michael Torres',
    tutorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    date: 'Jan 21, 2026',
    time: '10:00 AM EST',
    duration: '2 hours',
    description: 'A comprehensive introduction to calculus covering limits, continuity, and derivatives. We will work through practical examples and problem-solving techniques.',
    level: 'Beginner',
    maxStudents: 30,
    currentStudents: 22,
  },
  {
    id: '3',
    title: 'Spanish Conversation Practice',
    subject: 'Languages',
    tutorName: 'Maria Rodriguez',
    tutorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    date: 'Jan 22, 2026',
    time: '6:00 PM EST',
    duration: '1 hour',
    description: 'Practice your conversational Spanish in a relaxed, interactive setting. We will discuss everyday topics and improve your fluency through natural dialogue.',
    level: 'Intermediate',
    maxStudents: 15,
    currentStudents: 12,
  },
  {
    id: '4',
    title: 'Digital Marketing Fundamentals',
    subject: 'Business',
    tutorName: 'Alex Johnson',
    tutorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    date: 'Jan 23, 2026',
    time: '4:00 PM EST',
    duration: '2 hours',
    description: 'Learn the essentials of digital marketing including SEO, social media marketing, and content strategy. Hands-on activities included.',
    level: 'Beginner',
    maxStudents: 40,
    currentStudents: 35,
  },
  {
    id: '5',
    title: 'Watercolor Painting for Beginners',
    subject: 'Arts',
    tutorName: 'Emma Wilson',
    tutorAvatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop',
    date: 'Jan 24, 2026',
    time: '3:00 PM EST',
    duration: '1.5 hours',
    description: 'Discover the beauty of watercolor painting. Learn basic techniques, color mixing, and create your first watercolor masterpiece.',
    level: 'Beginner',
    maxStudents: 20,
    currentStudents: 14,
  },
  {
    id: '6',
    title: 'Python for Data Science',
    subject: 'Programming',
    tutorName: 'David Kim',
    tutorAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
    date: 'Jan 25, 2026',
    time: '11:00 AM EST',
    duration: '2.5 hours',
    description: 'Master Python libraries like Pandas, NumPy, and Matplotlib for data analysis and visualization. Project-based learning approach.',
    level: 'Advanced',
    maxStudents: 25,
    currentStudents: 23,
  },
];
