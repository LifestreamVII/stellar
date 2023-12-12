import React from 'react'

const StatsCards = () => {
    const activities = [
        { name: 'Work', hours: '32hrs', lastWeek: '36hrs', className: 'work' },
        { name: 'Play', hours: '32hrs', lastWeek: '36hrs', className: 'play' },
        { name: 'Study', hours: '32hrs', lastWeek: '36hrs', className: 'study' },
        { name: 'Exercise', hours: '32hrs', lastWeek: '36hrs', className: 'exercise' },
        { name: 'Social', hours: '32hrs', lastWeek: '36hrs', className: 'social' },
        { name: 'Self Care', hours: '32hrs', lastWeek: '36hrs', className: 'self-care' },
    ];

  return (
    <div>
        <div className="panel-grid">
            <div className="card profile-card">
                <img className="profile-image" src="https://placehold.co/100x100" alt="Profile picture of Jeremy Robson" />
                <h5 className="profile-title">Report for</h5>
                <h2 className="profile-name">Jeremy Robson</h2>
                <div className="button-group">
                    <button className="button">Daily</button>
                    <button className="button">Weekly</button>
                    <button className="button">Monthly</button>
                </div>
            </div>
            {activities.map((activity) => (
                <div className={`card activity-card ${activity.className}`}>
                    <div className="ellipsis"><i className="fas fa-ellipsis-h"></i></div>
                    <h3 className="activity-title">{activity.name}</h3>
                    <p className="activity-hours">{activity.hours}</p>
                    <p className="activity-previous">Last Week - {activity.lastWeek}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default StatsCards