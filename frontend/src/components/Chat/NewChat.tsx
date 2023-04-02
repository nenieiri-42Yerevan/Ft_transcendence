import TextInput from "../Form/inputs/TextInput";
import React, { useState } from "react";
import { Field, FormSpy } from "react-final-form";


const NewChat = (props: any) => {
    return (
        <form
            id="new-chat-form"
            onSubmit={props.handleSubmit}
        >
            {
                props.submitError &&
                    <FormSpy subscription={{ submitError: true }}>
                        {({ submitError }) => (
                            <pre className="text-red-900 text-xs">
                                {submitError}
                            </pre>
                        )}
                    </FormSpy>
                
            }
            <Field<string>
                    name="search"
                    title={props.errors && props.errors.search ? props.errors.search : ""}
                    placeholder="Search"
                    id="new-chat-search"
                    key={"search"}
                >
                {({ input, meta, ...rest }) => (
                    <div className="p-3">

                        <TextInput
                            input={input}
                            meta={meta}
                            {...rest}
                        />
                    </div>
                )}
            </Field>
            <button
                form="new-chat-form"
                disabled={(props.errors && Object.keys(props.errors).length !== 0) || (props.hasSubmitErrors && !props.dirtySinceLastSubmit)}
                    type="submit"
                    className={
                        "py-2 px-8 rounded-md  outline-[#2d2727] outline-none " + (
                        ((props.errors && Object.keys(props.errors).length !== 0) || (props.hasSubmitErrors && !props.dirtySinceLastSubmit))
                            ? "disabled bg-[#a79c9b]"
                            : "bg-[#2d2727] hover:bg-red-50")
                    }
            >
                Search
            </button>
        </form>
    );
}

export default NewChat;