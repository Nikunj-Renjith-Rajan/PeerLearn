import { Link } from 'react-router-dom';
import { Mail, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Details */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-blue-400" />
                <span>12345</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <a 
                  href="mailto:gmail-peerlearn@gmail.com" 
                  className="hover:text-blue-400 transition-colors"
                >
                  gmail-peerlearn@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link 
                to="/about" 
                className="block hover:text-blue-400 transition-colors"
              >
                About
              </Link>
              <Link 
                to="/terms" 
                className="block hover:text-blue-400 transition-colors"
              >
                Terms & Conditions
              </Link>
              <Link 
                to="/privacy" 
                className="block hover:text-blue-400 transition-colors"
              >
                Privacy Policy
              </Link>
            </div>
          </div>

          {/* Brand */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">PeerLearn</h3>
            <p className="text-sm leading-relaxed">
              Empowering learners worldwide through peer-to-peer education. 
              Connect, learn, and grow together.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; 2026 PeerLearn. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
