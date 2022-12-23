import React, { Component } from "react";
import classes from './Drawer.module.css'
import BackDrop from '../../UI/BackDrop/BackDrop'
import { NavLink } from 'react-router-dom'

const links = [
    { href: '/', title: 'home' },
    { href: '/about', title: 'about' },
    { href: '/contact', title: 'contact' }
]

class Drawer extends Component {

    clickHandlerClose = () => {
        this.props.onClose()
    }

    renderLinks() {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <NavLink to={link.href} exact 
                    className={({ isActive }) => isActive ? 'my-active' : undefined }
                    onClick={this.clickHandlerClose} >{link.title}</NavLink>
                </li>
            )
        })
    }

    render() {

        const cls = [classes.Drawer]

        if (!this.props.isOpen) {
            cls.push(classes.close)
        }

        return (
            <>
                <nav className={cls.join(' ')}>
                    <ul>
                        {this.renderLinks()}
                        <li>
                            <NavLink to={{
                                pathname: "/params",
                                search: '?a=1&b=2',
                                hash: 'hashwen'
                            }} exact>Form params</NavLink>
                        </li>
                    </ul>
                </nav>
                {this.props.isOpen ? <BackDrop onClick={this.props.onClose} /> : null}
            </>

        )
    }
}

export default Drawer