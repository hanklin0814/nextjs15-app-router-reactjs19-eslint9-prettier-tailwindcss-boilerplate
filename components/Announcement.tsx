'use client';
import { GrAnnounce } from 'react-icons/gr';

export default function Announcement() {
  return (
    <div id="announcement" className="flex border border-blue-500 p-3">
      <GrAnnounce size={20} className="drop-shadow-glow animate-flicker " />
      公告區塊
    </div>
  );
}
