import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { useRouter } from 'next/router';

export default function FileManager() {
  const [files, setFiles] = useState([]);
  const [folderName, setFolderName] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const user = supabase.auth.getUser();
    if (!user) router.push('/login');
    fetchFiles();
  }, []);

  async function fetchFiles() {
    setLoading(true);
    const { data, error } = await supabase.storage.from('files').list();
    if (error) console.error(error);
    else setFiles(data);
    setLoading(false);
  }

  async function uploadFile(event) {
    const file = event.target.files[0];
    if (file) {
      const { error } = await supabase.storage.from('files').upload(file.name, file);
      if (error) console.error(error);
      else fetchFiles();
    }
  }

  async function createFolder() {
    if (folderName) {
      const { error } = await supabase.storage.from('files').upload(`${folderName}/placeholder.txt`, '');
      if (error) console.error(error);
      else fetchFiles();
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">File Manager</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Folder Name"
          className="border p-2 mr-2"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
        />
        <button onClick={createFolder} className="bg-blue-500 text-white px-4 py-2 rounded">
          Create Folder
        </button>
      </div>

      <div className="mb-4">
        <input type="file" onChange={uploadFile} />
      </div>

      {loading && <p>Loading...</p>}

      <ul>
        {files.map((file) => (
          <li key={file.id} className="mb-2">
            {file.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
