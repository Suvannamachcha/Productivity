import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';

export default function Productivity() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    const { data, error } = await supabase.from('tasks').select();
    if (error) console.error(error);
    else setTasks(data);
  }

  async function addTask() {
    if (newTask) {
      const { error } = await supabase.from('tasks').insert({ title: newTask });
      if (error) console.error(error);
      else {
        setNewTask('');
        fetchTasks();
      }
    }
  }

  async function deleteTask(id) {
    const { error } = await supabase.from('tasks').delete().eq('id', id);
    if (error) console.error(error);
    else fetchTasks();
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Productivity Tracker</h1>
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="New Task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="border p-2 mr-2"
        />
        <button onClick={addTask} className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Task
        </button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="flex justify-between items-center mb-2">
            {task.title}
            <button onClick={() => deleteTask(task.id)} className="bg-red-500 text-white px-2 py-1 rounded">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
