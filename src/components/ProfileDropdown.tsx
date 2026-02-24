
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Settings, HelpCircle, LogOut, UserCircle } from 'lucide-react';

export function ProfileDropdown() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleLogout = () => {
        logout();
        setIsOpen(false);
        navigate('/');
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    if (!user) return null;

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-background hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-primary overflow-hidden"
            >
                {user.profile_picture ? (
                    <img src={user.profile_picture} alt={user.username || user.name} className="w-full h-full object-cover" />
                ) : (
                    <UserCircle className="w-6 h-6 text-muted-foreground" />
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-card rounded-md shadow-lg border border-border z-50 animate-in fade-in zoom-in-95 duration-200">
                    <div className="p-4 border-b">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center overflow-hidden">
                                {user.profile_picture ? (
                                    <img src={user.profile_picture} alt={user.username || user.name} className="w-full h-full object-cover" />
                                ) : (
                                    <User className="h-6 w-6 text-muted-foreground" />
                                )}
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground">Hi, {user.username || user.name}</h3>
                                <p className="text-xs text-muted-foreground truncate max-w-[150px]">{user.email}</p>
                            </div>
                        </div>
                    </div>
                    <div className="py-2">
                        <Link
                            to="/profile-setup"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center space-x-2 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors cursor-pointer"
                        >
                            <User className="h-4 w-4" />
                            <span>Edit Profile</span>
                        </Link>
                        <Link
                            to="/settings"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center space-x-2 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors cursor-pointer"
                        >
                            <Settings className="h-4 w-4" />
                            <span>Settings</span>
                        </Link>
                        <Link
                            to="/help"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center space-x-2 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors cursor-pointer"
                        >
                            <HelpCircle className="h-4 w-4" />
                            <span>Help & Support</span>
                        </Link>
                    </div>
                    <div className="border-t py-2">
                        <button
                            onClick={handleLogout}
                            className="flex w-full items-center space-x-2 px-4 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
                        >
                            <LogOut className="h-4 w-4" />
                            <span>Sign out</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
