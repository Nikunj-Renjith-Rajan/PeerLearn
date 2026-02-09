import { Link } from 'react-router-dom';
import { Button } from '@/app/components/ui/button';
import { GraduationCap } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-semibold text-gray-900">PeerLearn</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                Home
              </Link>
              <Link to="/browse" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                Browse Classes
              </Link>
              <Link to="/become-tutor" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                Become a Tutor
              </Link>
              <Link to="/my-classes" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                My Classes
              </Link>
              <Link to="/profile" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                Profile
              </Link>
            </div>
          </div>
          
          <div className="flex items-center">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Sign In / Sign Up
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
