import React, { useState } from "react"

/**
 * @author 
 * @function  
 **/

const MenuItem = (props) => {
    const { name, subMenus } = props;
    const [expand, setExpand] = useState(false)


    return (
    <li>
        <a onClick = {() => setExpand(!expand)} className="menu-item">
            <div className="control-icon">
                <i className="bi bi-briefcase-fill"></i>
            </div> 
            <span> {name} </span>
        </a>
        {subMenus && subMenus.length > 0 ? ( 
        <ul className = { "sub-menu ${expand ?  'active' : ''} " } >
            {subMenus.map((menu, index) => (
            <li key = {index}>
                <a>{menu.name}</a>
            </li>
            ))}
        </ul>
        ) : null}
    </li>
    );
};

export default MenuItem;