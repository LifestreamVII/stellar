import { useState, useEffect } from 'react';
import { db, storage } from '~/utils/firebase.config';
import { doc, getDoc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";

const usePlaylists = (userId, context) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const userDocRef = doc(db, "users", userId);
        const userSnap = await getDoc(userDocRef);

        if (!userSnap.exists()) {
          throw new Error('User not found');
        }

        const userData = userSnap.data();
        let playlistIds = [];

        if (context === 'owned') {
          playlistIds = userData.discography?.playlists || [];
        } else if (context === 'favorited') {
          playlistIds = userData.feed?.favorited?.playlists || [];
        } else {
          throw new Error('Invalid context');
        }

        const playlists = await Promise.all(playlistIds.map(async (playlistId) => {
          const playlistDocRef = doc(db, "playlists", playlistId);
          const playlistSnap = await getDoc(playlistDocRef);
          const playlistData = playlistSnap.data();

          if (playlistSnap.exists()) {
            const imageRef = ref(storage, `playlists/images/${playlistId}.jpg`);
            const imageUrl = await getDownloadURL(imageRef).catch(() => null);
            return { id: playlistId, ...playlistData, coverImageUrl: imageUrl };
          } else {
            return null;
          }
        }));

        setData(playlists.filter(Boolean)); // Filter out any null values
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, [userId, context]);

  return { data, loading, error };
};

export default usePlaylists;