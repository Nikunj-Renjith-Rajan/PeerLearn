import { Calendar, Clock, Users } from 'lucide-react';
import { Session } from '../data/mockData';
import { Link } from 'react-router-dom';

interface SessionCardProps {
    session: Session;
}

export function SessionCard({ session }: SessionCardProps) {
    return (
        <div className="border rounded-lg p-4 bg-card hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold">{session.title}</h3>
                <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                    Live
                </span>
            </div>

            <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>{session.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>{session.time}</span>
                </div>
                <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4" />
                    <span>{session.attendees} / {session.maxAttendees} Enrolled</span>
                </div>
            </div>

            <div className="mt-4">
                <Link
                    to={`/session/${session.id}`}
                    className="block w-full text-center bg-primary text-primary-foreground py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                    Join Session
                </Link>
            </div>
        </div>
    );
}
