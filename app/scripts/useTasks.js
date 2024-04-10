import { useState, useEffect } from 'react';

const useTasks = (userId) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchData = async () => {
          const response = await fetch(`http://localhost:5000/download?userid=${userId}`);
          const tasks = await response.json();
          setData(Object.values(tasks));
        };

        fetchData();

        const interval = setInterval(fetchData, 3000); // Fetch data every 3 seconds

        return () => {
          clearInterval(interval); // Clear the interval when the component unmounts
        };

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