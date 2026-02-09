import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';

// Public Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';

// Private Pages
import { DashboardPage } from './pages/DashboardPage';
import { CoursesPage } from './pages/CoursesPage';
import { CourseDetailPage } from './pages/CourseDetailPage';
import { CreateCoursePage } from './pages/CreateCoursePage';
import { VideoCallPage } from './pages/VideoCallPage';
import { DoubtClearingPage } from './pages/DoubtClearingPage';
import { DoubtProvider } from './context/DoubtContext';

function App() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="peerlearn-theme">
            <AuthProvider>
                <DoubtProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route element={<Layout />}>
                                <Route path="/" element={<LandingPage />} />
                                <Route path="/login" element={<LoginPage />} />
                                <Route path="/signup" element={<SignupPage />} />

                                <Route path="/courses" element={<CoursesPage />} />
                                <Route path="/courses/:id" element={<CourseDetailPage />} />
                                <Route path="/doubts" element={<DoubtClearingPage />} />

                                {/* Protected Routes */}
                                <Route element={<ProtectedRoute />}>
                                    <Route path="/dashboard" element={<DashboardPage />} />
                                    <Route path="/create-course" element={<CreateCoursePage />} />
                                    <Route path="/session/:id" element={<VideoCallPage />} />
                                </Route>
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </DoubtProvider>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;
