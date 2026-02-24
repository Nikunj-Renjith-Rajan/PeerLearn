import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api';

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



export const DoubtProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [questions, setQuestions] = useState<Question[]>([]);

    useEffect(() => {
        fetchDoubts();
    }, []);

    const fetchDoubts = async () => {
        try {
            const response = await api.get('/doubts');
            // Parse dates
            const data = Array.isArray(response.data) ? response.data : [];
            // Parse dates
            const parsed = data.map((q: any) => ({
                ...q,
                createdAt: new Date(q.createdAt),
                answers: Array.isArray(q.answers) ? q.answers.map((a: any) => ({
                    ...a,
                    createdAt: new Date(a.createdAt)
                })) : []
            }));
            setQuestions(parsed);
        } catch (error) {
            console.error('Error fetching doubts:', error);
        }
    };

    const addQuestion = async (title: string, description: string, tags: string[]) => {
        try {
            const response = await api.post('/doubts', { title, description, tags });
            const newQuestion = {
                ...response.data,
                createdAt: new Date(response.data.createdAt),
                answers: []
            };
            setQuestions([newQuestion, ...questions]);
        } catch (error) {
            console.error('Error adding question:', error);
        }
    };

    const addAnswer = async (questionId: string, text: string) => {
        try {
            const response = await api.post(`/doubts/${questionId}/answers`, { text });
            const newAnswer = {
                ...response.data,
                createdAt: new Date(response.data.createdAt)
            };

            setQuestions(prev => prev.map(q => {
                if (q.id === questionId) {
                    return {
                        ...q,
                        answers: [...q.answers, newAnswer]
                    };
                }
                return q;
            }));
        } catch (error) {
            console.error('Error adding answer:', error);
        }
    };

    const upvoteQuestion = async (questionId: string) => {
        try {
            const response = await api.post(`/doubts/${questionId}/upvote`);
            const { votes } = response.data;

            setQuestions(prev => prev.map(q => {
                if (q.id === questionId) {
                    return { ...q, votes: votes };
                }
                return q;
            }));
        } catch (error) {
            console.error('Error upvoting:', error);
        }
    };

    return (
        <DoubtContext.Provider value={{ questions, addQuestion, addAnswer, upvoteQuestion }}>
            {children}
        </DoubtContext.Provider>
    );
};
