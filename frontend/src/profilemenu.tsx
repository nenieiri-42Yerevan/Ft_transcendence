import { Link } from "react-router-dom";

const profilemenu = () => {
    return (
        <>
            <nav className="flex justify-between w-full py-2 px-4 bg-gray-800 text-white fixed top-0 left-0 z-10">
                <ul className="flex space-x-4">
                <li>
                    <Link to="#">Dashboard</Link>
                </li>
                <li>
                    <Link to="#">Friends</Link>
                </li>
                <li>
                    <Link to="#">Chat</Link>
                </li>
                <li>
                    <Link to="#">Game</Link>
                </li>
                </ul>
                </nav>
        </>
    );

}

export default profilemenu;