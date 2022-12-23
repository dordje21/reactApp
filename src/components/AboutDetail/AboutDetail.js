import React from "react";
import { useParams } from "react-router-dom";

const AboutDetails = () => {
    let params = useParams();
    return (
        <>
            <h1>
                {params.name}
            </h1>
        </>
    )
}

export default AboutDetails