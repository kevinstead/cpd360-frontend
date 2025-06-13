// src/pages/admin/TelehealthSessionWrapper.jsx

import React from 'react';
import { useParams } from 'react-router-dom';
import TelehealthSession from './TelehealthSession';

export default function TelehealthSessionWrapper() {
  const { roomName } = useParams();
  return <TelehealthSession roomName={roomName} />;
}
