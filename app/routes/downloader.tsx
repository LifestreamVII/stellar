// @ts-nocheck

import css from "~/styles/pl-list.css";
import {useState, useEffect} from 'react';
import usePlaylists from '~/scripts/usePlaylists';
import PlaylistList from "~/components/PlaylistList";
import { LoaderFunction, json } from '@remix-run/node';
import { getSession, requireAuth, tokenCookie } from '~/guard/guard';
import { useFetcher, useOutletContext } from '@remix-run/react';
import { useLoaderData } from "@remix-run/react";
import useSongs from "~/scripts/useSongs";
import axios from "axios";
import type { ActionFunction } from "@remix-run/node"; // or cloudflare/deno 
import localForage from 'localforage';

export const loader: LoaderFunction = async ({ request }) => {
    const user = await requireAuth(request);
    const defaultPL = process.env.DEFAULT_PL;
    return {user, defaultPL};
}

export async function action({
    request,
  }: ActionFunction) {
    const body = await request.formData();
    let {items, playlistinfo} = [];
    const PLID = body.get('plID') ?? null; 
    const OFFSET = body.get('offset') ?? null;
    const token = await tokenCookie.parse(request.headers.get("Cookie"));
    if (PLID && OFFSET && token) {
        items = await axios.get(`https://api.spotify.com/v1/playlists/${PLID}/tracks?limit=${process.env.SPO_API_LIMIT}&offset=${OFFSET}`, {
        headers: { 'Authorization': `Bearer ${token}` },
        }).then((response) => {
            return response.data.items ?? [];
          }).catch((error) => {
            console.error(error);
          }).finally(() => {
            // TODO
          });
        playlistinfo = await axios.get(`https://api.spotify.com/v1/playlists/${PLID}`, {
        headers: { 'Authorization': `Bearer ${token}` },
        }).then((response) => {
            return response.data ?? [];
          }).catch((error) => {
            console.error(error);
          }).finally(() => {
            // TODO
          });
    }
    return {playlistinfo, items};
}
  
const Playlists = () => {
    const {defaultPL} = useLoaderData<typeof loader>();

    const [playlistID, setPlaylistID] = useState(defaultPL ?? "");

    const [content, setContent] = useState(null);

    const [offset, setOffset] = useState(0);
    
    const [status, setStatus] = useState({text: "", loading: false});

    const fetcher = useFetcher();

    useEffect(() => {
        setStatus({text:status.text, loading: fetcher.state === 'loading' || fetcher.state === 'submitting'});
        if (fetcher.data) {
          if (fetcher.data.items && fetcher.data.playlistinfo)
          {
            if (content && content.items.length)
            setContent({items:[...content.items, ...fetcher.data.items], playlistinfo:fetcher.data.playlistinfo});
            else
            setContent(fetcher.data);
          }
          console.log(fetcher.data);
          setStatus({text: "done", loading:false});
        }
      }, [fetcher.data]);

      useEffect(() => {
        setStatus({text:status.text, loading: fetcher.state === 'loading' || fetcher.state === 'submitting'});
      }, [fetcher.state]);
      
      const reloadPlaylist = () => {
        loadPlaylist();
      }
      
      const loadPlaylist = async () => {
        if (fetcher.state !== 'submitting' || fetcher.state !== 'loading') {
          useSongs(fetcher, playlistID, offset);
          setOffset(offset+10);
          setStatus({text:"Loading...", loading: status.loading});
          setContent(fetcher.data ?? null);
        }
    }
    
    return (
        <div className='mainContent'>
            <div className="row">
                <div className="u__align--left col-12">            
                    <h1 className='captionxl u__align--left u__fs__h1 mb-none'>Downloader</h1>
                    <p>Download tracks from a playlist ID</p>
                    <div className="search-bar">
                        <input className="mb-none u__disp--block" type="search" id="search" name="search" onChange={(val)=>{setPlaylistID(val.target.value)}} value={playlistID} placeholder="Playlist ID or URL" />
                        <button type="submit" onClick={(loadPlaylist)} className='u__fs__small ml-es mb-none'>OK</button>
                    </div>
                </div>
            </div>
            {
                status.loading ? (
                  <div className="loading-indicator">
                    <div className="spinner mt-none">
                    </div>
                    <p>Loading...</p>
                  </div>
                ) : ("")
            }
            {
                content && content.playlistinfo && content.items.length ? ( 
                    <div>
                        <PlaylistList list={content.items} loading={status.loading} reload={reloadPlaylist} info={content.playlistinfo}></PlaylistList>
                    </div>
                ) : (
                    ""
                 )
            }
        </div>
    )
}

export function links() {
    return [
      { rel: "stylesheet", href: css },
    ]
  }

export default Playlists