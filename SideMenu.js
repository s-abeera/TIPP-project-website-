import React, { useState } from "react";
import { useLocation } from "react-router";
import logo from "../assets/logo/logo.png";
import user from "../assets/admin-user.jpg"

import MenuItem from "./MenuItem";

const menuItems = [
    {name: 'Control Center', to: '/control', 
    subMenus: [{ name: "User Control"}, 
    {name: "Question Control"}, 
    {name: "Posting control"}],
    },
    {name: 'Direct Messages', to: '/messages'},
];

const SideMenu =()=>{
    //make changes to toggle menu icon for difference in active/inactive side-menu
    const [inactive,setInactive]= useState(true);
    const location = useLocation();

    return (
        <div className={`side-menu ${inactive ? "inactive" : ""} ${location.pathname==="/login" ? "disabled" : ""}`} >
            <div className="top-section"> 
                <div className="logo">
                    <img src={logo} alt="logo"/>
                </div>
                <div 
                    onClick={() => {
                        setInactive(!inactive)
                    }}
                    className="toggle-menu-btn">
                    {inactive ?(
                    <i className="bi bi-arrow-right-square-fill"></i>
                    ):(
                    <i className="bi bi-arrow-left-square-fill"></i>)} 
                </div>
            </div>
            <div className="divider"> </div>

            <div className="main-menu">
                <ul>
                    {
                        menuItems.map((menuItem, index) => (
                            <MenuItem
                                key = {index}
                                name = {menuItem.name}
                                to = {menuItem.to}
                                subMenus = {menuItem.subMenus || []}
                            />
                        ))}

                   {/* <li>
                        {inactive ?(<a className="menu-item">
                            <div className="control-icon">
                                <i className="bi bi-briefcase-fill"></i>
                            </div></a>):
                            <MenuItem 
                                name = {"Control Center"}
                                subMenus = {[
                                    {name: 'User Control'}
                                    {name: 'Question Control'}
                                    {name: 'Posting Control'}
                                ]}
                            
                            />
                        
                        
                    </li>
                    <li>
                        {inactive ?(<a className="menu-item">
                            <div className="control-icon">
                                <i className="bi bi-chat-dots-fill"></i>
                            </div>
                        </a>):(<a className="menu-item">
                            <div className="control-icon">
                                <i className="bi bi-chat-dots-fill"></i>
                            </div> 
                            <span>Direct Messages</span>
                        </a>)}
                            </li> */}
                </ul>

                <div className="side-menu-footer">
                    <div className="avatar"> 
                        <img src={user} alt="user"/>
                    </div>
                    <div className="user-info">
                        <h5>Name</h5>
                        <p>Email address</p>

                    </div>
                </div>
            </div>

        </div>)
}

export default SideMenu;