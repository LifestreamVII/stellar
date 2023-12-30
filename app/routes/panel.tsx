import React, { useEffect } from 'react'
import css from "~/styles/panel.css";
import StatsCards from "~/components/StatsCards";
import StorageInfo from "~/components/StorageInfo";
import Upload from "~/components/Upload";
import { auth } from '~/utils/firebase.config';
import { LoaderFunction } from '@remix-run/node';
import { requireAuth } from '~/guard/guard';
import { useOutletContext } from '@remix-run/react';
import usePlaylists from '~/scripts/usePlaylists';

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireAuth(request);
  //const userData = await getUser(uid);
  return user;
}


const panel = () => {
  const user = useOutletContext();
  const { data:playlists, loading, error } = usePlaylists(user?.uid, 'owned');
  return (
        <div className="">
            <div className="row mb-l">
                <div className="u__align--left col-12">
                    <h1 className="captionxl u__align--left u__fs__h1 mb-none">User Panel</h1>
                </div>
            </div>
            <div className='row mb-l'>
              <div className='col-12 col-md-4 u__align--left'>
                <StorageInfo></StorageInfo>
              </div>
              <div className='col-12 col-md-8 u__align--left'>
                <Upload></Upload>
              </div>
            </div>
            <div className='row'>
              <div className='col-12'>
                <StatsCards user={user ? {...user, playlists:[...playlists]} : {}}></StatsCards>
              </div>
            </div>
        </div>
  )
}

export function links() {
  return [
    { rel: "stylesheet", href: css },
  ]
}

export default panel