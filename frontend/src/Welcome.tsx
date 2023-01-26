import React from "react";
// import { setConfiguration } from '@types/react-grid-system';
// import { VirtualizedGrid } from '@mierak/react-virtualized-grid';
import "./Welcome.scss"
// // setConfiguration({ maxScreenClass: 'xl' });
// // import SkyBox from "./Skybox";
// // import angleToRadians from "./Angle";

// const layout = ()
// {

// }


const Welcome = () => 
{
    return (
        <div className="header">
            {/* <nav></nav> */}
            <div className="welcome-side"></div>
            <div className="welcome-side"></div>
            {/* <VirtualizedGrid itemCount={2} rowHeight={50} cellWidth={100} gridHeight={300}>
			    {(index) => <div className="items">{index}</div>}
		    </VirtualizedGrid> */}
        </div>
    )
}

export default Welcome