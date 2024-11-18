import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';

export default function Reminders() {
  const [reminders, setReminders] = useState([]);
  const [newReminder, setNewReminder] = useState('');

  useEffect(() => {
    fetchReminders();
  }, []);

  async function fetchReminders() {
    const { data, error } = await supabase.from('reminders').select();
    if (error) console.error(error);
    else setReminders(data);
  }

  async function addReminder() {
    if (newReminder) {
      const { error } = await supabase.from('reminders').insert({ title: newReminder });
      if (error) console.error(error);
      else {
        setNewReminder('');
        fetchReminders();
      }
    }
  }

  async function deleteReminder(id) {
    const { error } = await supabase.from('reminders').delete().eq('id', id);
    if (error) console.error(error);
    else fetchReminders();
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Reminders</h1>
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="New Reminder"
          value={newReminder}
          onChange={(e) => setNewReminder(e.target.value)}
          className="border p-2 mr-2"
        />
        <button onClick={addReminder} className="bg-blue-500 text-white px-4 py-2 rounded">
          Add
        </button>
      </div>
      <ul>
        {reminders.map((reminder) => (
          <li key={reminder.id} className="flex justify-between items-center mb-2">
            {reminder.title}
            <button onClick={() => deleteReminder(reminder.id)} className="bg-red-500 text-white px-2 py-1 rounded">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
