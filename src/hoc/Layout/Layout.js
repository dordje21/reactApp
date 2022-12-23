import React, { Component } from "react";
import classes from './Layout.module.css'
import MenuToggle from "../../components/Navigation/MenuToggle/MenuToggle";
import Drawer from "../../components/Navigation/Drawer/Drawer";

class Layout extends Component {

    state = {
        isOpen: false
    }

    onToggelMenuHandler = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    onCloseHandler = () => {
        this.setState({
            isOpen: false
        })
    }

    render() {
        return (
            <div className={classes.Layout}>
                <MenuToggle
                    onToggel={this.onToggelMenuHandler}
                    isOpen={this.state.isOpen}
                />
                <Drawer
                    onClose={this.onCloseHandler}
                    isOpen={this.state.isOpen}
                />
                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}

export default Layout