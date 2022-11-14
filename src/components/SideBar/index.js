import React from "react";
import { Link } from 'react-router-dom';
import { IoIosAddCircleOutline } from 'react-icons/io';
import './index.css';
export default class SideBar extends React.Component{
    render(){
        return(
            <div className="corpo">
                <div className="sidebar">
                    <div className="sidebar-links">
                        <Link to={'/'}><IoIosAddCircleOutline size={40} color='white'/></Link>
                        <Link to={'/hoje'} className="link">Hoje</Link>
                        <Link to={'/semana'} className="link">Semana</Link>
                        <Link to={'/mes'} className="link">Mês</Link>
                    </div>
                </div>
            </div>
    )
}
}