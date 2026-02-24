
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export function ForgotPasswordPage() {
    const [step, setStep] = useState<'request' | 'reset'>('request');
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const { forgotPassword, resetPassword } = useAuth();
    const navigate = useNavigate();

    const handleRequest = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setMessage('');
        try {
            await forgotPassword(email);
            setStep('reset');
            setMessage('Verification code sent to your email.');
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || 'Failed to send reset code.';
            setError(errorMessage);
        }
    };

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setMessage('');
        try {
            await resetPassword(email, code, newPassword);
            setMessage('Password reset successfully. Redirecting to login...');
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || 'Failed to reset password.';
            setError(errorMessage);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-64px-300px)] py-12">
            <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg border shadow-sm">
                <div className="text-center space-y-2">
                    <h1 className="text-2xl font-bold">
                        {step === 'request' ? 'Reset Password' : 'Set New Password'}
                    </h1>
                    <p className="text-muted-foreground">
                        {step === 'request'
                            ? 'Enter your email to receive a reset code'
                            : 'Enter the code and your new password'}
                    </p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-2 rounded text-sm text-center">
                        {error}
                    </div>
                )}

                {message && (
                    <div className="bg-green-500/10 border border-green-500/20 text-green-500 px-4 py-2 rounded text-sm text-center">
                        {message}
                    </div>
                )}

                {step === 'request' ? (
                    <form onSubmit={handleRequest} className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium">Email</label>
                            <input
                                id="email"
                                type="email"
                                required
                                className="w-full h-10 px-3 rounded-md border bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        >
                            Send Reset Code
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleReset} className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="code" className="text-sm font-medium">Verification Code</label>
                            <input
                                id="code"
                                type="text"
                                required
                                className="w-full h-10 px-3 rounded-md border bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                placeholder="123456"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="newPassword" className="text-sm font-medium">New Password</label>
                            <input
                                id="newPassword"
                                type="password"
                                required
                                className="w-full h-10 px-3 rounded-md border bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        >
                            Reset Password
                        </button>
                    </form>
                )}

                <div className="text-center text-sm">
                    <Link to="/login" className="text-primary hover:underline font-medium">
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
}
