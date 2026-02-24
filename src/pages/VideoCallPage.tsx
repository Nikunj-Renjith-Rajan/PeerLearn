import { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Video, VideoOff, PhoneOff, Users } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import Peer from 'simple-peer';
import { useAuth } from '../context/AuthContext';

// Force global for Parcel/Vite capability if needed, though simple-peer should work.
// import * as process from 'process';
// window.process = process;

const socket = io('http://localhost:5000');

export function VideoCallPage() {
    const { id: roomId } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [stream, setStream] = useState<MediaStream>();
    const [peers, setPeers] = useState<any[]>([]);
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);

    const userVideo = useRef<HTMLVideoElement>(null);
    const peersRef = useRef<any[]>([]);

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(currentStream => {
            setStream(currentStream);
            if (userVideo.current) {
                userVideo.current.srcObject = currentStream;
            }

            // Join room
            socket.emit('join-room', roomId, user?.id || 'anonymous');

            socket.on('user-connected', (userId: string) => {
                // Initialize peer connection (initiator)
                const peer = createPeer(userId, socket.id!, currentStream);
                peersRef.current.push({
                    peerID: userId,
                    peer,
                });
                setPeers(users => [...users, { peerID: userId, peer }]);
            });

            socket.on('user-joined', (payload: any) => {
                // Handle incoming signal (receiver)
                const peer = addPeer(payload.signal, payload.callerID, currentStream);
                peersRef.current.push({
                    peerID: payload.callerID,
                    peer,
                });
                setPeers(users => [...users, { peerID: payload.callerID, peer }]);
            });

            socket.on('receiving-returned-signal', (payload: any) => {
                const item = peersRef.current.find(p => p.peerID === payload.id);
                item.peer.signal(payload.signal);
            });

            // To make it fully working we need 'all users' list when joining or strict 1-on-1 logic
            // Ideally we get a list of users in room and connect to all. 
            // Simplified for now: 1-on-1 or just responding to 'user-connected' if we are already there?
            // The logic above is slightly mixed between mesh and simple 1-to-1.
            // Let's assume mesh for small group.
        });

        // Simple Peer Logic Helpers
        function createPeer(userToSignal: string, callerID: string, stream: MediaStream) {
            const peer = new Peer({
                initiator: true,
                trickle: false,
                stream,
            });

            peer.on('signal', (signal: any) => {
                socket.emit('sending-signal', { userToSignal, callerID, signal });
            });

            return peer;
        }

        function addPeer(incomingSignal: any, callerID: string, stream: MediaStream) {
            const peer = new Peer({
                initiator: false,
                trickle: false,
                stream,
            });

            peer.on('signal', (signal: any) => {
                socket.emit('returning-signal', { signal, callerID });
            });

            peer.signal(incomingSignal);

            return peer;
        }

    }, [roomId, user]);

    // Backend needs to handle 'sending-signal' and 'returning-signal'! 
    // I need to update server.js to relay these messages.

    const toggleMute = () => {
        if (stream) {
            stream.getAudioTracks()[0].enabled = !stream.getAudioTracks()[0].enabled;
            setIsMuted(!stream.getAudioTracks()[0].enabled);
        }
    };

    const toggleVideo = () => {
        if (stream) {
            stream.getVideoTracks()[0].enabled = !stream.getVideoTracks()[0].enabled;
            setIsVideoOff(!stream.getVideoTracks()[0].enabled);
        }
    };

    return (
        <div className="h-[calc(100vh-64px)] flex flex-col bg-slate-950 text-white">
            <div className="h-14 px-4 border-b border-slate-800 flex justify-between items-center bg-slate-900">
                <span className="font-semibold">Room: {roomId}</span>
                <div className="flex items-center space-x-2 text-sm text-slate-400">
                    <Users className="h-4 w-4" />
                    <span>{peers.length + 1} Participants</span>
                </div>
            </div>

            <div className="flex-1 p-4 grid grid-cols-2 md:grid-cols-3 gap-4 overflow-y-auto">
                <div className="relative bg-slate-800 rounded-lg overflow-hidden aspect-video">
                    <video ref={userVideo} autoPlay muted playsInline className="w-full h-full object-cover" />
                    <div className="absolute bottom-2 left-2 bg-black/50 px-2 py-1 rounded text-xs">You</div>
                </div>

                {peers.map((peerObj, index) => (
                    <VideoCard key={index} peer={peerObj.peer} />
                ))}
            </div>

            <div className="h-16 bg-slate-900 flex items-center justify-center space-x-4">
                <button onClick={toggleMute} className={`p-3 rounded-full ${isMuted ? 'bg-red-500' : 'bg-slate-700'}`}>
                    {isMuted ? <MicOff /> : <Mic />}
                </button>
                <button onClick={toggleVideo} className={`p-3 rounded-full ${isVideoOff ? 'bg-red-500' : 'bg-slate-700'}`}>
                    {isVideoOff ? <VideoOff /> : <Video />}
                </button>
                <button onClick={() => navigate('/dashboard')} className="p-3 rounded-full bg-red-600 px-8">
                    <PhoneOff />
                </button>
            </div>
        </div>
    );
}

const VideoCard = ({ peer }: { peer: any }) => {
    const ref = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        peer.on('stream', (stream: MediaStream) => {
            if (ref.current) {
                ref.current.srcObject = stream;
            }
        });
    }, [peer]);

    return (
        <div className="relative bg-slate-800 rounded-lg overflow-hidden aspect-video">
            <video ref={ref} autoPlay playsInline className="w-full h-full object-cover" />
            <div className="absolute bottom-2 left-2 bg-black/50 px-2 py-1 rounded text-xs">Peer</div>
        </div>
    );
};
