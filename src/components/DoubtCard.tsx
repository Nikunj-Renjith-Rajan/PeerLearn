import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, User, ChevronDown, ChevronUp } from 'lucide-react';
import { Question, useDoubts } from '../context/DoubtContext';
import { formatDistanceToNow } from 'date-fns';

interface DoubtCardProps {
    question: Question;
    compact?: boolean; // For home page preview
}

export function DoubtCard({ question, compact = false }: DoubtCardProps) {
    const { upvoteQuestion, addAnswer } = useDoubts();
    const [isExpanded, setIsExpanded] = useState(false);
    const [answerText, setAnswerText] = useState('');
    const [showAnswerInput, setShowAnswerInput] = useState(false);

    const handleUpvote = (e: React.MouseEvent) => {
        e.stopPropagation();
        upvoteQuestion(question.id);
    };

    const handleAnswerSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (answerText.trim()) {
            addAnswer(question.id, answerText);
            setAnswerText('');
            setShowAnswerInput(false);
        }
    };

    // Helper to safely format date
    const formatDate = (date: Date) => {
        try {
            return formatDistanceToNow(new Date(date), { addSuffix: true });
        } catch (e) {
            return 'recently';
        }
    };

    if (compact) {
        return (
            <div className="p-4 rounded-lg border bg-card text-card-foreground hover:shadow-md transition-all cursor-pointer group">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
                        {question.title}
                    </h3>
                    <div className="flex items-center text-muted-foreground text-sm bg-muted px-2 py-1 rounded-full">
                        <ThumbsUp className="w-3 h-3 mr-1" />
                        {question.votes}
                    </div>
                </div>
                <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                    {question.description}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center">
                        <User className="w-3 h-3 mr-1" />
                        {question.author}
                    </div>
                    <div className="flex items-center">
                        <MessageSquare className="w-3 h-3 mr-1" />
                        {question.answers.length} answers
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm mb-4">
            <div className="flex gap-4">
                {/* Voting Side */}
                <div className="flex flex-col items-center gap-1 min-w-[3rem]">
                    <button
                        onClick={handleUpvote}
                        className="p-1 hover:bg-muted rounded-full hover:text-primary transition-colors"
                    >
                        <ThumbsUp className="w-6 h-6" />
                    </button>
                    <span className="font-bold text-lg">{question.votes}</span>
                </div>

                {/* Content Side */}
                <div className="flex-1">
                    <div className="mb-2">
                        <h3 className="text-xl font-bold mb-1">{question.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                            <span className="flex items-center bg-muted/50 px-2 py-0.5 rounded-full">
                                <User className="w-3 h-3 mr-1" />
                                {question.author}
                            </span>
                            <span>•</span>
                            <span>{formatDate(question.createdAt)}</span>
                        </div>
                    </div>

                    <p className="text-muted-foreground whitespace-pre-wrap mb-4">
                        {question.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                        {question.tags.map(tag => (
                            <span key={tag} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
                                #{tag}
                            </span>
                        ))}
                    </div>

                    <div className="flex items-center gap-4 border-t pt-3">
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="flex items-center text-sm font-medium hover:text-primary transition-colors"
                        >
                            <MessageSquare className="w-4 h-4 mr-2" />
                            {question.answers.length} Answers
                            {isExpanded ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />}
                        </button>
                        <button
                            onClick={() => setShowAnswerInput(!showAnswerInput)}
                            className="text-sm font-medium hover:text-primary transition-colors ml-auto"
                        >
                            Answer
                        </button>
                    </div>

                    {/* Answer Input */}
                    {showAnswerInput && (
                        <form onSubmit={handleAnswerSubmit} className="mt-4 flex gap-2">
                            <input
                                type="text"
                                value={answerText}
                                onChange={(e) => setAnswerText(e.target.value)}
                                placeholder="Type your solution or comment here..."
                                className="flex-1 px-3 py-2 rounded-md border bg-background"
                                autoFocus
                            />
                            <button
                                type="submit"
                                className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium"
                            >
                                Post
                            </button>
                        </form>
                    )}

                    {/* Answers List */}
                    {isExpanded && question.answers.length > 0 && (
                        <div className="mt-4 space-y-4 pl-4 border-l-2 border-muted">
                            <h4 className="font-semibold text-sm text-foreground">Solutions</h4>
                            {question.answers.map(answer => (
                                <div key={answer.id} className="bg-muted/30 p-4 rounded-md">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="font-semibold text-sm">{answer.author}</span>
                                        <span className="text-xs text-muted-foreground">{formatDate(answer.createdAt)}</span>
                                    </div>
                                    <p className="text-sm">{answer.text}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
