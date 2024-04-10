import css from "~/styles/pl-list.css";
import { LoaderFunction } from '@remix-run/node';
import { requireAuth } from '~/guard/guard';
import { useOutletContext } from '@remix-run/react';

export const loader: LoaderFunction = async ({ request }) => {
    const user = await requireAuth(request);
    return user;
}

const Playlists = () => {
    const user = useOutletContext();
    const { data:tasks, loading, error } = useTasks(user?.uid);

    return (
        <div className='mainContent'>
            <div className="row">
                <div className="u__align--left col-12">            
                    <h1 className='captionxl u__align--left u__fs__h1 mb-none'>Tasks</h1>
                    <p>Recent operations you started</p>
                </div>
            </div>
    <div className="playlists-list mt-l">
    <div className="playlist-list-container mb-m">
          <div className="playlist-list">
            <div className="playlist-details">
              <div className="playlist-details-main">
                <img src="history.png"/>
                <div className='u__sh--default--text'>
                    <h3 className="playlist-title mb-none">Tasks</h3>
                    <p className="mt-none">202 results</p>
                </div>
              </div>
            </div>
            <div className="playlist-content-list">
            {
                songs.map((item, index)=>{ return (
                    <div className="playlist-content-item">
                        <div className="playlist-content-item-details">
                        <img src={item.coverImageUrl} width={50} height={50} alt="" srcSet="" />
                        <div className='playlist-content-item-title-artist'>
                            <span className='ml-es mb-none'>{item.title}</span>
                            <p className='ml-es mt-none mb-none'>{item.artists[0].displayName}</p>
                        </div>
                        </div>
                        <div>{msToMinutesAndSeconds(item.duration)}</div>
                    </div>
                )
                })
            }
            </div>
            <div className="playlist-expand">
              <a href="" className='u__fs__normal'>Show more...</a>
            </div>
          </div>
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

export default Playlists