import { useState, useEffect } from 'react';
import { db, storage } from '~/utils/firebase.config';
import { doc, getDoc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";

const useSongs = (userId, context) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const userDocRef = doc(db, "users", userId);
        const userSnap = await getDoc(userDocRef);

        if (!userSnap.exists()) {
          throw new Error('User not found');
        }

        const userData = userSnap.data();
        let songIds = [];

        if (context === 'owned') {
          songIds = userData.discography?.songs || [];
        } else if (context === 'favorited') {
          songIds = userData.feed?.favorited?.songs || [];
        } else {
          throw new Error('Invalid context');
        }

        const songs = await Promise.all(songIds.map(async (songId) => {
          const songDocRef = doc(db, "songs", songId);
          const songSnap = await getDoc(songDocRef);
          const songData = songSnap.data();
          if (songSnap.exists()) {
            const imageRef = ref(storage, `coverart/${songData.coverUrl}`);
            const imageUrl = await getDownloadURL(imageRef).catch(() => null);
            return { id: songId, ...songData, coverImageUrl: imageUrl };
          } else {
            return null;
          }
        }));

        setData(songs.filter(Boolean)); // Filter out any null values
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, [userId, context]);

  return { data, loading, error };
};

export default useSongs;