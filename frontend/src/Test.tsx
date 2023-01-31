import React from "react";
import { render } from "react-dom";
import { Form, Field } from "react-final-form";
import RadioInput from "./inputs/RadioInput";
import TextInput from "./inputs/TextInput";
import SelectInput from "./inputs/SelectInput";

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

type Stooge = "larry" | "moe" | "curly";
interface Values {
    firstName?: string;
    lastName?: string;
    employed: boolean;
    favoriteColor?: string;
    toppings?: string[];
    sauces?: string[];
    stooge: Stooge;
    notes?: string;
}

const onSubmit = async (values: Values) => {
    await sleep(300);
    window.alert(JSON.stringify(values, undefined, 2));
};

const Test = () => (
    <Form
        onSubmit={onSubmit}
        initialValues={{ stooge: "larry", employed: false }}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name</label>
                    <Field<string>
                        name="firstName"
                        component={TextInput}
                        placeholder="First Name"
                    />
                </div>
                <div>
                    <label>Last Name</label>
                    <Field<string>
                        name="lastName"
                        component={TextInput}
                        placeholder="Last Name"
                    />
                </div>
                <div>
                    <label>Favorite Color</label>
                    <Field<string> name="favoriteColor" component={SelectInput}>
                        <option />
                        <option value="#ff0000">❤️ Red</option>
                        <option value="#00ff00">💚 Green</option>
                        <option value="#0000ff">💙 Blue</option>
                    </Field>
                </div>
                <div>
                    <label>Best Stooge</label>
                    <div>
                        <label>
                            <Field<Stooge>
                                name="stooge"
                                component={RadioInput}
                                type="radio"
                                value="larry"
                            />{" "}
                            Larry
                        </label>
                        <label>
                            <Field<Stooge>
                                name="stooge"
                                component={RadioInput}
                                type="radio"
                                value="moe"
                            />{" "}
                            Moe
                        </label>
                        <label>
                            <Field<Stooge>
                                name="stooge"
                                component={RadioInput}
                                type="radio"
                                value="curly"
                            />{" "}
                            Curly
                        </label>
                    </div>
                </div>
                <div className="buttons">
                    <button type="submit" disabled={submitting || pristine}>
                        Submit
                    </button>
                </div>
                <pre>{JSON.stringify(values, undefined, 2)}</pre>
            </form>
        )}
    />
);

export default Test;