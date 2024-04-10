import css from "~/styles/pl-list.css";
import { LoaderFunction } from '@remix-run/node';
import { requireAuth } from '~/guard/guard';
import { useOutletContext } from '@remix-run/react';
import useTasks from '~/scripts/useTasks';

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
            {tasks.map((item, index) => {
                return (
                    <div className="playlist-content-item" key={index}>
                        <div className="playlist-content-item-details" style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                            <p className='u__fs__normal u__bold mt-none mb-none'>{item.result.userid}</p>
                            <p className='u__fs__normal mt-none mb-none'>{item.result.song}</p>
                            <p className='u__fs__normal mt-none mb-none'>{item.result.fbid}</p>
                            <p className='u__fs__normal mt-none mb-none'>{item.result.current} %</p>
                            <p className='u__fs__normal mt-none mb-none'>{item.result.status}</p>
                        </div>
                    </div>
                );
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