import React from 'react'

export default function Navigation() {
  return (
    <header>
        <div className="navbar">
            <div className="navbar__left">
                <a href="" className="navbar__logo--sm" title="Logo"></a>
            </div>
            <div className="navbar__middle">
                <a href="" className="navbar__link">
                    Home
                </a>
                <a href="" className="navbar__link">
                    Explore
                </a>
                <a href="" className="navbar__link">
                    Features
                </a>
                <a href="" className="navbar__link">
                    Support
                </a>
            </div>
            <div className="navbar__right">
                <a href="" className="btn">
                    <span>Open App</span>
                </a>
            </div>
        </div>
    </header>
  )
}
