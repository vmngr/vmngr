import React from "react";

import Overview from "./overview/overview";

import "./app.css";
import coverImage from  "./cover.png";

export default function App() {

    return (
        <div className="container">
            <img id="cover" src={coverImage} alt="Cover" />
            <Overview />
        </div>
    );

}
