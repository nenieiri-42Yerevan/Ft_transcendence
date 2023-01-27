import React from "react";
// import { setConfiguration } from '@types/react-grid-system';
// import { VirtualizedGrid } from '@mierak/react-virtualized-grid';
import "./SignUp.scss"
import logo from "./assets/images/logo.png"

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
    const days: any[] = Array.from(Array(31).keys()).map(d => d + 1)
    const years: any[] = Array.from(Array(76).keys()).map(d => d + 1940)

    return (
        <div className="header">
            {/* <nav></nav> */}
            <div className="signup-side d-none">
                <img className="main-image" src={logo} width={"500px"} alt="" height={"500px"} />
            </div>
            <div className="signup-side forms">
                <form className="signup-form">
                    <div className="fields">
                        <label htmlFor="signup-name">Name: </label>
                        <input type="text" id="signup-name" placeholder="Full Name" />
                    </div>
                    <div className="fields">
                        <label htmlFor="signup-username">Username: </label>
                        <input type="text" id="signup-username" placeholder="Username" />
                    </div>
                    <div className="fields">
                        <label htmlFor="signup-email">Email: </label>
                        <input type="email" id="signup-email" placeholder="Email" />
                    </div>
                    <div className="field-gender">
                        <div className="field-gender-labels">
                            <div className="field-gender-label">
                                <label htmlFor="signup-male">Gender: </label>
                            </div>
                            <div className="field-gender-radio">
                                <input type="radio" id="signup-male" name="gender" value="male" />
                                <label htmlFor="signup-male">Male</label>
                                <input type="radio" id="signup-female" name="gender" value="female" />
                                <label htmlFor="signup-female">Female</label>
                            </div>
                        </div>
                    </div>
                    <div className="fields">
                        <label htmlFor="signup-password">Password: </label>
                        <input type="password" id="signup-password" placeholder="Password" />
                    </div>
                    <div className="fields">
                        <label htmlFor="signup-repeat-password">Repeat Password: </label>
                        <input type="password" id="signup-repeat-password" placeholder="Repeat Password" />
                    </div>
                    <div className="fields field-date">
                        <select defaultValue={0}>
                            <option value="Month" key={0}>Month</option>
                            {months.map(({ value }, index) => <option key={index + 1} value={value} >{value}</option>)}
                        </select>
                        <select defaultValue={0}>
                            <option value="Day" key={0}>Day</option>
                            {days.map((day, index) => <option key={index + 1} value={day} >{day}</option>)}
                        </select>
                        <select defaultValue={0}>
                            <option value="Year" key={0}>Year</option>
                            {years.map((year, index) => <option key={index + 1} value={year} >{year}</option>)}
                        </select>
                    </div>
                    <div className="fields signup-button">
                        <button>Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp;