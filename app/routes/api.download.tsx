// app/routes/api/deezer-search.js

import { json } from '@remix-run/node';
import axios from 'axios';

export const loader = async ({ request }: any) => {
  try {
    let url = new URL(request.url);

    let title = url.searchParams.get('title') || null;
    let album = url.searchParams.get('album')  || "";
    let artist = url.searchParams.get('artist') || null;
    let duration = url.searchParams.get('duration') || null;

    if (!title || !artist || !duration) throw new Error ("Invalid value(s)");
    
    // Clean up the input data
    album = album.replace(/[\u0250-\ue007]/g, '').length > 3 ? album.replace(/[\u0250-\ue007]/g, '') : album;
    title = title.replace(/[\u0250-\ue007]/g, '').length > 3 ? title.replace(/[\u0250-\ue007]/g, '') : title;
    artist = artist.replace(/[\u0250-\ue007]/g, '').length > 3 ? artist.replace(/[\u0250-\ue007]/g, '') : artist;

    // Duration should be provided in seconds
    const api_url = `https://api.deezer.com/search?q=artist:"${encodeURIComponent(artist)}"%20track:"${encodeURIComponent(title)}"%20dur_max:"${Math.floor(Number(duration) + 30)}"`;

    const response = await axios.get(api_url);

    if (response.data && response.data.data) {
      if (response.data.data.length > 0) {
        const song = response.data.data[0];
        return json({ id: song.id });
      }
      return json({ error: "Song not found", code:69}, { status: 404 });
    } else {
      return json({ error: "Error while fetching the Deezer API", code:1 }, { status: 500 });
    }
  } catch (error: any) {
    console.error(error);
    return json({ error: 'Error while searching the song on Deezer: ' + error.message, code:1 }, { status: 500 });
  }
};
