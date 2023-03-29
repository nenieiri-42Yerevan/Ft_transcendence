import React from "react";
import Background from "./Background";
import welphoto from "@SRC_DIR/assets/images/welcomepagephoto.png";
import { Link } from "react-router-dom";

const Welcome = () => {
    return (
        <>
            <div className="items-center justify-center bg-black/50 absolute backdrop-blur-md z-[668] min-w-full min-h-full">
                <div className="flex justify-center flex-col md:flex-row m-5">
                    <Link to="./user/SignUp" className="m-3 md:m-5 text-center bg-[#e4e9ff1a] hover:bg-[#7d7d7d] text-white font-bold py-2 rounded min-w-full md:min-w-[15em] md:mt-20 pt-[1em] pb-[1em]">
                        Sign Up
                    </Link>
                    <Link to="#" className="m-3 md:m-5 text-center bg-[#e4e9ff1a] hover:bg-[#7d7d7d] text-white font-bold py-2 rounded min-w-full md:min-w-[15em] md:mt-20 pt-[1em] pb-[1em]">
                        Sign in with 42
                    </Link>
                    <Link to="./user/SignIn" className="m-3 md:m-5 text-center bg-[#e4e9ff1a] hover:bg-[#7d7d7d] text-white font-bold py-2 rounded min-w-full md:min-w-[15em] md:mt-20 pt-[1em] pb-[1em]">
                        Sign in
                    </Link>
                </div>
                <div className="flex">
                    <img className="mr-30 ml-20 hidden lg:h-[25em] xl:h-[30em] lg:block" src={welphoto} alt="layer" />
                    <div className="w-full rounded-md text-justify m-10 p-5 bg-black/50 text-white ">
                        <h1 className="text-center p-2 text-xl font-bold">About the game</h1>
                        <p className="text-lg">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a velit a est vulputate vestibulum. Donec malesuada eros mattis
                            neque hendrerit elementum. Morbi id quam ut diam
                            interdum lacinia et ut sem. Donec in lacinia risus, a interdum diam. Cras vitae
                            nisi ex. Ut pulvinar quam erat, id laoreet mi ultrices eget. Praesent eu dignissim
                            mauris, vitae varius purus. Interdum et malesuada fames ac ante ipsum primis in f
                            aucibus. In hac habitasse platea dictumst. Vestibulum ac porta ipsum. Morbi commodo
                            tortor sed ipsum rutrum suscipit. Mauris luctus leo quis dapibus placerat. Duis at
                            egestas arcu.
                            Sed faucibus augue a velit tincidunt faucibus. Nulla quis sapien tempus,
                            lacinia massa sed, sodales est. Maecenas in pulvinar mauris. Nullam eget dui ac
                            magna iaculis pretium sed non ex. Praesent hendrerit convallis justo faucibus imperdiet. In blandit in eros
                            id lacinia. Quisque commodo facilisis varius. Etiam tortor erat, tincidunt id libero tempor, pellentesque malesuada p
                            urus. Etiam fringilla, purus vitae lobortis auctor, ligula ante volutpat est, in euismod lectus risus congue ipsum.
                            Pellentesque blandit interdum magna, non dapibus est bibendum et. Nam vel purus nec lectus cursus scelerisque eget non ligula. Quisque ut tincidunt elit.
                        </p>
                    </div>
                </div>
            </div>
            <Background />
        </>
    );
}


export default Welcome;