import React from 'react'
import css from "~/styles/pl-list.css";
import useSongs from '~/scripts/useSongs';
import LibraryCard from "~/components/Library/LibraryCard";
import { LoaderFunction } from '@remix-run/node';
import { requireAuth } from '~/guard/guard.server';
import { useOutletContext } from '@remix-run/react';

export const loader: LoaderFunction = async ({ request }) => {
    const user = await requireAuth(request);
    return user;
}

const Library = () => {
    const user = useOutletContext();
    const { data:songs, loading, error } = useSongs(user?.uid, 'owned');
    const { data:favs } = useSongs(user?.uid, 'favorited');

    return (
        <div className='mainContent'>
            <div className="row">
                <div className="u__align--left col-12">            
                    <h1 className='captionxl u__align--left u__fs__h1 mb-none'>My Library</h1>
                    <p>Your Library</p>
                </div>
            </div>
            <div className='library-container'>
                <LibraryCard list="history" songs={[]}></LibraryCard>
                <LibraryCard list="liked" songs={favs}></LibraryCard>
                <LibraryCard list="albums" songs={[]}></LibraryCard>
                <LibraryCard list="uploads" songs={songs}></LibraryCard>
            </div>
        </div>
    )
}

export function links() {
    return [
      { rel: "stylesheet", href: css },
    ]
  }

export default Library