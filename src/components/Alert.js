import React from 'react'

const Alert = (props) => {
    const capitalize = (word) => {
        if (word === "danger") {
            word = "Error"
        }
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    return (
        <center>
            <div className='p-2' style={{ height: "50px", width: "50%" }}>
                {props.alert && <div className={` alert alert-${props.alert.type} alert-dismissible fade show`} style={{ height: "50px", background: "white", width: "auto" }} role="alert">
                    <strong>{capitalize(props.alert.type)} </strong> : {props.alert.msg}
                </div>}
            </div>
        </center>
    )
}

export default Alert