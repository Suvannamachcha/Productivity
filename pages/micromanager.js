import { useState, useEffect } from 'react';

export default function Micromanager() {
  const [focusMinutes, setFocusMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [timeLeft, setTimeLeft] = useState(focusMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [periodicPrompt, setPeriodicPrompt] = useState(false);

  // Request notification permission on page load
  useEffect(() => {
    if ('Notification' in window) {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    setBreakMinutes(Math.ceil(focusMinutes / 5)); // Dynamically allocate break time
  }, [focusMinutes]);

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      // Trigger a progress notification every 30 minutes
      if (timeLeft > 0 && timeLeft % 1800 === 0 && Notification.permission === 'granted') {
        new Notification('Progress Check!', {
          body: `How much progress have you made on your task?`,
        });
        setPeriodicPrompt(true);
      }
    } else if (timeLeft === 0) {
      alert('Time is up! Take a break!');
      setIsRunning(false);
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const handleStart = () => {
    setIsRunning(true);
    setTimeLeft(focusMinutes * 60);
  };

  const handleStop = () => {
    setIsRunning(false);
    setTimeLeft(0);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Micromanager</h1>

      <div className="mb-4">
        <label className="block font-medium mb-2">Focus Time (25-150 mins)</label>
        <input
          type="number"
          min="25"
          max="150"
          value={focusMinutes}
          onChange={(e) => setFocusMinutes(parseInt(e.target.value, 10))}
          className="border p-2 w-32"
        />
      </div>

      <div className="mb-4">
        <p>Calculated Break Time: {breakMinutes} minutes</p>
      </div>

      <div className="mb-6">
        <p>Time Left: {formatTime(timeLeft)}</p>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={handleStart}
          className="bg-green-500 text-white px-4 py-2 rounded"
          disabled={isRunning}
        >
          Start Focus
        </button>
        <button
          onClick={handleStop}
          className="bg-red-500 text-white px-4 py-2 rounded"
          disabled={!isRunning}
        >
          Stop
        </button>
      </div>

      {periodicPrompt && (
        <div className="mt-6 bg-blue-100 p-4 rounded">
          <p>How much progress have you made?</p>
          <button
            onClick={() => setPeriodicPrompt(false)}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
          >
            OK
          </button>
        </div>
      )}
    </div>
  );
}
