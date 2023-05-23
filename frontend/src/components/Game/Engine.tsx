import React, {useRef, useContext, useEffect, useState, useLayoutEffect} from 'react';
import { GameContext } from '../context/GameSocket';
import Menu from './Menu';
class Engine extends React.Component {

    constructor(props) {
        super(props);
        this.divRef = React.createRef();
        this.canvasRef = React.createRef();
        this.state = InitialState();
    }

    componentDidMount(): void {
        const div = this.divRef.current; 
        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!this.props.isPreview) {
            const socket = useContext(GameContext);
            this.setState({ gameSocket : socket });
        }
        this.setState({ mode : this.props.isPreview?1:3 });       
        
        if (!this.props.isPreview) this.resetGame(this.state.mode != 1);
       
       this.animationId = requestAnimationFrame(loop.bind(this));
        window.addEventListener('keydown', this.keyInput);
        function loop() {
            canvas.width = div.offsetWidth;
            canvas.height = div.offsetHeight;
            this.draw(ctx, canvas);
            this.animationId = requestAnimationFrame(loop.bind(this));
        }
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.animationId);
       // this.state.socket.off();
    }

    /* reset the game */
    resetGame = (pause) => { this.setState({
            ballX : 0.5,
            ballY : 0.5,

            deltaY:         -0.01 + Math.random() * 0.02, // change ball in  X AXIS
            deltaX:         Math.random() > 0.5 ? 0.005 : -0.005, // change ball in  X AXIS
            ballSpeed:      0.005,
            pause:          false, // pause the game
            paddleL :       0.5,
            paddleR :       0.5,
        });
    }

    /* check if we can move the player or opponent board */
    moveOpponent = (opponent) => {
        if (opponent === 'L' && this.state.deltaX > 0) {
            if (this.state.ballY > this.state.paddleR + this.state.paddleHeight && 
                    this.state.paddleR < 0.95) {
                this.setState({ paddleR : this.state.paddleR + 0.025 });
            } else if (this.state.ballY < this.state.paddleR - this.state.paddleHeight && 
                    this.state.paddleR > 0.05){
                this.setState({ paddleR : this.state.paddleR - 0.025 });
            }
        } else if (opponent === 'R' && this.state.deltaX < 0) {
            if (this.state.ballY > this.state.paddleL + this.state.paddleHeight && 
                    this.state.paddleL < 0.95) {
                this.setState({ paddleL : this.state.paddleL + 0.025 });
            } else if (this.state.ballY < this.state.paddleL - this.state.paddleHeight && 
                    this.state.paddleL > 0.05){
                this.setState({ paddleL : this.state.paddleL - 0.025 });
            }
        
        }
    }
     
    /* check if ball is touching the edge of board*/
    touchingEdge = () => {
    if (this.state.ballY + this.state.ballW  >= 1 && this.state.deltaY > 0 ||
        this.state.ballY - this.state.ballW  <= 0 && this.state.deltaY < 0) {
        this.setState({
            deltaY: -1 * this.state.deltaY,
            });
        }
    } 

    /* check if ball is touching the player or opponent paddle */
    touchingPaddle = (canvas) => {
        if (
            this.state.ballX + this.state.ballW >= 1 - this.state.paddleWidth &&
            this.state.ballY - this.state.ballW <= this.state.paddleR + this.state.paddleHeight &&
            this.state.ballY + this.state.ballW >= this.state.paddleR - this.state.paddleHeight &&
            this.state.deltaX > 0
            ) { 
            this.setState({
                deltaX : -1 * this.state.ballSpeed,
                deltaY : (this.state.ballY - this.state.paddleR)/5,
                ballSpeed : this.state.ballSpeed + 0.0001
                });
        } else if (
            this.state.ballX - this.state.ballW*2 <= this.state.paddleWidth &&
            this.state.ballY - this.state.ballW <= this.state.paddleL + this.state.paddleHeight &&
            this.state.ballY + this.state.ballW >= this.state.paddleL - this.state.paddleHeight &&
            this.state.deltaX < 0
            ) {
            this.setState({
                deltaX : this.state.ballSpeed,
                deltaY : (this.state.ballY - this.state.paddleL)/5,
                ballSpeed : this.state.ballSpeed + 0.0001
                });
        } else if ( this.state.ballX > 1 ) {
            this.resetGame(this.state.mode != 1);
            this.setState({
                scoreL : this.state.scoreL + 1
            });
        } else if ( this.state.ballX < 0 ) {
            this.resetGame(this.state.mode != 1);
            this.setState({
                scoreR : this.state.scoreR + 1
            });
        }
        
    }
    
    /* score render */
    drawScore = (ctx, canvas) => {
        var text = `${this.state.scoreL} : ${this.state.scoreR}`;
        ctx.font = '42px Arial';
        const textWidth = ctx.measureText(text).width;
        const textX = (canvas.width - textWidth) / 2;
        const textY = (canvas.height * 0.1);
        ctx.fillText(text, textX, textY);
    }
    
    /* bounce the  ball */
    bounceBall = (ctx, canvas) => {
        if (!this.state.pause) {
            this.setState({
                ballX : this.state.ballX + this.state.deltaX,
                ballY : this.state.ballY + this.state.deltaY
            });
        } else {
            var text = `PAUSE`;
            ctx.font = '42px Arial';
            const textWidth = ctx.measureText(text).width;
            const textX = (canvas.width - textWidth) / 2;
            const textY = (canvas.height * 0.45);
            ctx.fillText(text, textX, textY);
        }
        const ballR = canvas.width * this.state.ballW;
        const ballX = canvas.width * this.state.ballX;
        const ballY = canvas.height * this.state.ballY;
       // ctx.fillRect(ballX - ballWidth/2, ballY - ballWidth/2, ballWidth, ballWidth);
        ctx.arc(ballX - ballR/2 , ballY - ballR/2, ballR, 0, 2 * Math.PI);
        ctx.fill();
    }
    
    paddles = (ctx, canvas) => {
        const paddleH = this.state.paddleHeight * canvas.height;
        const paddleW = this.state.paddleWidth * canvas.width;
        const paddleL = this.state.paddleL * canvas.height - paddleH;
        const paddleR = this.state.paddleR * canvas.height - paddleH;
        ctx.fillRect(0, paddleL, paddleW * 2, paddleH * 2);
        ctx.fillRect(canvas.width - paddleW * 2, paddleR, paddleW * 2, paddleH * 2);
    }

    draw = (ctx, canvas) => {
        ctx.fillStyle = 'white';
        this.drawScore(ctx, canvas);
        this.bounceBall(ctx, canvas);
        this.touchingPaddle(canvas);
        this.touchingEdge();
        if (this.state.mode == 1) { // Auto game 
            this.moveOpponent('R');
            this.moveOpponent('L');
        } else if (this.state.mode == 2) { // Single player
            this.moveOpponent('L');
        } else if (this.state.mode == 3) { // Multiplayer
        
        }
        this.paddles(ctx, canvas);
    }

    /* handle the keyinput */ 

    handleMatchmaking = (num:Number) => {
        this.setState({
            mode : num,
            displayMenu:    false,
        });
        this.resetGame(true);
    };

    /* render the jsx */
    render() {
        return (
                <div className="w-full h-screen bg-black" ref={this.divRef}>
                    <canvas ref={this.canvasRef}>
                    </ canvas>
                </div>
               );
    }

}

const InitialState = () => {
    return { 

        /* Paddle Array */
        paddleHeight :  0.05,
        paddleWidth :   0.005,
        paddleL :       0.5,
        paddleR :       0.5,
        /* ball */
        ballX:          0.5,
        ballY:          0.5,
        ballW:          0.01,
        ballSpeed:      0.005,   // speed of ball
        deltaY:         -0.01 + Math.random() * 0.02, // change ball in  X AXIS
        deltaX:         0.005, // change ball in  X AXIS
        /* pause */
        pause:          false, // pause the game
        /* menu */
        displayMenu:    true,
        /* Score */
        mode:           1,
        scoreL:         0,
        scoreR:         0,
    }
}

export default Engine;
