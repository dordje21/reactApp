import React, { Component } from "react";
import { useNavigate } from 'react-router-dom';

const About = props => {
    const navigate = useNavigate();

    const links = props.aboutLinks.map((link, index) => {
        return(
            <button index={index} onClick={() => navigate(link.name)}>{link.name}</button>
        )
    })
      
    return(
        <>
            <h1>About</h1>
            {links}
        </>
    )

 
}

export default About