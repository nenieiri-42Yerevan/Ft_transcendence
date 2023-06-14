import React, {useEffect} from 'react';
import Background from './Background';
import welphoto from '@SRC_DIR/assets/images/welcomepagephoto.png';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectUser } from './Slices/userSlice';

const Welcome = () => {
  const navigate = useNavigate();
  const disp = useDispatch();

  const userInfo = useSelector(selectUser);
  useEffect(() => {
    if (userInfo && userInfo.user)
            navigate("/transcendence/user/profile");
  });
  const sign = async ()=>{
      window.location.href = "https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-0fd469f756e17ffc7ae3958754537fb2b200a5f1c49abe83ca40d7274ed46b70&redirect_uri=http%3A%2F%2Flocalhost%3A7000%2Ftranscendence%2Fauth%2Fsignin%2F42%2Fcallback&response_type=code";
  }

  return (
    <>
      <div className="bg-[#262525] min-h-full min-w-full">
        <div className="flex justify-center flex-col md:flex-row">
          <Link
            to="./user/SignUp"
            className="m-3 md:m-5 text-center bg-[#e4e9ff1a] hover:bg-[#7d7d7d] text-white font-bold py-2 rounded min-w-full md:min-w-[15em] md:mt-20 pt-[1em] pb-[1em]"
          >
            Sign Up
          </Link>
          <button
            onClick = {sign}
            // to="https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-a3ba0a124d3a4ced3822bc7ff62ee30b17851441280fc280437663500580042c&redirect_uri=http%3A%2F%2Flocalhost%3A7000%2Ftranscendence%2Fauth%2Fsignin%2F42%2Fcallback&response_type=code"
            className="m-3 md:m-5 text-center bg-[#e4e9ff1a] hover:bg-[#7d7d7d] text-white font-bold py-2 rounded min-w-full md:min-w-[15em] md:mt-20 pt-[1em] pb-[1em]"
          >
            Sign in with 42
          </button>
          <Link
            to="./user/SignIn"
            className="m-3 md:m-5 text-center bg-[#e4e9ff1a] hover:bg-[#7d7d7d] text-white font-bold py-2 rounded min-w-full md:min-w-[15em] md:mt-20 pt-[1em] pb-[1em]"
          >
            Sign in
          </Link>
        </div>
        <div className="flex">
          <img
            className="mr-30 ml-20 hidden lg:h-[25em] xl:h-[30em] lg:block"
            src={welphoto}
            alt="layer"
          />
          <div className="w-full rounded-md text-justify m-10 p-5 bg-black/50 text-white ">
            <h1 className="text-center p-2 text-xl font-bold">
              About the game
            </h1>
            <p className="text-lg">
                Pong is a table tennis–themed twitch arcade sports video game,
                featuring simple two-dimensional graphics, manufactured by Atari
                and originally released in 1972. It was one of the earliest arcade
                video games; it was created by Allan Alcorn as a training exercise
                assigned to him by Atari co-founder Nolan Bushnell,
                but Bushnell and Atari co-founder Ted Dabney were surprised by
                the quality of Alcorn's work and decided to manufacture the game.
                Bushnell based the game's concept on an electronic ping-pong game
                included in the Magnavox Odyssey, the first home video game console.
                In response, Magnavox later sued Atari for patent infringement.
                    </p>
                    <p className="text-lg">
                Pong was the first commercially successful video game, and it
                helped to establish the video game industry along with the
                Magnavox Odyssey. Soon after its release, several companies began
                producing games that closely mimicked its gameplay. Eventually,
                Atari's competitors released new types of video games that deviated
                from Pong's original format to varying degrees, and this, in turn,
                led Atari to encourage its staff to move beyond Pong and produce
                more innovative games themselves.
                    </p>
                    <p className="text-lg">
                Pong is a two-dimensional sports game that simulates table tennis.
                The player controls an in-game paddle by moving it vertically
                across the left or right side of the screen. They can compete
                against another player controlling a second paddle on the opposing
                side. Players use the paddles to hit a ball back and forth. The
                goal is for each player to reach eleven points before the
                opponent; points are earned when one fails to return the ball to the other.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Welcome;