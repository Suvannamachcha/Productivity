import Link from 'next/link';

export default function Home() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to Productivity Suite</h1>
      <div className="space-y-4">
        <Link href="/file-manager">
          <a className="bg-blue-500 text-white px-4 py-2 rounded">File Manager</a>
        </Link>
        <Link href="/calendar">
          <a className="bg-green-500 text-white px-4 py-2 rounded">Calendar</a>
        </Link>
        <Link href="/reminders">
          <a className="bg-red-500 text-white px-4 py-2 rounded">Reminders</a>
        </Link>
        <Link href="/productivity">
          <a className="bg-yellow-500 text-white px-4 py-2 rounded">Productivity Tracker</a>
        </Link>
        <Link href="/micromanager">
          <a className="bg-purple-500 text-white px-4 py-2 rounded">Micromanager</a>
        </Link>
      </div>
    </div>
  );
}
