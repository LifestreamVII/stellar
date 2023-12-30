import { NavLink } from '@remix-run/react'
import React from 'react'

const Expanded = ({menu}) => {

    const menuList = (menu) => {
        switch (menu) {
            case "messages":
                return [
                    {
                    link: "",
                    title: "Write new message"
                    },
                    {
                    link: "",
                    title: "Inbox"
                    },
                    {
                    link: "",
                    title: "Sent"
                    },
                ]
            case "help":
                return [
                    {
                    link: "",
                    title: ""
                    },
                ]
            default:
                return [{}]
        }
    }

    return (
        <div className='expanded-menu'>
            <ul>
            {menuList(menu).map((item, index) =>
            {
                if (item) {
                    return (
                        <li>
                            <NavLink to={item.link}>
                                <div className="menu-details">
                                        <span>{item.title}</span>
                                </div>
                            </NavLink>
                        </li>
                    )
                }
            }
            )}
            </ul>
        </div>
    )
}

export default Expanded