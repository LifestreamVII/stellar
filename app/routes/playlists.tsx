import React from 'react'
import css from "~/styles/pl-list.css";
import usePlaylists from '~/scripts/usePlaylists';
import PlaylistList from "~/components/PlaylistList";
import { LoaderFunction } from '@remix-run/node';
import { requireAuth } from '~/guard/guard';
import { useOutletContext } from '@remix-run/react';

export const loader: LoaderFunction = async ({ request }) => {
    const user = await requireAuth(request);
    return user;
}

const Playlists = () => {
    const user = useOutletContext();
    const { data:playlists, loading, error } = usePlaylists(user?.uid, 'owned');

    return (
        <div>
            <PlaylistList list={playlists}></PlaylistList>
        </div>
    )
}

export function links() {
    return [
      { rel: "stylesheet", href: css },
    ]
  }

export default Playlists