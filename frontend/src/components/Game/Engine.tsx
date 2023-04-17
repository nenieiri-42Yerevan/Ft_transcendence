import React, { useRef, useEffect, useState, useLayoutEffect } from 'react';

function PingPongGame () {
        const canvasRef = useRef(null);
        const divRef = useRef(null);
        var [state, setState] = useState({
            paddleL: 250,
            paddleR: 250,
            ballX: 50,
            ballY: 50
            });
        useLayoutEffect(() => {
            function handleResize() {
                const canvas = canvasRef.current;
                const parent = divRef.current;
                const ctx = canvas.getContext('2d');
                canvas.width = parent.offsetWidth;
                canvas.height = parent.offsetHeight;
                ctx.fillStyle = 'white';
                ctx.fillRect(0, canvas.height/2- 50, 10, 100); //left paddle
                ctx.fillRect(canvas.width - 10, canvas.height/2 - 50, 10, 100); // right paddle
                ctx.fillRect(canvas.width/2, canvas.height/2, 10, 10);
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
            const canvas = canvasRef.current;
            const parent = divRef.current;
            const ctx = canvas.getContext('2d');
            console.log(`w : ${parent.offsetWidth} | h : ${parent.offsetHeight}`);
            // Draw on the canvas using the state values
            canvas.width = parent.offsetWidth;
            canvas.height = parent.offsetHeight;
            ctx.fillStyle = 'white';
            ctx.fillRect(0, canvas.height/2- 50, 10, 100); //left paddle
            ctx.fillRect(canvas.width - 10, canvas.height/2 - 50, 10, 100); // right paddle
            ctx.fillRect(canvas.width/2, canvas.height/2, 10, 10);
            }, [state]);

        return (
            <div className="w-full md:w-4/5 h-screen bg-black" ref={divRef}>
            <canvas ref={canvasRef}>
            </ canvas>
            </div>
            );
}
export default PingPongGame;

