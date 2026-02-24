
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api';
import { Camera, Check, AlertCircle } from 'lucide-react';

export function ProfileSetupPage() {
    const { user, updateUser } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [checkingUsername, setCheckingUsername] = useState(false);
    const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);
    const [usernameError, setUsernameError] = useState('');

    const [formData, setFormData] = useState({
        username: '',
        date_of_birth: '',
        phone_number: '',
        education_qualification: '',
        profession: '',
        profile_picture: '',
    });

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        // Pre-fill if editing existing profile
        if (user.username) {
            setFormData({
                username: user.username || '',
                date_of_birth: user.date_of_birth ? new Date(user.date_of_birth).toISOString().split('T')[0] : '',
                phone_number: user.phone_number || '',
                education_qualification: user.education_qualification || '',
                profession: user.profession || '',
                profile_picture: user.profile_picture || '',
            });
        }
    }, [user, navigate]);

    // Debounce username check
    useEffect(() => {
        const checkUsername = async () => {
            if (!formData.username || formData.username.length < 3) {
                setUsernameAvailable(null);
                setUsernameError('');
                return;
            }

            // Don't check if it's the current user's username
            if (user?.username === formData.username) {
                setUsernameAvailable(true);
                return;
            }

            setCheckingUsername(true);
            try {
                const response = await api.get(`/auth/check-username/${formData.username}`);
                setUsernameAvailable(response.data.available);
                setUsernameError(response.data.available ? '' : 'Username is already taken');
            } catch (error) {
                console.error('Error checking username:', error);
            } finally {
                setCheckingUsername(false);
            }
        };

        const timeoutId = setTimeout(checkUsername, 500);
        return () => clearTimeout(timeoutId);
    }, [formData.username, user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (usernameAvailable === false) {
            setLoading(false);
            return;
        }

        try {
            const endpoint = user?.username ? '/auth/profile' : '/auth/complete-profile';
            const method = user?.username ? 'put' : 'post';

            const response = await api[method](endpoint, {
                userId: user?.id,
                ...formData
            });

            updateUser(response.data.user);
            navigate('/dashboard');
        } catch (error) {
            console.error('Error saving profile:', error);
            alert('Failed to save profile. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="w-full max-w-2xl bg-card rounded-lg shadow-lg border p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2">Complete Your Profile</h1>
                    <p className="text-muted-foreground">Tell us a bit more about yourself to get started</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Profile Picture Placeholder */}
                    <div className="flex justify-center mb-6">
                        <div className="relative">
                            <div className="w-32 h-32 rounded-full bg-accent flex items-center justify-center overflow-hidden border-4 border-background shadow-sm">
                                {formData.profile_picture ? (
                                    <img src={formData.profile_picture} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <Camera className="h-12 w-12 text-muted-foreground" />
                                )}
                            </div>
                            <input
                                type="text"
                                name="profile_picture"
                                placeholder="Paste Image URL here (Optional)"
                                value={formData.profile_picture}
                                onChange={handleChange}
                                className="mt-4 w-full text-xs p-2 border rounded"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Username */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">
                                Username <span className="text-destructive">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="username"
                                    required
                                    minLength={3}
                                    value={formData.username}
                                    onChange={handleChange}
                                    className={`w-full p-2 rounded-md border bg-background ${usernameAvailable === true ? 'border-green-500' :
                                            usernameAvailable === false ? 'border-destructive' : 'border-input'
                                        }`}
                                    placeholder="unique_username"
                                />
                                {checkingUsername && (
                                    <div className="absolute right-3 top-2.5 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                                )}
                                {!checkingUsername && usernameAvailable === true && (
                                    <Check className="absolute right-3 top-2.5 h-4 w-4 text-green-500" />
                                )}
                                {!checkingUsername && usernameAvailable === false && (
                                    <AlertCircle className="absolute right-3 top-2.5 h-4 w-4 text-destructive" />
                                )}
                            </div>
                            {usernameError && <p className="text-xs text-destructive">{usernameError}</p>}
                        </div>

                        {/* Date of Birth */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">
                                Date of Birth <span className="text-destructive">*</span>
                            </label>
                            <input
                                type="date"
                                name="date_of_birth"
                                required
                                value={formData.date_of_birth}
                                onChange={handleChange}
                                className="w-full p-2 rounded-md border border-input bg-background"
                            />
                        </div>

                        {/* Phone Number */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">
                                Phone Number <span className="text-destructive">*</span>
                            </label>
                            <input
                                type="tel"
                                name="phone_number"
                                required
                                value={formData.phone_number}
                                onChange={handleChange}
                                className="w-full p-2 rounded-md border border-input bg-background"
                                placeholder="+1 234 567 8900"
                            />
                        </div>

                        {/* Education */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">
                                Education <span className="text-destructive">*</span>
                            </label>
                            <select
                                name="education_qualification"
                                required
                                value={formData.education_qualification}
                                onChange={handleChange}
                                className="w-full p-2 rounded-md border border-input bg-background"
                            >
                                <option value="">Select Qualification</option>
                                <option value="High School">High School</option>
                                <option value="Undergraduate">Undergraduate</option>
                                <option value="Postgraduate">Postgraduate</option>
                                <option value="PhD">PhD</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        {/* Profession */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">
                                Profession <span className="text-destructive">*</span>
                            </label>
                            <input
                                type="text"
                                name="profession"
                                required
                                value={formData.profession}
                                onChange={handleChange}
                                className="w-full p-2 rounded-md border border-input bg-background"
                                placeholder="Student, Developer, Teacher..."
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading || usernameAvailable === false}
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-2 rounded-md font-medium transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Saving...' : 'Save Profile'}
                    </button>
                </form>
            </div>
        </div>
    );
}
