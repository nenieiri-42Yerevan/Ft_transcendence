import React from 'react';
import { paper, Path, view, PointText }  from 'paper';
import { useEffect, useState, useContext, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { GameContext } from '../context/GameSocket';
import { Modal, Button } from 'react-bootstrap';
const Multiplayer = () => {
   const canvasRef = useRef(null);
   const parentRef = useRef(null);
   const socket = useContext(GameContext);
   const paddleWidth = 20 / 1080;
   const paddleHeight = 200 / 1920;
   var ballPosition = [0.5, 0.5];
   var ballRadius = 20 / 1080;
   var paddlePos = [[0, 0.5], [1 - paddleWidth, 0.5]];
    var opponentId = -1, myId = -1;
    var score = [0, 0];
    const navigate = useNavigate();
   socket.on('ready', (data) => {
        console.log("Ready: ", data);
   });
    
    socket.on('start', (data) => {
        console.log("Game data: ", data);
    });

   socket.on('disconnect', (data) => {
        console.log('Socket closed: ', data);
   });

    socket.on('add', (data) => {
       console.log('Received a message from the backend add:', data);
       myId = data - 1;
       opponentId = myId == 1 ? 0 : 1;
   });

   socket.on('connect', () => {
        console.log('Socket connected');
   });

   socket.on('room', (data) => {
       console.log('Received a message from the backend room code:', data);
   });

   socket.on('tray', (data, pos) => {
       paddlePos[data - 1][1] = pos; 
   });

   useEffect(() => {
    // Initialize Paper JS
    paper.setup(canvasRef.current);

    var pW = view.size.width * paddleWidth;
    var pH = view.size.height * paddleHeight;

 //   console.log(view.center);
 //   console.log(view.size);

    // Create paddles
    const paddleL = new paper.Path.Rectangle({
      point: [0, (paddlePos[0][1] - paddleHeight/2) * view.size.height] ,
      size: [pW, pH],
      fillColor: 'white'
    });

    const paddleR = new paper.Path.Rectangle({
      point: [view.size.width - pW, (paddlePos[1][1] - paddleHeight/2) * view.size.height] ,
      size: [pW, pH],
      fillColor: 'white'
    });

    // Create ball
    var ball = new Path.Circle({
                center: [(ballPosition[0] * view.size.width), (ballPosition[1] * view.size.height) - ballRadius],
                radius: ballRadius * view.size.height,
                fillColor: 'green'
            });

   socket.on('ball', (data) => {
    ball.position = normalize(data);
   });
    // Create text
    var pingpong = new PointText({
                point: [view.center.x, pH * 0.75],
                content: `PING PONG`,
                fillColor: 'white',
                fontFamily: 'Arial',
                fontWeight: 'bold',
                fontSize: pH * 0.75,
                justification: 'center' 
            });

    var scoreText = new PointText({
                point: [view.center.x, pH * 1.25],
                content: `0 : 0`,
                fillColor: 'white',
                fontFamily: 'Arial',
                fontWeight: 'bold',
                fontSize: pH/2,
                justification: 'center' 
            });

    socket.on('score', (data) => {
        score = data;
        scoreText.content = `${data[0]} : ${data[1]}`; 
        if (data[0] == 10 || data[1] == 10) {
           navigate("/transcendence/user/dashboard"); 
        }
    });
    const handleResize = () => {
      paper.view.viewsize.width = parentRef.current.offsetwidth;
      paper.view.viewsize.height = parentRef.current.offsetheight;
      pW = view.size.width * paddleWidth;
      pH = view.size.height * paddleHeight;  
      ball.position =  [(ballPosition[0] * view.size.width) - ballRadius, (ballPosition[1] * view.size.height) - ballRadius];
      ball.radius = ballRadius * view.size.height;
      scoreText.position = [view.center.x, pH * 1.25];
      scoreText.fontSize = pH/2;
      pingpong.position = [view.center.x, pH * 0.75];
      pingpong.fontSize = pH * 0.75;
      paddleL.position = [pW/2, (paddlePos[0][1] - paddleHeight/2) * view.size.height];
      paddleR.position = [view.size.width - pW/2, (paddlePos[1][1] - paddleHeight/2) * view.size.height];
    }

     paper.view.onFrame = (event) => {
        ball.fillColor.hue += 1;
        paddleL.position = [pW/2, (paddlePos[0][1] - paddleHeight / 2) * view.size.height];
        paddleR.position = [view.size.width - pW/2, (paddlePos[1][1] - paddleHeight / 2) * view.size.height];

    }

    paper.view.onKeyDown = (event) => {
        console.log(event.key);
        if (event.key == 'w' && paddlePos[myId][1] > paddleHeight) {
            socket.emit('update-tray', (paddlePos[myId][1] - 0.02));
        }

        if (event.key == 's' && paddlePos[myId][1] < 1) {
            socket.emit('update-tray', (paddlePos[myId][1] + 0.02));
        }

        if (event.key == 'space') {
            socket.emit('ready', { plan : 0, mode : 0 });
        }

        if (event.key == '1') {
            socket.emit('add');
            socket.emit('update-tray', 0.5);
        }
        
        if (event.key == 'g') {
            socket.emit('start');
        }
    }
    const  normalize = (coordinate: [number, number]): number[] => {
        var pos = [0, 0];
        pos[0] = coordinate.x / 1920 * view.size.width;
        pos[1] = coordinate.y / 1080 * view.size.height;
        return pos; 
    }

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
        <div className='w-full h-full' ref={parentRef}>
            <canvas ref={canvasRef} className='w-full h-full' />
                </div>
  );
}

export default Multiplayer;
