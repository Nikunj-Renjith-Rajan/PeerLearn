import { useParams, Link } from 'react-router-dom';
import { Navbar } from '@/app/components/Navbar';
import { Footer } from '@/app/components/Footer';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Calendar, Clock, Users, ArrowLeft, BookOpen, GraduationCap } from 'lucide-react';
import { mockClasses } from '@/app/data/classes';

export function ClassDetail() {
  const { id } = useParams<{ id: string }>();
  const classData = mockClasses.find((c) => c.id === id);

  if (!classData) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-900 mb-4">Class not found</h1>
            <Link to="/" className="text-blue-600 hover:text-blue-700">
              Return to home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 bg-gray-50">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Classes
            </Link>
            
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex-1">
                <Badge variant="secondary" className="bg-white/20 text-white mb-3">
                  {classData.subject}
                </Badge>
                <h1 className="text-3xl md:text-4xl font-semibold mb-3">
                  {classData.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-white/90">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    <span>{classData.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    <span>{classData.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    <span>{classData.level}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>About This Class</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">
                    {classData.description}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Schedule</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-gray-400 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">Date</p>
                      <p className="text-gray-600">{classData.date}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-gray-400 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">Time & Duration</p>
                      <p className="text-gray-600">{classData.time} ({classData.duration})</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-gray-400 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">Class Size</p>
                      <p className="text-gray-600">
                        {classData.currentStudents} enrolled, {classData.maxStudents - classData.currentStudents} spots remaining
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Dummy Page Notice */}
              <Card className="border-amber-200 bg-amber-50">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <BookOpen className="h-5 w-5 text-amber-600 mt-1" />
                    <div>
                      <p className="font-medium text-amber-900 mb-1">Demo Page</p>
                      <p className="text-sm text-amber-700">
                        This is a placeholder page for demonstration purposes. 
                        The "Join Class" functionality will be implemented in the full version.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Instructor</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={classData.tutorAvatar} alt={classData.tutorName} />
                      <AvatarFallback>{classData.tutorName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-gray-900 text-lg">{classData.tutorName}</p>
                      <p className="text-sm text-gray-600">Expert Tutor</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">
                    Experienced educator passionate about helping students achieve their learning goals.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="text-center pb-4 border-b">
                    <p className="text-sm text-gray-600 mb-1">Class Level</p>
                    <p className="text-lg font-semibold text-gray-900">{classData.level}</p>
                  </div>
                  
                  <Button 
                    className="w-full bg-gray-400 hover:bg-gray-400 text-white cursor-not-allowed"
                    disabled
                  >
                    Join Class (Demo)
                  </Button>
                  
                  <p className="text-xs text-center text-gray-500">
                    This button is disabled for the demo
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
