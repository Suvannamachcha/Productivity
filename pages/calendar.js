import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import { useRouter } from 'next/router';

export default function Calendar() {
  const [events, setEvents] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const user = supabase.auth.getUser();
    if (!user) router.push('/login');
    fetchEvents();
  }, []);

  async function fetchEvents() {
    const { data, error } = await supabase.from('calendar').select();
    if (error) console.error(error);
    else setEvents(data.map((e) => ({ id: e.id, title: e.title, date: e.date })));
  }

  async function handleDateClick(info) {
    const title = prompt('Enter Event Title');
    if (title) {
      const { error } = await supabase.from('calendar').insert({ title, date: info.dateStr });
      if (error) console.error(error);
      else fetchEvents();
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Calendar</h1>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
      />
    </div>
  );
}
