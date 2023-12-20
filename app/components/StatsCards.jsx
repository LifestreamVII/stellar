import React, { useEffect } from 'react'
import usePlaylists from '~/scripts/usePlaylists';

const StatsCards = (props) => {
    const activities = [
        { name: 'Streams', hours: '32 201', lastWeek: '', className: 'social' },
        { name: 'Playlists', hours: '2', lastWeek: '', className: 'work' },
        { name: 'Albums', hours: '20', lastWeek: '', className: 'play' },
        { name: 'Songs', hours: '92', lastWeek: '12 GB', className: 'study' },
        { name: 'Communities joined', hours: '20', lastWeek: '', className: 'exercise' },
    ];

  return (
    <div>
        <div className="panel-grid">
            <div className="card profile-card">
                <img className="profile-image" src={props.user.picture} alt="Profile picture of Jeremy Robson" />
                <p className='u__fs__normal'>Welcome, {props.user.name}.</p>
                <a className='u__fs__medium' href="/logout">Stats</a>
                <br />
                <a className='u__fs__medium' href="/logout">Privacy</a>
                <br />
                <a className='u__fs__medium' href="/logout">Account</a>
                <br />
                <a className='u__fs__medium' href="/logout">Sign out</a>
            </div>
            {activities.map((activity) => (
                <div className={`card activity-card ${activity.className}`}>
                    <div className="ellipsis"><i className="fas fa-ellipsis-h"></i></div>
                    <h3 className="u__fs__normal">{activity.name}</h3>
                    <p className='u__align--center u__bold u__fs__h1'>{activity.hours}</p>
                    <p className="activity-previous">Storage used - {activity.lastWeek}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default StatsCards