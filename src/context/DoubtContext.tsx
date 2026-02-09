import React, { createContext, useContext, useState } from 'react';

export interface Answer {
    id: string;
    text: string;
    author: string;
    createdAt: Date;
}

export interface Question {
    id: string;
    title: string;
    description: string;
    tags: string[];
    author: string;
    votes: number;
    answers: Answer[];
    createdAt: Date;
}

interface DoubtContextType {
    questions: Question[];
    addQuestion: (title: string, description: string, tags: string[]) => void;
    addAnswer: (questionId: string, text: string) => void;
    upvoteQuestion: (questionId: string) => void;
}

const DoubtContext = createContext<DoubtContextType | undefined>(undefined);

export const useDoubts = () => {
    const context = useContext(DoubtContext);
    if (!context) {
        throw new Error('useDoubts must be used within a DoubtProvider');
    }
    return context;
};

// Dummy data for initial population
const INITIAL_QUESTIONS: Question[] = [
    {
        id: '1',
        title: 'How do I start with React hooks?',
        description: 'I am new to React and struggling to understand useEffect and useState. Can someone explain with simple examples?',
        tags: ['React', 'JavaScript', 'Frontend'],
        author: 'Alex Johnson',
        votes: 15,
        answers: [
            {
                id: 'a1',
                text: 'Think of useState as a way to remember things in your component, and useEffect as a way to do things when the component loads or changes.',
                author: 'Sarah Lee',
                createdAt: new Date(Date.now() - 86400000)
            }
        ],
        createdAt: new Date(Date.now() - 172800000)
    },
    {
        id: '2',
        title: 'Best resources for learning System Design?',
        description: 'Preparing for interviews and looking for good books or courses on System Design.',
        tags: ['System Design', 'Interview', 'Backend'],
        author: 'Mike Chen',
        votes: 32,
        answers: [],
        createdAt: new Date(Date.now() - 43200000)
    },
    {
        id: '3',
        title: 'Difference between TCP and UDP?',
        description: 'Can someone explain when to use TCP vs UDP in real-world applications?',
        tags: ['Networking', 'CS Fundamentals'],
        author: 'Emma Wilson',
        votes: 8,
        answers: [],
        createdAt: new Date(Date.now() - 1200000)
    }
];

export const DoubtProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [questions, setQuestions] = useState<Question[]>(INITIAL_QUESTIONS);

    const addQuestion = (title: string, description: string, tags: string[]) => {
        const newQuestion: Question = {
            id: Math.random().toString(36).substr(2, 9),
            title,
            description,
            tags,
            author: 'You', // In a real app, get from AuthContext
            votes: 0,
            answers: [],
            createdAt: new Date()
        };
        setQuestions([newQuestion, ...questions]);
    };

    const addAnswer = (questionId: string, text: string) => {
        setQuestions(prev => prev.map(q => {
            if (q.id === questionId) {
                return {
                    ...q,
                    answers: [...q.answers, {
                        id: Math.random().toString(36).substr(2, 9),
                        text,
                        author: 'You',
                        createdAt: new Date()
                    }]
                };
            }
            return q;
        }));
    };

    const upvoteQuestion = (questionId: string) => {
        setQuestions(prev => prev.map(q => {
            if (q.id === questionId) {
                return { ...q, votes: q.votes + 1 };
            }
            return q;
        }));
    };

    return (
        <DoubtContext.Provider value={{ questions, addQuestion, addAnswer, upvoteQuestion }}>
            {children}
        </DoubtContext.Provider>
    );
};
