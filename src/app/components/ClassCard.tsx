import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/app/components/ui/card';
import { Calendar, Clock, Users } from 'lucide-react';
import { ClassData } from '@/app/data/classes';

interface ClassCardProps {
  classData: ClassData;
}

export function ClassCard({ classData }: ClassCardProps) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/class/${classData.id}`);
  };

  const handleSignUpClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Handle sign up logic
  };

  return (
    <Card 
      className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-gray-200"
      onClick={handleCardClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
              {classData.title}
            </h3>
            <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
              {classData.subject}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={classData.tutorAvatar} alt={classData.tutorName} />
            <AvatarFallback>{classData.tutorName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900">{classData.tutorName}</p>
            <p className="text-xs text-gray-500">Instructor</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span>{classData.date} at {classData.time}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="h-4 w-4 text-gray-400" />
            <span>{classData.duration}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users className="h-4 w-4 text-gray-400" />
            <span>{classData.currentStudents}/{classData.maxStudents} enrolled</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <Button 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors"
          onClick={handleSignUpClick}
        >
          Sign Up
        </Button>
      </CardFooter>
    </Card>
  );
}
