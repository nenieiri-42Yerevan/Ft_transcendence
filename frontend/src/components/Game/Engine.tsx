import React, { useRef, useEffect, useState, useLayoutEffect } from 'react';
import useArrowKeys from './Hooks';

function PingPongGame () {
        const canvasRef = useRef(null);
        const divRef = useRef(null);
        const arrowKeysState = useArrowKeys();
        var state = {
            scoreL:0,
            scoreR:0,
            speedX:10,
            speedY:0,
            ballOffsetX:0,
            ballOffsetY:0,
            ballX:0,
            ballY:0,
            paddleL:0,
            paddleLOffset:0,
            paddleR:0,
            paddleROffset:0
        };
        resetGame();
        useLayoutEffect(() => {
            function handleResize() {
                draw();
            }

            window.addEventListener('resize', handleResize);

            // Reset canvas size on component unmount
            return () => {
            window.removeEventListener('resize', handleResize);
            const canvas = canvasRef.current;
            canvas.width = 0;
            canvas.height = 0;
            };
        }, []);

        useEffect(() => {
            var requestId;
            function render() {
                requestId = requestAnimationFrame(render);
                draw();
            }
            render();
            return () => {
                cancelAnimationFrame(requestId);
            };
        });

        return (
            <div className="w-full md:w-4/5 h-screen bg-black" ref={divRef}>
            <canvas ref={canvasRef}>
            </ canvas>
            </div>
            );

        function draw() {
            const canvas = canvasRef.current;
            const parent = divRef.current;
            const ctx = canvas.getContext('2d');
            // Draw on the canvas using the state values
            canvas.width = parent.offsetWidth;
            canvas.height = parent.offsetHeight;
            ctx.fillStyle = 'white';
            ctx.fillRect(0, canvas.height/2- 50, 10, 100); //left paddle
            ctx.fillRect(canvas.width - 10, canvas.height/2 - 50, 10, 100); // right paddle
            ball(ctx);
            ctx.font = '42px Arial';
            const text = `${state.scoreL} : ${state.scoreR}`;
            const textWidth = ctx.measureText(text).width;
            const textX = (canvas.width - textWidth) / 2;
            const textY = (canvas.height * 0.1);
            ctx.fillText(text, textX, textY);
        }

        function paddle(ctx) {
            if (arrowKeysState.ArrowUp) {
                console.log("UP KEY");
                state.paddleLOffset -= 10;
            } else if (arrowKeysState.ArrowDown) {
                console.log("DOWN KEY");
                state.paddleLOffset += 10;
            }
            state.paddleL = canvas.height/2- 50 + state.paddleLOffset;
            state.paddleR = canvas.height/2- 50 + state.paddleROffset;
            
            ctx.fillRect(0, state.paddleL, 10, 100); //left paddle
            ctx.fillRect(canvas.width - 10, state.paddleR, 10, 100); // right paddle
        }

        function ball(ctx) {
            const canvas = canvasRef.current;
            const ballHalfWidth = 5;
            const ballHalfHeight = 5;

            // Calculate the new position of the ball
            state.ballX = canvas.width / 2 + state.ballOffsetX;
            state.ballY = canvas.height / 2 + state.ballOffsetY;

            // Check if the ball hits the left paddle
            if (state.ballX - ballHalfWidth <= 10 &&
                    state.ballY + ballHalfHeight >= canvas.height / 2 - 50 &&
                    state.ballY - ballHalfHeight <= canvas.height / 2 + 50) {
                state.speedX = 10; // Change the direction and speed of the ball
            }

            // Check if the ball hits the right paddle
            if (state.ballX + ballHalfWidth >= canvas.width - 10 &&
                    state.ballY + ballHalfHeight >= canvas.height / 2 - 50 &&
                    state.ballY - ballHalfHeight <= canvas.height / 2 + 50) {
                state.speedX = -10; // Change the direction and speed of the ball
            }

            // Check if the ball hits the top or bottom of the canvas
            if (state.ballY - ballHalfHeight <= 0 || state.ballY + ballHalfHeight >= canvas.height) {
                state.speedY = -state.speedY; // Change the direction of the ball
            }

            // Draw the ball on the canvas
            ctx.fillRect(state.ballX - ballHalfWidth, state.ballY - ballHalfHeight, ballHalfWidth * 2, ballHalfHeight * 2);

            if (state.ballX < 0) {
                state.scoreR += 1;
                resetGame();
            } else if (state.ballX > canvas.width) {
                state.scoreL += 1;
                resetGame();
            }
            // Update the ball position for the next frame
            state.ballOffsetX += state.speedX;
            state.ballOffsetY += state.speedY;        
            }
        function resetGame() {
            console.log("RESET");
            state.ballOffsetY = 0;
            state.ballOffsetX = 0;
            state.paddleLOffset = 0;
            state.paddleROffset = 0;
            state.speedY = Math.random() * 20 - 10;
            state.speedX = Math.random() < 0.5 ? -10 : 10;
        }

}
export default PingPongGame;

