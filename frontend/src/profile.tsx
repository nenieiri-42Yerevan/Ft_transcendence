import Background from "./background";
import avatar from "./assets/images/avatar.png"

const Profile = () => {

    return (
        <>
            <div className="flex flex-col lg:flex-row backdrop-blur-md min-h-screen min-w-full items-left bg-black/50 z-[668] absolute">
                <div className="m-5 justify-center items-center min-w-full lg:min-w-fit h-fit bg-white p-8 rounded-md">
                    <img src = {avatar} className = "h-12 block"></img>
                    <p className="text-red-600 font-bold text-2xl">Your Content Goes Here</p>
                </div>
                <div className="m-5 justify-center items-center min-w-full lg:min-w-fit h-fit p-8 bg-white rounded-md shadow-lg">
                    <p className="text-red-600 font-bold text-2xl">Your Content Goes Here</p>
                </div>
            </div>
            <Background/>
        </>
    );
    
}
export default Profile;