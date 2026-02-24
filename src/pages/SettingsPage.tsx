
import React from 'react';
import { ThemeToggle } from '../components/ThemeToggle';
import { useAuth } from '../context/AuthContext';

export function SettingsPage() {
    const { user } = useAuth();

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Settings</h1>

            <div className="max-w-3xl space-y-6">
                {/* Appearance Section */}
                <div className="bg-card rounded-lg border p-6">
                    <h2 className="text-xl font-semibold mb-4">Appearance</h2>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">Theme</p>
                            <p className="text-sm text-muted-foreground">Customize your interface theme</p>
                        </div>
                        <ThemeToggle />
                    </div>
                </div>

                {/* Account Settings (Placeholder) */}
                <div className="bg-card rounded-lg border p-6 opacity-75">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold">Account</h2>
                        <span className="text-xs bg-muted px-2 py-1 rounded">Coming Soon</span>
                    </div>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center py-2 border-b">
                            <span className="text-muted-foreground">Email Notifications</span>
                            <div className="w-10 h-6 bg-muted rounded-full relative cursor-not-allowed">
                                <div className="absolute w-4 h-4 bg-background rounded-full top-1 left-1 shadow-sm"></div>
                            </div>
                        </div>
                        <div className="flex justify-between items-center py-2">
                            <span className="text-muted-foreground">Two-Factor Authentication</span>
                            <div className="w-10 h-6 bg-muted rounded-full relative cursor-not-allowed">
                                <div className="absolute w-4 h-4 bg-background rounded-full top-1 left-1 shadow-sm"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
