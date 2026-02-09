import { useState } from 'react';
import { Mic, MicOff, Video, VideoOff, PhoneOff, MessageSquare, Users, Settings } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

export function VideoCallPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);
    const [showChat, setShowChat] = useState(true);

    return (
        <div className="h-[calc(100vh-64px)] flex flex-col bg-slate-950 text-white">
            {/* Header */}
            <div className="h-14 px-4 border-b border-slate-800 flex justify-between items-center bg-slate-900">
                <div className="flex items-center space-x-2">
                    <span className="font-semibold">Session #{id}: React Advanced Patterns</span>
                    <span className="text-xs px-2 py-0.5 bg-red-500/20 text-red-500 rounded-full animate-pulse">REC</span>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 text-sm text-slate-400">
                        <Users className="h-4 w-4" />
                        <span>12 Participants</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
                {/* Main Video Area */}
                <div className="flex-1 p-4 flex flex-col">
                    <div className="flex-1 grid grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                        {/* Fake Video Tiles */}
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="bg-slate-800 rounded-lg relative overflow-hidden group">
                                <img
                                    src={`https://images.unsplash.com/photo-${1500000000000 + i}?w=400&h=300&fit=crop`}
                                    alt={`Participant ${i}`}
                                    className="w-full h-full object-cover opacity-80"
                                />
                                <div className="absolute bottom-2 left-2 bg-black/50 px-2 py-1 rounded text-xs">
                                    Student {i}
                                </div>
                            </div>
                        ))}
                        <div className="bg-slate-800 rounded-lg relative overflow-hidden ring-2 ring-primary">
                            <div className="absolute inset-0 flex items-center justify-center bg-slate-700">
                                <span className="text-2xl font-bold bg-slate-600 w-16 h-16 rounded-full flex items-center justify-center">You</span>
                            </div>
                            <div className="absolute bottom-2 left-2 bg-black/50 px-2 py-1 rounded text-xs">
                                You (Host)
                            </div>
                        </div>
                    </div>

                    {/* Controls Bar */}
                    <div className="h-16 bg-slate-900 rounded-lg flex items-center justify-center space-x-4 mb-2">
                        <button
                            onClick={() => setIsMuted(!isMuted)}
                            className={`p-3 rounded-full ${isMuted ? 'bg-red-500 hover:bg-red-600' : 'bg-slate-700 hover:bg-slate-600'}`}
                        >
                            {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                        </button>
                        <button
                            onClick={() => setIsVideoOff(!isVideoOff)}
                            className={`p-3 rounded-full ${isVideoOff ? 'bg-red-500 hover:bg-red-600' : 'bg-slate-700 hover:bg-slate-600'}`}
                        >
                            {isVideoOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
                        </button>
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="p-3 rounded-full bg-red-600 hover:bg-red-700 px-8"
                        >
                            <PhoneOff className="h-5 w-5" />
                        </button>
                        <button
                            onClick={() => setShowChat(!showChat)}
                            className={`p-3 rounded-full ${showChat ? 'bg-primary hover:bg-primary/90' : 'bg-slate-700 hover:bg-slate-600'}`}
                        >
                            <MessageSquare className="h-5 w-5" />
                        </button>
                        <button className="p-3 rounded-full bg-slate-700 hover:bg-slate-600">
                            <Settings className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                {/* Chat Sidebar */}
                {showChat && (
                    <div className="w-80 bg-slate-900 border-l border-slate-800 flex flex-col">
                        <div className="p-4 border-b border-slate-800 font-semibold">
                            Live Chat
                        </div>
                        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                            <div className="flex flex-col space-y-1">
                                <span className="text-xs text-slate-400">Sarah (10:02)</span>
                                <p className="text-sm bg-slate-800 p-2 rounded-lg rounded-tl-none">Hello everyone! Ready for the session.</p>
                            </div>
                            <div className="flex flex-col space-y-1 items-end">
                                <span className="text-xs text-slate-400">You (10:03)</span>
                                <p className="text-sm bg-primary/20 text-blue-200 p-2 rounded-lg rounded-tr-none">Welcome Sarah!</p>
                            </div>
                        </div>
                        <div className="p-4 border-t border-slate-800">
                            <input
                                type="text"
                                placeholder="Type a message..."
                                className="w-full h-10 px-3 rounded-md bg-slate-800 border-none text-sm focus:ring-1 focus:ring-primary outline-none"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
