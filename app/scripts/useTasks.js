import { useState, useEffect } from 'react';

const useTasks = (userId) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {

        setData(playlists.filter(Boolean)); // Filter out any null values
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [userId]);

  return { data, loading, error };
};

export default useTasks;