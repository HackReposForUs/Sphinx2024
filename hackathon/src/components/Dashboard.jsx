import React, { useEffect, useState } from 'react';
import {
  GlowingStarsBackgroundCard,
  GlowingStarsDescription,
  GlowingStarsTitle,
} from "./ui/glowing-stars";
import { BackgroundBeams } from './ui/backgroundBeams';

const ChatDashboard = () => {
  const [portals, setPortals] = useState([]);
  const [noQuery, setNoQuery] = useState(false);
  const [isOffline, setIsOffline] = useState(false);

  // Sample data to display if backend is offline
  const sampleData = [
    {
      _id: '1',
      querySubject: 'Sample Room 1',
      querierId: 'user1',
      dateInitialized: '2024-01-01T10:00:00Z',
      dateQueryClosed: null,
      messages: [
        { senderId: 'user1', content: 'Hello, I have a question.', timestamp: '2024-01-01T10:15:00Z' },
        { senderId: 'user2', content: 'Sure, I can help with that!', timestamp: '2024-01-01T10:20:00Z' },
      ],
    },
    {
      _id: '2',
      querySubject: 'Sample Room 2',
      querierId: 'user3',
      dateInitialized: '2024-02-01T09:00:00Z',
      dateQueryClosed: null,
      messages: [
        { senderId: 'user3', content: 'Is this service available?', timestamp: '2024-02-01T09:30:00Z' },
        { senderId: 'user4', content: 'Yes, it is!', timestamp: '2024-02-01T09:35:00Z' },
      ],
    },
  ];

  const dataFetch = async () => {
    try {
      const response = await fetch('http://localhost:8001/allData');
      const result = await response.json();

      if (result.data && result.data.portals.length > 0) {
        setPortals(result.data.portals);
        setNoQuery(false);
        setIsOffline(false);
      } else {
        setNoQuery(true);
        setIsOffline(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      // Use sample data if fetch fails
      setPortals(sampleData);
      setIsOffline(true);
    }
  };

  // Handle joining a room
  const handleJoinRoom = async (roomId) => {
    try {
      const response = await fetch('/queryId', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: roomId }),
      });
      const result = await response.json();

      if (result.redirect === '/chat') {
        window.location.href = `/chat?roomId=${roomId}`;
      }
    } catch (error) {
      console.error('Error joining room:', error);
    }
  };

  useEffect(() => {
    dataFetch();
    const interval = setInterval(dataFetch, 5000); // Fetch every 5 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div>
      <BackgroundBeams />
    <div className="dashboard-container p-6 min-h-screen relative z-20">
      <h2 className="text-2xl font-bold mb-6 selected-status">Available Chat Rooms</h2>
      {noQuery && !isOffline ? (
        <p className="null">No chat rooms available.</p>
      ) : (
        <div className="all-queries flex flex-wrap gap-10">
          {portals.map((portal) => (
            <GlowingStarsBackgroundCard
              key={portal._id}
            >
              <GlowingStarsTitle>{portal.querySubject}</GlowingStarsTitle>
              <GlowingStarsDescription>
                Initialized: {new Date(portal.dateInitialized).toLocaleString()}
              </GlowingStarsDescription>
              
              <button
                className="join-room-btn mt-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                onClick={() => handleJoinRoom(portal._id)}
              >
                Join Room
              </button>
            </GlowingStarsBackgroundCard>
          ))}
        </div>
      )}

      {isOffline && (
        <p className="text-red-500 mt-4">Backend is offline. Showing sample data.</p>
      )}
    </div>
    </div>
  );
};

export default ChatDashboard;
