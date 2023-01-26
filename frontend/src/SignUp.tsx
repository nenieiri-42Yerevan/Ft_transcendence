import React from "react";
// import { setConfiguration } from '@types/react-grid-system';
// import { VirtualizedGrid } from '@mierak/react-virtualized-grid';
import "./SignUp.scss"
import logo from "./logo.png"
// // setConfiguration({ maxScreenClass: 'xl' });
// // import SkyBox from "./Skybox";
// // import angleToRadians from "./Angle";

// const layout = ()
// {

// }


const SignUp = () => {
    const months: any[] = [
        { value: "January" },
        { value: "February" },
        { value: "March" },
        { value: "April" },
        { value: "May" },
        { value: "June" },
        { value: "July" },
        { value: "August" },
        { value: "September" },
        { value: "October" },
        { value: "November" },
        { value: "December" }
    ];
    const days: any[] = Array.from(Array(1, 31).keys()).map(x => x);
    // const days:any = [...Array(31)].map((d) =>d)
    // const month = new Array(...12)
    return (
        <div className="header">
            {/* <nav></nav> */}
            <div className="welcome-side">
                <img className="main-image" src={logo} width={"500px"} height={"500px"} />
            </div>
            <div className="welcome-side forms">
                <form className="signup-form">
                    <div className="fields">
                        <label >Name: </label>
                        <input type="text" placeholder="Full Name" />
                    </div>
                    <div className="fields">
                        <label >Username: </label>
                        <input type="text" placeholder="Username" />
                    </div>
                    <div className="fields">
                        <label >Email: </label>
                        <input type="email" placeholder="Email" />
                    </div>
                    <div className="field-gender">
                        <div className="field-gender-label">
                            <label>Gender: </label>
                        </div>
                        <div className="field-gender-label">
                            <input type="radio" id="male" name="gender" value="male" />
                            <label htmlFor="male">Male</label>
                            <input type="radio" id="female" name="gender" value="female" />
                            <label htmlFor="female">Female</label>
                        </div>
                    </div>
                    <div className="fields">
                        <label >Password: </label>
                        <input type="password" placeholder="Password" />
                    </div>
                    <div className="fields">
                        <label >Repeat Password: </label>
                        <input type="password" placeholder="Repeat Password" />
                    </div>
                    <div className="fields field-date">
                        <select defaultValue={0}>
                            <option value="Month" key={0}>Month</option>
                            {months.map(({ value }, index) => <option key={index + 1} value={value} >{value}</option>)}
                            {/* <option value=""></option> */}
                        </select>
                        <select defaultValue={0}>
                            <option value="Day" key={0}>Day</option>
                            {days.map(({ value }, index) => <option key={index + 1} value={value} >{value}</option>)}
                            {/* <option value=""></option> */}
                        </select>
                        <select defaultValue={0}>
                            <option value="Month" key={0}>Month</option>
                            {months.map(({ value }, index) => <option key={index + 1} value={value} >{value}</option>)}
                            {/* <option value=""></option> */}
                        </select>
                    </div>
                    <div className="fields signup-button">
                        <button>Sign Up</button>
                    </div>
                </form>
            </div>
            {/* <VirtualizedGrid itemCount={2} rowHeight={50} cellWidth={100} gridHeight={300}>
			    {(index) => <div className="items">{index}</div>}
		    </VirtualizedGrid> */}
        </div>
    )
}

export default SignUp;