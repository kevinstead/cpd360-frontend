import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../../layouts/Layout';
import Video from 'twilio-video';
import axios from 'axios';

export default function TelehealthSession() {
  const { roomName } = useParams();
  const userIdentity = localStorage.getItem('userName') || 'guest';

  const [token, setToken] = useState(null);
  const [room, setRoom] = useState(null);

  const localRef = useRef(null);
  const remoteRef = useRef(null);

  // Fetch Twilio token when component mounts or roomName/userIdentity change
  useEffect(() => {
    if (!roomName || !userIdentity) return;
    axios
      .post('/api/telehealth/token', { identity: userIdentity, room: roomName })
      .then(res => setToken(res.data.token))
      .catch(err => console.error('Token fetch error:', err));

    // Clean up on unmount
    return () => {
      if (room) {
        room.disconnect();
      }
    };
  }, [roomName, userIdentity]);

  const handleJoin = () => {
    if (!token) return;
    Video.connect(token, { name: roomName, insights: true })
      .then(_room => {
        setRoom(_room);

        // Attach local tracks
        _room.localParticipant.tracks.forEach(publication => {
          if (publication.track) {
            localRef.current.appendChild(publication.track.attach());
          }
        });

        // Handle existing participants
        _room.participants.forEach(participant => {
          participant.tracks.forEach(publication => {
            if (publication.isSubscribed) {
              remoteRef.current.appendChild(publication.track.attach());
            }
          });
          participant.on('trackSubscribed', track => {
            remoteRef.current.appendChild(track.attach());
          });
        });

        // Listen for new participants
        _room.on('participantConnected', participant => {
          participant.tracks.forEach(publication => {
            if (publication.isSubscribed) {
              remoteRef.current.appendChild(publication.track.attach());
            }
          });
          participant.on('trackSubscribed', track => {
            remoteRef.current.appendChild(track.attach());
          });
        });
      })
      .catch(err => console.error('Connection error:', err));
  };

  const handleLeave = () => {
    if (room) {
      room.localParticipant.tracks.forEach(pub => pub.track.stop());
      room.disconnect();
      setRoom(null);
      localRef.current.innerHTML = '';
      remoteRef.current.innerHTML = '';
    }
  };

  return (
    <Layout title={`Telehealth Session: ${roomName}`}>  
      <section
        id="telehealth"
        aria-labelledby="telehealth-title"
        className="p-md bg-surface rounded-lg shadow-md flex flex-col gap-md"
      >
        <h3 id="telehealth-title" className="text-lg font-medium text-textPrimary">
          Video Call: {roomName}
        </h3>

        <div className="grid grid-cols-2 gap-md">
          <div
            role="region"
            aria-label="Local video feed"
            className="w-full h-64 bg-background rounded-md flex items-center justify-center"
          >
            <div ref={localRef} className="w-full h-full" />
          </div>
          <div
            role="region"
            aria-label="Remote video feed"
            className="w-full h-64 bg-background rounded-md flex items-center justify-center"
          >
            <div ref={remoteRef} className="w-full h-full overflow-auto" />
          </div>
        </div>

        <div className="flex gap-sm mt-md">
          {!room ? (
            <button
              onClick={handleJoin}
              className="px-md py-sm bg-accent text-textOnPrimary rounded-md"
              disabled={!token}
            >
              Join Call
            </button>
          ) : (
            <button
              onClick={handleLeave}
              className="px-md py-sm bg-danger text-textOnPrimary rounded-md"
            >
              End Call
            </button>
          )}
        </div>

        <textarea
          aria-label="Patient notes"
          className="w-full h-32 p-sm border border-border rounded-md mt-md"
          placeholder="Patient Notes..."
        />
      </section>
    </Layout>
  );
}
