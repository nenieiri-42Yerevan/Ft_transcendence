import React from 'react';
import Background from "./background";
import { Link } from "react-router-dom";
import Navigation from "./components/NavBar";

const Dashboard = () => {
    return (
        <>
            <Navigation activeTab={'Dashboard'} />
            <div className="w-full h-full text-white text-2xl bg-blue-900">TEST</div>
        </>
    );
}



export default Dashboard;